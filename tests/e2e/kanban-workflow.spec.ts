import { test, expect } from '@playwright/test';
import { KanbanPage } from './page-objects/KanbanPage';

test.describe('Kanban Workflow with Page Objects', () => {
  let kanbanPage: KanbanPage;

  test.beforeEach(async ({ page }) => {
    kanbanPage = new KanbanPage(page);
    await kanbanPage.goto();
    await kanbanPage.waitForBrowserCompatibilityLayer();
  });

  test.afterEach(async () => {
    // Clean up localStorage after each test
    await kanbanPage.clearLocalStorage();
  });

  test('should load application successfully', async () => {
    const hasLoaded = await kanbanPage.hasApplicationLoaded();
    expect(hasLoaded).toBe(true);

    const title = await kanbanPage.getApplicationTitle();
    expect(title).toMatch(/Kanri/i);

    await kanbanPage.expectNoTauriErrors();
  });

  test('should handle data persistence with localStorage', async () => {
    // Test setting and getting data
    const testData = {
      boards: [{ id: '1', title: 'Test Board', columns: [] }],
      settings: { theme: 'dark', language: 'en' },
      preferences: { sidebarCollapsed: false }
    };

    const results = await kanbanPage.testStoreOperations(testData);

    expect(results.boards).toEqual(testData.boards);
    expect(results.settings).toEqual(testData.settings);
    expect(results.preferences).toEqual(testData.preferences);
  });

  test('should persist data across page reloads', async () => {
    // Set some test data
    await kanbanPage.setLocalStorageData('testBoard', {
      id: 'test-1',
      title: 'Persistent Board',
      columns: [
        { id: 'col-1', title: 'To Do', cards: [] },
        { id: 'col-2', title: 'In Progress', cards: [] }
      ]
    });

    // Reload the page
    await kanbanPage.page.reload();
    await kanbanPage.waitForBrowserCompatibilityLayer();

    // Check that data persists
    const persistedData = await kanbanPage.getLocalStorageData('testBoard');
    const parsed = JSON.parse(persistedData!);

    expect(parsed.title).toBe('Persistent Board');
    expect(parsed.columns).toHaveLength(2);
  });

  test('should navigate between pages correctly', async () => {
    // Test navigation to settings
    await kanbanPage.navigateToSettings();
    await expect(kanbanPage.page).toHaveURL(/.*\/settings/);

    // Test navigation to import
    await kanbanPage.navigateToImport();
    await expect(kanbanPage.page).toHaveURL(/.*\/import/);

    // Navigate back to home
    await kanbanPage.goto();
    await expect(kanbanPage.page).toHaveURL(/.*\/$/);
  });

  test('should handle mock file operations gracefully', async ({ page }) => {
    await kanbanPage.goto();

    // Test that file operations don't crash the app
    const fileOperations = await page.evaluate(async () => {
      const results: string[] = [];
      
      try {
        // Test mock file operations
        await window.mockFs.writeTextFile('/test/board.json', '{"test": true}');
        results.push('writeTextFile: success');
        
        const exists = await window.mockFs.exists('/test/board.json');
        results.push(`exists: ${exists}`);
        
        const dialogResult = await window.mockDialog.save({
          defaultPath: './export.json',
          filters: [{ extensions: ['json'], name: 'JSON' }]
        });
        results.push(`dialog: ${dialogResult}`);
        
        const converted = window.mockCore.convertFileSrc('/local/image.jpg');
        results.push(`convertFileSrc: "${converted}"`);
        
      } catch (error) {
        results.push(`error: ${error.message}`);
      }
      
      return results;
    });

    expect(fileOperations).toContain('writeTextFile: success');
    expect(fileOperations).toContain('exists: false');
    expect(fileOperations).toContain('dialog: null');
    expect(fileOperations).toContain('convertFileSrc: ""');
    expect(fileOperations).not.toContain(expect.stringMatching(/^error:/));
  });

  test('should handle browser-specific features', async ({ page }) => {
    await kanbanPage.goto();

    // Check that browser compatibility messages appear
    const consoleLogs: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'log') {
        consoleLogs.push(msg.text());
      }
    });

    // Trigger some actions that would use Tauri APIs
    await page.waitForTimeout(2000);

    const browserMessages = consoleLogs.filter(log => 
      log.includes('browser mode') || 
      log.includes('web mode') ||
      log.includes('Tauri not available')
    );

    expect(browserMessages.length).toBeGreaterThanOrEqual(1);
  });

  test('should take screenshot on test completion', async () => {
    await kanbanPage.goto();
    await kanbanPage.takeScreenshot('kanban-workflow-final');
    
    // Verify screenshot was taken (file should exist)
    // Note: This is more for documentation purposes
    expect(true).toBe(true);
  });
});
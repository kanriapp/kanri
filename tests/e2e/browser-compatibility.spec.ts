import { test, expect } from '@playwright/test';

test.describe('Browser Compatibility Layer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should load browser compatibility plugin', async ({ page }) => {
    // Check that the browser compatibility mocks are loaded
    const mockExists = await page.evaluate(() => {
      return typeof window.MockLazyStore !== 'undefined' &&
             typeof window.mockLog !== 'undefined' &&
             typeof window.mockFs !== 'undefined' &&
             typeof window.mockDialog !== 'undefined' &&
             typeof window.mockPath !== 'undefined' &&
             typeof window.mockCore !== 'undefined';
    });

    expect(mockExists).toBe(true);
  });

  test('should handle MockLazyStore operations', async ({ page }) => {
    const storeOperations = await page.evaluate(async () => {
      const store = new window.MockLazyStore('test.dat');
      
      // Test basic operations
      await store.set('testKey', { data: 'test value' });
      const value = await store.get('testKey');
      const hasKey = await store.has('testKey');
      
      return {
        setValue: value,
        hasKey: hasKey
      };
    });

    expect(storeOperations.setValue).toEqual({ data: 'test value' });
    expect(storeOperations.hasKey).toBe(true);
  });

  test('should handle file system mock operations', async ({ page }) => {
    const fsOperations = await page.evaluate(async () => {
      const results = [];
      
      // Test writeTextFile
      try {
        await window.mockFs.writeTextFile('/test/path.json', '{"test": true}');
        results.push('writeTextFile: success');
      } catch (e) {
        results.push(`writeTextFile: error - ${e.message}`);
      }
      
      // Test exists
      try {
        const exists = await window.mockFs.exists('/test/path.json');
        results.push(`exists: ${exists}`);
      } catch (e) {
        results.push(`exists: error - ${e.message}`);
      }
      
      return results;
    });

    expect(fsOperations).toContain('writeTextFile: success');
    expect(fsOperations).toContain('exists: false'); // Mock always returns false
  });

  test('should handle dialog mock operations', async ({ page }) => {
    const dialogOperations = await page.evaluate(async () => {
      const results = [];
      
      try {
        const filePath = await window.mockDialog.save({
          defaultPath: './test.json',
          filters: [{ extensions: ['json'], name: 'JSON File' }],
          title: 'Test Save Dialog'
        });
        results.push(`save dialog: ${filePath}`);
      } catch (e) {
        results.push(`save dialog: error - ${e.message}`);
      }
      
      return results;
    });

    expect(dialogOperations).toContain('save dialog: null'); // Mock returns null (cancelled)
  });

  test('should handle core convertFileSrc operations', async ({ page }) => {
    const coreOperations = await page.evaluate(() => {
      const results = [];
      
      // Test with HTTP URL (should pass through)
      const httpUrl = window.mockCore.convertFileSrc('https://example.com/image.jpg');
      results.push(`http url: ${httpUrl}`);
      
      // Test with local path (should return empty)
      const localPath = window.mockCore.convertFileSrc('/local/path/image.jpg');
      results.push(`local path: "${localPath}"`);
      
      // Test with data URL (should pass through)
      const dataUrl = window.mockCore.convertFileSrc('data:image/png;base64,abc123');
      results.push(`data url: ${dataUrl}`);
      
      return results;
    });

    expect(coreOperations).toContain('http url: https://example.com/image.jpg');
    expect(coreOperations).toContain('local path: ""');
    expect(coreOperations).toContain('data url: data:image/png;base64,abc123');
  });

  test('should handle path operations', async ({ page }) => {
    const pathOperations = await page.evaluate(async () => {
      const normalizedPath = await window.mockPath.normalize('/test/path/../file.txt');
      return normalizedPath;
    });

    expect(pathOperations).toBe('/test/path/../file.txt'); // Mock returns as-is
  });

  test('should use localStorage for persistent data', async ({ page }) => {
    // Set some data using the mock store
    await page.evaluate(async () => {
      const store = new window.MockLazyStore('kanri.dat');
      await store.set('boards', [
        { id: '1', title: 'Test Board', columns: [] }
      ]);
      await store.set('settings', { theme: 'dark' });
    });

    // Reload the page
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Check that data persists
    const persistedData = await page.evaluate(async () => {
      const store = new window.MockLazyStore('kanri.dat');
      const boards = await store.get('boards');
      const settings = await store.get('settings');
      
      return { boards, settings };
    });

    expect(persistedData.boards).toEqual([
      { id: '1', title: 'Test Board', columns: [] }
    ]);
    expect(persistedData.settings).toEqual({ theme: 'dark' });
  });

  test('should not throw Tauri-related errors', async ({ page }) => {
    const errors: string[] = [];
    
    page.on('pageerror', error => {
      errors.push(error.message);
    });

    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Navigate to a kanban board (this uses many Tauri APIs)
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check for any Tauri-related errors
    const tauriErrors = errors.filter(error => 
      error.includes('Cannot read properties of undefined (reading \'invoke\')') ||
      error.includes('@tauri-apps') ||
      error.includes('__TAURI__') ||
      error.includes('LazyStore') ||
      error.includes('convertFileSrc') ||
      error.includes('writeTextFile')
    );

    expect(tauriErrors).toHaveLength(0);
  });
});
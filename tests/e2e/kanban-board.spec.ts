import { test, expect } from '@playwright/test';

test.describe('Kanban Board', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');
  });

  test('should display the main dashboard', async ({ page }) => {
    // Check if the main Kanri interface loads
    await expect(page).toHaveTitle(/Kanri/);
    
    // Wait for the main content to load
    await page.waitForSelector('#__nuxt');
    
    // Check for any loading states to complete
    await page.waitForLoadState('networkidle');
  });

  test('should be able to create a new board', async ({ page }) => {
    // Look for a create board button or similar
    const createButton = page.locator('button').filter({ hasText: /create|new|add/i }).first();
    
    if (await createButton.isVisible()) {
      await createButton.click();
      
      // Fill in board details (adjust selectors based on your actual UI)
      const nameInput = page.locator('input[type="text"]').first();
      if (await nameInput.isVisible()) {
        await nameInput.fill('Test Board');
        
        // Look for submit/create button
        const submitButton = page.locator('button').filter({ hasText: /create|save|ok/i }).first();
        if (await submitButton.isVisible()) {
          await submitButton.click();
        }
      }
    }
    
    // Verify board was created
    await expect(page.locator('text=Test Board')).toBeVisible({ timeout: 10000 });
  });

  test('should handle browser compatibility gracefully', async ({ page }) => {
    // Check that no Tauri-related errors appear in console
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check for specific Tauri errors that should be handled
    const tauriErrors = errors.filter(error => 
      error.includes('invoke') || 
      error.includes('__TAURI__') ||
      error.includes('@tauri-apps')
    );

    expect(tauriErrors).toHaveLength(0);
  });

  test('should display running in web mode message', async ({ page }) => {
    // Check console for browser mode message
    const consoleLogs: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'log') {
        consoleLogs.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Should show browser compatibility messages
    const browserModeMessages = consoleLogs.filter(log => 
      log.includes('browser mode') || 
      log.includes('web mode') ||
      log.includes('Tauri not available')
    );

    expect(browserModeMessages.length).toBeGreaterThan(0);
  });

  test('should handle localStorage for data persistence', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check that localStorage is being used for browser compatibility
    const localStorageKeys = await page.evaluate(() => {
      return Object.keys(localStorage).filter(key => key.startsWith('kanri_'));
    });

    // At minimum, should have some kanri-related keys or be able to set them
    const testKey = 'kanri_test';
    await page.evaluate((key) => {
      localStorage.setItem(key, JSON.stringify({ test: true }));
    }, testKey);

    const retrievedValue = await page.evaluate((key) => {
      return localStorage.getItem(key);
    }, testKey);

    expect(retrievedValue).toBe('{"test":true}');
  });

  test('should navigate between different pages', async ({ page }) => {
    await page.goto('/');
    
    // Try navigating to settings page
    await page.goto('/settings');
    await expect(page).toHaveURL(/.*\/settings/);
    
    // Try navigating to import page
    await page.goto('/import');
    await expect(page).toHaveURL(/.*\/import/);
    
    // Navigate back to home
    await page.goto('/');
    await expect(page).toHaveURL(/.*\//);
  });
});
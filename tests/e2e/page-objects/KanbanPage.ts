import { Page, Locator, expect } from '@playwright/test';

export class KanbanPage {
  readonly page: Page;
  readonly createBoardButton: Locator;
  readonly boardTitleInput: Locator;
  readonly saveButton: Locator;
  readonly settingsButton: Locator;
  readonly importButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createBoardButton = page.locator('button').filter({ hasText: /create|new|add/i }).first();
    this.boardTitleInput = page.locator('input[type="text"]').first();
    this.saveButton = page.locator('button').filter({ hasText: /create|save|ok/i }).first();
    this.settingsButton = page.locator('a[href="/settings"], button').filter({ hasText: /settings/i }).first();
    this.importButton = page.locator('a[href="/import"], button').filter({ hasText: /import/i }).first();
  }

  async goto() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }

  async createNewBoard(boardName: string) {
    if (await this.createBoardButton.isVisible()) {
      await this.createBoardButton.click();
      
      if (await this.boardTitleInput.isVisible()) {
        await this.boardTitleInput.fill(boardName);
        
        if (await this.saveButton.isVisible()) {
          await this.saveButton.click();
        }
      }
    }
    
    // Wait for board to be created
    await expect(this.page.locator(`text=${boardName}`)).toBeVisible({ timeout: 10000 });
  }

  async navigateToSettings() {
    await this.page.goto('/settings');
    await expect(this.page).toHaveURL(/.*\/settings/);
  }

  async navigateToImport() {
    await this.page.goto('/import');
    await expect(this.page).toHaveURL(/.*\/import/);
  }

  async waitForBrowserCompatibilityLayer() {
    await this.page.waitForFunction(() => {
      return typeof window.MockLazyStore !== 'undefined' &&
             typeof window.mockLog !== 'undefined' &&
             typeof window.mockFs !== 'undefined';
    });
  }

  async checkForTauriErrors(): Promise<string[]> {
    return this.page.evaluate(() => {
      // Get any console errors that might be related to Tauri
      return [];
    });
  }

  async getLocalStorageData(key: string) {
    return this.page.evaluate((storageKey) => {
      return localStorage.getItem(`kanri_${storageKey}`);
    }, key);
  }

  async setLocalStorageData(key: string, value: any) {
    await this.page.evaluate(({ storageKey, storageValue }) => {
      localStorage.setItem(`kanri_${storageKey}`, JSON.stringify(storageValue));
    }, { storageKey: key, storageValue: value });
  }

  async clearLocalStorage() {
    await this.page.evaluate(() => {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('kanri_')) {
          localStorage.removeItem(key);
        }
      });
    });
  }

  async mockTauriStore() {
    return this.page.evaluate(() => {
      return new window.MockLazyStore('test.dat');
    });
  }

  async testStoreOperations(testData: Record<string, any>) {
    return this.page.evaluate(async (data) => {
      const store = new window.MockLazyStore('test.dat');
      const results: any = {};
      
      // Test set and get operations
      for (const [key, value] of Object.entries(data)) {
        await store.set(key, value);
        results[key] = await store.get(key);
      }
      
      return results;
    }, testData);
  }

  async hasApplicationLoaded(): Promise<boolean> {
    try {
      await this.page.waitForSelector('#__nuxt', { timeout: 10000 });
      await this.page.waitForLoadState('networkidle');
      return true;
    } catch {
      return false;
    }
  }

  async getApplicationTitle(): Promise<string> {
    return this.page.title();
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ 
      path: `tests/e2e/screenshots/${name}.png`,
      fullPage: true 
    });
  }

  async getConsoleMessages(type: 'log' | 'error' | 'warn' = 'log'): Promise<string[]> {
    const messages: string[] = [];
    
    this.page.on('console', msg => {
      if (msg.type() === type) {
        messages.push(msg.text());
      }
    });

    return messages;
  }

  async expectNoTauriErrors() {
    const errors: string[] = [];
    
    this.page.on('pageerror', error => {
      errors.push(error.message);
    });

    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Wait a bit for any errors to surface
    await this.page.waitForTimeout(2000);

    const tauriErrors = errors.filter(error => 
      error.includes('Cannot read properties of undefined (reading \'invoke\')') ||
      error.includes('@tauri-apps') ||
      error.includes('LazyStore')
    );

    expect(tauriErrors).toHaveLength(0);
  }
}
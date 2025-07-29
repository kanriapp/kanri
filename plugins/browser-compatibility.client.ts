// Browser compatibility layer for Tauri APIs
export default defineNuxtPlugin(() => {
  // Only run on client side
  if (process.client) {
    // Mock Tauri APIs for browser environment
    if (typeof window !== 'undefined') {
      // Mock @tauri-apps/plugin-store
      if (!window.__TAURI__) {
        window.__TAURI__ = {};
      }
      
      // Mock LazyStore
      class MockLazyStore {
        constructor(filename) {
          this.filename = filename;
          this.data = {};
        }
        
        async get(key) {
          const stored = localStorage.getItem(`kanri_${key}`);
          return stored ? JSON.parse(stored) : null;
        }
        
        async set(key, value) {
          localStorage.setItem(`kanri_${key}`, JSON.stringify(value));
        }
        
        async has(key) {
          return localStorage.getItem(`kanri_${key}`) !== null;
        }
        
        async delete(key) {
          localStorage.removeItem(`kanri_${key}`);
        }
        
        async clear() {
          const keys = Object.keys(localStorage);
          keys.forEach(key => {
            if (key.startsWith('kanri_')) {
              localStorage.removeItem(key);
            }
          });
        }
        
        async save() {
          // In browser, localStorage auto-saves
          return Promise.resolve();
        }
        
        async load() {
          // In browser, localStorage auto-loads
          return Promise.resolve();
        }
      }
      
      // Mock log functions
      const mockLog = {
        trace: console.log,
        debug: console.log,
        info: console.info,
        warn: console.warn,
        error: console.error,
      };
      
      // Mock file system operations
      const mockFs = {
        async writeTextFile(path, content) {
          console.log('Mock writeTextFile:', path, content);
          return Promise.resolve();
        },
        async exists(path) {
          console.log('Mock exists check:', path);
          return Promise.resolve(false); // Files don't exist in browser
        }
      };
      
      // Mock dialog operations
      const mockDialog = {
        async save(options) {
          console.log('Mock save dialog:', options);
          return Promise.resolve(null); // User cancelled
        }
      };
      
      // Mock path operations
      const mockPath = {
        async normalize(path) {
          return Promise.resolve(path); // Return as-is for browser
        }
      };
      
      // Mock core operations
      const mockCore = {
        convertFileSrc(path) {
          // In browser, return the path as-is or empty string for local files
          if (path && (path.startsWith('http') || path.startsWith('data:'))) {
            return path;
          }
          return ''; // Local files can't be accessed in browser
        }
      };
      
      // Make mocks globally available
      window.MockLazyStore = MockLazyStore;
      window.mockLog = mockLog;
      window.mockFs = mockFs;
      window.mockDialog = mockDialog;
      window.mockPath = mockPath;
      window.mockCore = mockCore;
    }
  }
});
// Browser-compatible Tauri API composable
export const useTauriCompat = () => {
  const getTauriApi = async (apiName) => {
    if (process.client && typeof window !== 'undefined') {
      // Check if we're in Tauri environment
      if (window.__TAURI__ && window.__TAURI__.core) {
        // Use real Tauri APIs
        switch (apiName) {
          case 'dialog':
            return await import("@tauri-apps/plugin-dialog");
          case 'fs':
            return await import("@tauri-apps/plugin-fs");
          case 'core':
            return await import("@tauri-apps/api/core");
          case 'path':
            return await import("@tauri-apps/api/path");
          default:
            throw new Error(`Unknown API: ${apiName}`);
        }
      } else {
        // Use browser mocks
        switch (apiName) {
          case 'dialog':
            return window.mockDialog || {};
          case 'fs':
            return window.mockFs || {};
          case 'core':
            return window.mockCore || {};
          case 'path':
            return window.mockPath || {};
          default:
            return {};
        }
      }
    }
    
    // SSR fallback
    return {};
  };

  return {
    getTauriApi
  };
};
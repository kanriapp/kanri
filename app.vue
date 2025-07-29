<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2025 trobonox <hello@trobo.dev> -->
<!-- -->
<!-- SPDX-License-Identifier: CC0-1.0 -->

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
// Browser-compatible Tauri API imports
async function initializeApp() {
  if (process.client) {
    try {
      // Only import Tauri APIs if available (desktop app)
      if (typeof window !== 'undefined' && window.__TAURI__) {
        const { show } = await import("@tauri-apps/api/app");
        const {
          attachConsole,
          trace,
          debug,
          info,
          warn,
          error,
        } = await import("@tauri-apps/plugin-log");

        setTimeout(() => {
          show();
        }, 50);

        await attachConsole();

        console.trace = trace;
        console.log = debug;
        console.info = info;
        console.warn = warn;
        console.error = error;
      } else {
        // Browser fallback - do nothing for show(), keep console as-is
        console.log("Running in browser mode");
      }
    } catch (e) {
      // Tauri not available, running in browser
      console.log("Tauri not available, running in web mode");
    }
  }
}

onMounted(async () => {
  await initializeApp();
});
</script>

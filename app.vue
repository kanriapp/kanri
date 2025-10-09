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
import { getCurrentWindow } from "@tauri-apps/api/window";
import { show } from "@tauri-apps/api/app";
import {
  attachConsole,
  trace,
  debug,
  info,
  warn,
  error,
} from "@tauri-apps/plugin-log";

onMounted(async () => {
  setTimeout(async () => {
    await getCurrentWindow().show();
  }, 50);

  await attachConsole();

  console.trace = trace;
  console.log = debug;
  console.info = info;
  console.warn = warn;
  console.error = error;

  // if after 2 seconds the window is still not shown, try to open it again
  setTimeout(async () => {
    const isVisible = await getCurrentWindow().isVisible();
    if (!isVisible) {
      await show(); // for macOS
      await getCurrentWindow().show(); // generic function
    }
  }, 2000);
});
</script>

<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2024 trobonox <hello@trobo.dev> -->
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
import { appWindow } from "@tauri-apps/api/window";
import {
  attachConsole,
  trace,
  debug,
  info,
  warn,
  error,
} from "tauri-plugin-log-api";

onMounted(async () => {
  setTimeout(() => {
    appWindow.show();
  }, 50);

  await attachConsole();

  console.trace = trace;
  console.log = debug;
  console.info = info;
  console.warn = warn;
  console.error = error;
});
</script>

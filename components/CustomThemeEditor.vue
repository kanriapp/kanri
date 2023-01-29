<!-- SPDX-FileCopyrightText: 2022-2023 trobonox <hello@trobo.tech> -->
<!-- -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

<template>
  <div class="flex w-[48rem] flex-col gap-4">
    <div
      id="color-row"
      class="flex flex-row items-center justify-between"
    >
      <label for="color-picker">Accent color</label>
      <div class="flex flex-row gap-4">
        <input
          v-model="customTheme.accent"
          type="text"
          class="bg-elevation-1 w-24 rounded-md px-2"
          readonly="readonly"
        >
        <input
          ref="colorInput"
          v-model="customTheme.accent"
          type="color"
        >
      </div>
    </div>

    <div class="flex flex-row items-center justify-between">
      <label for="color-picker">Primary text color</label>
      <div class="flex flex-row gap-4">
        <input
          v-model="customTheme.text"
          type="text"
          class="bg-elevation-1 w-24 rounded-md px-2"
          readonly="readonly"
        >
        <input
          ref="colorInput"
          v-model="customTheme.text"
          type="color"
        >
      </div>
    </div>

    <div class="flex flex-row items-center justify-between">
      <label for="color-picker">Button text</label>
      <div class="flex flex-row gap-4">
        <input
          v-model="customTheme.textButtons"
          type="text"
          class="bg-elevation-1 w-24 rounded-md px-2"
          readonly="readonly"
        >
        <input
          ref="colorInput"
          v-model="customTheme.textButtons"
          type="color"
        >
      </div>
    </div>

    <div class="flex flex-row items-center justify-between">
      <label for="color-picker">Primary background color</label>
      <div class="flex flex-row gap-4">
        <input
          v-model="customTheme.bgPrimary"
          type="text"
          class="bg-elevation-1 w-24 rounded-md px-2"
          readonly="readonly"
        >
        <input
          ref="colorInput"
          v-model="customTheme.bgPrimary"
          type="color"
        >
      </div>
    </div>

    <div class="flex flex-row items-center justify-between">
      <label for="color-picker">1st level of elevation</label>
      <div class="flex flex-row gap-4">
        <input
          v-model="customTheme.elevation1"
          type="text"
          class="bg-elevation-1 w-24 rounded-md px-2"
          readonly="readonly"
        >
        <input
          ref="colorInput"
          v-model="customTheme.elevation1"
          type="color"
        >
      </div>
    </div>

    <div class="flex flex-row items-center justify-between">
      <label for="color-picker">2nd level of elevation</label>
      <div class="flex flex-row gap-4">
        <input
          v-model="customTheme.elevation2"
          type="text"
          class="bg-elevation-1 w-24 rounded-md px-2"
          readonly="readonly"
        >
        <input
          ref="colorInput"
          v-model="customTheme.elevation2"
          type="color"
        >
      </div>
    </div>

    <div class="flex flex-row items-center justify-between">
      <label for="color-picker">3rd level of elevation</label>
      <div class="flex flex-row gap-4">
        <input
          v-model="customTheme.elevation3"
          type="text"
          class="bg-elevation-1 w-24 rounded-md px-2"
          readonly="readonly"
        >
        <input
          ref="colorInput"
          v-model="customTheme.elevation3"
          type="color"
        >
      </div>
    </div>

    <div class="flex flex-row items-center justify-end">
      <button
        class="text-buttons transition-button bg-accent rounded-md px-6 py-1"
        @click="setCustomTheme"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import emitter from "@/utils/emitter";
import { dark } from "@/utils/themes.js";
import { lightenColor } from "@/utils/colorUtils.js";
import { useTauriStore } from "@/stores/tauriStore";

const store = useTauriStore().store;

const customTheme = ref({});

onMounted(async () => {
    const savedPalette = await store.get("savedCustomTheme") || await store.get("colors");
    await store.set("colors", savedPalette);
    await store.set("activeTheme", "custom");
    emitter.emit("updateColors");
    customTheme.value = savedPalette || dark;
});

const setCustomTheme = () => {
    store.set("activeTheme", "custom");

    const theme = {
        // take values from inputs and generate missing shades
        bgPrimary: customTheme.value.bgPrimary,
        elevation1: customTheme.value.elevation1,
        elevation2: customTheme.value.elevation2,
        elevation3: customTheme.value.elevation3,
        accent: customTheme.value.accent,
        accentDarker: lightenColor(customTheme.value.accent, -40),
        text: customTheme.value.text,
        textD1: lightenColor(customTheme.value.text, -30),
        textD2: lightenColor(customTheme.value.text, -50),
        textD3: lightenColor(customTheme.value.text, -70),
        textD4: lightenColor(customTheme.value.text, -90),
        textButtons: customTheme.value.textButtons,
    };

    store.set("colors", theme);
    store.set("savedCustomTheme", theme);
    emitter.emit("updateColors");
};
</script>

<style scoped>
input[type="color"] {
    -webkit-appearance: none;
    appearance: none;
    border-radius: 8px;
    cursor: pointer;
}
input[type="color"]::-webkit-color-swatch-wrapper {
    padding: 0;
    border-radius: 8px;
}
input[type="color"]::-webkit-color-swatch {
    border-radius: 8px;
    border-width: 2px;
    border-style: solid;
    border-color: var(--text);
}
</style>

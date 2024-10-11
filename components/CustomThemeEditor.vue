<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2024 trobonox <hello@trobo.dev> -->
<!-- -->
<!-- SPDX-License-Identifier: GPL-3.0-or-later -->
<!--
Kanri is an offline Kanban board app made using Tauri and Nuxt.
Copyright (C) 2022-2024 trobonox <hello@trobo.dev>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>. -->

<template>
  <div class="flex w-[48rem] flex-col gap-4">
    <div id="color-row" class="flex flex-row items-center justify-between">
      <label for="color-picker">{{
        $t("components.customThemeEditor.optionAccentColor")
      }}</label>
      <div class="flex flex-row gap-4">
        <HexColorInput v-model="customTheme.accent" />
        <input ref="colorInput" v-model="customTheme.accent" type="color" />
      </div>
    </div>

    <div class="flex flex-row items-center justify-between">
      <label for="color-picker">{{
        $t("components.customThemeEditor.optionPrimaryTextColor")
      }}</label>
      <div class="flex flex-row gap-4">
        <HexColorInput v-model="customTheme.text" />
        <input ref="colorInput" v-model="customTheme.text" type="color" />
      </div>
    </div>

    <div class="flex flex-row items-center justify-between">
      <label for="color-picker">{{
        $t("components.customThemeEditor.optionButtonTextColor")
      }}</label>
      <div class="flex flex-row gap-4">
        <HexColorInput v-model="customTheme.textButtons" />
        <input
          ref="colorInput"
          v-model="customTheme.textButtons"
          type="color"
        />
      </div>
    </div>

    <div class="flex flex-row items-center justify-between">
      <label for="color-picker">{{
        $t("components.customThemeEditor.optionPrimaryBackgroundColor")
      }}</label>
      <div class="flex flex-row gap-4">
        <HexColorInput v-model="customTheme.bgPrimary" />
        <input ref="colorInput" v-model="customTheme.bgPrimary" type="color" />
      </div>
    </div>

    <div class="flex flex-row items-center justify-between">
      <label for="color-picker">{{
        $t("components.customThemeEditor.option1stElevationColor")
      }}</label>
      <div class="flex flex-row gap-4">
        <HexColorInput v-model="customTheme.elevation1" />
        <input ref="colorInput" v-model="customTheme.elevation1" type="color" />
      </div>
    </div>

    <div class="flex flex-row items-center justify-between">
      <label for="color-picker">{{
        $t("components.customThemeEditor.option2ndElevationColor")
      }}</label>
      <div class="flex flex-row gap-4">
        <HexColorInput v-model="customTheme.elevation2" />
        <input ref="colorInput" v-model="customTheme.elevation2" type="color" />
      </div>
    </div>

    <div class="flex flex-row items-center justify-between">
      <label for="color-picker">{{
        $t("components.customThemeEditor.option3rdElevationColor")
      }}</label>
      <div class="flex flex-row gap-4">
        <HexColorInput v-model="customTheme.elevation3" />
        <input ref="colorInput" v-model="customTheme.elevation3" type="color" />
      </div>
    </div>

    <div class="flex flex-row items-center justify-end">
      <button
        class="text-buttons transition-button bg-accent rounded-md px-6 py-1"
        @click="setCustomTheme"
      >
        {{ $t("general.saveAction") }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Theme } from "@/types/kanban-types";

import { useTauriStore } from "@/stores/tauriStore";
import { lightenColor } from "@/utils/colorUtils.js";
import emitter from "@/utils/emitter";
import { dark } from "@/utils/themes";

const store = useTauriStore().store;

const customTheme = ref(dark);

onMounted(async () => {
  const savedPalette: Theme | null =
    (await store.get("savedCustomTheme")) || (await store.get("colors"));
  await store.set("colors", savedPalette);
  await store.set("activeTheme", "custom");
  emitter.emit("updateColors");
  customTheme.value = savedPalette || dark;
});

const setCustomTheme = () => {
  if (!customTheme.value) return;

  store.set("activeTheme", "custom");

  const theme = {
    accent: customTheme.value.accent,
    accentDarker: lightenColor(customTheme.value.accent, -40),
    // take values from inputs and generate missing shades
    bgPrimary: customTheme.value.bgPrimary,
    elevation1: customTheme.value.elevation1,
    elevation2: customTheme.value.elevation2,
    elevation3: customTheme.value.elevation3,
    text: customTheme.value.text,
    textButtons: customTheme.value.textButtons,
    textD1: lightenColor(customTheme.value.text, -30),
    textD2: lightenColor(customTheme.value.text, -50),
    textD3: lightenColor(customTheme.value.text, -70),
    textD4: lightenColor(customTheme.value.text, -90),
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

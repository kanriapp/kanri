<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2025 trobonox <hello@trobo.dev> -->
<!-- -->
<!-- SPDX-License-Identifier: GPL-3.0-or-later -->
<!--
Kanri is an offline Kanban board app made using Tauri and Nuxt.
Copyright (C) 2022-2025 trobonox <hello@trobo.dev>

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
  <div class="mb-6 flex w-[48rem] flex-col gap-4">
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
  </div>
</template>

<script setup lang="ts">
import { lightenColor } from "@/utils/colorUtils";
import { dark } from "@/utils/themes";

const theme = useThemeStore();
const customTheme = ref(dark);

onMounted(async () => {
  const savedPalette = theme.savedCustomTheme ?? theme.colors;
  await theme.setTheme("custom", savedPalette);
  customTheme.value = savedPalette || dark;
});

// generate shades for accentDarker and text shades
watch(
  () => customTheme.value,
  (newValue) => {
    const accentDarker = lightenColor(newValue.accent, -20);
    const textDim1 = lightenColor(newValue.text, 20);
    const textDim2 = lightenColor(newValue.text, 40);
    const textDim3 = lightenColor(newValue.text, 60);

    const updatedTheme = {
      ...newValue,
      accentDarker,
      textDim1,
      textDim2,
      textDim3,
    };

    theme.setTheme("custom", updatedTheme);
  },
  { deep: true }
);
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

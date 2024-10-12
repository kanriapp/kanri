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
  <div class="overflow-auto">
    <div
      :style="cssVars"
      :class="[animationsEnabled ? '' : 'disable-animations']"
      class="default-layout custom-scrollbar-hidden overflow-auto"
    >
      <div v-if="mounted">
        <Sidebar class="fixed left-0 w-8" />
      </div>
      <div class="min-h-screen pl-16">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTauriStore } from "@/stores/tauriStore";
import { hslToHex, rgbToHsl } from "@/utils/colorUtils";
import emitter from "@/utils/emitter";
import { dark } from "@/utils/themes";
import versionInfo from "@/version_info.json";

const store = useTauriStore().store;
const savedColors = ref({});
const mounted = ref(false);

const animationsEnabled = ref(true);

onMounted(async () => {
  const currentVersionIdentifier = `${versionInfo.buildMajor}.${versionInfo.buildMinor}.${versionInfo.buildRevision}`;
  const lastInstalledVersionNumber = await store.get("lastInstalledVersion");
  if (
    lastInstalledVersionNumber === null ||
    lastInstalledVersionNumber !== currentVersionIdentifier
  ) {
    emitter.emit("openChangelogModal");
    await store.set("lastInstalledVersion", currentVersionIdentifier);
  }

  const animationsEnabledSaved = await store.get("animationsEnabled");
  if (animationsEnabledSaved !== null) {
    animationsEnabled.value = animationsEnabledSaved;
  } else {
    await store.set("animationsEnabled", true);
  }

  savedColors.value = await store.get("colors");
  mounted.value = true;

  emitter.on("updateColors", async () => {
    nextTick(async () => {
      savedColors.value = await store.get("colors");
    });
    savedColors.value = await store.get("colors");
  });

  emitter.on("setAnimationsOn", () => {
    animationsEnabled.value = true;
  });

  emitter.on("setAnimationsOff", () => {
    animationsEnabled.value = false;
  });
});

onUnmounted(() => {
  emitter.off("updateColors");
  emitter.off("setAnimationsOn");
  emitter.off("setAnimationsOff");
});

const increaseSaturation = (hex) => {
  if (hex == undefined) return;

  const rgb = hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => "#" + r + r + g + g + b + b
    )
    .substring(1)
    .match(/.{2}/g)
    .map((x) => parseInt(x, 16));

  const hslColor = rgbToHsl(...rgb);

  hslColor[0] = Math.round(hslColor[0]);
  hslColor[1] =
    Math.round(hslColor[1]) < 80
      ? Math.round(hslColor[1] + 20)
      : Math.round(hslColor[1]);
  hslColor[2] = Math.round(hslColor[2]);

  return hslToHex(...hslColor);
};

const cssVars = computed(() => {
  if (!savedColors.value) {
    store.set("activeTheme", "dark");
    store.set("colors", dark);

    return {
      "--accent": dark.accent,
      "--accent-darker": dark.accentDarker,
      "--bg-primary": dark.bgPrimary,
      "--elevation-1": dark.elevation1,
      "--elevation-2": dark.elevation2,
      "--elevation-3": dark.elevation3,
      "--logo-accent": increaseSaturation(dark.accent),
      "--text": dark.text,
      "--text-buttons": dark.textButtons,
      "--text-dim-1": dark.textD1,
      "--text-dim-2": dark.textD2,
      "--text-dim-3": dark.textD3,
      "--text-dim-4": dark.textD4,
    };
  } else {
    return {
      "--accent": savedColors.value.accent,
      "--accent-darker": savedColors.value.accentDarker,
      "--bg-primary": savedColors.value.bgPrimary,
      "--elevation-1": savedColors.value.elevation1,
      "--elevation-2": savedColors.value.elevation2,
      "--elevation-3": savedColors.value.elevation3,
      "--logo-accent": increaseSaturation(savedColors.value.accent),
      "--text": savedColors.value.text,
      "--text-buttons": savedColors.value.textButtons,
      "--text-dim-1": savedColors.value.textD1,
      "--text-dim-2": savedColors.value.textD2,
      "--text-dim-3": savedColors.value.textD3,
      "--text-dim-4": savedColors.value.textD4,
    };
  }
});
</script>

<style>
.disable-animations * {
  -webkit-transition: none !important;
  -moz-transition: none !important;
  -o-transition: none !important;
  transition: none !important;
}

.default-layout {
  background-color: var(--bg-primary);
  color: var(--text);
  transition: color 0.5s cubic-bezier(0.17, 0.67, 0.83, 0.67);
  transition: background-color 0.5s cubic-bezier(0.17, 0.67, 0.83, 0.67);
  overscroll-behavior: none;
  -webkit-overflow-scrolling: touch;
}

.bg-primary {
  background-color: var(--bg-primary);
}

.bg-primary-darker {
  background-color: color-mix(in srgb, var(--bg-primary) 100%, black 10%);
}

.fill-bg-primary-darker {
  fill: color-mix(in srgb, var(--bg-primary) 100%, black 10%);
}

.bg-elevation-1 {
  background-color: var(--elevation-1);
}

.bg-elevation-2 {
  background-color: var(--elevation-2);
}

.bg-elevation-2-hover:hover {
  background-color: var(--elevation-2);
}

.bg-elevation-3 {
  background-color: var(--elevation-3);
}

.bg-elevation-3-hover:hover {
  background-color: var(--elevation-3);
}

.bg-elevation-4 {
  background-color: color-mix(in srgb, var(--elevation-3) 95%, white);
}

.bg-button-text {
  background-color: var(--text-buttons);
}

.bg-accent {
  background-color: var(--accent);
}

.bg-accent:hover {
  background-color: var(--accent-darker);
}

.bg-accent-no-hover {
  background-color: var(--accent);
}

.border-b-bg-primary {
  border-bottom-color: var(--bg-primary);
}

.border-elevation-1 {
  border-color: var(--elevation-1);
}

.border-elevation-2 {
  border-color: var(--elevation-2);
}

.border-elevation-3 {
  border-color: var(--elevation-3);
}

.border-elevation-5 {
  border-color: color-mix(in srgb, var(--elevation-3) 85%, white);
}

.border-accent {
  border-color: var(--accent);
}

.border-accent-focus:focus {
  border-color: var(--accent);
}

.text-accent-lighter {
  color: color-mix(in srgb, var(--accent) 70%, white);
}

.text-accent-logo-icon {
  color: var(--logo-accent);
}

.text-accent {
  color: var(--accent);
}

.text-accent-hover:hover {
  color: var(--accent);
}

.text-accent-darker-hover:hover {
  color: var(--accent-darker);
}

.text-normal {
  color: var(--text);
}

.text-dim-1 {
  color: var(--text-dim-1);
}

.text-dim-2 {
  color: var(--text-dim-2);
}

.text-dim-3 {
  color: var(--text-dim-3);
}

.text-dim-3-placeholder::placeholder {
  color: var(--text-dim-3);
}

.text-dim-4 {
  color: var(--text-dim-4);
}

.text-buttons {
  color: var(--text-buttons);
}

.text-no-overflow {
  overflow-wrap: break-word;
  white-space: normal;
  overflow: hidden;
}

.text-no-overflow-task {
  overflow-wrap: anywhere;
  white-space: normal;
  overflow: hidden;
}

.transition-button {
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

.page-enter-active,
.page-leave-active {
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.page-enter-active {
  transition-property: all;
  transition-duration: 700ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.page-enter-from {
  transform: translateY(5rem);
  opacity: 0;
  overflow: hidden;
}
</style>

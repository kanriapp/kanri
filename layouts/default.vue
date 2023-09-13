<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2023 trobonox <hello@trobo.tech> -->
<!-- -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

<template>
  <div class="overflow-auto">
    <div
      class="default-layout custom-scrollbar-hidden overflow-auto"
      :style="cssVars"
    >
      <div v-if="mounted">
        <Sidebar class="fixed left-0 w-8" />
      </div>
      <div class="min-h-screen pl-[4rem]">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import emitter from "@/utils/emitter";
import { useTauriStore } from "@/stores/tauriStore";
import { dark } from "@/utils/themes.js";

const store = useTauriStore().store;
const savedColors = ref({});
const mounted = ref(false);

onMounted(async () => {
    savedColors.value = await store.get("colors");
    mounted.value = true;

    emitter.on("updateColors", async () => {
        nextTick(async () => {
            savedColors.value = await store.get("colors");
        });
        savedColors.value = await store.get("colors");
    });
});

const cssVars = computed(() => {
    if (!savedColors.value) {
        store.set("activeTheme", "dark");
        store.set("colors", dark);

        return {
            "--bg-primary": dark.bgPrimary,
            "--elevation-1": dark.elevation1,
            "--elevation-2": dark.elevation2,
            "--elevation-3": dark.elevation3,
            "--accent": dark.accent,
            "--accent-darker": dark.accentDarker,
            "--text": dark.text,
            "--text-dim-1": dark.textD1,
            "--text-dim-2": dark.textD2,
            "--text-dim-3": dark.textD3,
            "--text-dim-4": dark.textD4,
            "--text-buttons": dark.textButtons,
        };
    } else {
        return {
            "--bg-primary": savedColors.value.bgPrimary,
            "--elevation-1": savedColors.value.elevation1,
            "--elevation-2": savedColors.value.elevation2,
            "--elevation-3": savedColors.value.elevation3,
            "--accent": savedColors.value.accent,
            "--accent-darker": savedColors.value.accentDarker,
            "--text": savedColors.value.text,
            "--text-dim-1": savedColors.value.textD1,
            "--text-dim-2": savedColors.value.textD2,
            "--text-dim-3": savedColors.value.textD3,
            "--text-dim-4": savedColors.value.textD4,
            "--text-buttons": savedColors.value.textButtons,
        };
    }
});
</script>

<style>
.default-layout {
    background-color: var(--bg-primary);
    color: var(--text);
    transition: color 0.5s cubic-bezier(0.17, 0.67, 0.83, 0.67);
    transition: background-color 0.5s cubic-bezier(0.17, 0.67, 0.83, 0.67);
    overscroll-behavior: none;
    -webkit-overflow-scrolling: touch;
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

.bg-accent {
    background-color: var(--accent);
}

.bg-accent:hover {
    background-color: var(--accent-darker);
}

.bg-accent-no-hover {
    background-color: var(--accent);
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

.border-accent {
    border-color: var(--accent);
}

.border-accent-focus:focus {
    border-color: var(--accent);
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
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
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

<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2024 trobonox <hello@trobo.tech> -->
<!-- -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

<template>
    <div
        class="overflow-auto"
        :class="[windowIsMaximized ? 'bg-black' : '']"
    >
        <!-- TODO: add background at the top here when window is maximized next to overflow-auto & add click actions, & remove rounded corners when maximized -->
        <div
            :style="cssVars"
            :class="[animationsEnabled ? '' : 'disable-animations']"
            class="default-layout custom-scrollbar-hidden overflow-auto rounded-xl"
        >
            <div
                data-tauri-drag-region
                class="bg-elevation-1 topbar fixed inset-x-0 top-0 flex h-8 w-full items-center justify-end rounded-t-xl pr-2"
            >
                <button
                    class="bg-elevation-3-hover rounded-md px-2.5 py-1"
                    @click="minimizeWindow"
                >
                    <PhMinus class="size-4" />
                </button>
                <button
                    class="bg-elevation-3-hover rounded-md px-2.5 py-1 "
                    @click="maximizeWindow"
                >
                    <PhCards class="size-4" />
                </button>
                <button
                    class="rounded-md px-2.5 py-1 hover:bg-red-600"
                    @click="closeWindow"
                >
                    <PhX class="size-4" />
                </button>
            </div>
            <div>
                <div v-if="mounted">
                    <Sidebar class="fixed left-0 w-8" />
                </div>
                <div class="min-h-screen pl-[4rem]">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useTauriStore } from "@/stores/tauriStore";
import { hslToHex, rgbToHsl } from "@/utils/colorUtils";
import emitter from "@/utils/emitter";
import { dark } from "@/utils/themes";
import versionInfo from "@/version_info.json"
import { PhCards, PhMinus, PhX } from "@phosphor-icons/vue";
import { appWindow } from '@tauri-apps/api/window'

const store = useTauriStore().store;
const savedColors = ref({});
const mounted = ref(false);

const animationsEnabled = ref(true);
const windowIsMaximized = ref(false);

onMounted(async () => {
    const currentVersionIdentifier = `${versionInfo.buildMajor}.${versionInfo.buildMinor}.${versionInfo.buildRevision}`;
    const lastInstalledVersionNumber = await store.get("lastInstalledVersion");
    if (lastInstalledVersionNumber === null || lastInstalledVersionNumber !== currentVersionIdentifier) {
        emitter.emit("openChangelogModal");
        await store.set("lastInstalledVersion", currentVersionIdentifier);
    }

    const animationsEnabledSaved = await store.get("animationsEnabled");
    if (animationsEnabledSaved !== null) {
        animationsEnabled.value = animationsEnabledSaved;
    }
    else {
        await store.set("animationsEnabled", true);
    }

    savedColors.value = await store.get("colors");
    mounted.value = true;

    const appMaximized = await appWindow.isMaximized();
    windowIsMaximized.value = appMaximized;

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

    appWindow.onResized(async () => {
        const appMaximized = await appWindow.isMaximized();
        console.log(appMaximized);
        windowIsMaximized.value = appMaximized;
    });
});

const increaseSaturation = (hex) =>  {
    if (hex == undefined) return;

    const rgb = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
        ,(m, r, g, b) => '#' + r + r + g + g + b + b)
        .substring(1).match(/.{2}/g)
        .map(x => parseInt(x, 16))

    const hslColor = rgbToHsl(...rgb);

    hslColor[0] = Math.round(hslColor[0]);
    hslColor[1] = Math.round(hslColor[1]) < 80 ? Math.round(hslColor[1] + 20) : Math.round(hslColor[1]);
    hslColor[2] = Math.round(hslColor[2]);

    return hslToHex(...hslColor);
}

const minimizeWindow = () => {
    appWindow.minimize();
}

const maximizeWindow = () => {
    appWindow.maximize();
}

const closeWindow = () => {
    appWindow.close();
}

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
.bg-rounded-corner-square {
    background: linear-gradient(to left top, transparent, var(--bg-primary));
}

.bg-rounded-corner-square2 {
    background: linear-gradient(to right bottom, transparent, var(--elevation-1));
}

.rounded-corner {
    z-index: 9999999 !important;
}

.rounded-corner2 {
    z-index: 999999 !important;
}

.topbar {
    z-index: 9999 !important;
}

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
    border-radius: 0.75rem;
}

.bg-primary {
    background-color: var(--bg-primary);
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

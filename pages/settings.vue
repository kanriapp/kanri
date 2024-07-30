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
    <main
        id="settings"
        class="overflow-auto pl-8 pt-6"
    >
        <ModalConfirmation
            v-show="deleteBoardModalVisible"
            close-button-text="Cancel"
            confirm-button-text="Delete Data"
            description="This action will irreversibly delete all of your boards, custom themes and revert all settings to default. Are you sure?"
            title="Delete ALL Data?"
            @closeModal="deleteBoardModalVisible = false"
            @confirmAction="deleteAllData"
        />

        <h1 class="text-4xl font-bold">
            Settings
        </h1>
        <span class="text-dim-3"> Change the behaviour of the application here. </span>

        <section id="theme-settings">
            <h2 class="mb-2 mt-6 text-2xl font-bold">
                Theme
            </h2>
            <div
                id="theme-selection"
                class="flex flex-row gap-4"
            >
                <div
                    class="bg-elevation-1 bg-elevation-2-hover flex w-36 cursor-pointer flex-col items-center justify-center rounded-md p-2 text-xl font-semibold"
                    @click="setTheme('light')"
                >
                    <SunIcon
                        :class="themeIconClass('light')"
                        class="size-8"
                    />
                    <label
                        class="cursor-pointer"
                        for="light-mode-icon"
                    >Light</label>
                </div>

                <div
                    class="bg-elevation-1 bg-elevation-2-hover flex w-36 cursor-pointer flex-col items-center justify-center rounded-md p-2 text-xl font-semibold"
                    @click="setTheme('dark')"
                >
                    <MoonIcon
                        :class="themeIconClass('dark')"
                        class="size-8"
                    />
                    <label
                        class="cursor-pointer"
                        for="dark-mode-icon"
                    >Dark</label>
                </div>

                <div
                    class="bg-elevation-1 bg-elevation-2-hover flex w-36 cursor-pointer flex-col items-center justify-center rounded-md p-2 text-xl font-semibold"
                    @click="setTheme('catppuccin')"
                >
                    <IconCatppuccin
                        :class="themeIconClass('catppuccin')"
                        class="size-8"
                    />
                    <label
                        class="cursor-pointer"
                        for="catppuccin-mode-icon"
                    >Catppuccin</label>
                </div>

                <div
                    class="bg-elevation-1 bg-elevation-2-hover flex w-36 cursor-pointer flex-col items-center justify-center rounded-md p-2 text-xl font-semibold"
                    @click="setTheme('custom')"
                >
                    <SwatchIcon
                        :class="themeIconClass('custom')"
                        class="size-8"
                    />
                    <label
                        class="cursor-pointer"
                        for="custom-mode-icon"
                    >Custom</label>
                </div>
            </div>

            <div
                v-if="themeEditorDisplayed"
                class="mt-6 text-lg"
            >
                <h3 class="mb-2 font-semibold">
                    Select the colors for your custom theme:
                </h3>
                <CustomThemeEditor />
                <h3 class="font-semibold">
                    Or import/export a custom theme:
                </h3>
                <span class="text-dim-2 text-base">Note: imports override your current theme so export any custom theme which you don't want to lose in advance!</span>
                <div class="my-2 flex flex-row gap-2">
                    <button
                        class="bg-elevation-1 bg-elevation-2-hover border-accent flex cursor-pointer flex-row items-center gap-2 rounded-md border border-dotted px-4 py-1"
                        @click="importThemeFromJson"
                    >
                        <ArrowDownTrayIcon class="size-4" />
                        Import
                    </button>
                    <button
                        class="bg-elevation-1 bg-elevation-2-hover border-accent flex cursor-pointer flex-row items-center gap-2 rounded-md border border-dotted px-4 py-1"
                        @click="exportThemeToJson"
                    >
                        <ArrowUpTrayIcon class="size-4" />
                        Export
                    </button>
                </div>
            </div>

            <button
                class="text-dim-3 transition-button mt-2"
                @click="$router.go(0)"
            >
                If the colors do not update, please click <span class="underline">here</span>.
            </button>
        </section>

        <section id="kanban-settings">
            <h2 class="mt-8 text-2xl font-bold">
                Board Preferences
            </h2>
            <span class="text-dim-3 mb-2">Change the behaviour of your Kanban boards.</span>

            <div class="mt-4 flex w-[48rem] flex-row items-start justify-between">
                <div>
                    <h3 class="text-lg">
                        Zoom
                    </h3>
                    <span class="text-dim-2">
                        Adjust the global zoom level for your boards.
                    </span>
                </div>
                <KanbanZoomAdjustment v-model="columnZoomLevel" />
            </div>

            <div class="mt-4 flex w-[48rem] flex-row items-start justify-between">
                <div>
                    <h3 class="text-lg">
                        Show add to top button
                    </h3>
                    <span class="text-dim-2">
                        Displays a button which allows you to add new cards to the top of a column.
                    </span>
                </div>
                <SwitchRoot
                    v-model:checked="addToTopCheckbox"
                    class="bg-elevation-2 bg-accent-checked relative flex h-[24px] w-[42px] cursor-pointer rounded-full shadow-sm focus-within:outline focus-within:outline-black"
                    @update:checked="toggleAddToTopButton"
                >
                    <SwitchThumb
                        class="bg-button-text my-auto block size-[18px] translate-x-0.5 rounded-full shadow-sm transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]"
                    />
                </SwitchRoot>
            </div>

            <div class="mt-4 flex w-[48rem] flex-row items-start justify-between">
                <div>
                    <h3 class="text-lg">
                        Display number of cards in column
                    </h3>
                    <span class="text-dim-2">
                        Shows how many cards are in each column.
                    </span>
                </div>
                <SwitchRoot
                    v-model:checked="displayCardCountCheckbox"
                    class="bg-elevation-2 bg-accent-checked relative flex h-[24px] w-[42px] cursor-pointer rounded-full shadow-sm focus-within:outline focus-within:outline-black"
                    @update:checked="toggleDisplayCardCount"
                >
                    <SwitchThumb
                        class="bg-button-text my-auto block size-[18px] translate-x-0.5 rounded-full shadow-sm transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]"
                    />
                </SwitchRoot>
            </div>

            <div class="mt-4 flex w-[48rem] flex-col">
                <div class="flex flex-row items-start justify-between">
                    <div>
                        <h3 class="text-lg">
                            Custom storage [EXPERIMENTAL]
                        </h3>
                        <span class="text-dim-2 block max-w-xl">
                            Change the location and the way your boards are stored. <span class="text-red-500">WARNING:</span> Using this option might result in data loss. Please make regular backups!
                        </span>
                    </div>
                    <SwitchRoot
                        v-model:checked="customStorageEnabled"
                        class="bg-elevation-2 bg-accent-checked relative flex h-[24px] w-[42px] cursor-pointer rounded-full shadow-sm focus-within:outline focus-within:outline-black"
                        @update:checked="toggleCustomStorageEnabled"
                    >
                        <SwitchThumb
                            class="bg-button-text my-auto block size-[18px] translate-x-0.5 rounded-full shadow-sm transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]"
                        />
                    </SwitchRoot>
                </div>

                <div v-if="customStorageEnabled" class="mt-4">
                    <h4 class="mb-1 text-xl font-bold">Custom storage settings</h4>
                    <span class="text-dim-1">Storage path:</span>
                    <div class="mt-1.5 flex flex-row items-center gap-2">
                        <input v-model="customStoragePath" placeholder="e.g. C:\Documents\kanri" type="text" class="bg-elevation-1 w-full rounded-md px-4 py-1.5">
                        <button class="bg-elevation-1 border-elevation-2 flex flex-row items-center gap-2 rounded-md border px-4 py-1" @click="selectCustomStoragePath">
                            <FolderOpenIcon class="size-4"/>
                            Select
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <section id="miscellaneous-settings">
            <h2 class="mb-2 mt-8 text-2xl font-bold">
                Miscellaneous
            </h2>

            <div class="flex flex-col gap-4">
                <div class="flex w-[48rem] flex-row items-start justify-between">
                    <div>
                        <h3 class="text-lg">
                            Animations
                        </h3>
                        <span class="text-dim-2">
                            Disable this option to remove all animations in the app.
                        </span>
                    </div>
                    <SwitchRoot
                        v-model:checked="animationsEnabled"
                        class="bg-elevation-2 bg-accent-checked relative flex h-[24px] w-[42px] cursor-pointer rounded-full shadow-sm focus-within:outline focus-within:outline-black"
                        @update:checked="toggleAnimations"
                    >
                        <SwitchThumb
                            class="bg-button-text my-auto block size-[18px] translate-x-0.5 rounded-full shadow-sm transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]"
                        />
                    </SwitchRoot>
                </div>

                <div class="flex w-[48rem] flex-row items-start justify-between">
                    <div>
                        <h3 class="text-lg">
                            Autostart on startup
                        </h3>
                        <span class="text-dim-2">
                            Automatically starts Kanri at startup.
                        </span>
                    </div>
                    <SwitchRoot
                        v-model:checked="autostartCheckbox"
                        class="bg-elevation-2 bg-accent-checked relative flex h-[24px] w-[42px] cursor-pointer rounded-full shadow-sm focus-within:outline focus-within:outline-black"
                        @update:checked="toggleAutostart"
                    >
                        <SwitchThumb
                            class="bg-button-text my-auto block size-[18px] translate-x-0.5 rounded-full shadow-sm transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]"
                        />
                    </SwitchRoot>
                </div>

                <div class="flex w-[48rem] flex-row items-start justify-between">
                    <div class="mb-8 flex w-[48rem] flex-row items-start justify-between">
                        <div>
                            <h3 class="text-lg">
                                Delete all data (themes and boards)
                            </h3>
                            <span class="text-dim-2"><span class="text-red-500">Caution!</span> This will irreversibly
                                delete all of your data!
                            </span>
                        </div>
                        <button
                            class="text-buttons bg-accent transition-button rounded-md px-4 py-2"
                            @click="deleteBoardModalVisible = true"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import type { ThemeIdentifiers } from "@/types/kanban-types";
import type { Ref } from "vue";

import { useTauriStore } from "@/stores/tauriStore";
import { kanriThemeSchema } from "@/types/json-schemas"
import emitter from "@/utils/emitter";
import { catppuccin, dark, light } from "@/utils/themes";
import { ArrowDownTrayIcon, ArrowUpTrayIcon, MoonIcon, SunIcon, SwatchIcon, FolderOpenIcon } from "@heroicons/vue/24/outline";
import { message, open, save } from "@tauri-apps/api/dialog";
import { readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import { disable, enable, isEnabled } from 'tauri-plugin-autostart-api';

const router = useRouter();

const store = useTauriStore().store;

const activeTheme: Ref<null | string> = ref("");
const themeEditorDisplayed = ref(false);

const columnZoomLevel = ref(0);

const autostartCheckbox = ref(false);
const addToTopCheckbox = ref(false);
const animationsEnabled = ref(true);
const displayCardCountCheckbox = ref(false);

const customStorageEnabled = ref(false);
const customStoragePath = ref("");

const deleteBoardModalVisible = ref(false);

onMounted(async () => {
    emitter.emit("showSidebarBackArrow");

    const animationsEnabledSaved: boolean | null = await store.get("animationsEnabled");
    animationsEnabled.value = animationsEnabledSaved || false;

    addToTopCheckbox.value = await store.get("addToTopOfColumnButtonEnabled") || false;
    displayCardCountCheckbox.value = await store.get("displayColumnCardCountEnabled") || false;

    activeTheme.value = await store.get("activeTheme");
    if (activeTheme.value === "custom") themeEditorDisplayed.value = true;

    customStorageEnabled.value = await store.get("customStorageEnabled") || false;
    customStoragePath.value = await store.get("customStoragePath") || "";

    const columnZoom: null | number = await store.get("columnZoomLevel");

    if (columnZoom == null) {
        await store.set("columnZoomLevel", 0);
        columnZoomLevel.value = 0;
    }
    else {
        columnZoomLevel.value = columnZoom;
    }

    const autostartStatus = await isEnabled();
    switch (autostartStatus) {
    case true:
        autostartCheckbox.value = true;
        break;

    case false:
        break;

    default:
        console.error("Error when fetching autostart status:", autostartStatus);
        break;
    }
});

const setTheme = (themeName: ThemeIdentifiers) => {
    activeTheme.value = themeName;
    themeEditorDisplayed.value = false;

    const themes = { catppuccin, dark, light };

    if (themeName === "custom") {
        themeEditorDisplayed.value = true;
        return;
    }

    store.set("activeTheme", themeName);
    store.set("colors", themes[themeName]);
    emitter.emit("updateColors");
};

const themeIconClass = (theme: string) => {
    if (theme === activeTheme.value) return "text-accent";
    else return "";
};

const deleteAllData = async () => {
    if (!deleteBoardModalVisible.value) return;

    await store.reset();

    activeTheme.value = "dark";
    themeEditorDisplayed.value = false;

    router.go(0);

    await message("Successfully deleted data.", { title: "Kanri", type: "info" });
};

const toggleAutostart = async (autostartToggled: boolean) => {
    if (autostartToggled) {
        await enable();
    }
    else {
        await disable();
    }
}

const toggleAddToTopButton = async (addToTopToggled: boolean) => {
    if (addToTopToggled) {
        await store.set("addToTopOfColumnButtonEnabled", true);
    }
    else {
        await store.set("addToTopOfColumnButtonEnabled", false);
    }
}

const toggleAnimations = async (animationsToggled: boolean) => {
    if (animationsToggled) {
        emitter.emit("setAnimationsOn");
        await store.set("animationsEnabled", true);
    }
    else {
        emitter.emit("setAnimationsOff");
        await store.set("animationsEnabled", false);
    }
}

const toggleDisplayCardCount = async (displayCardCountToggled: boolean) => {
    if (displayCardCountToggled) {
        await store.set("displayColumnCardCountEnabled", true);
    }
    else {
        await store.set("displayColumnCardCountEnabled", false);
    }
}

const toggleCustomStorageEnabled = async (customStorageEnabled: boolean) => {
    if (customStorageEnabled) {
        await store.set("customStorageEnabled", true);
    }
    else {
        await store.set("customStorageEnabled", false);
    }
}

const selectCustomStoragePath = async () => {
    const selected = await open({
        directory: true,
        multiple: false
    });

    customStoragePath.value = selected as string;
    await store.set("customStoragePath", customStoragePath.value);

    await store.save(); // this is an important operation so it makes sense to save the store in advance
}

const exportThemeToJson = async () => {
    const filePath = await save({
        defaultPath: "./kanri_theme_export.json",
        filters: [
            {
                extensions: ["json"],
                name: "JSON File",
            },
        ],
        title: "Select file to export data to",
    });

    const colors = await store.get("colors");

    const fileContents = JSON.stringify(
        colors,
        null,
        2
    );

    if (filePath == null) return;
    await writeTextFile(filePath, fileContents);
}

const importThemeFromJson = async () => {
    const selected = await open({
        filters: [{
            extensions: ['json'],
            name: 'JSON File'
        }],
        multiple: false
    });

    if (selected === null) return;

    const textFile = await readTextFile(selected as string);
    if (!textFile) return;

    let parsedJson = null;
    try {
        parsedJson = JSON.parse(textFile);
    }
    catch (error) {
        console.error("Could not parse imported JSON;", error);
        await message('Could not load JSON file! Please check the file is correct.', { title: 'Kanri', type: 'error' });
    }
    if (parsedJson === null) return;

    let zodParsed = null;
    try {
        zodParsed = kanriThemeSchema.parse(parsedJson);
    }
    catch (error) {
        console.error(error);
        await message('Could not load JSON file! Please check the file is formatted correctly and not from an old version of Kanri.', { title: 'Kanri', type: 'error' });
    }
    if (zodParsed === null) return;

    await store.set("colors", zodParsed);
    await store.set("activeTheme", "custom");
    await store.set("savedCustomTheme", zodParsed);
    emitter.emit("updateColors");

    // Manual refresh
    router.go(0);
}
</script>

<style>
.bg-accent-checked[data-state=checked] {
    background-color: var(--accent);
}

.bg-text {
    background-color: var(--text);
}
</style>

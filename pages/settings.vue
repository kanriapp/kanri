<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2023 trobonox <hello@trobo.tech> -->
<!-- -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

<template>
  <main
    id="settings"
    class="overflow-auto pl-8 pt-8"
  >
    <ModalConfirmation
      v-show="deleteBoardModalVisible"
      title="Delete ALL Data?"
      description="This action will irreversibly delete all of your boards, custom themes and revert all settings to default. Are you sure?"
      confirm-button-text="Delete Data"
      close-button-text="Cancel"
      @closeModal="deleteBoardModalVisible = false"
      @confirmAction="deleteAllData"
    />

    <h1 class="text-4xl font-bold">
      Settings
    </h1>
    <span class="text-dim-3"> Change the behaviour of the application here. </span>

    <section id="theme-settings">
      <h2 class="mt-6 mb-2 text-2xl font-bold">
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
            class="h-8 w-8"
            :class="themeIconClass('light')"
          />
          <label
            for="light-mode-icon"
            class="cursor-pointer"
          >Light</label>
        </div>

        <div
          class="bg-elevation-1 bg-elevation-2-hover flex w-36 cursor-pointer flex-col items-center justify-center rounded-md p-2 text-xl font-semibold"
          @click="setTheme('dark')"
        >
          <MoonIcon
            class="h-8 w-8"
            :class="themeIconClass('dark')"
          />
          <label
            for="dark-mode-icon"
            class="cursor-pointer"
          >Dark</label>
        </div>

        <div
          class="bg-elevation-1 bg-elevation-2-hover flex w-36 cursor-pointer flex-col items-center justify-center rounded-md p-2 text-xl font-semibold"
          @click="setTheme('catppuccin')"
        >
          <IconCatppuccin
            class="h-8 w-8"
            :class="themeIconClass('catppuccin')"
          />
          <label
            for="catppuccin-mode-icon"
            class="cursor-pointer"
          >Catppuccin</label>
        </div>

        <div
          class="bg-elevation-1 bg-elevation-2-hover flex w-36 cursor-pointer flex-col items-center justify-center rounded-md p-2 text-xl font-semibold"
          @click="setTheme('custom')"
        >
          <SwatchIcon
            class="h-8 w-8"
            :class="themeIconClass('custom')"
          />
          <label
            for="custom-mode-icon"
            class="cursor-pointer"
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
      </div>

      <button
        class="text-dim-3 transition-button mt-2"
        @click="$router.go(0)"
      >
        If the colors do not update, please click <span class="underline">here</span>.
      </button>
    </section>

    <section id="miscellaneous-settings">
      <h2 class="mt-8 mb-0.5 text-2xl font-bold">
        Import Data
      </h2>
      <p class="text-dim-2 mb-2">
        Import full data or individual boards from Kanri, KanbanElectron or Trello®
      </p>
      <div>
        <h3 class="text-lg font-semibold tracking-tight">
          Full import
        </h3>
        <span class="text-red-500">WARNING: This overrides all of your data with what you import!</span>
        <div class="mt-2 flex flex-row gap-4">
          <button
            class="bg-elevation-1 bg-elevation-2-hover border-accent cursor-pointer rounded-md border border-dotted p-4 font-semibold"
            @click="importFromKanriFull"
          >
            Import from Kanri
          </button>
          <button
            class="bg-elevation-1 bg-elevation-2-hover border-accent cursor-pointer rounded-md border border-dotted p-4 font-semibold"
            @click="importFromKanbanElectronFull"
          >
            Import from KanbanElectron
          </button>
        </div>
        <h3 class="mt-4 text-lg font-semibold tracking-tight">
          Individual board import
        </h3>
        <span class="text-dim-2">Note: you can select multiple boards at once.</span>
        <div class="mt-2 flex flex-row gap-4">
          <button
            class="bg-elevation-1 bg-elevation-2-hover border-accent cursor-pointer rounded-md border border-dotted p-4 font-semibold"
            @click="importFromKanriBoard"
          >
            Import from Kanri
          </button>
          <button
            class="bg-elevation-1 bg-elevation-2-hover border-accent cursor-pointer rounded-md border border-dotted p-4 font-semibold"
            @click="importFromTrelloBoard"
          >
            Import from Trello®
          </button>
        </div>
      </div>
    </section>

    <section id="miscellaneous-settings">
      <h2 class="mt-8 mb-2 text-2xl font-bold">
        Miscellaneous
      </h2>

      <div class="flex flex-col gap-4">
        <div class="flex w-[48rem] flex-row items-start justify-between">
          <div>
            <h3 class="text-lg">
              Autostart on startup
            </h3>
            <span class="text-dim-2">
              Automatically starts Kanri at startup.
            </span>
          </div>
          <input
            v-model="autostartCheckbox"
            type="checkbox"
            class=" h-4 w-4 rounded-md"
            @click="toggleAutostart()"
          >
        </div>

        <div class="flex w-[48rem] flex-row items-start justify-between">
          <div>
            <h3 class="text-lg">
              Export data to JSON
            </h3>
            <span class="text-dim-2">
              Backup all of your data (boards and themes) to a local JSON file.
            </span>
          </div>
          <button
            class="text-buttons bg-accent transition-button rounded-md px-4 py-2"
            @click="exportJSON()"
          >
            Export
          </button>
        </div>

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
    </section>
  </main>
</template>

<script setup lang="ts">
import emitter from "@/utils/emitter";
import { useTauriStore } from "@/stores/tauriStore";
import { light, dark, catppuccin } from "@/utils/themes.js";
import { Column, ThemeIdentifiers } from "@/types/kanban-types";
import { kanriBoardSchema, kanriJsonSchema, kanbanElectronJsonSchema, trelloJsonSchema } from "@/types/json-schemas"

import { message, save, open, ask } from "@tauri-apps/api/dialog";
import { writeTextFile, readTextFile } from "@tauri-apps/api/fs";
import { enable, disable, isEnabled } from 'tauri-plugin-autostart-api';

import { Ref } from "vue";
import { SwatchIcon, MoonIcon, SunIcon } from "@heroicons/vue/24/outline";

const router = useRouter();

const store = useTauriStore().store;

const activeTheme: Ref<string | null> = ref("");
const themeEditorDisplayed = ref(false);

const autostartCheckbox = ref(false);

const deleteBoardModalVisible = ref(false);

onMounted(async () => {
    activeTheme.value = await store.get("activeTheme");
    if (activeTheme.value === "custom") themeEditorDisplayed.value = true;

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

    const themes = { light, dark, catppuccin };

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
    await store.reset();

    activeTheme.value = "dark";
    themeEditorDisplayed.value = false;

    router.go(0);

    await message("Successfully deleted data.", { title: "Kanri", type: "info" });
};

const toggleAutostart = async () => {
    if (autostartCheckbox.value == false) {
        await enable();
    }
    else {
        await disable();
    }
}

const exportJSON = async () => {
    const filePath = await save({
        title: "Select file to export data to",
        defaultPath: "./kanri_data_export.json",
        filters: [
            {
                name: "JSON File",
                extensions: ["json"],
            },
        ],
    });

    const savedBoards = await store.get("boards");
    const activeTheme = await store.get("activeTheme");
    const colors = await store.get("colors");

    const fileContents = JSON.stringify(
        {
            boards: savedBoards,
            activeTheme: activeTheme,
            colors: colors,
        },
        null,
        2
    );

    if (filePath == null) return;
    await writeTextFile(filePath, fileContents);
};

const importFromKanriFull = async () => {
    const selected = await open({
        multiple: false,
        filters: [{
            name: 'JSON File',
            extensions: ['json']
        }]
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
        zodParsed = kanriJsonSchema.parse(parsedJson);
    }
    catch (error) {
        console.error(error);
        //@ts-ignore
        if (error.issues[0].code === "invalid_type" && error.issues[0].path[0] === "boards" && error.issues[0].received === "null") {
            return await message('Cannot load files with no boards. Please import a file with at least one board.', { title: 'Kanri', type: 'error' });
        }

        await message('Could not load JSON file! Please check the file is formatted correctly and not from an old version of Kanri.', { title: 'Kanri', type: 'error' });
    }
    if (zodParsed === null) return;

    store.set("boards", zodParsed.boards);
    store.set("colors", zodParsed.colors);
    store.set("activeTheme", zodParsed.activeTheme);
    if (zodParsed.columnZoomLevel) {
        store.set("columnZoomLevel", zodParsed.columnZoomLevel);
    }

    // Manual refresh
    router.go(0);
}

const importFromKanbanElectronFull = async () => {
    const selected = await open({
        multiple: false,
        filters: [{
            name: 'JSON File',
            extensions: ['json']
        }]
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
        zodParsed = kanbanElectronJsonSchema.parse(parsedJson);
    }
    catch (error) {
        console.error(error);
        //@ts-ignore
        if (error.issues[0].code === "invalid_type" && error.issues[0].path[0] === "boards" && error.issues[0].received === "null") {
            return await message('Cannot load files with no boards. Please import a file with at least one board.', { title: 'Kanri', type: 'error' });
        }

        await message('Could not load JSON file! Please check the file is formatted correctly and exported from the lastest version of KanbanElectron.', { title: 'Kanri', type: 'error' });
    }
    if (zodParsed === null) return;

    const convertedBoards: Array<any> = []
    zodParsed.boards.forEach(board => {
        convertedBoards.push({
            id: board.id,
            title: board.title,
            columns: board.lists
        });
    });

    store.set("boards", convertedBoards);
    store.set("colors", zodParsed.colors);
    store.set("activeTheme", zodParsed.activeTheme);
    if (zodParsed.columnZoomLevel) {
        store.set("columnZoomLevel", zodParsed.columnZoomLevel);
    }

    // Manual refresh
    router.go(0);
}

const importFromKanriBoard = async () => {
    const selected = await open({
        multiple: true,
        filters: [{
            name: 'JSON File',
            extensions: ['json']
        }]
    });

    if (selected === null) return;

    const convertedBoards: Array<any> = await store.get("boards") || [];
    if (typeof selected === "string") {
        const result = await kanriParse(selected);

        if (result === undefined) return;

        const checkForDuplicates = convertedBoards.filter((board) => {
            return board.id === result.id;
        });

        if (checkForDuplicates.length !== 0) {
            const confirmation = await ask(`The board ${result.title} already exists. Do you want to override it with the version you are about to import?`, { title: 'Kanri', type: 'error' });
            if (!confirmation) {
                return;
            }
            else {
                const boardOverrideIndex = convertedBoards.indexOf(checkForDuplicates);
                convertedBoards[boardOverrideIndex] = result;
            }
        }

        convertedBoards.push(result);
    }
    else {
        for (let i = 0; i < selected.length; i++) {
            const result = await kanriParse(selected[i]);

            if (result === undefined) return;

            const checkForDuplicates = convertedBoards.filter((board) => {
                return board.id === result.id;
            });

            if (checkForDuplicates.length !== 0) {
                const confirmation = await ask(`The board ${result.title} already exists. Do you want to override it with the version you are about to import?`, { title: 'Kanri', type: 'error' });

                if (!confirmation) {
                    return;
                }
                else {
                    const boardOverrideIndex = convertedBoards.indexOf(checkForDuplicates);
                    convertedBoards[boardOverrideIndex] = result;
                }
            }

            convertedBoards.push(result);
        }
    }

    if (convertedBoards.length === 0) return;

    await store.set("boards", convertedBoards);

    // Manual refresh
    router.go(0);
}

const kanriParse = async (board: string) => {
    const textFile = await readTextFile(board);
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
        zodParsed = kanriBoardSchema.parse(parsedJson);
    }
    catch (error) {
        console.error(error);
        //@ts-ignore
        if (error.issues[0].code === "invalid_type" && error.issues[0].path[0] === "boards" && error.issues[0].received === "null") {
            return await message('Cannot load files with no boards. Please import a file with at least one board.', { title: 'Kanri', type: 'error' });
        }

        await message('Could not load JSON file! Please check the file is formatted correctly and not from an old version of Kanri.', { title: 'Kanri', type: 'error' });
    }
    if (zodParsed === null) return;

    return zodParsed;
}

const importFromTrelloBoard = async () => {
    const selected = await open({
        multiple: true,
        filters: [{
            name: 'JSON File',
            extensions: ['json']
        }]
    });

    if (selected === null || selected.length === 0) return;

    const convertedBoards: Array<any> = await store.get("boards") || [];
    if (typeof selected === "string") {
        const result = await trelloParse(selected);

        if (result === undefined) return;

        convertedBoards.push(result);
    }
    else {
        for (let i = 0; i < selected.length; i++) {
            const result = await trelloParse(selected[i]);

            if (result === undefined) return;

            convertedBoards.push(result);
        }
    }

    if (convertedBoards.length === 0) return;

    await store.set("boards", convertedBoards);

    // Manual refresh
    router.go(0);
}

const trelloParse = async (board: string) => {
    const textFile = await readTextFile(board);
    if (!textFile) return;

    let parsedJson = null;
    try {
        parsedJson = JSON.parse(textFile);
    }
    catch (error) {
        console.error("Could not parse imported JSON;", error);
        await message('Could not load JSON file! Please check the file is correct.', { title: 'Kanri', type: 'error' });
        return undefined;
    }
    if (parsedJson === null) return undefined;

    let zodParsed = null;
    try {
        zodParsed = trelloJsonSchema.parse(parsedJson);
    }
    catch (error) {
        console.error(error);
        //@ts-ignore
        if (error.issues[0].code === "invalid_type" && error.issues[0].path[0] === "boards" && error.issues[0].received === "null") {
            await message('Cannot load files with no boards. Please import a file with at least one board.', { title: 'Kanri', type: 'error' });
            return undefined;
        }

        await message('Could not load JSON file! Please check the file is formatted correctly.', { title: 'Kanri', type: 'error' });
        return undefined;
    }
    if (zodParsed === null) return undefined;

    const columns: Column[] = []
    zodParsed.lists.forEach((column) => {
        if (column.closed === false) {
            columns.push({
                id: column.id,
                title: column.name,
                cards: []
            });
        }
    });

    zodParsed.cards.forEach((card) => {
        const selectedCol = columns.filter((column) => {
            return column.id === card.idList
        });

        if (selectedCol.length > 1 || selectedCol.length === 0) return undefined;

        const kanriCard = {
            id: card.id,
            name: card.name,
            description: card.desc
        }

        selectedCol[0].cards.push(kanriCard);
    });

    const kanriBoard = {
        id: generateUniqueID(),
        title: zodParsed.name,
        lastEdited: new Date().toISOString(),
        columns: columns
    }

    let kanriConvertedParsed = null;
    try {
        kanriConvertedParsed = kanriBoardSchema.parse(kanriBoard);
    }
    catch (error) {
        console.error(error);
        await message('Could not convert your Trello board. Please try again and report this bug to the developer if it happens again.', { title: 'Kanri', type: 'error' });
        return undefined;
    }
    if (kanriConvertedParsed === null) return undefined;

    return kanriConvertedParsed;
}


</script>

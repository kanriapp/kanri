<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2024 trobonox <hello@trobo.tech> -->
<!-- -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

<template>
  <main
    id="settings"
    class="overflow-auto pl-8 pt-8"
  >
    <h1 class="text-4xl font-bold">
      Import & Export
    </h1>
    <span class="text-dim-3"> Manage your data by exporting and importing it from and to Kanri. </span>

    <TabsRoot
      class="mt-4 flex w-2/3 flex-col"
      default-value="tab1"
    >
      <TabsList
        class="border-elevation-2 relative flex shrink-0 border-b"
        aria-label="Manage your account"
      >
        <TabsIndicator class="absolute bottom-0 left-0 h-[2px] w-[--radix-tabs-indicator-size] translate-x-[--radix-tabs-indicator-position] rounded-full px-8 transition-[width,transform] duration-300">
          <div class="bg-accent h-full w-full" />
        </TabsIndicator>
        <TabsTrigger
          class="tab-active-text flex h-[45px] flex-1 cursor-pointer select-none items-center justify-center rounded-tl-md text-[15px] leading-none outline-none"
          value="tab1"
        >
          Import
        </TabsTrigger>
        <TabsTrigger
          class="tab-active-text flex h-[45px] flex-1 cursor-pointer select-none items-center justify-center rounded-tr-md text-[15px] leading-none outline-none"
          value="tab2"
        >
          Export
        </TabsTrigger>
      </TabsList>
      <TabsContent
        class="grow rounded-b-md pt-8 outline-none"
        value="tab1"
      >
        <div>
          <h2 class="mb-0.5 text-2xl font-bold">
            Import Data
          </h2>
          <p class="text-dim-2 mb-2">
            Import full data or individual boards from Kanri, KanbanElectron or Trello®
          </p>
          <h3 class="mt-4 text-lg font-semibold tracking-tight">
            Partial import (individual board)
          </h3>
          <span class="text-dim-2">One file equals one board to import. Note: you can select multiple files/boards to import at once.</span>
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
          <h3 class="mt-4 text-lg font-semibold tracking-tight">
            Full import
          </h3>
          <span class="text-red-500">Imports complete data from one file. WARNING: This overrides all of your data with what you import!</span>
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
        </div>
      </TabsContent>
      <TabsContent
        class="grow rounded-b-md pt-8 outline-none"
        value="tab2"
      >
        <div class="flex flex-col gap-4">
          <h2 class="mb-2 text-2xl font-bold">
            Export Data
          </h2>
          <div>
            <h3 class="text-lg font-semibold tracking-tight">
              Partial Export
            </h3>
            <p class="text-dim-1">
              A partial export means that you receive one .json file for one individual board.
            </p>
            <p>To generate an individual export, use the three dot menu inside a board.</p>
          </div>
          <div>
            <h3 class="text-lg font-semibold tracking-tight">
              Full Export
            </h3>
            <p class="text-dim-1">
              Exports all of your data (boards, themes, other preferences like zoom) into one full .json file
            </p>
            <button
              class="bg-elevation-1 bg-elevation-2-hover border-accent mt-4 cursor-pointer rounded-md border border-dotted p-2 px-8 font-semibold"
              @click="exportJSON()"
            >
              Export all data
            </button>
          </div>
        </div>
      </TabsContent>
    </TabsRoot>
  </main>
</template>

<script setup lang="ts">
import type { Column } from "@/types/kanban-types";

import { useTauriStore } from "@/stores/tauriStore";
import { kanbanElectronJsonSchema, kanriBoardSchema, kanriJsonSchema, trelloJsonSchema } from "@/types/json-schemas"
import emitter from "@/utils/emitter";
import { ask, message, open, save } from "@tauri-apps/api/dialog";
import { readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import { z } from "zod";

const router = useRouter();

const store = useTauriStore().store;

onMounted(() => {
    emitter.emit("showSidebarBackArrow");
});

const exportJSON = async () => {
    const filePath = await save({
        defaultPath: "./kanri_data_export.json",
        filters: [
            {
                extensions: ["json"],
                name: "JSON File",
            },
        ],
        title: "Select file to export data to",
    });

    const savedBoards = await store.get("boards");
    const boardSortingOption = await store.get("boardSortingOption");
    const activeTheme = await store.get("activeTheme");
    const colors = await store.get("colors");
    const savedCustomTheme = await store.get("savedCustomTheme");
    const columnZoomLevel = await store.get("columnZoomLevel");
    const lastInstalledVersion = await store.get("lastInstalledVersion");


    const fileContents = JSON.stringify(
        {
            activeTheme: activeTheme,
            boardSortingOption: boardSortingOption,
            boards: savedBoards,
            colors: colors,
            columnZoomLevel: columnZoomLevel,
            lastInstalledVersion: lastInstalledVersion,
            savedCustomTheme: savedCustomTheme
        },
        null,
        2
    );

    if (filePath == null) return;
    await writeTextFile(filePath, fileContents);
};

const importFromKanriFull = async () => {
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
    if (zodParsed.boardSortingOption) {
        store.set("boardSortingOption", zodParsed.boardSortingOption);
    }
    if (zodParsed.savedCustomTheme) {
        store.set("savedCustomTheme", zodParsed.savedCustomTheme);
    }
    if (zodParsed.lastInstalledVersion) {
        store.set("lastInstalledVersion", zodParsed.lastInstalledVersion);
    }

    // Manual refresh
    router.go(0);

    // TODO: Add toast indicating success
}

const importFromKanbanElectronFull = async () => {
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
            columns: board.lists,
            id: board.id,
            title: board.title
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

    // TODO: Add toast indicating success
}

const importFromKanriBoard = async () => {
    const selected = await open({
        filters: [{
            extensions: ['json'],
            name: 'JSON File'
        }],
        multiple: true
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
            const confirmation = await ask(`The board ${result.title} already exists (board with the same ID). Do you want to import as a duplicate?`, { title: 'Kanri', type: 'info' });
            if (!confirmation) {
                return;
            }
            else {
                result.id = generateUniqueID();
                while (convertedBoards.some(board => board.id === result.id)) {
                    result.id = generateUniqueID();
                }
                result.title = result.title + " (duplicate)";
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
                const confirmation = await ask(`The board ${result.title} already exists (board with the same ID). Do you want to import as a duplicate?`, { title: 'Kanri', type: 'info' });

                if (!confirmation) {
                    return;
                }
                else {
                    result.id = generateUniqueID();
                    while (convertedBoards.some(board => board.id === result.id)) {
                        result.id = generateUniqueID();
                    }
                    result.title = result.title + " (duplicate)";
                }
            }

            convertedBoards.push(result);
        }
    }

    if (convertedBoards.length === 0) return;

    await store.set("boards", convertedBoards);

    // TODO: Add toast indicating success
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
        filters: [{
            extensions: ['json'],
            name: 'JSON File'
        }],
        multiple: true
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

    // TODO: Add toast indicating success
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

    let zodParsed: null | z.infer<typeof trelloJsonSchema> = null;
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
                cards: [],
                id: column.id,
                title: column.name
            });
        }
    });

    zodParsed.cards.forEach((card) => {
        const selectedCol = columns.filter((column) => {
            return column.id === card.idList
        });

        if (selectedCol.length > 1 || selectedCol.length === 0) return undefined;

        const tasks: { finished: boolean; name: string; }[] = [];

        if (card.idChecklists.length > 0) {
            card.idChecklists.forEach((checklistId) => {
                const checklist = zodParsed?.checklists.filter((checklist) => checklist.id === checklistId)[0];

                if (checklist) {
                    checklist.checkItems.forEach((checkItem) => {
                        tasks.push({
                            finished: checkItem.state === "complete" ? true : false,
                            name: checkItem.name
                        })
                    })
                }
            })
        }

        const kanriCard = {
            description: card.desc,
            id: card.id,
            name: card.name,
            tasks: tasks
        }

        selectedCol[0].cards.push(kanriCard);
    });

    const kanriBoard = {
        columns: columns,
        id: generateUniqueID(),
        lastEdited: new Date().toISOString(),
        title: zodParsed.name
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

<style>
.tab-active-text[data-state=active] {
    color: var(--accent);
}
</style>

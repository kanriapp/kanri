<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2024 trobonox <hello@trobo.dev>, gitoak -->
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
  <main id="settings" class="overflow-auto pl-8 pt-6">
    <h1 class="text-4xl font-bold">
      {{ $t("pages.import.importExportHeading") }}
    </h1>
    <span class="text-dim-3">{{ $t("pages.import.importExportSubtext") }}</span>

    <TabsRoot class="mt-4 flex w-1/2 flex-col" default-value="tab1">
      <TabsList
        class="bg-elevation-1 relative flex shrink-0 rounded-md"
        aria-label="Manage your account"
      >
        <TabsIndicator
          class="bg-elevation-2 absolute bottom-0 left-0 h-full w-[--radix-tabs-indicator-size] translate-x-[--radix-tabs-indicator-position] rounded-md transition-[width,transform] duration-300"
        />
        <TabsTrigger
          class="tab-active-text z-10 flex h-[45px] flex-1 cursor-pointer select-none items-center justify-center rounded-md px-2 text-[16px] leading-none outline-none transition-colors duration-300"
          value="tab1"
        >
          {{ $t("general.importAction") }}
        </TabsTrigger>
        <TabsTrigger
          class="tab-active-text z-10 flex h-[45px] flex-1 cursor-pointer select-none items-center justify-center rounded-md px-2 text-[16px] leading-none outline-none transition-colors duration-300"
          value="tab2"
        >
          {{ $t("general.exportAction") }}
        </TabsTrigger>
      </TabsList>
      <TabsContent class="grow rounded-b-md pt-8 outline-none" value="tab1">
        <div>
          <h2 class="mb-0.5 text-2xl font-bold">
            {{ $t("pages.import.importTabHeading") }}
          </h2>
          <p class="text-dim-2 mb-2">
            {{ $t("pages.import.importTabSubtext") }}
          </p>
          <h3 class="mt-4 text-lg font-semibold tracking-tight">
            {{ $t("pages.import.importTabPartialHeading") }}
          </h3>
          <span class="text-dim-2">{{
            $t("pages.import.importTabPartialSubtext")
          }}</span>
          <div class="mt-2 flex flex-row gap-4">
            <button
              class="bg-elevation-1 bg-elevation-2-hover border-accent cursor-pointer rounded-md border border-dotted p-4 font-semibold"
              @click="importFromKanriBoard"
            >
              {{ $t("pages.import.importOptionKanri") }}
            </button>
            <button
              class="bg-elevation-1 bg-elevation-2-hover border-accent cursor-pointer rounded-md border border-dotted p-4 font-semibold"
              @click="importFromTrelloBoard"
            >
              {{ $t("pages.import.importOptionTrello") }}
            </button>
            <button
              class="bg-elevation-1 bg-elevation-2-hover border-accent cursor-pointer rounded-md border border-dotted p-4 font-semibold"
              @click="importFromGithubProject"
            >
              {{ $t("pages.import.importOptionGithub") }}
            </button>
          </div>
          <h3 class="mt-4 text-lg font-semibold tracking-tight">
            {{ $t("pages.import.importTabFullHeading") }}
          </h3>
          <span class="text-red-500">{{
            $t("pages.import.importTabFullSubtext")
          }}</span>
          <div class="mt-2 flex flex-row gap-4">
            <button
              class="bg-elevation-1 bg-elevation-2-hover border-accent cursor-pointer rounded-md border border-dotted p-4 font-semibold"
              @click="importFromKanriFull"
            >
              {{ $t("pages.import.importOptionKanri") }}
            </button>
            <button
              class="bg-elevation-1 bg-elevation-2-hover border-accent cursor-pointer rounded-md border border-dotted p-4 font-semibold"
              @click="importFromKanbanElectronFull"
            >
              {{ $t("pages.import.importOptionKanbanElectron") }}
            </button>
          </div>
        </div>
      </TabsContent>
      <TabsContent class="grow rounded-b-md pt-8 outline-none" value="tab2">
        <div class="flex flex-col gap-4">
          <h2 class="mb-2 text-2xl font-bold">
            {{ $t("pages.import.exportTabHeading") }}
          </h2>
          <div>
            <h3 class="text-lg font-semibold tracking-tight">
              {{ $t("pages.import.exportTabPartialHeading") }}
            </h3>
            <p class="text-dim-1">
              {{ $t("pages.import.exportTabPartialSubtext") }}
            </p>
            <DropdownMenuRoot>
              <DropdownMenuTrigger
                class="bg-elevation-1 bg-elevation-2-hover border-accent mt-4 cursor-pointer rounded-md border border-dotted p-2 px-8 font-semibold"
              >
                {{ $t("pages.import.exportTabPartialSelectButton") }}
              </DropdownMenuTrigger>
              <DropdownMenuPortal to=".default-layout">
                <DropdownMenuContent
                  align="start"
                  :side-offset="5"
                  class="bg-elevation-1 border-elevation-2 w-96 rounded-md border p-2"
                >
                  <DropdownMenuLabel class="text-dim-3 mb-1 px-2 text-sm">
                    {{ $t("pages.import.exportTabPartialSelectPrompt") }}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    v-for="board in boards"
                    :key="board.id"
                    class="bg-elevation-3-hover cursor-pointer rounded-md px-2 py-0.5"
                    @select="exportSingleBoard(board.id)"
                  >
                    {{ board.title }}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenuPortal>
            </DropdownMenuRoot>
          </div>
          <div>
            <h3 class="text-lg font-semibold tracking-tight">
              {{ $t("pages.import.exportTabFullHeading") }}
            </h3>
            <p class="text-dim-1">
              {{ $t("pages.import.exportTabFullSubtext") }}
            </p>
            <button
              class="bg-elevation-1 bg-elevation-2-hover border-accent mt-4 cursor-pointer rounded-md border border-dotted p-2 px-8 font-semibold"
              @click="exportJSON()"
            >
              {{ $t("pages.import.exportTabFullButton") }}
            </button>
          </div>
        </div>
      </TabsContent>
    </TabsRoot>
  </main>
</template>

<script setup lang="ts">
import type { Board, Column, Tag, Card } from "@/types/kanban-types";

import { useTauriStore } from "@/stores/tauriStore";
import {
  kanbanElectronJsonSchema,
  kanriBoardSchema,
  kanriJsonSchema,
  trelloJsonSchema,
} from "@/types/json-schemas";
import emitter from "@/utils/emitter";
import { ask, message, open, save } from "@tauri-apps/api/dialog";
import { readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import { useI18n } from "vue-i18n";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ZodError, z } from "zod";

const router = useRouter();

const store = useTauriStore().store;

const { t } = useI18n();

const boards: Ref<Board[]> = ref([]);

onMounted(async () => {
  emitter.emit("showSidebarBackArrow");
  boards.value = ((await store.get("boards")) as Board[]) || [];
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
    title: t("pages.import.exportFullJsonDialogTitle"),
  });

  const savedBoards = await store.get("boards");
  const boardSortingOption = await store.get("boardSortingOption");
  const reverseSorting = await store.get("reverseSorting");
  const activeTheme = await store.get("activeTheme");
  const colors = await store.get("colors");
  const savedCustomTheme = await store.get("savedCustomTheme");
  const columnZoomLevel = await store.get("columnZoomLevel");
  const lastInstalledVersion = await store.get("lastInstalledVersion");
  const animationsEnabled = await store.get("animationsEnabled");
  const addToTopOfColumnButtonEnabled = await store.get(
    "addToTopOfColumnButtonEnabled"
  );
  const displayColumnCardCountEnabled = await store.get(
    "displayColumnCardCountEnabled"
  );

  const fileContents = JSON.stringify(
    {
      activeTheme,
      boardSortingOption,
      boards: savedBoards,
      colors,
      columnZoomLevel,
      lastInstalledVersion,
      savedCustomTheme,
      reverseSorting,
      animationsEnabled,
      addToTopOfColumnButtonEnabled,
      displayColumnCardCountEnabled,
    },
    null,
    2
  );

  if (filePath == null) return;
  await writeTextFile(filePath, fileContents);

  await message(t("pages.import.exportFullJsonSuccessMessage"), {
    type: "info",
  });
};

const exportSingleBoard = async (boardId: string) => {
  const filePath = await save({
    defaultPath: `./kanri_board_export_${boardId}.json`,
    filters: [
      {
        extensions: ["json"],
        name: "JSON File",
      },
    ],
    title: t("pages.import.exportPartialJsonDialogTitle"),
  });

  if (filePath == null) return;

  const boardToExport = boards.value.find((board) => board.id === boardId);

  if (!boardToExport) {
    await message(t("pages.import.exportPartialJsonErrorBoardNotFound"), {
      type: "error",
    });
    return;
  }

  const fileContents = JSON.stringify(boardToExport, null, 2);

  await writeTextFile(filePath, fileContents);

  await message(t("pages.import.exportPartialJsonSuccessMessage"), {
    type: "info",
  });
};

const importFromKanriFull = async () => {
  const selected = await open({
    filters: [
      {
        extensions: ["json"],
        name: "JSON File",
      },
    ],
    multiple: false,
  });

  if (selected === null) return;

  const textFile = await readTextFile(selected as string);
  if (!textFile) return;

  let parsedJson = null;
  try {
    parsedJson = JSON.parse(textFile);
  } catch (error) {
    console.error("Could not parse imported JSON;", error);
    await message(t("pages.import.importErrorBadJson"), {
      title: "Kanri",
      type: "error",
    });
  }
  if (parsedJson === null) return;

  let zodParsed = null;
  try {
    zodParsed = kanriJsonSchema.parse(parsedJson);
  } catch (error) {
    console.error(error);
    //@ts-expect-error we do not know what type of error we will receive
    if (
      error.issues[0].code === "invalid_type" &&
      error.issues[0].path[0] === "boards" &&
      error.issues[0].received === "null"
    ) {
      return await message(t("pages.import.importErrorNoBoards"), {
        title: "Kanri",
        type: "error",
      });
    }

    await message(t("pages.import.importErrorGoodJsonFaultyData"), {
      title: "Kanri",
      type: "error",
    });
  }
  if (zodParsed === null) return;

  store.set("boards", zodParsed.boards);
  store.set("colors", zodParsed.colors);
  store.set("activeTheme", zodParsed.activeTheme);
  store.set("columnZoomLevel", zodParsed.columnZoomLevel);
  store.set("boardSortingOption", zodParsed.boardSortingOption);
  store.set("savedCustomTheme", zodParsed.savedCustomTheme);
  store.set("lastInstalledVersion", zodParsed.lastInstalledVersion);
  store.set("animationsEnabled", zodParsed.animationsEnabled);
  store.set("reverseSorting", zodParsed.reverseSorting);
  store.set(
    "addToTopOfColumnButtonEnabled",
    zodParsed.addToTopOfColumnButtonEnabled
  );
  store.set(
    "displayColumnCardCountEnabled",
    zodParsed.displayColumnCardCountEnabled
  );

  await message(t("pages.import.importSuccessFull"), { type: "info" });

  // Manual refresh
  router.go(0);
};

const importFromKanbanElectronFull = async () => {
  const selected = await open({
    filters: [
      {
        extensions: ["json"],
        name: "JSON File",
      },
    ],
    multiple: false,
  });

  if (selected === null) return;

  const textFile = await readTextFile(selected as string);
  if (!textFile) return;

  let parsedJson = null;
  try {
    parsedJson = JSON.parse(textFile);
  } catch (error) {
    console.error("Could not parse imported JSON;", error);
    await message(t("pages.import.importErrorBadJson"), {
      title: "Kanri",
      type: "error",
    });
  }
  if (parsedJson === null) return;

  let zodParsed = null;
  try {
    zodParsed = kanbanElectronJsonSchema.parse(parsedJson);
  } catch (error) {
    if (!(error instanceof ZodError)) {
      console.error(String(error));
      return;
    }

    if (
      error.issues[0].code === "invalid_type" &&
      error.issues[0].path[0] === "boards" &&
      error.issues[0].received === "null"
    ) {
      return await message(t("pages.import.importErrorNoBoards"), {
        title: "Kanri",
        type: "error",
      });
    }

    await message(t("pages.import.importErrorKanbanElectron"), {
      title: "Kanri",
      type: "error",
    });
  }
  if (zodParsed === null) return;

  const convertedBoards: Array<Board> = [];
  zodParsed.boards.forEach((board) => {
    convertedBoards.push({
      columns: board.lists,
      id: board.id,
      title: board.title,
    });
  });

  store.set("boards", convertedBoards);
  store.set("colors", zodParsed.colors);
  store.set("activeTheme", zodParsed.activeTheme);
  if (zodParsed.columnZoomLevel) {
    store.set("columnZoomLevel", zodParsed.columnZoomLevel);
  }

  await message(t("pages.import.importSuccessPartial"), { type: "info" });

  // Manual refresh
  router.go(0);
};

const importFromKanriBoard = async () => {
  const selected = await open({
    filters: [
      {
        extensions: ["json"],
        name: "JSON File",
      },
    ],
    multiple: true,
  });

  if (selected === null) return;

  const convertedBoards: Array<Board> = (await store.get("boards")) || [];
  if (typeof selected === "string") {
    const result = await kanriParse(selected);

    if (result === undefined) return;

    const checkForDuplicates = convertedBoards.filter((board) => {
      return board.id === result.id;
    });

    if (checkForDuplicates.length !== 0) {
      const confirmation = await ask(
        t("pages.import.importDuplicateBoard", { boardName: result.title }),
        { title: "Kanri", type: "info" }
      );
      if (!confirmation) {
        return;
      } else {
        result.id = generateUniqueID();
        while (convertedBoards.some((board) => board.id === result.id)) {
          result.id = generateUniqueID();
        }
        result.title = result.title + t("pages.import.duplicateSuffix");
      }
    }

    convertedBoards.push(result);
  } else {
    for (let i = 0; i < selected.length; i++) {
      const result = await kanriParse(selected[i]);

      if (result === undefined) return;

      const checkForDuplicates = convertedBoards.filter((board) => {
        return board.id === result.id;
      });

      if (checkForDuplicates.length !== 0) {
        const confirmation = await ask(
          t("pages.import.importDuplicateBoard", { boardName: result.title }),
          { title: "Kanri", type: "info" }
        );

        if (!confirmation) {
          return;
        } else {
          result.id = generateUniqueID();
          while (convertedBoards.some((board) => board.id === result.id)) {
            result.id = generateUniqueID();
          }
          result.title = result.title + t("pages.import.duplicateSuffix");
        }
      }

      convertedBoards.push(result);
    }
  }

  if (convertedBoards.length === 0) return;

  await store.set("boards", convertedBoards);

  await message(t("pages.import.importSuccessPartial"), { type: "info" });
};

const kanriParse = async (board: string) => {
  const textFile = await readTextFile(board);
  if (!textFile) return;

  let parsedJson = null;
  try {
    parsedJson = JSON.parse(textFile);
  } catch (error) {
    console.error("Could not parse imported JSON;", error);
    await message(t("pages.import.importErrorBadJson"), {
      title: "Kanri",
      type: "error",
    });
  }
  if (parsedJson === null) return;

  let zodParsed = null;
  try {
    zodParsed = kanriBoardSchema.parse(parsedJson);
  } catch (error) {
    if (!(error instanceof ZodError)) {
      console.error(String(error));
      return;
    }

    console.error(error);
    if (
      error.issues[0].code === "invalid_type" &&
      error.issues[0].path[0] === "boards" &&
      error.issues[0].received === "null"
    ) {
      return await message(t("pages.import.importErrorNoBoards"), {
        title: "Kanri",
        type: "error",
      });
    }

    await message(t("pages.import.importErrorGoodJsonFaultyData"), {
      title: "Kanri",
      type: "error",
    });
  }
  if (zodParsed === null) return;

  return zodParsed;
};

const importFromTrelloBoard = async () => {
  const selected = await open({
    filters: [
      {
        extensions: ["json"],
        name: "JSON File",
      },
    ],
    multiple: true,
  });

  if (selected === null || selected.length === 0) return;

  const convertedBoards: Array<Board> = (await store.get("boards")) || [];
  if (typeof selected === "string") {
    const result = await trelloParse(selected);

    if (result === undefined) return;

    convertedBoards.push(result);
  } else {
    for (let i = 0; i < selected.length; i++) {
      const result = await trelloParse(selected[i]);

      if (result === undefined) return;

      convertedBoards.push(result);
    }
  }

  if (convertedBoards.length === 0) return;

  await store.set("boards", convertedBoards);

  await message(t("pages.import.importSuccessPartial"), { type: "info" });

  // Manual refresh
  router.go(0);
};

const trelloParse = async (board: string) => {
  const textFile = await readTextFile(board);
  if (!textFile) return;

  let parsedJson = null;
  try {
    parsedJson = JSON.parse(textFile);
  } catch (error) {
    console.error("Could not parse imported JSON;", error);
    await message(t("pages.import.importErrorBadJson"), {
      title: "Kanri",
      type: "error",
    });
    return undefined;
  }
  if (parsedJson === null) return undefined;

  let zodParsed: null | z.infer<typeof trelloJsonSchema> = null;
  try {
    zodParsed = trelloJsonSchema.parse(parsedJson);
  } catch (error) {
    if (!(error instanceof ZodError)) {
      console.error(String(error));
      return;
    }

    console.error(error);
    if (
      error.issues[0].code === "invalid_type" &&
      error.issues[0].path[0] === "boards" &&
      error.issues[0].received === "null"
    ) {
      await message(t("pages.import.importErrorNoBoards"), {
        title: "Kanri",
        type: "error",
      });
      return undefined;
    }

    await message(t("pages.import.importErrorTrello"), {
      title: "Kanri",
      type: "error",
    });
    return undefined;
  }
  if (zodParsed === null) return undefined;

  const columns: Column[] = [];
  zodParsed.lists.forEach((column) => {
    if (column.closed === false) {
      columns.push({
        cards: [],
        id: column.id,
        title: column.name,
      });
    }
  });

  zodParsed.cards.forEach((card) => {
    const selectedCol = columns.filter((column) => {
      return column.id === card.idList;
    });

    if (selectedCol.length > 1 || selectedCol.length === 0) return undefined;

    const tasks: { finished: boolean; name: string }[] = [];

    if (card.idChecklists.length > 0) {
      card.idChecklists.forEach((checklistId) => {
        const checklist = zodParsed?.checklists.filter(
          (checklist) => checklist.id === checklistId
        )[0];

        if (checklist) {
          checklist.checkItems.forEach((checkItem) => {
            tasks.push({
              finished: checkItem.state === "complete" ? true : false,
              name: checkItem.name,
            });
          });
        }
      });
    }

    const tags: Array<Tag> = [];
    if (card.labels.length > 0) {
      card.labels.forEach((label) => {
        tags.push({
          id: label.id,
          text: label.name,
          color: cssColorStringToHex(label.color),
          style: `background-color: ${cssColorStringToHex(label.color)}`,
        });
      });
    }

    const kanriCard = {
      description: card.desc,
      id: card.id,
      name: card.name,
      tasks: tasks,
      tags: tags,
      dueDate: card.due,
    };

    selectedCol[0].cards.push(kanriCard);
  });

  const globalTags: Board["globalTags"] = [];
  zodParsed.labels.forEach((label) => {
    if (label.name.length === 0) return;

    globalTags.push({
      id: label.id,
      text: label.name,
      color: cssColorStringToHex(label.color),
      style: `background-color: ${cssColorStringToHex(label.color)}`,
    });
  });

  const kanriBoard = {
    globalTags: globalTags,
    columns: columns,
    id: generateUniqueID(),
    lastEdited: new Date().toISOString(),
    title: zodParsed.name,
  };

  let kanriConvertedParsed = null;
  try {
    kanriConvertedParsed = kanriBoardSchema.parse(kanriBoard);
  } catch (error) {
    console.error(error);
    await message(t("pages.import.importErrorTrelloConversion"), {
      title: "Kanri",
      type: "error",
    });
    return undefined;
  }
  if (kanriConvertedParsed === null) return undefined;

  return kanriConvertedParsed;
};

const importFromGithubProject = async () => {
  const selected = await open({
    filters: [
      {
        extensions: ["tsv"],
        name: "TSV File",
      },
    ],
    multiple: true,
  });

  const convertedBoards: Array<Board> = (await store.get("boards")) || [];

  if (selected === null) return;

  const selectedFiles = Array.isArray(selected) ? selected : [selected];

  for (const file of selectedFiles) {
    const textFile = await readTextFile(file);
    if (!textFile) continue;

    const lines = textFile.split("\n");
    if (lines[0] !== "Title	URL	Assignees	Status	Labels") {
      await message(
        t("pages.import.importErrorGithub", {
          file,
          email: "support@kanriapp.com",
        }),
        { type: "error" }
      );
      console.error(`Invalid GH Projects board file: ${file}`);
      continue;
    }

    const board: Board = {
      id: generateUniqueID(),
      title: (file.split(/[\/\\]/).pop() || file).replace(/\.tsv$/, ""),
      columns: [],
      globalTags: [],
      lastEdited: new Date(),
    };

    // Skip the header row
    for (let i = 1; i < lines.length; i++) {
      const [title, url, , status, labels] = lines[i].split("\t");

      if (!title.trim()) continue;

      let column = board.columns.find((col) => col.title === status);
      if (!column) {
        column = {
          id: generateUniqueID(),
          title: status,
          cards: [],
        };
        board.columns.push(column);
      }

      const cardTags: Array<Tag> = [];
      if (labels) {
        const labelArray = labels.split(",");
        for (const label of labelArray) {
          const trimmedLabel = label.trim();

          if (!board.globalTags) board.globalTags = [];
          let tag = board.globalTags.find((t) => t.text === trimmedLabel);

          if (!tag) {
            tag = {
              id: generateUniqueID(),
              text: trimmedLabel,
            };
            board.globalTags.push(tag);
          }
          cardTags.push(tag);
        }
      }

      const card: Card = {
        id: generateUniqueID(),
        name: title.trim(),
        description: url ? url.trim() : "",
        tags: cardTags,
      };

      column.cards.push(card);
    }

    convertedBoards.push(board);
  }

  await store.set("boards", convertedBoards);
  await message(t("pages.import.importSuccessGithub"), { type: "info" });
};
</script>

<style>
.tab-active-text[data-state="active"] {
  color: color-mix(in srgb, var(--accent) 80%, white);
}
</style>

<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>, gitoak -->
<!-- -->
<!-- SPDX-License-Identifier: GPL-3.0-or-later -->
<!--
Kanri is an offline Kanban board app made using Tauri and Nuxt.
Copyright (C) 2022-2026 trobonox <hello@trobo.dev>

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

    <TabsRoot class="mt-4 flex w-full max-w-3xl flex-col" default-value="tab1">
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
          <div class="border-elevation-3 border-t pt-4">
            <h3 class="text-lg font-semibold tracking-tight">
              AI / Obsidian export
            </h3>
            <p class="text-dim-1">
              Creates a timestamped folder with Markdown, manifest, JSON data, and copied attachments.
            </p>
            <button
              class="bg-elevation-1 bg-elevation-2-hover border-accent mt-4 cursor-pointer rounded-md border border-dotted p-2 px-8 font-semibold disabled:cursor-not-allowed disabled:opacity-60"
              :disabled="aiExportRunning"
              @click="exportAiArchive"
            >
              Export AI archive
            </button>
            <button
              class="text-dim-2 bg-elevation-2-hover ml-3 rounded-md px-3 py-2 text-sm"
              @click="aiExportDetailsOpen = !aiExportDetailsOpen"
            >
              {{ aiExportDetailsOpen ? "Hide details" : "Show details" }}
            </button>
            <div
              v-if="aiExportDetailsOpen"
              class="text-dim-2 mt-3 text-sm leading-6"
            >
              <p>Output includes ai_context.md, manifest.json, kanri-data.json, per-board/card/task Markdown, and attachments/** files.</p>
              <p>Markdown links are relative, rich text keeps both Markdown and original HTML, and skipped attachments are recorded in the manifest.</p>
            </div>
            <div
              v-if="aiExportResultPath"
              class="mt-3 flex flex-wrap items-center gap-2 text-sm"
            >
              <span class="text-dim-2 text-no-overflow max-w-full">{{ aiExportResultPath }}</span>
              <button class="bg-elevation-2-hover rounded-md px-3 py-1" @click="openAiExportFolder">
                Open folder
              </button>
              <button class="bg-elevation-2-hover rounded-md px-3 py-1" @click="copyAiExportPath">
                Copy path
              </button>
            </div>
          </div>
        </div>
      </TabsContent>
    </TabsRoot>
    <div
      v-if="aiExportRunning && aiExportProgress"
      class="fixed inset-0 z-[99999] flex items-center justify-center bg-black/40"
    >
      <div class="bg-elevation-1 border-elevation-3 w-[min(92vw,32rem)] rounded-md border p-5 shadow-xl">
        <h2 class="text-xl font-bold">Exporting AI archive</h2>
        <p class="text-dim-2 mt-1 text-sm">{{ aiExportProgress.stage }}</p>
        <p class="text-dim-1 mt-2 min-h-5 text-sm">{{ aiExportProgress.currentItem }}</p>
        <div class="bg-elevation-3 mt-4 h-2 overflow-hidden rounded-sm">
          <div
            class="bg-accent h-full transition-[width] duration-200"
            :style="{ width: aiExportPercent + '%' }"
          />
        </div>
        <div class="text-dim-2 mt-2 flex justify-between text-xs">
          <span>{{ aiExportProgress.completed }} / {{ aiExportProgress.total }}</span>
          <span>{{ aiExportProgress.errors }} errors/skipped</span>
        </div>
        <div class="mt-5 flex justify-end">
          <button
            class="bg-elevation-2-hover rounded-md px-4 py-2"
            @click="aiExportCancelRequested = true"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { Board, Column, Tag, Card } from "@/types/kanban-types";
import type { AiExportProgress, MissingAssetAction } from "@/utils/aiExport";

import { useTauriStore } from "@/stores/tauriStore";
import {
  kanbanElectronJsonSchema,
  kanriBoardSchema,
  kanriJsonSchema,
  trelloJsonSchema,
} from "@/types/json-schemas";
import { ask, message, open, save } from "@tauri-apps/plugin-dialog";
import { readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";
import { openPath } from "@tauri-apps/plugin-opener";
import { useI18n } from "vue-i18n";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ZodError, z } from "zod";
import { AiExportCancelled, exportKanriAiArchive } from "@/utils/aiExport";
import { KANRI_SCHEMA_VERSION } from "@/stores/boards";

const router = useRouter();

const store = useTauriStore().store;
const globalSettingsStore = useSettingsStore();
const theme = useThemeStore();

const { t } = useI18n();

const boards: Ref<Board[]> = ref([]);
const aiExportCancelRequested = ref(false);
const aiExportDetailsOpen = ref(false);
const aiExportProgress = ref<AiExportProgress | null>(null);
const aiExportResultPath = ref("");
const aiExportRunning = ref(false);

const aiExportPercent = computed(() => {
  if (!aiExportProgress.value || aiExportProgress.value.total === 0) return 0;
  return Math.min(100, Math.round((aiExportProgress.value.completed / aiExportProgress.value.total) * 100));
});

onMounted(async () => {
  boards.value = ((await store.get("boards")) as Board[]) || [];
});

const getFullExportData = async () => {
  const savedBoards = ((await store.get("boards")) as Board[]) || [];
  const boardSortingOption = await store.get("boardSortingOption");
  const pins = await store.get("pins");
  const reverseSorting = await store.get("reverseSorting");
  const activeTheme = await store.get("activeTheme");
  const colors = await store.get("colors");
  const savedCustomTheme = await store.get("savedCustomTheme");
  const columnZoomLevel = await store.get("columnZoomLevel");
  const lastInstalledVersion = await store.get("lastInstalledVersion");
  const animationsEnabled = await store.get("animationsEnabled");
  const defaultRelativeDueDatesEnabled = await store.get(
    "defaultRelativeDueDatesEnabled"
  );
  const addToTopOfColumnButtonEnabled = await store.get(
    "addToTopOfColumnButtonEnabled"
  );
  const displayColumnCardCountEnabled = await store.get(
    "displayColumnCardCountEnabled"
  );

  return {
    activeTheme,
    addToTopOfColumnButtonEnabled,
    animationsEnabled,
    boardSortingOption,
    boards: savedBoards,
    colors,
    columnZoomLevel,
    defaultRelativeDueDatesEnabled,
    displayColumnCardCountEnabled,
    lastInstalledVersion,
    pins,
    reverseSorting,
    savedCustomTheme,
    schemaVersion: KANRI_SCHEMA_VERSION,
  };
};

const exportAiArchive = async () => {
  if (aiExportRunning.value) return;

  const selected = await open({
    directory: true,
    multiple: false,
    title: "Select folder for AI export",
  });
  if (selected === null || Array.isArray(selected)) return;

  aiExportCancelRequested.value = false;
  aiExportProgress.value = {
    completed: 0,
    currentItem: "Preparing export",
    errors: 0,
    stage: "Preparing",
    total: 1,
  };
  aiExportResultPath.value = "";
  aiExportRunning.value = true;

  try {
    const exportData = await getFullExportData();
    const result = await exportKanriAiArchive(selected, exportData, {
      isCancelled: () => aiExportCancelRequested.value,
      onMissingAsset: async (asset): Promise<MissingAssetAction> => {
        const retry = await ask(
          `Attachment "${asset.name}" is missing or unreadable. Retry now?`,
          { kind: "warning", title: "Kanri AI export" }
        );
        if (retry) return "retry";

        const skip = await ask(
          `Skip "${asset.name}" and record it in manifest.json? Choosing No cancels the export.`,
          { kind: "warning", title: "Kanri AI export" }
        );
        return skip ? "skip" : "cancel";
      },
      onProgress: (progress) => {
        aiExportProgress.value = progress;
      },
    });
    aiExportResultPath.value = result.exportDir;
    await message(`AI export created:\n${result.exportDir}`, { kind: "info" });
  } catch (error) {
    if (error instanceof AiExportCancelled) {
      await message("AI export cancelled. Incomplete export folder was removed.", {
        kind: "info",
      });
    } else {
      console.error(error);
      await message(`AI export failed: ${String(error)}`, { kind: "error" });
    }
  } finally {
    aiExportRunning.value = false;
  }
};

const openAiExportFolder = async () => {
  if (!aiExportResultPath.value) return;
  await openPath(aiExportResultPath.value);
};

const copyAiExportPath = async () => {
  if (!aiExportResultPath.value) return;
  await navigator.clipboard.writeText(aiExportResultPath.value);
};

const exportJSON = async () => {
  const filePath = await save({
    defaultPath: `./${new Date().toISOString().slice(0, 10)}_kanri_data_export.json`,
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
  const pins = await store.get("pins");
  const reverseSorting = await store.get("reverseSorting");
  const activeTheme = await store.get("activeTheme");
  const colors = await store.get("colors");
  const savedCustomTheme = await store.get("savedCustomTheme");
  const columnZoomLevel = await store.get("columnZoomLevel");
  const lastInstalledVersion = await store.get("lastInstalledVersion");
  const animationsEnabled = await store.get("animationsEnabled");
  const defaultRelativeDueDatesEnabled = await store.get(
    "defaultRelativeDueDatesEnabled"
  );
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
      schemaVersion: KANRI_SCHEMA_VERSION,
      pins,
      colors,
      columnZoomLevel,
      lastInstalledVersion,
      savedCustomTheme,
      reverseSorting,
      animationsEnabled,
      defaultRelativeDueDatesEnabled,
      addToTopOfColumnButtonEnabled,
      displayColumnCardCountEnabled,
    },
    null,
    2
  );

  if (filePath == null) return;
  await writeTextFile(filePath, fileContents);

  await message(t("pages.import.exportFullJsonSuccessMessage"), {
    kind: "info",
  });
};

const exportSingleBoard = async (boardId: string) => {
  const filePath = await save({
    defaultPath: `./${new Date().toISOString().slice(0, 10)}_kanri_board_export_${boardId}.json`,
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
      kind: "error",
    });
    return;
  }

  const fileContents = JSON.stringify(boardToExport, null, 2);

  await writeTextFile(filePath, fileContents);

  await message(t("pages.import.exportPartialJsonSuccessMessage"), {
    kind: "info",
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
      kind: "error",
    });
  }
  if (parsedJson === null) return;

  let zodParsed = null;
  try {
    zodParsed = kanriJsonSchema.parse(parsedJson);
  } catch (error) {
    console.error(error);
    if (
      //@ts-expect-error we do not know what type of error we will receive
      error.issues[0].code === "invalid_type" &&
      //@ts-expect-error we do not know what type of error we will receive
      error.issues[0].path[0] === "boards" &&
      //@ts-expect-error we do not know what type of error we will receive
      error.issues[0].received === "null"
    ) {
      return await message(t("pages.import.importErrorNoBoards"), {
        title: "Kanri",
        kind: "error",
      });
    }

    await message(t("pages.import.importErrorGoodJsonFaultyData"), {
      title: "Kanri",
      kind: "error",
    });
  }
  if (zodParsed === null) return;

  store.set("boards", zodParsed.boards);
  store.set("pins", zodParsed.pins);
  store.set("colors", zodParsed.colors);
  store.set("activeTheme", zodParsed.activeTheme);
  store.set("columnZoomLevel", zodParsed.columnZoomLevel);
  store.set("boardSortingOption", zodParsed.boardSortingOption);
  store.set("savedCustomTheme", zodParsed.savedCustomTheme);
  store.set("lastInstalledVersion", zodParsed.lastInstalledVersion);
  store.set("animationsEnabled", zodParsed.animationsEnabled);
  if (zodParsed.defaultRelativeDueDatesEnabled !== undefined) {
    store.set(
      "defaultRelativeDueDatesEnabled",
      zodParsed.defaultRelativeDueDatesEnabled
    );
  }
  store.set("reverseSorting", zodParsed.reverseSorting);
  store.set(
    "addToTopOfColumnButtonEnabled",
    zodParsed.addToTopOfColumnButtonEnabled
  );
  store.set(
    "displayColumnCardCountEnabled",
    zodParsed.displayColumnCardCountEnabled
  );

  globalSettingsStore.loadSettings();
  theme.loadThemeSettings();

  await message(t("pages.import.importSuccessFull"), { kind: "info" });

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
      kind: "error",
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
        kind: "error",
      });
    }

    await message(t("pages.import.importErrorKanbanElectron"), {
      title: "Kanri",
      kind: "error",
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

  globalSettingsStore.loadSettings();

  await message(t("pages.import.importSuccessPartial"), { kind: "info" });

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
        { title: "Kanri", kind: "info" }
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
          { title: "Kanri", kind: "info" }
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

  await message(t("pages.import.importSuccessPartial"), { kind: "info" });
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
      kind: "error",
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
        kind: "error",
      });
    }

    await message(t("pages.import.importErrorGoodJsonFaultyData"), {
      title: "Kanri",
      kind: "error",
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

  await message(t("pages.import.importSuccessPartial"), { kind: "info" });

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
      kind: "error",
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
        kind: "error",
      });
      return undefined;
    }

    await message(t("pages.import.importErrorTrello"), {
      title: "Kanri",
      kind: "error",
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
      kind: "error",
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
        { kind: "error" }
      );
      console.error(`Invalid GH Projects board file: ${file}`);
      continue;
    }

    const board: Board = {
      id: generateUniqueID(),
      title: (file.split(/[/\\]/).pop() || file).replace(/\.tsv$/, ""),
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
  await message(t("pages.import.importSuccessGithub"), { kind: "info" });
};
</script>

<style>
.tab-active-text[data-state="active"] {
  color: color-mix(in srgb, var(--accent) 80%, white);
}
</style>

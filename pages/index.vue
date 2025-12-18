<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2025 trobonox <hello@trobo.dev>, gitoak, PwshLab -->
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
  <div class="overflow-auto pl-8 pt-5">
    <ModalRenameBoard
      v-show="renameBoardModalVisible"
      @closeModal="renameBoardModalVisible = false"
      @renameBoard="renameBoard"
    />

    <ModalConfirmation
      v-show="deleteBoardModalVisible"
      :close-button-text="$t('general.cancelAction')"
      :confirm-button-text="$t('general.deleteAction')"
      :description="
        $t('pages.index.deleteActionConfirmationText', {
          boardName: boards[boardToBeDeletedIndex]?.title,
        })
      "
      :title="$t('pages.index.deleteActionConfirmationHeading')"
      @closeModal="
        deleteBoardModalVisible = false;
        boardToBeDeletedIndex = -1;
      "
      @confirmAction="deleteBoard"
    />

    <ModalChangelog
      v-show="changelogModalVisible"
      @closeModal="changelogModalVisible = false"
    />

    <h1 class="mb-4 text-3xl font-bold">
      {{ $t("pages.index.welcome") }}
    </h1>

    <section id="board-search-and-sort" class="mt-2">
      <div class="flex max-h-12 w-full flex-row gap-3 pr-2">
        <!-- Search input -->
        <div
          class="border-elevation-2 bg-elevation-1 supports-[backdrop-filter]:bg-elevation-1/50 focus-within:ring-accent/70 relative w-full rounded-xl border shadow-sm backdrop-blur focus-within:ring-2"
        >
          <div
            class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4"
          >
            <MagnifyingGlassIcon class="text-dim-3 size-5" />
          </div>
          <input
            v-model="searchQuery"
            :placeholder="searchPlaceholder"
            class="placeholder:text-dim-3 w-full rounded-xl bg-transparent px-12 py-2 text-lg outline-none"
            type="text"
            aria-label="Search boards"
          />
          <button
            v-if="searchQuery"
            class="text-dim-2 hover:bg-elevation-2-hover absolute inset-y-0 right-0 mr-2 flex items-center rounded-md p-2"
            aria-label="Clear search"
            @click="searchQuery = ''"
          >
            <XMarkIcon class="size-5" />
          </button>
        </div>

        <!-- Sorting toolbar -->
        <div
          v-if="!(boards.length === 0 && loading === false)"
          class="flex min-w-64 flex-wrap items-center justify-between gap-2"
        >
          <div class="flex max-h-12 items-center gap-2">
            <div
              class="bg-elevation-1 bg-elevation-2-hover transition-button hide-popper-arrow max-h-12 w-fit rounded-md hover:cursor-pointer"
            >
              <Dropdown>
                <template #trigger>
                  <button
                    class="flex max-h-12 min-w-48 flex-row items-center gap-2 whitespace-nowrap px-6 py-4 md:min-w-56"
                  >
                    <PhFunnel class="size-6 shrink-0" />
                    <span
                      class="flex-1 overflow-hidden text-ellipsis text-left"
                      >{{ sortingOptionText }}</span
                    >
                    <ChevronDownIcon class="size-4 shrink-0" />
                  </button>
                </template>

                <template #content>
                  <DropdownMenuRadioGroup
                    v-model="sortingOptionRef"
                    class="flex flex-col"
                  >
                    <DropdownMenuRadioItem
                      value="alphabetically"
                      class="bg-elevation-2-hover flex w-full cursor-pointer flex-row items-center rounded-md px-4 py-1.5 pl-[25px]"
                      @click="sortBoardsAlphabetically()"
                    >
                      <DropdownMenuItemIndicator
                        class="absolute left-2 w-[25px]"
                      >
                        <CheckIcon class="size-4" />
                      </DropdownMenuItemIndicator>
                      {{ $t("pages.index.sortAlphabetically") }}
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      value="default"
                      class="bg-elevation-2-hover flex w-full cursor-pointer flex-row items-center rounded-md px-4 py-1.5 pl-[25px] text-left"
                      @click="sortBoardsByCreationDate()"
                    >
                      <DropdownMenuItemIndicator
                        class="absolute left-2 w-[25px]"
                      >
                        <CheckIcon class="size-4" />
                      </DropdownMenuItemIndicator>
                      {{ $t("pages.index.sortByCreationDate") }}
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      value="edited"
                      class="bg-elevation-2-hover flex w-full cursor-pointer flex-row items-center rounded-md px-4 py-1.5 pl-[25px] text-left"
                      @click="sortBoardsByEditDate()"
                    >
                      <DropdownMenuItemIndicator
                        class="absolute left-2 w-[25px]"
                      >
                        <CheckIcon class="size-4" />
                      </DropdownMenuItemIndicator>
                      {{ $t("pages.index.sortByLastEdited") }}
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                  <DropdownMenuSeparator class="bg-elevation-2 m-[5px] h-px" />
                  <DropdownMenuCheckboxItem
                    v-model:checked="reverseSortOrder"
                    class="bg-elevation-2-hover flex w-full cursor-pointer flex-row items-center rounded-md px-4 py-1.5 pl-[25px] text-left"
                    @click="reverseCurrentSorting"
                  >
                    <DropdownMenuItemIndicator class="absolute left-2 w-[25px]">
                      <CheckIcon class="size-4" />
                    </DropdownMenuItemIndicator>
                    {{ $t("pages.index.reversedSortOrder") }}
                  </DropdownMenuCheckboxItem>
                </template>
              </Dropdown>
            </div>
          </div>
        </div>

        <p v-if="editSortWarning" class="ml-1 mt-1 text-sm text-amber-400/90">
          {{ $t("pages.index.editSortWarning") }}
        </p>
      </div>
    </section>

    <main id="boards">
      <div
        v-if="boards.length === 0 && loading === false"
        class="items-left mt-2 flex w-fit flex-col justify-center rounded-md p-2"
      >
        <h3 class="text-xl font-bold">
          {{ $t("pages.index.noBoardsHeading") }}
        </h3>
        <span>{{ $t("pages.index.createBoardPrompt") }}</span>
        <IconArrow />

        <h3 class="mb-0.5 mt-8 text-xl font-bold">
          {{ $t("pages.index.importDataHeading") }}
        </h3>
        <p class="mb-4">
          {{ $t("pages.index.importDataPrompt") }}
        </p>
        <nuxt-link
          class="bg-elevation-1 bg-elevation-2-hover border-accent cursor-pointer rounded-md border border-dotted p-4 text-center font-semibold"
          to="/import"
        >
          {{ $t("pages.index.importDataButton") }}
        </nuxt-link>

        <div class="flex w-full flex-col items-start">
          <h3 class="mb-4 mt-10 text-xl font-bold">
            {{ $t("pages.index.getUpdatesHeading") }}
          </h3>
          <a
            href="https://discord.gg/AVqHrvxB9C"
            target="_blank"
            class="bg-accent cursor-pointer rounded-md px-6 py-2 text-center font-semibold transition-colors"
            >{{ $t("pages.index.joinDiscordButton") }}</a
          >
        </div>
      </div>

      <div v-else class="mb-8 mt-6 flex flex-row flex-wrap gap-6">
        <!-- No results for current search -->
        <div
          v-if="!loading && searchQuery && visibleBoards.length === 0"
          class="items-left text-dim-2 mt-2 flex w-fit flex-col justify-center rounded-md p-2"
        >
          <h3 class="text-xl font-semibold">{{ noResultsText }}</h3>
        </div>

        <TransitionGroup
          v-if="!loading && visibleBoards.length > 0"
          class="flex flex-row flex-wrap gap-6"
          name="list"
          tag="div"
        >
          <nuxt-link
            v-for="(board, index) in visibleBoards"
            id="board-preview"
            :key="board.id"
            :to="'/kanban/' + board.id"
            class="bg-board-preview border-elevation-1 flex flex-col rounded-md border-2 shadow-xl transition-transform hover:-translate-y-1"
          >
            <LazyKanbanBoardPreview
              :board="board"
              :is-simple-preview-mode="visibleBoards.length >= 25"
            />
            <div
              class="border-accent flex flex-row justify-between border-t px-1 py-2"
            >
              <span
                class="text-no-overflow w-fit max-w-[180px] px-1 text-lg font-semibold"
              >
                {{ board.title }}
              </span>
              <Dropdown align="end" :side-offset="-10">
                <template #trigger>
                  <button
                    class="bg-elevation-3-hover transition-button rounded-md px-1 py-0.5"
                    @click.prevent
                  >
                    <EllipsisHorizontalIcon class="size-6" />
                  </button>
                </template>

                <template #content>
                  <div class="flex flex-col">
                    <!-- Group 1: Board actions -->
                    <DropdownMenuItem
                      class="bg-elevation-2-hover flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-1.5 pr-6 text-left"
                      @click="renameBoardModal(getBoardIndex(board.id))"
                    >
                      <span class="text-dim-2"
                        ><PhPencil class="size-5"
                      /></span>
                      <span>{{ $t("pages.kanban.renameBoardAction") }}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      class="bg-elevation-2-hover flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-1.5 pr-6 text-left"
                      @click="duplicateBoard(getBoardIndex(board.id))"
                    >
                      <span class="text-dim-2"><PhCopy class="size-5" /></span>
                      <span>{{ $t("pages.kanban.duplicateBoardAction") }}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      class="bg-elevation-2-hover flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-1.5 pr-6 text-left"
                      @click="exportBoardToJson(getBoardIndex(board.id))"
                    >
                      <span class="text-dim-2"
                        ><PhExport class="size-5"
                      /></span>
                      <span>{{ $t("pages.kanban.exportBoardAction") }}</span>
                    </DropdownMenuItem>
                    <div class="border-elevation-3 my-1 border-t"></div>
                    <!-- Group 3: Danger zone -->
                    <DropdownMenuItem
                      class="bg-elevation-2-hover flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-1.5 pr-6 text-left text-red-500"
                      @click="deleteBoardModal(getBoardIndex(board.id))"
                    >
                      <span>
                        <PhTrash class="size-5" />
                      </span>
                      <span>{{ $t("pages.kanban.deleteBoardAction") }}</span>
                    </DropdownMenuItem>
                  </div>
                </template>
              </Dropdown>
            </div>
          </nuxt-link>
        </TransitionGroup>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { Board, Column } from "@/types/kanban-types";
import type { Ref } from "vue";

import { useTauriStore } from "@/stores/tauriStore";
import emitter from "@/utils/emitter";
import { generateUniqueID } from "@/utils/idGenerator.js";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import { CheckIcon, EllipsisHorizontalIcon } from "@heroicons/vue/24/solid";
import {
  PhFunnel,
  PhTrash,
  PhExport,
  PhCopy,
  PhPencil,
} from "@phosphor-icons/vue";
import { useI18n } from "vue-i18n";
import { save } from "@tauri-apps/plugin-dialog";
import { writeTextFile } from "@tauri-apps/plugin-fs";

const store = useTauriStore().store;
const layoutSettings = useLayoutStore();
const boards: Ref<Array<Board>> = ref([]);

const loading = ref(true);
const editSortWarning = ref(false);
const renameBoardModalVisible = ref(false);
const deleteBoardModalVisible = ref(false);
const changelogModalVisible = ref(false);

const sortingOptionRef = ref("");
const reverseSortOrder = ref(false);
const sortingOptionText = ref("Sort by creation date");

// Search state
const searchQuery = ref("");

const boardToBeDeletedIndex = ref(-1);
const { t } = useI18n();

// i18n fallbacks for new UI text
const searchPlaceholder = computed(() => {
  const key = "pages.index.searchBoardsPlaceholder";
  const result = t(key) as string;
  return result === key ? "Search boards..." : result;
});
const noResultsText = computed(() => {
  const key = "pages.index.noBoardsMatch";
  const result = t(key) as string;
  return result === key ? "No boards match your search." : result;
});

// Filtered boards based on search, preserving current sort order
const visibleBoards = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return boards.value;
  return boards.value.filter((b) => b.title.toLowerCase().includes(q));
});

onMounted(async () => {
  emitter.on("createBoard", async ({ columns, title }) => {
    await createNewBoard(title, columns);
  });

  nextTick(async () => {
    console.log("Checking if changelog needs to be shown...");
    const showChangelog = await layoutSettings.shouldDisplayChangelog();
    if (showChangelog) {
      changelogModalVisible.value = true;
    }
  });

  emitter.emit("hideSidebarBackArrow");

  boards.value = (await store.get("boards")) || [];

  await setSorting();

  loading.value = false;
});

onBeforeUnmount(() => {
  // Make sure we properly remove our event listeners
  emitter.off("openChangelogModal");
});

const setSorting = async () => {
  const sortingOption = await store.get("boardSortingOption");
  if (sortingOption == null) {
    await store.set("boardSortingOption", "default");
  }

  let savedSortPreference = await store.get("reverseSorting");
  if (savedSortPreference == null) {
    savedSortPreference = "false";
  }
  savedSortPreference = Boolean(savedSortPreference as string).valueOf();

  sortingOptionRef.value = (sortingOption as string) || "default";
  reverseSortOrder.value = savedSortPreference as boolean;

  switch (sortingOption) {
    case "alphabetically":
      sortBoardsAlphabetically();
      break;

    case "edited":
      sortBoardsByEditDate();
      break;

    default:
      if (reverseSortOrder.value) {
        boards.value.reverse();
      }
      break;
  }
};

const reverseCurrentSorting = async () => {
  let savedSortPreference = await store.get("reverseSorting");
  if (savedSortPreference == null) {
    savedSortPreference = "false";
  }
  savedSortPreference = Boolean(savedSortPreference as string).valueOf();

  reverseSortOrder.value = !savedSortPreference;
  await store.set("reverseSorting", !savedSortPreference);

  boards.value.reverse();
};

const createNewBoard = async (title: string, columns?: Column[]) => {
  const exampleColumns = [
    {
      cards: [
        {
          description: "",
          name: "Eat something tasty",
        },
        {
          description: "This is an extended description for an example task",
          name: "Do some important task",
        },
      ],
      id: generateUniqueID(),
      title: "Todo",
    },
    {
      cards: [{ description: "", name: "Doing something cool" }],
      id: generateUniqueID(),
      title: "Doing",
    },
    {
      cards: [],
      id: generateUniqueID(),
      title: "Done",
    },
  ];

  const board: Board = {
    columns: columns || exampleColumns,
    id: generateUniqueID(),
    lastEdited: new Date(),
    title: title,
  };

  boards.value = [...boards.value, board];
  store.set("boards", boards.value);

  await setSorting();
};

const renameBoardModal = (index: number) => {
  const selectedBoard = boards.value[index];
  if (selectedBoard == null) {
    return console.error("Could not find board with index: ", index);
  }

  emitter.emit("openBoardRenameModal", { board: selectedBoard, index: index });
  renameBoardModalVisible.value = true;
};

const renameBoard = async (index: number, name: string) => {
  if (boards.value[index] == null) {
    return console.error("Could not find board with index: ", index);
  }

  boards.value[index].title = name;
  boards.value[index].lastEdited = new Date();
  store.set("boards", boards.value);

  // update board name in pinned bar
  emitter.emit("updateBoardPin", boards.value[index]);

  await setSorting();
};

const deleteBoardModal = (index: number | undefined) => {
  if (index == undefined)
    return console.error("Undefined board to delete, this should not happen!");

  boardToBeDeletedIndex.value = index;

  const selectedBoard = boards.value[index];
  if (selectedBoard == null) {
    return console.error("Could not find board with index: ", index);
  }

  emitter.emit("openBoardDeleteModal", {
    description: t("pages.index.deleteActionConfirmationText", {
      boardName: selectedBoard.title,
    }),
    index: index,
  });
  deleteBoardModalVisible.value = true;
};

const deleteBoard = async (boardIndex: number | undefined) => {
  if (!deleteBoardModalVisible.value) return;
  if (boardIndex === -1 || boardIndex == undefined) return;

  const deletedBoard = boards.value.splice(boardIndex, 1);
  store.set("boards", boards.value);

  deletedBoard.forEach((board) => emitter.emit("boardDeletion", board));
};

const duplicateBoard = async (boardIndex: number | undefined) => {
  if (boardIndex === -1 || boardIndex == undefined) return;

  const boardToDuplicate = boards.value[boardIndex];
  if (!boardToDuplicate) return;

  const duplicatedBoard = { ...boardToDuplicate, id: generateUniqueID() };
  duplicatedBoard.title = `${duplicatedBoard.title} (Copy)`;
  boards.value.splice(boardIndex + 1, 0, duplicatedBoard);
  store.set("boards", boards.value);
};

const exportBoardToJson = async (index: number | undefined) => {
  if (index === -1 || index == undefined) return;

  const boardToExport = boards.value[index];
  if (!boardToExport) return;

  const filePath = await save({
    defaultPath: `./${new Date().toISOString().slice(0, 10)}_kanri_board_${boardToExport.id}_export.json`,
    filters: [
      {
        extensions: ["json"],
        name: "JSON File",
      },
    ],
    title: "Select file to export data to",
  });

  const fileContents = JSON.stringify(boardToExport, null, 2);

  if (filePath == null) return;
  await writeTextFile(filePath, fileContents);
};

// Helpers
const getBoardIndex = (id: string) => {
  return boards.value.findIndex((b) => b.id === id);
};

const sortBoardsAlphabetically = () => {
  editSortWarning.value = false;

  boards.value.sort((a, b) => {
    return a.title.localeCompare(b.title);
  });

  if (reverseSortOrder.value) {
    boards.value.reverse();
  }

  store.set("boardSortingOption", "alphabetically");
  sortingOptionText.value = t("pages.index.sortAlphabetically");
};

const sortBoardsByCreationDate = async () => {
  editSortWarning.value = false;

  boards.value = (await store.get("boards")) || [];
  if (reverseSortOrder.value) {
    boards.value.reverse();
  }

  store.set("boardSortingOption", "default");
  sortingOptionText.value = t("pages.index.sortByCreationDate");
};

const sortBoardsByEditDate = () => {
  boards.value.sort((a, b) => {
    if (!a.lastEdited || !b.lastEdited) {
      editSortWarning.value = true;
      return -1;
    }

    return new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime();
  });

  if (reverseSortOrder.value) {
    boards.value.reverse();
  }

  store.set("boardSortingOption", "edited");
  sortingOptionText.value = t("pages.index.sortByLastEdited");
};
</script>

<style scoped>
.list-move,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}

.bg-board-preview {
  background: radial-gradient(
    circle at bottom left,
    var(--elevation-1) 30%,
    transparent
  );
}
</style>

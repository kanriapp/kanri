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
          boardName: boards.find(b => b.id === boardToBeDeletedId)?.title,
        })
      "
      :title="$t('pages.index.deleteActionConfirmationHeading')"
      @closeModal="
        deleteBoardModalVisible = false;
        boardToBeDeletedId = '';
      "
      @confirmAction="deleteBoard"
    />

    <ModalChangelog
      v-show="changelogModalVisible"
      @closeModal="changelogModalVisible = false"
    />

    <h1 class="mb-4 text-3xl font-bold">
      {{ $t('pages.index.welcome') }}
    </h1>

    <section id="board-search-and-sort" class="mt-2">
      <div class="flex flex-row gap-3 pr-2 w-full max-h-12">
        <!-- Search input -->
        <div
          class="relative rounded-xl border border-elevation-2 bg-elevation-1 backdrop-blur supports-[backdrop-filter]:bg-elevation-1/50 shadow-sm focus-within:ring-2 focus-within:ring-accent/70 w-full"
        >
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <MagnifyingGlassIcon class="size-5 text-dim-3" />
          </div>
          <input
            v-model="searchQuery"
            :placeholder="searchPlaceholder"
            class="w-full rounded-xl bg-transparent py-2 pl-12 pr-12 text-lg outline-none placeholder:text-dim-3"
            type="text"
            aria-label="Search boards"
          />
          <button
            v-if="searchQuery"
            class="absolute inset-y-0 right-0 mr-2 flex items-center rounded-md p-2 text-dim-2 hover:bg-elevation-2-hover"
            @click="searchQuery = ''"
            aria-label="Clear search"
          >
            <XMarkIcon class="size-5" />
          </button>
        </div>

        <!-- Sorting toolbar -->
        <div
          v-if="!(boards.length === 0 && loading === false)"
          class="flex flex-wrap items-center justify-between gap-2 min-w-[16rem]"
        >
          <div class="flex items-center gap-2 max-h-12">
            <div
              class="bg-elevation-1 bg-elevation-2-hover transition-button hide-popper-arrow w-fit rounded-md hover:cursor-pointer max-h-12"
            >
              <Dropdown>
                <template #trigger>
                  <button class="flex flex-row items-center gap-2 px-6 py-4 max-h-12 whitespace-nowrap min-w-[12rem] md:min-w-[14rem]">
                    <PhFunnel class="size-6 shrink-0" />
                    <span class="flex-1 text-left overflow-hidden text-ellipsis">{{ sortingOptionText }}</span>
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
                      <DropdownMenuItemIndicator class="absolute left-2 w-[25px]">
                        <CheckIcon class="size-4" />
                      </DropdownMenuItemIndicator>
                      {{ $t("pages.index.sortAlphabetically") }}
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      value="default"
                      class="bg-elevation-2-hover flex w-full cursor-pointer flex-row items-center rounded-md px-4 py-1.5 pl-[25px] text-left"
                      @click="sortBoardsByCreationDate()"
                    >
                      <DropdownMenuItemIndicator class="absolute left-2 w-[25px]">
                        <CheckIcon class="size-4" />
                      </DropdownMenuItemIndicator>
                      {{ $t("pages.index.sortByCreationDate") }}
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      value="edited"
                      class="bg-elevation-2-hover flex w-full cursor-pointer flex-row items-center rounded-md px-4 py-1.5 pl-[25px] text-left"
                      @click="sortBoardsByEditDate()"
                    >
                      <DropdownMenuItemIndicator class="absolute left-2 w-[25px]">
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

        <p v-if="editSortWarning" class="text-amber-400/90 ml-1 mt-1 text-sm">
          {{ $t('pages.index.editSortWarning') }}
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
          v-if="!loading && searchQuery && visibleBoards?.length === 0"
          class="items-left mt-2 flex w-fit flex-col justify-center rounded-md p-2 text-dim-2"
        >
          <h3 class="text-xl font-semibold">{{ noResultsText }}</h3>
        </div>

        <TransitionGroup
          v-if="!loading && visibleBoards!.length > 0"
          class="flex flex-row flex-wrap gap-6"
          name="list"
          tag="div"
        >
          <nuxt-link
            v-for="board in visibleBoards"
            id="board-preview"
            :key="board.id"
            :to="'/kanban/' + board.id"
            class="bg-board-preview border-elevation-1 flex flex-col rounded-md border-2 shadow-xl transition-transform hover:-translate-y-1"
          >
            <LazyKanbanBoardPreview
              :board="board"
              :is-simple-preview-mode="visibleBoards!.length >= 25"
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
                      class="bg-elevation-2-hover w-full cursor-pointer rounded-md px-4 py-1.5 pr-6 text-left flex items-center gap-2"
                      @click="renameBoardModal(board.id)"
                    >
                      <span class="text-dim-2"><PhPencil class="size-5" /></span>
                      <span>{{ $t("pages.kanban.renameBoardAction") }}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      class="bg-elevation-2-hover w-full cursor-pointer rounded-md px-4 py-1.5 pr-6 text-left flex items-center gap-2"
                      @click="duplicateBoard(board.id)"
                    >
                      <span class="text-dim-2"><PhCopy class="size-5" /></span>
                      <span>{{ $t("pages.kanban.duplicateBoardAction") }}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      class="bg-elevation-2-hover w-full cursor-pointer rounded-md px-4 py-1.5 pr-6 text-left flex items-center gap-2"
                      @click="exportBoardToJson(board.id)"
                    >
                      <span class="text-dim-2"><PhExport class="size-5" /></span>
                      <span>{{ $t("pages.kanban.exportBoardAction") }}</span>
                    </DropdownMenuItem>
                    <div class="my-1 border-t border-elevation-3"></div>
                    <!-- Group 3: Danger zone -->
                    <DropdownMenuItem
                      class="bg-elevation-2-hover w-full cursor-pointer rounded-md px-4 py-1.5 pr-6 text-left flex items-center gap-2 text-red-500"
                      @click="deleteBoardModal(board.id)"
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

import emitter from "@/utils/emitter";
import { ChevronDownIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { CheckIcon, EllipsisHorizontalIcon } from "@heroicons/vue/24/solid";
import { PhFunnel, PhTrash, PhExport, PhCopy, PhPencil } from "@phosphor-icons/vue";
import { useI18n } from "vue-i18n";
import { save } from "@tauri-apps/plugin-dialog";
import { writeTextFile } from "@tauri-apps/plugin-fs";

const layoutSettings = useLayoutStore();
const boardsStore = useBoardsStore();
const settingsStore = useSettingsStore();
const boards: Ref<Board[]> = ref([]);

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

const boardToBeDeletedId = ref("");
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

const visibleBoards = computed(() => {
  if (!boards) return;

  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return boards.value;

  return boards?.value?.filter((b) => b.title.toLowerCase().includes(q));
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

  await boardsStore.init();

  // make sure we use a copy to not break internal sorting
  boards.value = JSON.parse(JSON.stringify(boardsStore.boards));

  await setSorting();

  loading.value = false;
});

onBeforeUnmount(() => {
  // Make sure we properly remove our event listeners
  emitter.off("openChangelogModal");
});

watch(boardsStore.boards, (_, newBoards) => {
  if (newBoards == null || newBoards == undefined) return;
  boards.value = newBoards; // keep in sync with store
  setSorting(); // re-sort boards
});

const setSorting = async () => {
  const sortingOption = settingsStore.boardSortingOption;
  const savedSortPreference = settingsStore.reverseSorting;

  sortingOptionRef.value = sortingOption;
  reverseSortOrder.value = savedSortPreference;

  switch (sortingOption) {
    case "alphabetically":
      sortBoardsAlphabetically();
      break;

    case "edited":
      sortBoardsByEditDate();
      break;

    default:
      if (reverseSortOrder.value && boards.value) {
        boards.value.reverse()
      }
      break;
  }
};

const reverseCurrentSorting = async () => {
  const savedSortPreference = settingsStore.reverseSorting;

  reverseSortOrder.value = !savedSortPreference;
  await settingsStore.setReverseSorting(!savedSortPreference);

  boards?.value?.reverse();
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

  boardsStore.upsertBoard(board);

  await setSorting();
};

const renameBoardModal = (id: string) => {
  if (!boards.value) return;

  const selectedBoard = boards.value.find(b => b.id === id);
  if (selectedBoard == null) {
    return console.error("Could not find board with id: ", id);
  }

  emitter.emit("openBoardRenameModal", { board: selectedBoard });
  renameBoardModalVisible.value = true;
};

const renameBoard = async (id: string, name: string) => {
  if (!boards.value || !boardsStore.boards) return;

  // Update in local sorted copy
  const localBoard = boards.value.find(b => b.id === id);
  if (localBoard) {
    localBoard.title = name;
    localBoard.lastEdited = new Date();
  }

  // Update in store (which handles persistence)
  boardsStore.renameBoard(id, name);

  await setSorting();
};

const deleteBoardModal = (id: string) => {
  if (!boards.value) return;

  const selectedBoard = boards.value.find(b => b.id === id);
  if (selectedBoard == null) {
    return console.error("Could not find board with id: ", id);
  }

  boardToBeDeletedId.value = id;

  emitter.emit("openBoardDeleteModal", {
    description: t("pages.index.deleteActionConfirmationText", {
      boardName: selectedBoard.title,
    }),
    id: id,
  });
  deleteBoardModalVisible.value = true;
};

const deleteBoard = async (boardId: string | undefined) => {
  if (!deleteBoardModalVisible.value) return;
  if (!boardId) return;

  // Find the board before deletion for the event
  const boardToDelete = boards.value.find(b => b.id === boardId);
  if (!boardToDelete) return;

  // Remove from local sorted copy
  boards.value = boards.value.filter(b => b.id !== boardId);

  // Remove from store (which handles persistence)
  boardsStore.removeBoard(boardId);

  emitter.emit("boardDeletion", boardToDelete);
};

const duplicateBoard = async (id: string) => {
  if (!id) return;

  const boardToDuplicate = boards.value.find(b => b.id === id);
  if (!boardToDuplicate) return;

  // Use store's duplicateBoard which handles persistence
  boardsStore.duplicateBoard(id);

  // Re-sync and re-sort local copy
  await setSorting();
};

const exportBoardToJson = async (id: string) => {
  if (!id) return;

  const boardToExport = boards.value.find(b => b.id === id);
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

const sortBoardsAlphabetically = async () => {
  editSortWarning.value = false;

  boards.value.sort((a, b) => {
    return a.title.localeCompare(b.title);
  });

  if (reverseSortOrder.value) {
    boards.value.reverse();
  }

  await settingsStore.setBoardSortingOption("alphabetically");
  sortingOptionText.value = t("pages.index.sortAlphabetically");
};

const sortBoardsByCreationDate = async () => {
  editSortWarning.value = false;

  boards.value = JSON.parse(JSON.stringify(boardsStore.boards));

  if (reverseSortOrder.value) {
    boards.value.reverse();
  }

  await settingsStore.setBoardSortingOption("default");
  sortingOptionText.value = t("pages.index.sortByCreationDate");
};

const sortBoardsByEditDate = async () => {
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
  await settingsStore.setBoardSortingOption("edited");
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

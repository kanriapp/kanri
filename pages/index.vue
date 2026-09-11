<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>, gitoak, PwshLab -->
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

    <ModalManageCategory
      v-show="manageCategoryModalVisible"
      @closeModal="manageCategoryModalVisible = false"
      @createCategory="createCategory"
      @renameCategory="renameCategory"
    />

    <ModalConfirmation
      v-show="deleteCategoryModalVisible"
      :close-button-text="$t('general.cancelAction')"
      :confirm-button-text="$t('general.deleteAction')"
      :description="
        $t('pages.index.deleteCategoryConfirmationText', {
          categoryName: categories.find(c => c.id === categoryToBeDeletedId)?.title,
        })
      "
      :title="$t('pages.index.deleteCategoryConfirmationHeading')"
      @closeModal="
        deleteCategoryModalVisible = false;
        categoryToBeDeletedId = '';
      "
      @confirmAction="deleteCategory"
    />

    <h1 class="mb-4 text-3xl font-bold">
      {{ $t('pages.index.welcome') }}
    </h1>

    <section id="board-search-and-sort" class="mt-2">
      <div class="flex max-h-12 w-full flex-row gap-3 pr-2">
        <!-- Search input -->
        <div
          class="border-elevation-2 bg-elevation-1 supports-[backdrop-filter]:bg-elevation-1/50 focus-within:ring-accent/70 relative w-full rounded-xl border shadow-sm backdrop-blur focus-within:ring-2"
        >
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <MagnifyingGlassIcon class="text-dim-3 size-5" />
          </div>
          <input
            v-model="searchQuery"
            :placeholder="searchPlaceholder"
            class="placeholder:text-dim-3 w-full rounded-xl bg-transparent px-12 py-2 text-lg outline-none"
            type="text"
            aria-label="Search boards"
          >
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
                  <button class="flex max-h-12 min-w-48 flex-row items-center gap-2 whitespace-nowrap px-6 py-4 md:min-w-56">
                    <PhFunnel class="size-6 shrink-0" />
                    <span class="flex-1 overflow-hidden text-ellipsis text-left">{{ sortingOptionText }}</span>
                    <ChevronDownIcon class="size-4 shrink-0" />
                  </button>
                </template>

                <template #content>
                  <DropdownMenuRadioGroup
                    v-model="boardSortingOption"
                    class="flex flex-col"
                  >
                    <DropdownMenuRadioItem
                      value="alphabetical"
                      class="bg-elevation-2-hover flex w-full cursor-pointer flex-row items-center rounded-md px-4 py-1.5 pl-[25px]"
                      @click="settingsStore.setBoardSortingOption('alphabetical')"
                    >
                      <DropdownMenuItemIndicator class="absolute left-2 w-[25px]">
                        <CheckIcon class="size-4" />
                      </DropdownMenuItemIndicator>
                      {{ $t("pages.index.sortAlphabetically") }}
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      value="createdAt"
                      class="bg-elevation-2-hover flex w-full cursor-pointer flex-row items-center rounded-md px-4 py-1.5 pl-[25px] text-left"
                      @click="settingsStore.setBoardSortingOption('createdAt')"
                    >
                      <DropdownMenuItemIndicator class="absolute left-2 w-[25px]">
                        <CheckIcon class="size-4" />
                      </DropdownMenuItemIndicator>
                      {{ $t("pages.index.sortByCreationDate") }}
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      value="lastEdited"
                      class="bg-elevation-2-hover flex w-full cursor-pointer flex-row items-center rounded-md px-4 py-1.5 pl-[25px] text-left"
                      @click="settingsStore.setBoardSortingOption('lastEdited')"
                    >
                      <DropdownMenuItemIndicator class="absolute left-2 w-[25px]">
                        <CheckIcon class="size-4" />
                      </DropdownMenuItemIndicator>
                      {{ $t("pages.index.sortByLastEdited") }}
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                  <DropdownMenuSeparator class="bg-elevation-2 m-[5px] h-px" />
                  <DropdownMenuCheckboxItem
                    v-model:checked="reverseSorting"
                    class="bg-elevation-2-hover flex w-full cursor-pointer flex-row items-center rounded-md px-4 py-1.5 pl-[25px] text-left"
                    @click="settingsStore.setReverseSorting(reverseSorting)"
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
          {{ $t('pages.index.editSortWarning') }}
        </p>
      </div>

      <div v-if="boardCategoriesEnabled && !searchQuery" class="mt-3">
        <button
          class="bg-elevation-1 bg-elevation-2-hover border-elevation-2 transition-button flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-semibold"
          @click="openCreateCategoryModal()"
        >
          <PhFolderPlus class="size-5" />
          {{ $t("pages.index.newCategoryButton") }}
        </button>
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

      <div v-else class="mb-8 mt-6 flex flex-col gap-10">
        <!-- No results for current search -->
        <div
          v-if="!loading && searchQuery && visibleBoards?.length === 0"
          class="items-left text-dim-2 mt-2 flex w-fit flex-col justify-center rounded-md p-2"
        >
          <h3 class="text-xl font-semibold">{{ noResultsText }}</h3>
        </div>

        <!-- Flat grid: used when categories are off, a search is active, or no categories exist yet -->
        <TransitionGroup
          v-if="!loading && !showCategorizedLayout && visibleBoards!.length > 0"
          class="flex flex-row flex-wrap gap-6"
          name="list"
          tag="div"
        >
          <BoardCard
            v-for="board in visibleBoards"
            :key="board.id"
            :board="board"
            :is-simple-preview="visibleBoards!.length >= 25"
            :categories-enabled="boardCategoriesEnabled"
            :categories="categories"
            :current-category-id="categoriesStore.categoryForBoard(board.id)?.id ?? null"
            @rename="renameBoardModal(board.id)"
            @duplicate="duplicateBoard(board.id)"
            @export="exportBoardToJson(board.id)"
            @delete="deleteBoardModal(board.id)"
            @moveToCategory="(categoryId) => moveBoardToCategory(board.id, categoryId)"
          />
        </TransitionGroup>

        <!-- Categorized layout: one section per category, in user-defined order, plus Uncategorized -->
        <template v-if="!loading && showCategorizedLayout">
          <section
            v-for="(section, sectionIndex) in categorizedSections"
            :key="section.category.id"
            class="flex flex-col gap-3"
          >
            <div class="flex flex-row items-center gap-2">
              <div class="flex flex-col">
                <button
                  class="text-dim-3 hover:text-dim-1 disabled:pointer-events-none disabled:opacity-30"
                  :disabled="sectionIndex === 0"
                  aria-label="Move category up"
                  @click="moveCategory(sectionIndex, -1)"
                >
                  <PhCaretUp class="size-4" />
                </button>
                <button
                  class="text-dim-3 hover:text-dim-1 disabled:pointer-events-none disabled:opacity-30"
                  :disabled="sectionIndex === categorizedSections.length - 1"
                  aria-label="Move category down"
                  @click="moveCategory(sectionIndex, 1)"
                >
                  <PhCaretDown class="size-4" />
                </button>
              </div>

              <h2 class="text-xl font-bold uppercase tracking-wide">
                {{ section.category.title }}
              </h2>
              <span class="text-dim-3 text-sm">({{ section.boards.length }})</span>

              <Dropdown>
                <template #trigger>
                  <button
                    class="bg-elevation-3-hover transition-button rounded-md px-1 py-0.5"
                    aria-label="Category options"
                  >
                    <EllipsisHorizontalIcon class="size-5" />
                  </button>
                </template>

                <template #content>
                  <div class="flex flex-col">
                    <DropdownMenuItem
                      class="bg-elevation-2-hover flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-1.5 pr-6 text-left"
                      @click="openRenameCategoryModal(section.category)"
                    >
                      <span class="text-dim-2"><PhPencil class="size-5" /></span>
                      <span>{{ $t("pages.index.renameCategoryAction") }}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      class="bg-elevation-2-hover flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-1.5 pr-6 text-left text-red-500"
                      @click="deleteCategoryModal(section.category)"
                    >
                      <span><PhTrash class="size-5" /></span>
                      <span>{{ $t("pages.index.deleteCategoryAction") }}</span>
                    </DropdownMenuItem>
                  </div>
                </template>
              </Dropdown>
            </div>

            <TransitionGroup
              v-if="section.boards.length > 0"
              class="flex flex-row flex-wrap gap-6"
              name="list"
              tag="div"
            >
              <BoardCard
                v-for="(board, boardIndex) in section.boards"
                :key="board.id"
                :board="board"
                :is-simple-preview="section.boards.length >= 25"
                categories-enabled
                :categories="categories"
                :current-category-id="section.category.id"
                show-category-reorder
                :is-first-in-category="boardIndex === 0"
                :is-last-in-category="boardIndex === section.boards.length - 1"
                @rename="renameBoardModal(board.id)"
                @duplicate="duplicateBoard(board.id)"
                @export="exportBoardToJson(board.id)"
                @delete="deleteBoardModal(board.id)"
                @moveToCategory="(categoryId) => moveBoardToCategory(board.id, categoryId)"
                @moveEarlier="moveBoardWithinCategory(section.category, board.id, -1)"
                @moveLater="moveBoardWithinCategory(section.category, board.id, 1)"
              />
            </TransitionGroup>
          </section>

          <section v-if="uncategorizedBoards.length > 0" class="flex flex-col gap-3">
            <h2 class="text-dim-2 text-xl font-bold uppercase tracking-wide">
              {{ $t("pages.index.uncategorizedSectionHeading") }}
            </h2>

            <TransitionGroup
              class="flex flex-row flex-wrap gap-6"
              name="list"
              tag="div"
            >
              <BoardCard
                v-for="board in uncategorizedBoards"
                :key="board.id"
                :board="board"
                :is-simple-preview="uncategorizedBoards.length >= 25"
                categories-enabled
                :categories="categories"
                :current-category-id="null"
                @rename="renameBoardModal(board.id)"
                @duplicate="duplicateBoard(board.id)"
                @export="exportBoardToJson(board.id)"
                @delete="deleteBoardModal(board.id)"
                @moveToCategory="(categoryId) => moveBoardToCategory(board.id, categoryId)"
              />
            </TransitionGroup>
          </section>
        </template>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { Board, BoardCategory, Column } from "@/types/kanban-types";

import emitter from "@/utils/emitter";
import { ChevronDownIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { CheckIcon, EllipsisHorizontalIcon } from "@heroicons/vue/24/solid";
import { PhFunnel, PhTrash, PhPencil, PhFolderPlus, PhCaretUp, PhCaretDown } from "@phosphor-icons/vue";
import { useI18n } from "vue-i18n";
import { save } from "@tauri-apps/plugin-dialog";
import { writeTextFile } from "@tauri-apps/plugin-fs";
import { useCategoriesStore } from "@/stores/categories";

const layoutSettings = useLayoutStore();
const boardsStore = useBoardsStore();
const settingsStore = useSettingsStore();
const categoriesStore = useCategoriesStore();

const { boards } = storeToRefs(boardsStore);
const { boardSortingOption, reverseSorting, boardCategoriesEnabled } = storeToRefs(settingsStore);
const { categories } = storeToRefs(categoriesStore);

const loading = ref(true);
const editSortWarning = ref(false);

const renameBoardModalVisible = ref(false);
const deleteBoardModalVisible = ref(false);
const changelogModalVisible = ref(false);
const manageCategoryModalVisible = ref(false);
const deleteCategoryModalVisible = ref(false);

const searchQuery = ref("");

const boardToBeDeletedId = ref("");
const categoryToBeDeletedId = ref("");
const { t } = useI18n();

const sortingOptionText = computed(() => {
    switch (boardSortingOption.value) {
      case "alphabetical":
        return t("pages.index.sortAlphabetically");
  
      case "createdAt":
        return t("pages.index.sortByCreationDate");
  
      case "lastEdited":
        return t("pages.index.sortByLastEdited");
  
      default:
        return boardSortingOption.value;
    }
});

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

const handleCreateBoard = async ({ columns, title }: { columns?: Column[]; title: string }) => {
  await createNewBoard(title, columns);
};

const visibleBoards = computed(() => {
  if (!boards) return;

  const q = searchQuery.value.trim().toLowerCase();

  // TODO: make this a bit more robust
  const searchResults = boards.value.filter((b) => b.title.toLowerCase().includes(q));
  const sortedSearchResults = getSortedBoards(searchResults, boardSortingOption.value, reverseSorting.value);

  return sortedSearchResults;
});

// Only group boards into category sections when the feature is on, no
// search is active (search always shows a flat, unfiltered-by-category
// list), and at least one category actually exists yet.
const showCategorizedLayout = computed(() =>
  boardCategoriesEnabled.value && !searchQuery.value.trim() && categories.value.length > 0
);

const categorizedSections = computed(() => {
  if (!boards.value) return [];

  return categories.value.map((category) => ({
    category,
    boards: category.boardIds
      .map((id) => boards.value.find((b) => b.id === id))
      .filter((b): b is Board => b != null),
  }));
});

const categorizedBoardIdSet = computed(() => {
  const ids = new Set<string>();
  for (const category of categories.value) {
    for (const id of category.boardIds) ids.add(id);
  }
  return ids;
});

const uncategorizedBoards = computed(() => {
  if (!boards.value) return [];

  const uncategorized = boards.value.filter((b) => !categorizedBoardIdSet.value.has(b.id));
  return getSortedBoards(uncategorized, boardSortingOption.value, reverseSorting.value);
});

onMounted(async () => {
  emitter.on("createBoard", handleCreateBoard);

  nextTick(async () => {
    console.log("Checking if changelog needs to be shown...");
    const showChangelog = await layoutSettings.shouldDisplayChangelog();
    if (showChangelog) {
      changelogModalVisible.value = true;
    }
  });

  layoutSettings.onHomePageEnter();

  await boardsStore.init();
  await categoriesStore.init();
  await settingsStore.loadBoardSortingOptions();

  loading.value = false;
});

onBeforeUnmount(() => {
  // Make sure we properly remove our event listeners
  emitter.off("createBoard", handleCreateBoard);
  emitter.off("openChangelogModal");

  // show back arrow on sidebar for any other menu except home page
  layoutSettings.onHomePageLeave();
});

const getSortedBoards = (boards: Board[], sortingOption: string, reverseSort: boolean) => {
  // TODO: add createdAt for boards that don't have the property yet
  const sortMethod = getSortingFunctionFromString<Board>(sortingOption);

  const sortedBoards = sortMethod(boards);

  if (reverseSort) return sortedBoards.toReversed();
  else return sortedBoards;
};

const createNewBoard = async (title: string, columns?: Column[]) => {
  const board: Board = {
    columns: columns || exampleColumns.map((column) => ({ ...column, id: generateUniqueID() })),
    id: generateUniqueID(),
    lastEdited: new Date(),
    createdAt: new Date(),
    title: title,
  };

  boardsStore.upsertBoard(board);
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
  boardsStore.renameBoard(id, name);
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

  // Remove from store (which handles persistence)
  boardsStore.removeBoard(boardId);
  // Drop any category's reference to this board so we don't keep a dangling id
  categoriesStore.removeBoardReferences(boardId);
};

const duplicateBoard = async (id: string) => {
  if (!id) return;

  boardsStore.duplicateBoard(id);
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

// --- Board categories -------------------------------------------------

const openCreateCategoryModal = () => {
  emitter.emit("openManageCategoryModal");
  manageCategoryModalVisible.value = true;
};

const openRenameCategoryModal = (category: BoardCategory) => {
  emitter.emit("openManageCategoryModal", {
    categoryId: category.id,
    currentName: category.title,
  });
  manageCategoryModalVisible.value = true;
};

const createCategory = (name: string) => {
  categoriesStore.addCategory(name);
};

const renameCategory = (id: string, name: string) => {
  categoriesStore.renameCategory(id, name);
};

const deleteCategoryModal = (category: BoardCategory) => {
  categoryToBeDeletedId.value = category.id;
  deleteCategoryModalVisible.value = true;
};

const deleteCategory = () => {
  if (!deleteCategoryModalVisible.value || !categoryToBeDeletedId.value) return;

  categoriesStore.removeCategory(categoryToBeDeletedId.value);
  categoryToBeDeletedId.value = "";
};

const moveCategory = (index: number, direction: -1 | 1) => {
  const next = [...categories.value];
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= next.length) return;

  const [moved] = next.splice(index, 1);
  if (!moved) return;
  next.splice(targetIndex, 0, moved);

  categoriesStore.reorderCategories(next);
};

const moveBoardWithinCategory = (category: BoardCategory, boardId: string, direction: -1 | 1) => {
  const ids = [...category.boardIds];
  const index = ids.indexOf(boardId);
  if (index === -1) return;

  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= ids.length) return;

  const [moved] = ids.splice(index, 1);
  if (!moved) return;
  ids.splice(targetIndex, 0, moved);

  categoriesStore.reorderBoardsInCategory(category.id, ids);
};

const moveBoardToCategory = (boardId: string, categoryId: string | null) => {
  categoriesStore.assignBoardToCategory(boardId, categoryId);
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

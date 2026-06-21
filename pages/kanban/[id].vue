<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>, PwshLab, tareqdayya, alexlalves -->
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
  <div v-if="boardContent" class="relative">
    <ModalCustomBackground
      v-if="bgImageLoaded"
      v-show="showCustomBgModal"
      :background="bgCustom"
      :bg-blur-prop="bgBlur"
      :bg-brightness-prop="bgBrightness"
      @closeModal="showCustomBgModal = false"
      @resetBackground="resetBackground"
      @setBackground="setBackgroundImage"
      @setBlur="setBlur"
      @setBrightness="setBrightness"
    />
    <ModalCardTags
      v-show="editTagModalVisible"
      :tags="boardContent?.globalTags ?? []"
      @closeModal="editTagModalVisible = false"
      @setTagColor="board.setGlobalTagColor"
      @removeTag="board.removeGlobalTag"
      @updateTagName="board.updateGlobalTagName"
    />
    <ModalEditCard
      v-show="editCardModalVisible"
      :card="currentlyActiveCardInfo.card"
      :column-id="currentlyActiveCardInfo.columnId"
      :global-tags="boardContent?.globalTags ?? []"
      @closeModal="closeEditCardModal"
      @setCardColor="board.setCardColor"
      @setCardDescription="board.setCardDescription"
      @setCardTasks="board.setCardTasks"
      @setCardTitle="board.setCardName"
      @setCardDueDate="board.setCardDueDate"
      @setCardTags="board.setCardTags"
      @addGlobalTag="board.addGlobalTag"
      @openTagEdit="editTagModalVisible = true"
    />
    <ModalRenameBoard
      v-show="renameBoardModalVisible"
      @closeModal="renameBoardModalVisible = false"
      @renameBoard="(_, title) => board.renameBoard(title)"
    />
    <ModalConfirmation
      v-show="deleteBoardModalVisible"
      close-button-text="Cancel"
      confirm-button-text="Delete"
      description="Are you sure you want to delete the board? This action is irreverisble."
      :title="$t('pages.kanban.deleteBoardAction') + '?'"
      @closeModal="deleteBoardModalVisible = false"
      @confirmAction="deleteBoard"
    />
    <ModalConfirmation
      v-show="removeColumnModalVisible"
      close-button-text="Cancel"
      confirm-button-text="Delete"
      description="Are you sure you want to delete this column? This action is irreverisble."
      :title="$t('components.kanban.column.deleteColumnAction') + '?'"
      @closeModal="columnRemoveDialog.cancel()"
      @confirmAction="columnRemoveDialog.confirm(true)"
    />
    <ModalConfirmation
      v-show="removeCardModalVisible"
      close-button-text="Cancel"
      confirm-button-text="Delete"
      description="Are you sure you want to delete this card? This action is irreverisble."
      :title="$t('components.kanban.card.deleteCardAction') + '?'"
      @closeModal="cardRemoveDialog.cancel()"
      @confirmAction="cardRemoveDialog.confirm(true)"
    />
    <ModalConfirmation
      v-show="removeAllColumnCardsModalVisible"
      :close-button-text="$t('general.cancelAction')"
      :confirm-button-text="$t('general.deleteAction')"
      :title="$t('components.kanban.card.deleteAllColumnCardsConfirmationTitle') + '?'"
      @closeModal="allColumnCardsRemoveDialog.cancel()"
      @confirmAction="allColumnCardsRemoveDialog.confirm(true)"
    />

    <div class="bg-custom pointer-events-none absolute inset-0" :style="cssVars" />

    <div class="kanban-board-header absolute top-4 z-50 ml-8 w-[calc(100vw-112px)]">
      <div class="mb-1 flex max-w-full flex-col gap-2 pr-8 xl:flex-row xl:items-center">
        <h1
          v-if="!boardTitleEditing"
          class="max-h-11 min-w-0 overflow-hidden break-words rounded-md bg-transparent py-1 text-3xl font-semibold"
          :class="[boardTitleColor]"
          @click="enableBoardTitleEditing()"
        >
          {{ boardContent?.title }}
        </h1>
        <input
          v-if="boardTitleEditing"
          v-model="boardContent.title"
          v-focus
          class="bg-elevation-2 border-accent text-no-overflow -ml-2 mr-2 h-11 w-min rounded-md border px-2 text-3xl font-semibold outline-none"
          maxlength="500"
          type="text"
          @blur="
            boardTitleEditing = false;
            board.updateBoardPin();
          "
          @keypress.enter="
            boardTitleEditing = false;
            board.updateBoardPin();
          "
        >

        <div
          class="board-progress flex w-full max-w-sm shrink-0 items-center rounded-lg px-3 py-2 xl:w-80"
          :aria-label="`Progress ${boardProgress.percentage} percent, ${boardProgress.done} of ${boardProgress.total} tasks done`"
          :title="`Done ${boardProgress.done}/${boardProgress.total} (${boardProgress.percentage}%)`"
        >
          <div class="flex min-w-0 flex-1 flex-col gap-1.5">
            <div class="flex items-center justify-between gap-3 text-[11px] font-medium">
              <span class="text-dim-2 truncate">
                Done {{ boardProgress.done }}/{{ boardProgress.total }}
              </span>
              <span class="shrink-0 tabular-nums text-emerald-500">
                {{ boardProgress.percentage }}%
              </span>
            </div>
            <div class="board-progress-track relative h-1.5 overflow-hidden rounded-full">
              <div
                class="board-progress-fill"
                :style="{ width: `${boardProgress.percentage}%` }"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="flex w-full flex-row justify-between gap-6 xl:gap-0">
        <div class="flex flex-row gap-2">
          <div class="flex flex-row gap-2">
            <button
              class="bg-elevation-1 bg-elevation-2-hover border-elevation-2 transition-button flex flex-row gap-1 rounded-md border px-3 py-1.5"
              @click="showCustomBgModal = true"
            >
              <PhotoIcon class="my-auto size-5" />
              <span class="my-auto ml-0.5 hidden lg:block">
                {{ $t("pages.kanban.changeBackground") }}
              </span>
            </button>
          </div>
          <div class="flex flex-row gap-2">
            <button
              class="bg-elevation-1 bg-elevation-2-hover border-elevation-2 transition-button flex flex-row gap-1 rounded-md border px-3 py-1.5"
              @click="editTagModalVisible = true"
            >
              <PhHashStraight class="my-auto size-5" />
              <span class="my-auto ml-0.5 hidden lg:block">
                {{ $t("pages.kanban.editTags") }}
              </span>
            </button>
          </div>

          <KanbanSearchBar v-model="searchQuery" />
        </div>

        <div class="flex flex-row items-center gap-4">
          <KanbanZoomAdjustment />

          <Dropdown align="end">
            <template #trigger>
              <button
              class="bg-elevation-1 bg-elevation-2-hover border-elevation-2 transition-button h-full rounded-md border p-2"
              @click.prevent
              >
              <EllipsisHorizontalIcon class="size-5" />
              </button>
            </template>

            <template #content>
              <div class="flex flex-col">
              <!-- Group 1: Board actions -->
              <DropdownMenuItem
                class="bg-elevation-2-hover flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-1.5 pr-6 text-left"
                @click="renameBoardModal(boardContent?.id)"
              >
                <span class="text-dim-2"><PhPencil class="size-5" /></span>
                <span>{{ $t("pages.kanban.renameBoardAction") }}</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                class="bg-elevation-2-hover flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-1.5 pr-6 text-left"
                @click="duplicateBoard"
              >
                <span class="text-dim-2"><PhCopy class="size-5" /></span>
                <span>{{ $t("pages.kanban.duplicateBoardAction") }}</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                class="bg-elevation-2-hover flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-1.5 pr-6 text-left"
                @click="exportBoardToJson"
              >
                <span class="text-dim-2"><PhExport class="size-5" /></span>
                <span>{{ $t("pages.kanban.exportBoardAction") }}</span>
              </DropdownMenuItem>
              <div class="border-elevation-3 my-1 border-t"/>
              <!-- Group 2: Pin/unpin -->
              <DropdownMenuItem
                class="bg-elevation-2-hover flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-1.5 pr-6 text-left"
                @click="toggleBoardPin"
              >
                <span class="text-dim-2">
                  <PhPushPin class="size-5" />
                </span>

                <span v-if="board.isPinned.value">{{ $t("pages.kanban.unpinBoardAction") }}</span>
                <span v-else>{{ $t("pages.kanban.pinBoardAction") }}</span>
              </DropdownMenuItem>
              <div class="border-elevation-3 my-1 border-t"/>
              <!-- Group 3: Danger zone -->
              <DropdownMenuItem
                class="bg-elevation-2-hover flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-1.5 pr-6 text-left text-red-500"
                @click="deleteBoardModal(boardContent?.id)"
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
      </div>
    </div>

    <div
      id="kanban-cols-container"
      v-dragscroll:nochilddrag
      class="custom-scrollbar-horizontal flex max-h-screen flex-col overflow-y-hidden"
    >
    <div class="pointer-events-none h-full w-max min-w-full pt-28">
        <div class="pointer-events-auto z-50 pl-8">
          <div class="pt-4">
            <Container
              non-drag-area-selector="nodrag"
              orientation="horizontal"
              class="flex-row gap-3"
              drop-class="kanban-column-drop-target"
              drag-handle-selector=".dragging-handle"
              group-name="columns"
              :get-ghost-parent="getGhostParent"
              :get-child-payload="(index: number) => boardContent?.columns[index]"
              @drop="onDrop"
            >
              <Draggable
                v-for="(column, index) in boardContent?.columns"
                :key="column.id"
              >
                <KanbanColumn
                  :id="column.id"
                  :cards-list="column.cards"
                  :class="
                    draggingEnabled ? 'dragging-handle' : 'nomoredragging'
                  "
                  :col-index="index"
                  :has-next-column="index < boardContent.columns.length - 1"
                  :include-in-unified-todo="column.includeInUnifiedTodo"
                  :title="column.title"
                  :zoom-level="columnZoomLevel"
                  :add-to-top-button-shown="addToTopOfColumnButtonEnabled"
                  :card-count-display-enabled="displayColumnCardCountEnabled"
                  :card-search-query="searchQuery"
                  @disableDragging="draggingEnabled = false"
                  @enableDragging="draggingEnabled = true"
                  @openEditCardModal="openEditCardModal"
                  @addCard="board.createCard"
                  @removeCard="board.deleteCard"
                  @removeCardWithConfirmation="removeCardWithConfirmation"
                  @removeAllColumnCards="removeAllColumnCards"
                  @removeColumn="openColumnRemoveDialog(column.id)"
                  @removeColumnNoConfirmation="board.removeColumn"
                  @setColumnEditIndex="setColumnEditIndex"
                  @updateCardTags="board.setCardTags"
                  @updateColumnTitle="board.setColumnTitle"
                  @setCardName="board.setCardName"
                  @setCardTasks="board.setCardTasks"
                  @setCardScheduledWeekday="board.setCardScheduledWeekday"
                  @duplicateCard="board.duplicateCard"
                  @moveCardToNextColumn="board.moveCardToNextColumn"
                  @reorderCards="board.reorderCards"
                  @setColumnUnifiedTodoInclusion="board.setColumnUnifiedTodoInclusion"
                />
              </Draggable>
              <div class="pr-8">
                <div
                  class="nodrag bg-elevation-1 bg-elevation-2-hover border-elevation-2 transition-button mr-8 flex h-min cursor-pointer flex-row items-center gap-2 rounded-lg border p-2 shadow-sm"
                  @click="board.addColumn()"
                >
                  <PlusIcon class="text-accent size-6" />
                  <span :class="boardContent?.columns.length === 0 ? '' : 'hidden'"
                    >Add Column</span
                  >
                </div>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="flex h-screen w-screen items-center justify-center"/>
</template>

<script setup lang="ts">
import type { Card, Column } from "@/types/kanban-types";
import type { Ref } from "vue";

import { applyDrag } from "@/utils/drag-n-drop";
import emitter from "@/utils/emitter";

import { PhotoIcon } from "@heroicons/vue/24/outline";
import { EllipsisHorizontalIcon, PlusIcon } from "@heroicons/vue/24/solid";
import { PhHashStraight, PhTrash, PhCopy, PhPencil, PhExport, PhPushPin } from "@phosphor-icons/vue";

import { save } from "@tauri-apps/plugin-dialog";
import { writeTextFile } from "@tauri-apps/plugin-fs";
import { useConfirmDialog } from "@vueuse/core";
//@ts-expect-error this library doesn't have types
import { Container, Draggable } from "vue3-smooth-dnd";
import { useI18n } from "vue-i18n";
import { useBoard } from "@/composables/useBoard";
import { useBackgroundImage } from "@/composables/useBackgroundImage";
import { calculateBoardProgress } from "@/utils/boardProgress";

const route = useRoute();
const router = useRouter();

const { t } = useI18n();

const settings = useSettingsStore();
const boardsStore = useBoardsStore();

const draggingEnabled = ref(true);

const searchQuery = ref("");

const boardTitleEditing = ref(false);

const columnCardAddMode = ref(false);
const columnTitleEditing = ref(false);
const columnEditIndex = ref(0);
const { 
  columnZoomLevel, 
  displayColumnCardCountEnabled, 
  addToTopOfColumnButtonEnabled 
} = storeToRefs(settings);

const editCardModalVisible = ref(false);

const currentlyActiveCardInfo: {
  card: Card | null;
  columnId: string;
} = reactive({ card: null, columnId: "" });

const removeColumnModalVisible = ref(false);
const removeCardModalVisible = ref(false);
const removeAllColumnCardsModalVisible = ref(false);
const deleteBoardModalVisible = ref(false);
const renameBoardModalVisible = ref(false);

const editTagModalVisible = ref(false);

const columnRemoveDialog = useConfirmDialog(removeColumnModalVisible);
const cardRemoveDialog = useConfirmDialog(removeCardModalVisible);
const allColumnCardsRemoveDialog = useConfirmDialog(removeAllColumnCardsModalVisible);

const board = useBoard(computed(() => route.params.id as string));
const { board: boardContent } = board;
const boardProgress = computed(() => calculateBoardProgress(boardContent.value));
const {
  bgCustom,
  showCustomBgModal,
  bgImageLoaded,
  bgBlur,
  bgBrightness,
  boardTitleColor,
  cssVars,
  initBackgroundImage,
  setBackgroundImage,
  resetBackground,
  setBlur,
  setBrightness,
} = useBackgroundImage(boardContent);

onMounted(async () => {
  // await loadCurrentBoard();
  await board.init();

  if (!boardContent.value) {
    console.error("Could not resolve board!");
    router.push("/");
    return;
  }

  await initBackgroundImage();

  document.addEventListener("keydown", keyDownListener);

  columnEditIndex.value =
    boardContent.value.columns.length !== 0 ? boardContent.value.columns.length - 1 : -1;

  emitter.on("columnActionDone", () => {
    columnCardAddMode.value = false;
    columnTitleEditing.value = false;
  });
});

/**
 * Keyboard shortcut handler + utility methods
 */

onBeforeUnmount(async () => {
  document.removeEventListener("keydown", keyDownListener);

  emitter.off("columnActionDone");
});

enum shortcutKeys {
  "ArrowLeft",
  "ArrowRight",
  "b",
  "d",
  "n",
  "t",
  "h",
  "l",
  "+",
  "-",
}

const setColumnEditIndex = (columnIndex: number, eventType: string) => {
  columnEditIndex.value = columnIndex;

  switch (eventType) {
    case "card-add":
      columnCardAddMode.value = true;
      break;

    case "title-edit":
      columnTitleEditing.value = true;
      break;

    default:
      break;
  }
};

const increaseZoomLevel = () => {
  if (columnZoomLevel.value + 1 > 2) return;
  columnZoomLevel.value++;
  settings.setColumnZoomLevel(columnZoomLevel.value);
};

const decreaseZoomLevel = () => {
  if (columnZoomLevel.value - 1 < -1) return;
  columnZoomLevel.value--;
  settings.setColumnZoomLevel(columnZoomLevel.value);
};

const keyDownListener = (e: KeyboardEvent) => {
  if (editCardModalVisible.value) return; // we don't want to trigger any shortcuts when editing cards

  const controlOrMetaPressed: boolean = e.ctrlKey || e.metaKey;
  const controlIsOnlyKeyPressed: boolean =
    e.key == "Control" && e.location == 1;
  const metaIsOnlyKeyPressed: boolean = e.key == "Meta";

  // Disable reloads to prevent unintended data loss
  if (e.key === "F5" || (controlOrMetaPressed && e.key === "R")) {
    e.preventDefault();
  }

  // All shortcuts need control as a required key, but we don't want only control to trigger something
  if (!controlOrMetaPressed || controlIsOnlyKeyPressed || metaIsOnlyKeyPressed)
    return;

  // We do not want to override any shortcuts except the ones we mapped in the app
  if (!Object.keys(shortcutKeys).includes(e.key)) return;

  // Arrow key left to decrease
  if ((e.key === "ArrowLeft" || e.key === "h") && e.altKey) {
    if (columnEditIndex.value === 0 && boardContent.value.columns.length !== 0) {
      columnEditIndex.value = boardContent.value.columns.length - 1;
    } else {
      columnEditIndex.value--;
    }
  }

  // Arrow key right to increase
  if ((e.key === "ArrowRight" || e.key === "l") && e.altKey) {
    if (
      columnEditIndex.value == boardContent.value.columns.length - 1 &&
      boardContent.value.columns.length !== 0
    ) {
      columnEditIndex.value = 0;
    } else {
      columnEditIndex.value++;
    }
  }

  // Ctrl + B for new board
  if (e.key === "b") {
    board.addColumn();
    scrollView();
    return;
  }

  if (e.key === "+") {
    increaseZoomLevel();
  }

  if (e.key === "-") {
    decreaseZoomLevel();
  }

  const columnID =
    boardContent.value.columns.length !== 0 &&
    boardContent.value.columns[columnEditIndex.value]
      ? boardContent.value.columns[columnEditIndex.value].id
      : "-1";

  if (columnID === "-1") return; // Guard clause to prevent impossible actions

  // ctrl + d for deleting the last column
  if (e.key === "d") {
    columnEditIndex.value =
      boardContent.value.columns.length !== 0 ? boardContent.value.columns.length - 1 : -1;
    const lastColumnID = boardContent.value.columns[columnEditIndex.value].id;

    openColumnRemoveDialog(lastColumnID);
    return;
  }

  // ctrl + t for enabling title editing for the last column
  if (e.key === "t" || (columnTitleEditing.value === true && e.altKey)) {
    columnTitleEditing.value = true;
    emitter.emit("enableColumnTitleEditing", columnID);
    return;
  }

  // ctrl + n for new card in the last column
  if (e.key === "n" || (columnCardAddMode.value === true && e.altKey)) {
    columnCardAddMode.value = true;
    emitter.emit("enableColumnCardAddMode", columnID);
    return;
  }
};

/**
 * Utility methods for drag and drop and misc.
 */

const scrollView = () => {
  const columns = document.getElementsByClassName("kanban-column");
  if (!columns || columns.length === 0) return;

  columns[columns.length - 1].scrollIntoView({
    behavior: "smooth",
    inline: "end",
  });
};

const onDrop = (dropResult: object) => {
  if (!boardContent.value) return;

  const dragResult = applyDrag(boardContent.value.columns, dropResult);
  board.reorderColumns(dragResult);
};

/**
 * Kanban card utility methods for editing, deleting, etc.
 */

// Kanban card modal
const openEditCardModal = (columnId: string, el: Card) => {
  currentlyActiveCardInfo.columnId = columnId;
  currentlyActiveCardInfo.card = el;

  nextTick(() => {
    editCardModalVisible.value = true;
    draggingEnabled.value = false;
  });
};

const closeEditCardModal = () => {
  editCardModalVisible.value = false;
  draggingEnabled.value = true;
  emitter.emit("columnDraggingOn");
};

const removeCardWithConfirmation = async (
  columnId: string,
  cardId: string | undefined,
  cardRef: Ref<HTMLElement | null>
) => {
  const column = boardContent.value?.columns.find(
    (obj: Column) => obj.id === columnId
  );
  if (!column) return;

  const cards = column.cards;

  const cardIndex = cards.findIndex((c) => c.id === cardId);
  if (cardIndex === -1) {
    return;
  }

  const card = cards[cardIndex];

  emitter.emit("openModalWithCustomDescription", {
    description: t("components.kanban.card.deleteCardConfirmation", {
      cardName: card.name,
    }),
  });

  const { isCanceled } = await cardRemoveDialog.reveal();
  if (!isCanceled) {
    if (!cardRef.value) return;

    const oldClasses = cardRef.value.classList.value;
    cardRef.value.classList.value = oldClasses + " card-hidden";

    setTimeout(() => {
      board.deleteCard(columnId, cardId);

      if (!cardRef.value) return;
      cardRef.value.classList.value = oldClasses;
    }, 250);
  }

  draggingEnabled.value = true;
  emitter.emit("columnDraggingOn");
};

const removeAllColumnCards = async (columnID: string) => {
  const column = boardContent.value?.columns.find(
    (obj: Column) => obj.id === columnID
  );
  if (!column) return;
  
  emitter.emit("openModalWithCustomDescription", {
    description: t("components.kanban.card.deleteAllColumnCardsConfirmation", {
      columnName: column.title,
    }),
  });
  
  const { isCanceled } = await allColumnCardsRemoveDialog.reveal();
  if (!isCanceled) {
    setTimeout(() => {
      board.deleteAllColumnCards(columnID);
    }, 250);
  }
};

/**
 * Utility methods for creating, deleting and updating columns
 * Also includes methods to open modals which are used
 */

const openColumnRemoveDialog = async (columnID: string) => {
  const column = boardContent.value?.columns.find(
    (obj: Column) => obj.id === columnID
  );
  if (!column) return;

  emitter.emit("openModalWithCustomDescription", {
    description: t("components.kanban.column.deleteColumnConfirmation", {
      columnName: column.title,
    }),
  });

  const { isCanceled } = await columnRemoveDialog.reveal();
  if (!isCanceled) {
    board.removeColumn(columnID);
  }

  draggingEnabled.value = true;
  emitter.emit("columnDraggingOn");
};

/**
 * Utility methods for altering board (delete, export, etc.)
 */

const exportBoardToJson = async () => {
  const filePath = await save({
    defaultPath: `./${new Date().toISOString().slice(0, 10)}_kanri_board_${boardContent.value.id}_export.json`,
    filters: [
      {
        extensions: ["json"],
        name: "JSON File",
      },
    ],
    title: "Select file to export data to",
  });

  const fileContents = JSON.stringify(boardContent.value, null, 2);

  if (filePath == null) return;
  await writeTextFile(filePath, fileContents);
};

const renameBoardModal = (id: string | undefined) => {
  if (id == undefined)
    return console.error("Undefined board to rename, this should not happen!");

  const selectedBoard = boardsStore.boards.find((b) => b.id === id);
  if (selectedBoard == null) {
    return console.error("Could not find board with id: ", id);
  }

  emitter.emit("openBoardRenameModal", { board: selectedBoard });
  renameBoardModalVisible.value = true;
};

const duplicateBoard = () => {
  board.duplicate();

  router.push("/");
};

const deleteBoardModal = (id: string | undefined) => {
  if (id == undefined)
    return console.error("Undefined board to delete, this should not happen!");

  const selectedBoard = boardsStore.boards.find((b) => b.id === id);
  if (selectedBoard == null) {
    return console.error("Could not find board with id: ", id);
  }

  emitter.emit("openBoardDeleteModal", {
    description: t("pages.kanban.deleteBoardConfirmation", {
      boardName: selectedBoard.title,
    }),
    id: id,
  });
  deleteBoardModalVisible.value = true;
};

const deleteBoard = async (boardId: string | undefined) => {
  if (!deleteBoardModalVisible.value) return;
  if (!boardId) return;

  // Remove board pin before deleting
  if (board.isPinned.value) {
    board.togglePin();
  }

  boardsStore.removeBoard(boardId);

  router.push("/");
};

const enableBoardTitleEditing = () => {
  boardTitleEditing.value = true;
};

const toggleBoardPin = () => {
  board.togglePin();
};

const getGhostParent = () => {
  return document.getElementById("kanban-cols-container");
};
</script>

<style scoped>
.smooth-dnd-container.horizontal {
  display: flex;
  z-index: 1;
}

#kanban-cols-container {
  height: 100vh;
}

.kanban-board-header {
  text-shadow: 0 1px 18px color-mix(in srgb, var(--bg-primary) 40%, transparent);
}

:deep(.kanban-column-drop-target) {
  border-radius: 0.75rem;
  outline: 1px dashed color-mix(in srgb, var(--accent) 72%, transparent);
  outline-offset: 4px;
}

.board-progress {
  border: 1px solid color-mix(in srgb, var(--elevation-3) 72%, transparent);
  background-color: color-mix(in srgb, var(--elevation-1) 92%, transparent);
  backdrop-filter: blur(10px);
}

.board-progress-track {
  background-color: color-mix(in srgb, var(--elevation-3) 84%, black 16%);
}

.board-progress-fill {
  position: absolute;
  inset: 0 auto 0 0;
  border-radius: 9999px;
  background-color: #22c55e;
  transition: width 200ms cubic-bezier(0.4, 1, 0.6, 1);
}

@media (prefers-reduced-motion: reduce) {
  .board-progress-fill {
    transition: none;
  }
}

.bg-custom {
  filter:
    blur(var(--blur-intensity))
    brightness(var(--bg-brightness));
  transition: filter 240ms cubic-bezier(0.16, 1, 0.3, 1);
  background-image: var(--bg-custom-image);
  background-repeat: no-repeat;
  background-size: cover;
}
</style>

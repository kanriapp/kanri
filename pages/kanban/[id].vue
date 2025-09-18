<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2025 trobonox <hello@trobo.dev>, PwshLab, tareqdayya -->
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
  <div>
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
      :tags="board.globalTags || []"
      @closeModal="editTagModalVisible = false"
      @setTagColor="setTagColor"
      @removeTag="removeTag"
      @updateTagName="updateTagName"
    />
    <ModalEditCard
      v-show="editCardModalVisible"
      :card="currentlyActiveCardInfo.card"
      :column-id="currentlyActiveCardInfo.columnId"
      :global-tags="board.globalTags || []"
      @closeModal="closeEditCardModal"
      @setCardColor="setCardColor"
      @setCardDescription="setCardDescription"
      @setCardTasks="setCardTasks"
      @setCardTitle="setCardTitle"
      @setCardDueDate="setCardDueDate"
      @setCardTags="setCardTags"
      @addGlobalTag="addGlobalTag"
      @openTagEdit="editTagModalVisible = true"
    />
    <ModalRenameBoard
      v-show="renameBoardModalVisible"
      @closeModal="renameBoardModalVisible = false"
      @renameBoard="renameBoard"
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

    <div class="absolute top-4 z-50 ml-8 w-[calc(100vw-112px)]">
      <h1
        v-if="!boardTitleEditing"
        class="mb-1 max-h-12 w-full overflow-hidden break-words rounded-md bg-transparent py-1 pr-8 text-4xl font-bold"
        :class="[boardTitleColor]"
        @click="enableBoardTitleEditing()"
      >
        {{ board.title }}
      </h1>
      <input
        v-if="boardTitleEditing"
        ref="boardTitleInput"
        v-model="board.title"
        v-focus
        class="bg-elevation-2 border-accent text-no-overflow mb-1 mr-2 h-12 w-min rounded-sm border-2 border-dotted px-2 text-4xl outline-none"
        maxlength="500"
        type="text"
        @blur="
          boardTitleEditing = false;
          emitter.emit('updateBoardPin', board);
          updateStorage();
        "
        @keypress.enter="
          boardTitleEditing = false;
          emitter.emit('updateBoardPin', board);
          updateStorage();
        "
      />

      <div class="flex w-full flex-row justify-between gap-6 xl:gap-0">
        <div class="flex flex-row gap-2">
          <div class="flex flex-row gap-2">
            <button
              class="bg-elevation-1 bg-elevation-2-hover transition-button flex flex-row gap-1 rounded-md px-4 py-1"
              @click="showCustomBgModal = true"
            >
              <PhotoIcon class="my-auto size-6" />
              <span class="my-auto ml-0.5 hidden lg:block">
                {{ $t("pages.kanban.changeBackground") }}
              </span>
            </button>
          </div>
          <div class="flex flex-row gap-2">
            <button
              class="bg-elevation-1 bg-elevation-2-hover transition-button flex flex-row gap-1 rounded-md px-4 py-1"
              @click="editTagModalVisible = true"
            >
              <PhHashStraight class="my-auto size-6" />
              <span class="my-auto ml-0.5 hidden lg:block">
                {{ $t("pages.kanban.editTags") }}
              </span>
            </button>
          </div>

          <KanbanSearchBar v-model="searchQuery" />
        </div>

        <div class="flex flex-row items-center gap-4">
          <KanbanZoomAdjustment v-model="columnZoomLevel" />

          <Dropdown align="end">
            <template #trigger>
              <button
              class="bg-elevation-1 bg-elevation-2-hover transition-button h-full rounded-md p-2"
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
                @click="renameBoardModal(getBoardIndex())"
              >
                <span class="text-dim-2"><PhPencil class="size-5" /></span>
                <span>{{ $t("pages.kanban.renameBoardAction") }}</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                class="bg-elevation-2-hover w-full cursor-pointer rounded-md px-4 py-1.5 pr-6 text-left flex items-center gap-2"
                @click="duplicateBoard"
              >
                <span class="text-dim-2"><PhCopy class="size-5" /></span>
                <span>{{ $t("pages.kanban.duplicateBoardAction") }}</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                class="bg-elevation-2-hover w-full cursor-pointer rounded-md px-4 py-1.5 pr-6 text-left flex items-center gap-2"
                @click="exportBoardToJson"
              >
                <span class="text-dim-2"><PhExport class="size-5" /></span>
                <span>{{ $t("pages.kanban.exportBoardAction") }}</span>
              </DropdownMenuItem>
              <div class="my-1 border-t border-elevation-3"></div>
              <!-- Group 2: Pin/unpin -->
              <DropdownMenuItem
                class="bg-elevation-2-hover w-full cursor-pointer rounded-md px-4 py-1.5 pr-6 text-left flex items-center gap-2"
                @click="toggleBoardPin"
              >
                <span class="text-dim-2">
                  <PhPushPin class="size-5" />
                </span>
                <span v-if="!isPinned">{{ $t("pages.kanban.pinBoardAction") }}</span>
                <span v-else>{{ $t("pages.kanban.unpinBoardAction") }}</span>
              </DropdownMenuItem>
              <div class="my-1 border-t border-elevation-3"></div>
              <!-- Group 3: Danger zone -->
              <DropdownMenuItem
                class="bg-elevation-2-hover w-full cursor-pointer rounded-md px-4 py-1.5 pr-6 text-left flex items-center gap-2 text-red-500"
                @click="deleteBoardModal(getBoardIndex())"
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
      :style="cssVars"
      class="custom-scrollbar-horizontal bg-custom flex max-h-screen flex-col overflow-y-hidden"
    >
      <div
        class="h-full w-max min-w-full pt-28"
        :style="{
          '-webkit-backdrop-filter':
            'blur(' + bgBlur + ') brightness(' + bgBrightness + ')',
          'backdrop-filter':
            'blur(' + bgBlur + ') brightness(' + bgBrightness + ')',
          'pointer-events': 'none',
        }"
      >
        <div class="pointer-events-auto z-50 pl-8">
          <div class="pt-4">
            <Container
              non-drag-area-selector="nodrag"
              orientation="horizontal"
              class="flex-row gap-2"
              drag-handle-selector=".dragging-handle"
              group-name="columns"
              :get-ghost-parent="getGhostParent"
              :get-child-payload="(index: number) => board.columns[index]"
              @drop="onDrop"
            >
              <Draggable
                v-for="(column, index) in board.columns"
                :key="column.id"
              >
                <KanbanColumn
                  :id="column.id"
                  :cards-list="column.cards"
                  :class="
                    draggingEnabled ? 'dragging-handle' : 'nomoredragging'
                  "
                  :col-index="index"
                  :title="column.title"
                  :zoom-level="columnZoomLevel"
                  :add-to-top-button-shown="columnAddToTopButtonEnabled"
                  :card-count-display-enabled="columnCardCountEnabled"
                  :card-search-query="searchQuery"
                  @disableDragging="draggingEnabled = false"
                  @enableDragging="draggingEnabled = true"
                  @openEditCardModal="openEditCardModal"
                  @removeCardWithConfirmation="removeCardWithConfirmation"
                  @removeColumn="openColumnRemoveDialog(column.id)"
                  @removeColumnNoConfirmation="removeColumn"
                  @setColumnEditIndex="setColumnEditIndex"
                  @updateStorage="updateColumnProperties"
                  @updateCardTags="updateCardTags"
                />
              </Draggable>
              <div class="pr-8">
                <div
                  class="nodrag bg-elevation-1 bg-elevation-2-hover mr-8 flex h-min cursor-pointer flex-row items-center gap-2 rounded-md p-2"
                  @click="addColumn()"
                >
                  <PlusIcon class="text-accent size-6" />
                  <span :class="board.columns.length === 0 ? '' : 'hidden'"
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
</template>

<script setup lang="ts">
import type { Board, Card, Column, Tag } from "@/types/kanban-types";
import type { Ref } from "vue";

import { useTauriStore } from "@/stores/tauriStore";

import { applyDrag } from "@/utils/drag-n-drop";
import emitter from "@/utils/emitter";
import { generateUniqueID } from "@/utils/idGenerator";
import { getAverageColor } from "~/utils/colorUtils";

import { PhotoIcon } from "@heroicons/vue/24/outline";
import { EllipsisHorizontalIcon, PlusIcon } from "@heroicons/vue/24/solid";
import { PhHashStraight, PhTrash, PhCopy, PhPencil, PhExport, PhPushPin } from "@phosphor-icons/vue";

import { save } from "@tauri-apps/plugin-dialog";
import { writeTextFile, exists } from "@tauri-apps/plugin-fs";
import { convertFileSrc } from "@tauri-apps/api/core";
import { normalize } from "@tauri-apps/api/path";
import { useConfirmDialog } from "@vueuse/core";
//@ts-expect-error this library doesn't have types
import { Container, Draggable } from "vue3-smooth-dnd";
import { useI18n } from "vue-i18n";

const store = useTauriStore().store;
const route = useRoute();
const router = useRouter();

const { t } = useI18n();

const boards: Ref<Array<Board>> = ref([]);
const board: Ref<Board> = ref({ columns: [], id: "123", title: "" });
const draggingEnabled = ref(true);
const isPinned = ref(false);

const searchQuery = ref("");

const boardTitleColor = ref("");
const boardTitleEditing = ref(false);
const boardTitleInput: Ref<HTMLInputElement | null> = ref(null);

const columnCardAddMode = ref(false);
const columnTitleEditing = ref(false);
const columnEditIndex = ref(0);
const columnZoomLevel = ref(0);
const columnAddToTopButtonEnabled = ref(false);
const columnCardCountEnabled = ref(false);

const bgCustom = ref("");
const bgCustomNoResolution = ref("");
const showCustomBgModal = ref(false);
const bgImageLoaded = ref(false);
const bgBlur = ref("8px");
const bgBrightness = ref("100%");

const editCardModalVisible = ref(false);

const currentlyActiveCardInfo: {
  card: Card | null;
  columnId: string;
} = reactive({ card: null, columnId: "" });

const removeColumnModalVisible = ref(false);
const removeCardModalVisible = ref(false);
const deleteBoardModalVisible = ref(false);
const renameBoardModalVisible = ref(false);

const editTagModalVisible = ref(false);

const columnRemoveDialog = useConfirmDialog(removeColumnModalVisible);
const cardRemoveDialog = useConfirmDialog(removeCardModalVisible);

const cssVars = computed(() => {
  return {
    "--bg-brightness": bgBrightness.value,
    "--bg-custom-image": `url("${bgCustom.value}")`,
    "--blur-intensity": bgBlur.value,
  };
});

onMounted(async () => {
  await loadCurrentBoard();

  //@ts-expect-error TODO: fix types for column zoom parameter
  const columnZoom: null | number = await store.get("columnZoomLevel");

  if (columnZoom == null) {
    await store.set("columnZoomLevel", 0);
    columnZoomLevel.value = 0;
  } else {
    columnZoomLevel.value = columnZoom;
  }

  columnAddToTopButtonEnabled.value =
    (await store.get("addToTopOfColumnButtonEnabled")) || false;
  columnCardCountEnabled.value =
    (await store.get("displayColumnCardCountEnabled")) || false;

  const pinned = ((await store.get("pins")) as Array<{ id: string }>) || [];
  isPinned.value = !!findObjectById(pinned, board.value.id);

  if (board.value.background) {
    bgCustomNoResolution.value = board.value.background.src;

    const pathTauriObject = await normalize(board.value.background.src);
    let bgImageExists = false;
    try {
      bgImageExists = await exists(pathTauriObject);
    } catch (e) {
      console.warn(
        "Background image might not exist, might be from an imported board from another device"
      );
      console.info(e);
      bgImageExists = false;
    }

    if (!bgImageExists) {
      console.warn(
        "Background image does not exist, removing background image from board"
      );
      board.value.background = null; // completely remove leftover traces of the background image
      updateStorage();

      return; // don't set any more values regarding background
    }

    try {
      bgCustom.value = convertFileSrc(board.value.background.src);
    } catch (e) {
      console.error("Error converting file src: ", e);
      bgCustom.value = "";
    }

    bgBlur.value = board.value.background.blur;
    bgBrightness.value = board.value.background.brightness;
  }
  nextTick(() => (bgImageLoaded.value = true));

  await getBoardTitleTextColor();

  document.addEventListener("keydown", keyDownListener);

  emitter.emit("openKanbanPage");

  columnEditIndex.value =
    board.value.columns.length !== 0 ? board.value.columns.length - 1 : -1;

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
  emitter.emit("closeKanbanPage");

  emitter.off("columnActionDone");
});

/**
 * Loads board: loads board from storage and sets it as the current board. (can be extended with custom storage functionality later on)
 */
const loadCurrentBoard = async () => {
  boards.value = (await store.get("boards")) || [];

  board.value = boards.value.filter((board) => {
    return board.id === route.params.id;
  })[0];

  if (!board.value) {
    console.error("Could not resolve board!");
    router.push("/");
    return;
  }
};

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
  store.set("columnZoomLevel", columnZoomLevel.value);
};

const decreaseZoomLevel = () => {
  if (columnZoomLevel.value - 1 < -1) return;
  columnZoomLevel.value--;
  store.set("columnZoomLevel", columnZoomLevel.value);
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
    if (columnEditIndex.value === 0 && board.value.columns.length !== 0) {
      columnEditIndex.value = board.value.columns.length - 1;
    } else {
      columnEditIndex.value--;
    }
  }

  // Arrow key right to increase
  if ((e.key === "ArrowRight" || e.key === "l") && e.altKey) {
    if (
      columnEditIndex.value == board.value.columns.length - 1 &&
      board.value.columns.length !== 0
    ) {
      columnEditIndex.value = 0;
    } else {
      columnEditIndex.value++;
    }
  }

  // Ctrl + B for new board
  if (e.key === "b") {
    addColumn();
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
    board.value.columns.length !== 0 &&
    board.value.columns[columnEditIndex.value]
      ? board.value.columns[columnEditIndex.value].id
      : "-1";

  if (columnID === "-1") return; // Guard clause to prevent impossible actions

  // ctrl + d for deleting the last column
  if (e.key === "d") {
    columnEditIndex.value =
      board.value.columns.length !== 0 ? board.value.columns.length - 1 : -1;
    const lastColumnID = board.value.columns[columnEditIndex.value].id;

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
  board.value.columns = applyDrag(board.value.columns, dropResult);
  updateStorage();
};

/**
 * Get the text color with the correct contrast if a background image is set
 */
const getBoardTitleTextColor = async () => {
  if (bgCustom.value == null || !/\S/.test(bgCustom.value)) return;

  const averageColorFromBackground = await getAverageColor(bgCustom.value);
  const hexColor = rgbToHex(
    averageColorFromBackground[0],
    averageColorFromBackground[1],
    averageColorFromBackground[2]
  );

  boardTitleColor.value = getContrast(hexColor);
};

/**
 * Kanban card utility methods for editing, deleting, etc.
 */

type CardMutateFunction = (card: Card) => void;

const mutateCardData = (
  columnId: string,
  cardId: string | undefined,
  mutateCard: CardMutateFunction
) => {
  const column = findObjectById<Column>(board.value.columns, columnId);
  if (!column) {
    console.error(`Column with ID ${columnId} not found`);
    return;
  }
  if (column.cards.length === 0) {
    console.error(`No cards in column with ID ${columnId}`);
    return;
  }

  if (!cardId) {
    console.error(`Card ID is undefined`);
    return;
  }

  const card = findObjectById<Card>(column.cards, cardId);
  if (!card) {
    console.error(`Card with ID ${cardId} not found`);
    return;
  }

  mutateCard(card);
  updateColumnProperties(column);
};

const setCardTitle = (
  columnId: string,
  cardId: string | undefined,
  title: string
) => {
  mutateCardData(columnId, cardId, (card) => {
    card.name = title;
  });
};

const setCardDescription = (
  columnId: string,
  cardId: string | undefined,
  description: string
) => {
  mutateCardData(columnId, cardId, (card) => {
    card.description = description;
  });
};

const setCardColor = (
  columnId: string,
  cardId: string | undefined,
  color: string
) => {
  mutateCardData(columnId, cardId, (card) => {
    card.color = color;
  });
};

const setCardTasks = (
  columnId: string,
  cardId: string | undefined,
  tasks: Card["tasks"]
) => {
  mutateCardData(columnId, cardId, (card) => {
    card.tasks = tasks;
  });
};

const setCardDueDate = (
  columnId: string,
  cardId: string | undefined,
  dueDate: Date | null,
  isCounterRelative: boolean,
  isCompleted: boolean
) => {
  mutateCardData(columnId, cardId, (card) => {
    card.dueDate = dueDate;
    card.isDueDateCounterRelative = isCounterRelative;
    card.isDueDateCompleted = isCompleted;
  });
};

const setCardTags = (
  columnId: string,
  cardId: string | undefined,
  tags: Array<Tag>
) => {
  mutateCardData(columnId, cardId, (card) => {
    card.tags = tags;
  });
};

const addGlobalTag = (tag: Tag) => {
  const globalTags = board.value.globalTags || [];
  if (globalTags.some((el) => el.text === tag.text)) {
    return;
  }

  if (!board.value.globalTags) {
    board.value.globalTags = [];
  }
  board.value.globalTags.push(tag);

  updateStorage();
};

const removeTag = (tagId: string) => {
  const globalTags = board.value.globalTags || [];
  const index = globalTags.findIndex((el) => el.id === tagId);

  if (index !== -1) {
    board.value.globalTags?.splice(index, 1);
  }
};

const setTagColor = (tagId: string, color: string) => {
  const tag = findObjectById<Tag>(board.value.globalTags || [], tagId);

  const textColor =
    getContrast(color) === "text-gray-50" ? "#f4f4f5" : "#1e293b";

  tag.color = color;
  tag.style = `background-color: ${color}; color: ${textColor}`;
  updateStorage();

  emitter.emit("globalTagsUpdated", { tags: board.value.globalTags });
};

const updateTagName = (tagId: string, newName: string) => {
  const tag = findObjectById<Tag>(board.value.globalTags || [], tagId);

  tag.text = newName;
  updateStorage();

  emitter.emit("globalTagsUpdated", { tags: board.value.globalTags });
};

const updateCardTags = (
  columnId: string,
  cardId: string | undefined,
  tags: Array<Tag>
) => {
  mutateCardData(columnId, cardId, (card) => {
    card.tags = tags;
  });
};

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
  const cards = board.value.columns.filter((obj: Column) => {
    return obj.id === columnId;
  })[0].cards;

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
      const column = findObjectById<Column>(board.value.columns, columnId);
      column.cards.splice(cardIndex, 1);
      updateColumnProperties(column);

      if (!cardRef.value) return;
      cardRef.value.classList.value = oldClasses;
    }, 250);
  }

  draggingEnabled.value = true;
  emitter.emit("columnDraggingOn");
};

/**
 * Utility methods for creating, deleting and updating columns
 * Also includes methods to open modals which are used
 */

const addColumn = () => {
  const column = {
    cards: [],
    id: generateUniqueID(),
    title: "New Column",
  };

  board.value.columns.push(column);
  columnEditIndex.value++;
  updateStorage();
};

const openColumnRemoveDialog = async (columnID: string) => {
  const column = board.value.columns.filter((obj: Column) => {
    return obj.id === columnID;
  })[0];
  emitter.emit("openModalWithCustomDescription", {
    description: t("components.kanban.column.deleteColumnConfirmation", {
      columnName: column.title,
    }),
  });

  const { isCanceled } = await columnRemoveDialog.reveal();
  if (!isCanceled) {
    removeColumn(columnID);
  }

  draggingEnabled.value = true;
  emitter.emit("columnDraggingOn");
};

const removeColumn = (columnID: string) => {
  const column = board.value.columns.filter((obj: Column) => {
    return obj.id === columnID;
  })[0];

  // TODO: check if using an index instead of the ID is an issue here
  const columnIndex = board.value.columns.indexOf(column);
  board.value.columns.splice(columnIndex, 1);
  columnEditIndex.value--;
  updateStorage();
};

const updateColumnProperties = (columnObj: Column) => {
  const boardSaved: Board = board.value;
  const column = boardSaved.columns.filter((obj: Column) => {
    return obj.id === columnObj.id;
  })[0];

  // TODO: check if using an index instead of the ID is an issue here
  const columnIndex = boardSaved.columns.indexOf(column);
  boardSaved.columns[columnIndex] = columnObj;

  board.value = boardSaved;
  updateStorage();
};

/**
 * Main method for updating the persistent storage, overrides old board with new one and saves to tauri store
 */
const updateStorage = () => {
  // TODO!!!: add safety measures to prevent potential overrides of the global boards with the empty array which is a fallback value for the vue ref

  const currentBoard = boards.value.filter((obj: Board) => {
    return obj.id === board.value.id;
  })[0];

  const currentBoardIndex = boards.value.indexOf(currentBoard);
  board.value.lastEdited = new Date();
  boards.value[currentBoardIndex] = board.value; // Override old board with new one
  store.set("boards", boards.value); // Override all saved boards with new altered array which includes modified current board
  store.save();
};

/**
 * Utility methods for altering board (delete, export, etc.)
 */

const exportBoardToJson = async () => {
  const filePath = await save({
    defaultPath: `./${new Date().toISOString().slice(0, 10)}_kanri_board_${board.value.id}_export.json`,
    filters: [
      {
        extensions: ["json"],
        name: "JSON File",
      },
    ],
    title: "Select file to export data to",
  });

  const fileContents = JSON.stringify(board.value, null, 2);

  if (filePath == null) return;
  await writeTextFile(filePath, fileContents);
};

const renameBoardModal = (index: number) => {
  const selectedBoard = boards.value[index];
  if (selectedBoard == null) {
    return console.error("Could not find board with index: ", index);
  }

  emitter.emit("openBoardRenameModal", { board: selectedBoard, index: index });
  renameBoardModalVisible.value = true;
};

const renameBoard = (index: number, name: string) => {
  if (boards.value[index] == null) {
    return console.error("Could not find board with index: ", index);
  }

  boards.value[index].title = name;
  boards.value[index].lastEdited = new Date();
  store.set("boards", boards.value);

  // update board pin (to reflect new name)
  emitter.emit("updateBoardPin", boards.value[index]);
};

const duplicateBoard = () => {
  const newBoard = JSON.parse(JSON.stringify(board.value));
  newBoard.id = generateUniqueID();
  newBoard.title = newBoard.title + " (duplicate)";
  boards.value.push(newBoard);
  store.set("boards", boards.value);

  router.push("/");
};

const deleteBoardModal = (index: number | undefined) => {
  if (index == undefined)
    return console.error("Undefined board to delete, this should not happen!");

  const selectedBoard = boards.value[index];
  if (selectedBoard == null) {
    return console.error("Could not find board with index: ", index);
  }

  emitter.emit("openBoardDeleteModal", {
    description: t("pages.kanban.deleteBoardConfirmation", {
      boardName: selectedBoard.title,
    }),
    index: index,
  });
  deleteBoardModalVisible.value = true;
};

const deleteBoard = async (boardIndex: number | undefined) => {
  if (!deleteBoardModalVisible.value) return;
  if (boardIndex === -1 || boardIndex == undefined) return;

  // Remove board pin before deleting
  if (isPinned.value) {
    emitter.emit("toggleBoardPin", board.value);
  }

  boards.value.splice(boardIndex, 1);
  store.set("boards", boards.value);

  router.push("/");
};

const enableBoardTitleEditing = () => {
  boardTitleEditing.value = true;
};

const getBoardIndex = () => {
  return boards.value.indexOf(board.value);
};

const toggleBoardPin = () => {
  emitter.emit("toggleBoardPin", board.value);
  isPinned.value = !isPinned.value;
};

/**
 * Board background utilities
 */

const setBackgroundImage = async (img: string) => {
  bgCustomNoResolution.value = img;
  bgCustom.value = convertFileSrc(img);
  board.value.background = {
    blur: bgBlur.value,
    brightness: bgBrightness.value,
    src: bgCustomNoResolution.value,
  };
  updateStorage();
  await getBoardTitleTextColor();
};

const resetBackground = () => {
  bgCustom.value = "";
  bgBlur.value = "8px";
  bgBrightness.value = "100%";

  delete board.value.background;
  updateStorage();

  boardTitleColor.value = "";
};

const setBlur = (blurAmount: string) => {
  bgBlur.value = blurAmount;
  board.value.background = {
    blur: bgBlur.value,
    brightness: bgBrightness.value,
    src: bgCustomNoResolution.value,
  };
  updateStorage();
};

const setBrightness = (brightnessAmount: string) => {
  bgBrightness.value = brightnessAmount;
  board.value.background = {
    blur: bgBlur.value,
    brightness: bgBrightness.value,
    src: bgCustomNoResolution.value,
  };
  updateStorage();
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

.bg-custom {
  z-index: 1;
  background-image: var(--bg-custom-image);
  background-repeat: no-repeat;
  background-size: cover;
}
</style>

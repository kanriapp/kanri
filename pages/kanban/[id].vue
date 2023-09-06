<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2023 trobonox <hello@trobo.tech> -->
<!-- -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

<template>
  <div>
    <ModalCustomBackground
      v-show="showCustomBgModal"
      v-if="bgImageLoaded"
      :background="bgCustom"
      :bg-blur-prop="bgBlur"
      :bg-brightness-prop="bgBrightness"
      @closeModal="showCustomBgModal = false"
      @setBackground="setBackgroundImage"
      @resetBackground="resetBackground"
      @setBlur="setBlur"
      @setBrightness="setBrightness"
    />
    <ModalKanban
      v-show="kanbanModalVisible"
      ref="kanbanModal"
      @setCardTitle="setCardTitle"
      @setCardDescription="setCardDescription"
      @closeModal="closeKanbanModal"
      @setCardColor="setCardColor"
      @setCardTasks="setCardTasks"
    />
    <ModalRenameBoard
      v-show="renameBoardModalVisible"
      @closeModal="renameBoardModalVisible = false"
      @renameBoard="renameBoard"
    />
    <ModalConfirmation
      v-show="deleteBoardModalVisible"
      title="Delete Board?"
      description="Are you sure you want to delete the board? This action is irreverisble."
      confirm-button-text="Delete"
      close-button-text="Cancel"
      @closeModal="deleteBoardModalVisible = false"
      @confirmAction="deleteBoard"
    />
    <ModalConfirmation
      v-show="removeColumnModalVisible"
      title="Delete column?"
      description="Are you sure you want to delete this column? This action is irreverisble."
      confirm-button-text="Delete"
      close-button-text="Cancel"
      @closeModal="columnRemoveDialog.cancel()"
      @confirmAction="columnRemoveDialog.confirm(true)"
    />
    <ModalConfirmation
      v-show="removeCardModalVisible"
      title="Delete column?"
      description="Are you sure you want to delete this card? This action is irreverisble."
      confirm-button-text="Delete"
      close-button-text="Cancel"
      @closeModal="cardRemoveDialog.cancel()"
      @confirmAction="cardRemoveDialog.confirm(true)"
    />
    <div class="absolute top-8 z-50 ml-8 w-auto xl:w-[92vw]">
      <h1
        v-if="!boardTitleEditing"
        class="mb-2 rounded-md bg-transparent py-1 pr-8 text-4xl font-bold"
        @click="enableBoardTitleEditing()"
      >
        {{ board.title }}
      </h1>
      <input
        v-if="boardTitleEditing"
        ref="boardTitleInput"
        v-model="board.title"
        v-focus
        type="text"
        maxlength="500"
        class="bg-elevation-2 border-accent text-no-overflow mb-2 mr-2 h-12 w-min rounded-sm border-2 border-dotted px-2 text-4xl outline-none"
        @blur="
          boardTitleEditing = false;
          updateStorage();
        "
        @keypress.enter="
          boardTitleEditing = false;
          updateStorage();
        "
      >
      <div class="flex w-full flex-row justify-between gap-6 xl:gap-0">
        <div class="flex flex-row gap-2">
          <button
            class="bg-elevation-1 bg-elevation-2-hover transition-button flex flex-row gap-1 rounded-md px-4 py-1"
            @click="showCustomBgModal = true"
          >
            <PhotoIcon class="h-6 w-6" />
            <span>Change Background</span>
          </button>
        </div>
        <div class="flex flex-row">
          <button
            class="bg-elevation-1 bg-elevation-2-hover transition-button rounded-l-2xl px-2 py-1"
            @click="increaseZoomLevel"
          >
            <PlusIcon class="h-6 w-6" />
          </button>
          <button
            class="bg-elevation-1 bg-elevation-2-hover transition-button rounded-r-2xl px-2 py-1"
            @click="decreaseZoomLevel"
          >
            <MinusIcon class="h-6 w-6" />
          </button>
          <VDropdown
            :distance="2"
            placement="bottom-end"
          >
            <button
              class="bg-elevation-1 bg-elevation-2-hover transition-button ml-4 h-full rounded-md px-2"
              @click.prevent
            >
              <EllipsisHorizontalIcon class="h-6 w-6" />
            </button>
            <template
              #popper
            >
              <div class="flex flex-col">
                <button
                  v-close-popper
                  class="px-4 py-1.5 hover:bg-gray-200"
                  @click="renameBoardModal(getBoardIndex())"
                >
                  Rename Board
                </button>
                <button
                  v-close-popper
                  class="px-4 py-1.5 hover:bg-gray-200"
                  @click="exportBoardToJson"
                >
                  Export Board
                </button>
                <button
                  v-close-popper
                  class="px-4 py-1.5 hover:bg-gray-200"
                  @click="deleteBoardModal(getBoardIndex())"
                >
                  Delete Board
                </button>
              </div>
            </template>
          </VDropdown>
        </div>
      </div>
    </div>
    <div
      id="kanban-cols-container"
      v-dragscroll:nochilddrag
      class="custom-scrollbar-horizontal bg-custom flex max-h-screen flex-col overflow-y-hidden"
      :style="cssVars"
    >
      <div class="bg-effect-overlay h-full w-max min-w-full pt-[7.5rem]">
        <div class="pointer-events-auto z-50 pl-8">
          <div class="pt-4">
            <Container
              group-name="columns"
              :orientation="'horizontal'"
              :non-drag-area-selector="'nodrag'"
              drag-handle-selector=".dragging-handle"
              class="flex-row gap-4"
              @drop="onDrop"
            >
              <Draggable
                v-for="(column, index) in board.columns"
                :key="column.id"
              >
                <KanbanColumn
                  :id="column.id"
                  :ref="(el) => saveColumnRef(el, column.id)"
                  :col-index="index"
                  :title="column.title"
                  :class="draggingEnabled ? 'dragging-handle' : 'nomoredragging'"
                  :cards-list="column.cards"
                  :zoom-level="columnZoomLevel"
                  @updateStorage="updateColumnProperties"
                  @removeColumn="openColumnRemoveDialog(column.id)"
                  @removeColumnNoConfirmation="removeColumn"
                  @removeCardWithConfirmation="removeCardWithConfirmation"
                  @disableDragging="draggingEnabled = false"
                  @enableDragging="draggingEnabled = true"
                  @openKanbanModal="openKanbanModal"
                  @setColumnEditIndex="setColumnEditIndex"
                />
              </Draggable>
              <div class="pr-8">
                <div
                  class="nodrag bg-elevation-1 bg-elevation-2-hover mr-8 flex h-min cursor-pointer flex-row items-center gap-2 rounded-md p-2"
                  @click="addColumn()"
                >
                  <PlusIcon class="text-accent h-6 w-6" />
                  <span :class="board.columns.length === 0 ? '' : 'hidden'">Add Column</span>
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
import emitter from "@/utils/emitter";
import { useTauriStore } from "@/stores/tauriStore";
import { applyDrag } from "@/utils/drag-n-drop";
import { generateUniqueID } from "@/utils/idGenerator";
import type { Board, Card, Column } from "@/types/kanban-types";

import { convertFileSrc } from '@tauri-apps/api/tauri';
import { save } from "@tauri-apps/api/dialog";
import { writeTextFile } from "@tauri-apps/api/fs";

import { default as KanbanColumn } from "@/components/kanban/Column.vue";
import { default as KanbanModal } from "@/components/modal/Kanban.vue";
import { Ref } from "vue";

//@ts-ignore
import { Container, Draggable } from "vue3-smooth-dnd";
import { useConfirmDialog } from '@vueuse/core'

import { PlusIcon, MinusIcon, EllipsisHorizontalIcon } from "@heroicons/vue/24/solid";
import { PhotoIcon } from "@heroicons/vue/24/outline";

const store = useTauriStore().store;
const route = useRoute();
const router = useRouter();

const boards: Ref<Array<Board>> = ref([]);
const board: Ref<Board> = ref({ id: "123", title: "", columns: [] });
const draggingEnabled = ref(true);

const boardTitleEditing = ref(false);
const boardTitleInput: Ref<HTMLInputElement | null> = ref(null);

const columnCardAddMode = ref(false);
const columnTitleEditing = ref(false);
const columnEditIndex = ref(0);
const columnZoomLevel = ref(0);

const bgCustom = ref("");
const bgCustomNoResolution = ref("");
const showCustomBgModal = ref(false);
const bgImageLoaded = ref(false);
const bgBlur = ref("8px");
const bgBrightness = ref("100%");

const colRefs: { [key: string]: InstanceType<typeof KanbanColumn>} = reactive({});
const kanbanModalVisible = ref(false);
const kanbanModal = ref<InstanceType<typeof KanbanModal> | null>(null);

const removeColumnModalVisible = ref(false);
const removeCardModalVisible = ref(false);
const deleteBoardModalVisible = ref(false);
const renameBoardModalVisible = ref(false);

const columnRemoveDialog = useConfirmDialog(removeColumnModalVisible);
const cardRemoveDialog = useConfirmDialog(removeCardModalVisible);

const cssVars = computed(() => {
    return {
        "--bg-custom-image": `url("${bgCustom.value}")`,
        "--blur-intensity": bgBlur.value,
        "--bg-brightness": bgBrightness.value
    }
})

onMounted(async () => {
    boards.value = await store.get("boards") || [];

    board.value = boards.value.filter((board) => {
        return board.id === route.params.id;
    })[0];

    if(!board.value) {
        console.error("Could not resolve board!");
        return;
    }

    if (board.value.background) {
        bgCustomNoResolution.value = board.value.background.src;
        bgCustom.value = convertFileSrc(board.value.background.src);

        bgBlur.value = board.value.background.blur;
        bgBrightness.value = board.value.background.brightness;
    }
    nextTick(() => bgImageLoaded.value = true);

    const columnZoom: number | null = await store.get("columnZoomLevel");

    if (columnZoom == null) {
        await store.set("columnZoomLevel", 0);
        columnZoomLevel.value = 0;
    }
    else {
        columnZoomLevel.value = columnZoom;
    }

    document.addEventListener("keydown", keyDownListener);

    emitter.emit("openKanbanPage");

    columnEditIndex.value = board.value.columns.length !== 0 ? board.value.columns.length - 1 : -1;

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
});

enum shortcutKeys {
    "ArrowLeft",
    "ArrowRight",
    "b",
    "d",
    "n",
    "t",
    "+",
    "-"
}

const setColumnEditIndex = (columnIndex: number, eventType: string) => {
    columnEditIndex.value = columnIndex;

    switch(eventType) {
    case "card-add":
        columnCardAddMode.value = true;
        break;

    case "title-edit":
        columnTitleEditing.value = true;
        break;

    default:
        break;
    }
}

const increaseZoomLevel = () => {
    if (columnZoomLevel.value + 1 > 2) return;
    columnZoomLevel.value++;
    store.set("columnZoomLevel", columnZoomLevel.value);
}

const decreaseZoomLevel = () => {
    if (columnZoomLevel.value - 1 < -1) return;
    columnZoomLevel.value--;
    store.set("columnZoomLevel", columnZoomLevel.value);
}

const keyDownListener = (e: KeyboardEvent) => {
    const controlOrMetaPressed: boolean = e.ctrlKey || e.metaKey;
    const controlIsOnlyKeyPressed: boolean = e.key == "Control" && e.location == 1;
    const metaIsOnlyKeyPressed: boolean = e.key == "Meta"

    // All shortcuts need control as a required key, but we don't want only control to trigger something
    if (!controlOrMetaPressed || controlIsOnlyKeyPressed || metaIsOnlyKeyPressed) return;

    // We do not want to override any shortcuts except the ones we mapped in the app
    if (!Object.keys(shortcutKeys).includes(e.key)) return;

    emitter.emit("resetColumnInputs");

    // Ctrl + B for new board
    if (e.key === "b") {
        addColumn();
        scrollView();
        return;
    }

    // Arrow key left to decrease
    if (e.key === "ArrowLeft") {
        if (columnEditIndex.value === 0 && board.value.columns.length !== 0) {
            columnEditIndex.value = board.value.columns.length - 1;
        } else {
            columnEditIndex.value--;
        }
    }

    // Arrow key right to increase
    if (e.key === "ArrowRight") {
        if (columnEditIndex.value == board.value.columns.length - 1 && board.value.columns.length !== 0) {
            columnEditIndex.value = 0;
        } else {
            columnEditIndex.value++;
        }
    }

    if (e.key === "+") {
        increaseZoomLevel();
    }

    if (e.key === "-") {
        decreaseZoomLevel();
    }

    const columnID =
        board.value.columns.length !== 0 && board.value.columns[columnEditIndex.value]
            ? board.value.columns[columnEditIndex.value].id
            : "-1";

    if (columnID === "-1") return; // Guard clause to prevent impossible actions

    // ctrl + d for deleting the last column
    if (e.key === "d") {
        columnEditIndex.value = board.value.columns.length !== 0 ? board.value.columns.length - 1 : -1;
        const lastColumnID = board.value.columns[columnEditIndex.value].id;

        removeColumn(lastColumnID);
        return;
    }

    // ctrl + t for enabling title editing for the last column
    if (e.key === "t" || columnTitleEditing.value === true) {
        columnTitleEditing.value = true;
        emitter.emit("enableColumnTitleEditing", columnID);
        return;
    }

    // ctrl + n for new card in the last column
    if (e.key === "n" || columnCardAddMode.value === true) {
        columnCardAddMode.value = true;
        emitter.emit("enableColumnCardAddMode", columnID);
        return;
    }
};

/**
 * Utility methods for drag and drop and misc.
 */

const scrollView = () => {
    const elem = document.getElementById("kanban-cols-container");
    if (elem == null) return;

    elem.scrollLeft = elem.scrollWidth;
};

const onDrop = (dropResult: object) => {
    board.value.columns = applyDrag(board.value.columns, dropResult);
    updateStorage();
};

/**
 * Kanban card utility methods for editing, deleting, etc.
 */

const saveColumnRef = (ref: any, columnId: String) => {
    colRefs[columnId.toString()] = ref;
}

const setCardTitle = (columnId: string, cardId: number, title: string) => {
    colRefs[columnId].setCardTitle(cardId, title);
}

const setCardDescription = (columnId: string, cardId: number, description: string) => {
    colRefs[columnId].setCardDescription(cardId, description);
}

const setCardColor = (columnId: string, cardId: number, color: string) => {
    colRefs[columnId].setCardColor(cardId, color);
}

const setCardTasks = (columnId: string, cardId: number, tasks: Array<{name: string, finished: boolean}>) => {
    colRefs[columnId].setCardTasks(cardId, tasks);
}

// Kanban card modal
const openKanbanModal = (columnId: string, cardIndex: number, el: Card) => {
    kanbanModalVisible.value = true;
    draggingEnabled.value = false;

    if (kanbanModal.value == null) return;
    kanbanModal.value.initModal(columnId, cardIndex, el.name, el.description, el.tasks, el.color);
}

const closeKanbanModal = (columnId: string) => {
    kanbanModalVisible.value = false;
    draggingEnabled.value = true;
    colRefs[columnId].enableDragging();
}

const removeCardWithConfirmation = async (columnId: string, cardIndex: number, cardRef: Ref<HTMLElement | null>) => {
    const card = board.value.columns.filter((obj: Column) => {
        return obj.id === columnId;
    })[0].cards[cardIndex];
    emitter.emit("openModalWithCustomDescription", {description: `Are you sure you want to delete the card "${card.name}"? This action cannot be undone.`});

    const { isCanceled } = await cardRemoveDialog.reveal();
    if (!isCanceled) {
        if (!cardRef.value) return;

        const oldClasses = cardRef.value.classList.value;
        cardRef.value.classList.value = oldClasses + " card-hidden";

        setTimeout(() => {
            colRefs[columnId].removeCard(cardIndex);

            if (!cardRef.value) return;
            cardRef.value.classList.value = oldClasses;
        }, 250);
    }
}

/**
 * Utility methods for creating, deleting and updating columns
 * Also includes methods to open modals which are used
 */

const addColumn = () => {
    const column = {
        id: generateUniqueID(),
        title: "New Column",
        cards: [],
    };

    board.value.columns.push(column);
    columnEditIndex.value++;
    updateStorage();
};

const openColumnRemoveDialog = async (columnID: string) => {
    const column = board.value.columns.filter((obj: Column) => {
        return obj.id === columnID;
    })[0];
    emitter.emit("openModalWithCustomDescription", {description: `Are you sure you want to delete the column "${column.title}"? This action cannot be undone.`});

    const { isCanceled } = await columnRemoveDialog.reveal();
    if (!isCanceled) {
        removeColumn(columnID);
    }
}

const removeColumn = (columnID: string) => {
    const column = board.value.columns.filter((obj: Column) => {
        return obj.id === columnID;
    })[0];

    const columnIndex = board.value.columns.indexOf(column);
    board.value.columns.splice(columnIndex, 1);
    columnEditIndex.value--;
    delete colRefs[columnID];
    updateStorage();
};

const updateColumnProperties = (columnObj: Column) => {
    const boardSaved: Board = board.value;
    const column = boardSaved.columns.filter((obj: Column) => {
        return obj.id === columnObj.id;
    })[0];

    const columnIndex = boardSaved.columns.indexOf(column);
    boardSaved.columns[columnIndex] = columnObj;

    board.value = boardSaved;
    updateStorage();
};

/**
 * Main method for updating the persistent storage, overrides old board with new one and saves to tauri store
 */
const updateStorage = () => {
    const currentBoard = boards.value.filter((obj: Board) => {
        return obj.id === board.value.id;
    })[0];

    const currentBoardIndex = boards.value.indexOf(currentBoard);
    board.value.lastEdited = new Date();
    boards.value[currentBoardIndex] = board.value; // Override old board with new one
    store.set("boards", boards.value); // Override all saved boards with new altered array which includes modified current board
};

/**
 * Utility methods for altering board (delete, export, etc.)
 */

const exportBoardToJson = async () => {
    const filePath = await save({
        title: "Select file to export data to",
        defaultPath: `./kanri_board_${board.value.id}_export.json`,
        filters: [
            {
                name: "JSON File",
                extensions: ["json"],
            },
        ],
    });

    const fileContents = JSON.stringify(
        board.value,
        null,
        2
    );

    if (filePath == null) return;
    await writeTextFile(filePath, fileContents);
}

const renameBoardModal = (index: number) => {
    const selectedBoard = boards.value[index];
    if (selectedBoard == null) {
        return console.error("Could not find board with index: ", index);
    }

    emitter.emit("openBoardRenameModal", { index: index, board: selectedBoard });
    renameBoardModalVisible.value = true;
};

const renameBoard = (index: number, name: string) => {
    if (boards.value[index] == null) {
        return console.error("Could not find board with index: ", index);
    }

    boards.value[index].title = name;
    boards.value[index].lastEdited = new Date();
    store.set("boards", boards.value);
}

const deleteBoardModal = (index: number | undefined) => {
    if (index == undefined) return console.error("Undefined board to delete, this should not happen!");

    const selectedBoard = boards.value[index];
    if (selectedBoard == null) {
        return console.error("Could not find board with index: ", index);
    }

    emitter.emit("openBoardDeleteModal", { index: index, description: `Are you sure you want to delete the board "${selectedBoard.title}"? This action cannot be undone.` });
    deleteBoardModalVisible.value = true;
}

const deleteBoard = async (boardIndex: number | undefined) => {
    if (boardIndex === -1 || boardIndex == undefined) return;

    boards.value.splice(boardIndex, 1);
    store.set("boards", boards.value);

    router.push("/");
};

const setBackgroundImage = (img: string) => {
    bgCustomNoResolution.value = img;
    bgCustom.value = convertFileSrc(img);
    board.value.background = {src: bgCustomNoResolution.value, blur: bgBlur.value, brightness: bgBrightness.value};
    updateStorage();
}

const resetBackground = () => {
    bgCustom.value = "";
    bgBlur.value = "8px";
    bgBrightness.value = "100%";

    delete board.value.background;
    updateStorage();
}

const setBlur = (blurAmount: string) => {
    bgBlur.value = blurAmount;
    board.value.background = {src: bgCustomNoResolution.value, blur: bgBlur.value, brightness: bgBrightness.value};
    updateStorage();
}

const setBrightness = (brightnessAmount: string) => {
    bgBrightness.value = brightnessAmount;
    board.value.background = {src: bgCustomNoResolution.value, blur: bgBlur.value, brightness: bgBrightness.value};
    updateStorage();
}

const enableBoardTitleEditing = () => {
    boardTitleEditing.value = true;
}

const getBoardIndex = () => {
    return boards.value.indexOf(board.value);
}
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

.bg-effect-overlay {
    z-index: 2;
    backdrop-filter: blur(var(--blur-intensity)) brightness(var(--bg-brightness));
    pointer-events: none;
}
</style>

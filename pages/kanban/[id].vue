<template>
  <div
    id="kanban-cols-container"
    class="custom-scrollbar-horizontal flex max-h-screen flex-col overflow-y-hidden pt-5"
  >
    <div class="pl-8">
      <div class="absolute top-6">
        <h1
          v-if="!boardTitleEditing"
          class="mb-4 text-4xl font-bold"
          @click="enableBoardTitleEditing()"
        >
          {{ board.title }}
        </h1>
        <input
          v-if="boardTitleEditing"
          ref="boardTitleInput"
          v-model="board.title"
          type="text"
          class="bg-elevation-2 border-accent text-no-overflow mb-4 mr-2 h-12 w-min rounded-sm border-2 border-dotted px-2 text-4xl outline-none"
          @blur="
            boardTitleEditing = false;
            updateStorage();
          "
          @keypress.enter="
            boardTitleEditing = false;
            updateStorage();
          "
        >
      </div>
      <div class="pt-16">
        <Container
          group-name="columns"
          :orientation="'horizontal'"
          :non-drag-area-selector="'nodrag'"
          drag-handle-selector=".dragging-handle"
          class="flex-row gap-4"
          @drop="onDrop"
        >
          <Draggable
            v-for="column in board.columns"
            :key="column.id"
          >
            <KanbanColumn
              :id="column.id"
              :ref="'kanbancol' + column.id"
              :title="column.title"
              :class="draggingEnabled ? 'dragging-handle' : 'nomoredragging'"
              :cards-list="column.cards"
              @updateStorage="updateColumnProperties"
              @removeColumn="removeColumn"
              @disableDragging="draggingEnabled = false"
              @enableDragging="draggingEnabled = true"
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
</template>

<script setup lang="ts">
//@ts-ignore
import { Container, Draggable } from "vue3-smooth-dnd";
import { useTauriStore } from "@/stores/tauriStore";
import { PlusIcon } from "@heroicons/vue/24/solid";

import { applyDrag } from "@/utils/drag-n-drop";
import { generateUniqueID } from "@/utils/idGenerator";
import emitter from "@/utils/emitter";

import type { Board, Column } from "~/types/kanban-types";
import { Ref } from "vue";

const store = useTauriStore().store;
const route = useRoute();

const boards: Ref<Array<Board>> = ref([]);
const board: Ref<Board> = ref({ id: "123", title: "", columns: [] });
const draggingEnabled = ref(true);

const boardTitleEditing = ref(false);
const boardTitleInput: Ref<HTMLInputElement | null> = ref(null);

const columnCardAddMode = ref(false);
const columnTitleEditing = ref(false);
const columnEditIndex = ref(0);

const enableBoardTitleEditing = () => {
    boardTitleEditing.value = true;

    nextTick(() => {
        if (boardTitleInput.value == null) return;
        boardTitleInput.value.focus();
    });
}

onMounted(async () => {
    boards.value = await store.get("boards") || [];
    board.value = boards.value[parseInt(route.params.id[0])]; // TODO: handle edge cases where for some reason id can't be parsed to int

    document.addEventListener("keydown", keyDownListener);

    emitter.emit("openKanbanPage");

    columnEditIndex.value = board.value.columns.length !== 0 ? board.value.columns.length - 1 : -1;

    emitter.on("columnActionDone", () => {
        columnCardAddMode.value = false;
        columnTitleEditing.value = false;
    });
});

onBeforeUnmount(() => {
    document.removeEventListener("keydown", keyDownListener);
    emitter.emit("closeKanbanPage");
});

const keyDownListener = (e: KeyboardEvent) => {
    const controlOrMetaPressed: boolean = e.ctrlKey || e.metaKey;
    const controlIsOnlyKeyPressed: boolean = e.key == "Control" && e.location == 1;
    const metaIsOnlyKeyPressed: boolean = e.key == "Meta"

    // All shortcuts need control as a required key, but we don't want only control to trigger something
    if (!controlOrMetaPressed || controlIsOnlyKeyPressed || metaIsOnlyKeyPressed) return;

    // We do not want to override shortcuts for copying and pasting
    if (e.key === "a" || e.key === "c" || e.key === "v" || e.key === "x") return;

    emitter.emit("resetColumnInputs", "");

    // Ctrl + B for new board
    if (e.key === "b") {
        addColumn();
        scrollView();
        return;
    }

    // Arrow key left to decrease
    if (e.keyCode === 37) {
        if (columnEditIndex.value === 0 && board.value.columns.length !== 0) {
            columnEditIndex.value = board.value.columns.length - 1;
        } else {
            columnEditIndex.value--;
        }
    }

    // Arrow key right to increase
    if (e.keyCode === 39) {
        if (columnEditIndex.value == board.value.columns.length - 1 && board.value.columns.length !== 0) {
            columnEditIndex.value = 0;
        } else {
            columnEditIndex.value++;
        }
    }

    const columnID =
        board.value.columns.length !== 0 && board.value.columns[columnEditIndex.value]
            ? board.value.columns[columnEditIndex.value].id
            : "-1";

    if (columnID === "-1") return; // Guard clause to prevent impossible actions

    // ctrl + d for deleting the last column
    if (e.key === "d") {
        const lastColumnIndex = board.value.columns.length !== 0 ? board.value.columns.length - 1 : -1;
        if (lastColumnIndex === -1) return;

        const lastColumnID = board.value.columns[lastColumnIndex].id;

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

const scrollView = () => {
    const elem = document.getElementById("kanban-cols-container");
    if (elem == null) return;

    elem.scrollLeft = elem.scrollWidth;
};

const onDrop = (dropResult: object) => {
    board.value.columns = applyDrag(board.value.columns, dropResult);
    updateStorage();
};

const addColumn = () => {
    const column = {
        id: generateUniqueID(),
        title: "New Column",
        cards: [],
    };

    board.value.columns.push(column);
    updateStorage();
};

const removeColumn = (columnID: string) => {
    const column = board.value.columns.filter((obj: Column) => {
        return obj.id === columnID;
    })[0];

    const columnIndex = board.value.columns.indexOf(column);
    board.value.columns.splice(columnIndex, 1);
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

const updateStorage = () => {
    const currentBoard = boards.value.filter((obj: Board) => {
        return obj.id === board.value.id;
    })[0];

    const currentBoardIndex = boards.value.indexOf(currentBoard);
    boards.value[currentBoardIndex] = board.value; // Override old board with new one
    store.set("boards", boards.value); // Override all saved boards with new altered array which includes modified current board
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
</style>

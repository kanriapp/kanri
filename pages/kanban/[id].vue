<template>
    <div
        class="flex flex-col overflow-y-hidden max-h-screen custom-scrollbar-horizontal"
        id="kanban-cols-container"
    >
        <h1 class="my-4 text-4xl font-bold" v-if="!boardTitleEditing"
            @click="boardTitleEditing = true; $nextTick(() => $refs.boardTitleInput.focus());"
        >
            {{ board.title }}
        </h1>

        <input
            ref="boardTitleInput"
            v-if="boardTitleEditing"
            type="text"
            v-model="board.title"
            class="w-min h-12 my-4 mr-2 px-2 text-4xl bg-elevation-2 border-accent border-2 border-dotted outline-none text-no-overflow rounded-sm"
            @blur="
                boardTitleEditing = false;
                updateStorage();
            "
            @keypress.enter="
                boardTitleEditing = false;
                updateStorage();
            "
        />

        <Container
            @drop="onDrop"
            group-name="columns"
            :orientation="'horizontal'"
            :non-drag-area-selector="'nodrag'"
            drag-handle-selector=".dragging-handle"
            class="flex-row gap-4"
        >
            <Draggable v-for="column in board.columns" :key="column.id">
                <KanbanColumn
                    :ref="'kanbancol' + column.id"
                    :id="column.id"
                    :title="column.title"
                    :class="draggingEnabled ? 'dragging-handle' : 'nomoredragging'"
                    :cardsList="column.cards"
                    @updateStorage="updateColumnProperties"
                    @removeColumn="removeColumn"
                    @disableDragging="draggingEnabled = false"
                />
            </Draggable>
            <div
                class="nodrag flex flex-row items-center gap-2 h-min p-2 bg-elevation-1 bg-elevation-2-hover cursor-pointer rounded-md"
                @click="addColumn()"
            >
                <PlusIcon class="w-6 h-6 text-accent" />
                <span :class="board.columns.length === 0 ? '' : 'hidden'">Add Column</span>
            </div>
        </Container>
    </div>
</template>

<script setup lang="ts">
import { useTauriStore } from "@/stores/tauriStore";
import { Container, Draggable } from "vue3-smooth-dnd";
import { PlusIcon } from "@heroicons/vue/24/solid";

import { applyDrag } from "@/utils/drag-n-drop";
import { generateUniqueID } from "@/utils/idGenerator";

import type { Board, Column } from "@/types/kanban-types";
import emitter from "~/utils/emitter";
import { Ref } from "vue";

const store = useTauriStore().store;
const route = useRoute();

const boards = ref([]);
const board = ref({ id: "123", title: "", columns: [] });
const draggingEnabled = ref(true);

const boardTitleEditing = ref(false);

const columnCardAddMode = ref(false);
const columnTitleEditing = ref(false);
const columnEditIndex = ref(0);

onMounted(async () => {
    boards.value = await store.get("boards");
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

const keyDownListener = (e) => {
    const controlOrMetaPressed: boolean = e.ctrlKey || e.metaKey;
    const controlIsOnlyKeyPressed: boolean = e.key == "Control" && e.location == 1;
    const metaIsOnlyKeyPressed: boolean = e.key == "Meta"

    // All shortcuts need control as a required key, but we don't want only control to trigger something
    if (!controlOrMetaPressed || controlIsOnlyKeyPressed || metaIsOnlyKeyPressed) return;

    emitter.emit("resetColumnInputs");

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

    let columnID =
        board.value.columns.length !== 0 && board.value.columns[columnEditIndex.value]
            ? board.value.columns[columnEditIndex.value].id
            : "-1";

    if (columnID === "-1") return; // Guard clause to prevent impossible actions

    // ctrl + d for deleting the last board
    if (e.key === "d") {
        const lastColumnID = board.value.columns.length !== 0 ? board.value.columns.length - 1 : -1;
        if (lastColumnID === -1) return;

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
    var elem = document.getElementById("kanban-cols-container");
    elem.scrollLeft = elem.scrollWidth;
};

const onDrop = (dropResult: object) => {
    board.value.columns = applyDrag(board.value.columns, dropResult);
    updateStorage();
};

const getChildPayload = (index: number) => {
    return board.value.columns[index];
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

const removeColumn = (columnID) => {
    const column = board.value.columns.filter((obj) => {
        return obj.id === columnID;
    })[0];

    const columnIndex = board.value.columns.indexOf(column);
    board.value.columns.splice(columnIndex, 1);
    updateStorage();
};

const updateColumnProperties = (columnObj: Column) => {
    let boardSaved: Board = board.value;
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

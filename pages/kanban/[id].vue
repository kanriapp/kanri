<template>
    <div class="flex flex-col">
        <h1 class="my-4 text-4xl font-bold">
            {{ board.title }}
        </h1>

        <div class="flex flex-row gap-4">
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
            </Container>

            <div
                class="nodrag bg-elevation-1 bg-elevation-2-hover flex h-min cursor-pointer flex-row items-center gap-2 rounded-md p-2"
                @click="addColumn()"
            >
                <PlusIcon class="w-6 h-6" />
                <span hidden>Add Board</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTauriStore } from "@/stores/tauriStore";
import { Container, Draggable } from "vue3-smooth-dnd";
import { PlusIcon } from "@heroicons/vue/solid";

import { applyDrag } from "@/utils/drag-n-drop";
import { generateUniqueID } from "@/utils/idGenerator";

import type { Board, Column } from "@/types/kanban-types";

const store = useTauriStore().store;
const route = useRoute();

const boards = ref([]);
const board = ref({ id: "123", title: "", columns: [] });
const draggingEnabled = ref(true);

onMounted(async () => {
    boards.value = await store.get("boards");
    board.value = boards.value[parseInt(route.params.id[0])];
});

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
        cards: [{ name: "Test Card" }],
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

const updateColumnProperties = (columnRef: Column) => {
    let boardSaved: Board = board.value;
    const column = boardSaved.columns.filter((obj: Column) => {
        return obj.id === columnRef.id;
    })[0];

    const columnIndex = boardSaved.columns.indexOf(column);
    boardSaved.columns[columnIndex] = columnRef;

    board.value = boardSaved;
    updateStorage();
};

const updateStorage = () => {
    // @ts-ignore
    const currentBoard = boards.value.filter((obj) => {
        // @ts-ignore
        return obj.id === board.id;
    })[0];

    // @ts-ignore
    const currentBoardIndex = boards.value.indexOf(currentBoard);
    boards.value[currentBoardIndex] = board.value; // Override old board with new one
    store.set("boards", boards.value); // Override all svaed boards with new altered array which includes modified current board
};
</script>

<style scoped>
.smooth-dnd-container.horizontal {
    display: flex;
    z-index: 1;
}
</style>

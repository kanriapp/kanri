<template>
    <div class="flex flex-col">
        <h1 class="my-4 text-2xl font-bold">
            {{ $route.params.id }} -
            {{ board.title }}
        </h1>
        <Container @drop="onDrop" group-name="columns" :orientation="'horizontal'" class="flex-row gap-4">
            <Draggable v-for="column in board.columns" :key="column.id">
                <KanbanColumn :ref="'kanbancol' + column.id" :id="column.id" :title="column.title"
                    :cardsList="column.cards" @updateStorage="updateColumnProperties" />
            </Draggable>
        </Container>


    </div>
</template>

<script setup lang="ts">
import { useTauriStore } from "@/stores/tauriStore"
import { Container, Draggable } from "vue3-smooth-dnd"

import { applyDrag } from "@/utils/drag-n-drop"

import type { Board, Column } from "@/types/kanban-types"

const store = useTauriStore().store
const route = useRoute()

const boards = ref([])
const board = ref({id: "123", title: "Loading...", columns: []})

onMounted(async () => {
    boards.value = await store.get("boards");
    board.value = boards.value[parseInt(route.params.id[0])]
})

const onDrop = (dropResult: object) => {
    board.value.columns = applyDrag(board.value.columns, dropResult);
    updateStorage();
}

const getChildPayload = (index: number) => {
    return board.value.columns[index];
}

const updateColumnProperties = (columnRef: Column) => {
    let boardSaved: Board = board.value;
    const column = boardSaved.columns.filter((obj: Column) => {
        return obj.id === columnRef.id;
    })[0];

    const columnIndex = boardSaved.columns.indexOf(column);
    boardSaved.columns[columnIndex] = columnRef;

    board.value = boardSaved;
    updateStorage();

    console.log(board)
}

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
}
</script>

<style scoped>
.smooth-dnd-container.horizontal {
    display: flex;
}
</style>

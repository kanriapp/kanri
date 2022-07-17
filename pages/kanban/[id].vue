<template>
    <div class="flex flex-col">
        <h1 class="my-4 text-2xl font-bold">
             {{ $route.params.id }} -
             {{ board.title }}
        </h1>
        <Container
            @drop="onDrop"
            group-name="columns"
            :orientation="'horizontal'"
            class="flex-row gap-4"
        >
            <Draggable v-for="column in board.lists" :key="column.id">
                <KanbanColumn
                    :ref="'kanbancol' + column.id"
                    :id="column.id"
                    :title="column.title"
                    :list="column.cards"
                />
            </Draggable>
        </Container>


    </div>
</template>

<script setup>
import { useTauriStore } from "@/stores/tauriStore"
import { Container, Draggable } from "vue3-smooth-dnd"

const store = useTauriStore().store
const route = useRoute()
const boards = await store.get("boards")
const board = boards[0]

const onDrop = () => {
    console.log(board)
}
</script>

<style scoped>
.smooth-dnd-container.horizontal {
  display: flex;
}
</style>

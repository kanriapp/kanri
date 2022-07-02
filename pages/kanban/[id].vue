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
            :get-child-payload="getChildPayload"
        >
            <Draggable>
                <div class="flex flex-row">
                    <div class="p-4 bg-elevation-1">Box 1</div>
                </div>
            </Draggable>
            <Draggable>
                <div class="flex flex-row">
                    <div class="p-4 bg-elevation-1">Box 2</div>
                </div>
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
const board = boards[route.params.id]

const onDrop = () => {
    console.log("pog")
}
</script>

<style scoped>
.smooth-dnd-container.horizontal {
  display: flex;
}
</style>

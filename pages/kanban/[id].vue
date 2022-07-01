<template>
    <div>
         {{ $route.params.id }} -
         {{ board.title }}
    </div>
</template>

<script setup>
import { useTauriStore } from "@/stores/tauriStore"
const store = useTauriStore().store
const route = useRoute()
const boards = await store.get("boards")
const board = boards[route.params.id]
console.log(board)
</script>

<style lang="scss" scoped>

</style>

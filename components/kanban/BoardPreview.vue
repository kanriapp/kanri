<template>
    <div
        class="flex flex-row gap-4 h-32 aspect-video bg-elevation-2 rounded-t-md p-2 overflow-hidden"
    >
        <div
            v-for="column in board.columns"
            :key="column.id"
            class="w-10 h-min flex flex-col gap-0.5 bg-accent rounded-sm p-1 flex-shrink-0"
        >
            <div
                v-for="card in column.cards"
                :key="card"
                class="bg-elevation-2 p-2 rounded-sm mb-1"
            ></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Board } from "@/types/kanban-types";

const props = defineProps<{
    board: Board;
}>();
</script>

<template>
    <div class="bg-elevation-1 flex flex-row items-center gap-2 rounded-md px-2">
        <PhMagnifyingGlass class="size-4" />
        <input v-model="model" placeholder="Search for cards..." class="bg-elevation-1 py-1 focus:outline-none" type="text">
    </div>
</template>

<script setup lang="ts">
import { PhMagnifyingGlass } from '@phosphor-icons/vue';

const model = defineModel<string>();
</script>

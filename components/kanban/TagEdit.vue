<template>
    <div class="flex flex-row items-center justify-between gap-3 w-full px-2 py-1 rounded-md bg-elevation-2">
        {{ tag.text }}
        <XMarkIcon @click="$emit('removeTag', tag.id)" class="size-4 cursor-pointer text-accent-hover" />
    </div>
</template>

<script setup lang="ts">
import type { Tag } from '@/types/kanban-types';
import { XMarkIcon } from '@heroicons/vue/24/solid';

const emits = defineEmits(['removeTag']);

defineProps<{
    tag: Tag;
}>()
</script>

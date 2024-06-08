<template>
    <div class="flex flex-row items-center justify-between gap-3 w-full px-2 py-1 rounded-md bg-elevation-2">

        <div class="flex flex-row gap-2">
            <input
                ref="colorInput"
                v-model="tagColor"
                type="color"
                @change="setTagColor"
            >
            {{ tag.text }}
        </div>
        <XMarkIcon @click="$emit('removeTag', tag.id)" class="size-4 cursor-pointer text-accent-hover" />
    </div>
</template>

<script setup lang="ts">
import type { Tag } from '@/types/kanban-types';
import { XMarkIcon } from '@heroicons/vue/24/solid';

const emit = defineEmits(["setTagColor", "removeTag"]);

const props = defineProps<{
    tag: Tag;
}>()

const tagColor = ref(props.tag.color);

const setTagColor = () => {
    emit("setTagColor", props.tag.id, tagColor.value);
}
</script>

<style>
input[type="color"] {
    -webkit-appearance: none;
    appearance: none;
    border-radius: 8px;
    cursor: pointer;
}
input[type="color"]::-webkit-color-swatch-wrapper {
    padding: 0;
    border-radius: 8px;
}
input[type="color"]::-webkit-color-swatch {
    border-radius: 8px;
    border-width: 1px;
    border-style: solid;
    border-color: var(--text);
}
</style>

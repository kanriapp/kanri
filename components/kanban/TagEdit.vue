<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2024 trobonox <hello@trobo.dev> -->
<!-- -->
<!-- SPDX-License-Identifier: GPL-3.0-or-later -->
<!--
Kanri is an offline Kanban board app made using Tauri and Nuxt.
Copyright (C) 2022-2024 trobonox <hello@trobo.dev>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>. -->

<template>
    <div class="bg-elevation-2 flex w-full flex-row items-center justify-between gap-3 rounded-md px-2 py-1">

        <div class="flex flex-row gap-2">
            <input
                ref="colorInput"
                v-model="tagColor"
                type="color"
                @change="setTagColor"
            >
            {{ tag.text }}
        </div>
        <XMarkIcon class="text-accent-hover size-4 cursor-pointer" @click="$emit('removeTag', tag.id)" />
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
    console.log(tagColor.value);
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

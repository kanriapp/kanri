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
  <Modal :click-outside-to-close="true" @closeModal="$emit('closeModal')">
    <template #content>
      <main class="h-[36rem] min-w-[32rem] max-w-3xl overflow-auto">
        <div class="flex flex-row items-start justify-between">
          <div class="flex flex-col gap-1">
            <h1 class="pointer-events-auto pr-5 text-2xl font-bold">
              Edit card tags
            </h1>
            <p class="text-dim-3 inline-block max-w-xl text-sm">
              Here you can edit your global tags, which are available for the
              entire board. Note: Deleting a global tag does not remove them
              from cards, but only makes it unavailable for new cards.
            </p>
          </div>
          <XMarkIcon
            class="text-accent-hover size-6 cursor-pointer"
            @click="$emit('closeModal')"
          />
        </div>
        <div class="mt-4 flex flex-col gap-4">
          <section id="bg-selection">
            <h2 class="mb-2 text-lg font-semibold">Your tags:</h2>
            <div class="flex flex-col gap-2">
              <KanbanTagEdit
                v-for="tag in tags"
                :key="tag.id"
                :tag="tag"
                @setTagColor="setTagColor"
                @removeTag="removeTag"
                @updateTagName="updateTagName"
              />
            </div>
          </section>
        </div>
      </main>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/24/solid";
import type { Tag } from "@/types/kanban-types";

const emit = defineEmits([
  "closeModal",
  "setTagColor",
  "removeTag",
  "updateTagName",
]);

defineProps<{
  tags: Array<Tag>;
}>();

const setTagColor = (tagId: string, color: string | null) => {
  emit("setTagColor", tagId, color);
};

const removeTag = (tagId: string) => {
  emit("removeTag", tagId);
};

const updateTagName = (tagId: string, newName: string) => {
  emit("updateTagName", tagId, newName);
};
</script>

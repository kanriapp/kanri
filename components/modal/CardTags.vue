<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>, gitoak, PowerfulBacon -->
<!-- -->
<!-- SPDX-License-Identifier: GPL-3.0-or-later -->
<!--
Kanri is an offline Kanban board app made using Tauri and Nuxt.
Copyright (C) 2022-2026 trobonox <hello@trobo.dev>

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
  <Modal :click-outside-to-close="!outsideClickBlocked" @closeModal="$emit('closeModal')">
    <template #content>
      <main class="flex h-[36rem] min-w-[32rem] max-w-3xl flex-col">
        <div class="flex flex-row items-start justify-between">
          <div class="flex flex-col gap-1">
            <h1 class="pointer-events-auto pr-5 text-2xl font-bold">
              {{ $t("modals.cardTags.title") }}
            </h1>
            <p class="text-dim-3 inline-block max-w-xl text-sm">
              {{ $t("modals.cardTags.description") }}
            </p>
          </div>
          <XMarkIcon
            class="text-accent-hover size-6 cursor-pointer"
            @click="$emit('closeModal')"
          />
        </div>
        <div class="mt-4 flex grow flex-col gap-4 overflow-auto pr-2">
          <section id="bg-selection">
            <h2 class="mb-2 text-lg font-semibold">
              {{ $t("modals.cardTags.tagListTitle") }}
            </h2>
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
        <div class="mt-4 flex flex-row gap-4 overflow-x-visible">
          <div class="mr-2 shrink-0 pt-0.5">
            <SquaresPlusIcon
              class="size-6" />
          </div>
          <input
            ref="newTagInput"
            v-model="newTagName"
            v-focus
            type="text"
            class="bg-elevation-3 w-full rounded-md px-1 py-0.5 outline-none"
            :placeholder="$t('modals.cardTags.addTag')"
            @keyup.enter="createTag"
            @focus="outsideClickBlocked = true"
            @blur="() => {
              outsideClickBlocked = false;
              createTag();
            }"
          >
        </div>
      </main>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { SquaresPlusIcon, XMarkIcon } from "@heroicons/vue/24/solid";
import type { Tag } from "@/types/kanban-types";

const emit = defineEmits<{
  (e: 'closeModal'): void,
  (e: 'setTagColor', tagId: string, color: string | null): void,
  (e: 'removeTag', tagId: string): void,
  (e: 'updateTagName', tagId: string, newName: string): void,
  (e: 'addGlobalTag', tag: Tag): void,
}>();

const props = defineProps<{
  tags: Array<Tag>;
}>();

// Block outside clicks when adding a tag, as a common user action is
// to use the mouse to highlight the textbox, which will likely end
// with the mouse-release outside the modal.
const outsideClickBlocked = ref(false);
const newTagName = ref('');

const newTagInput = useTemplateRef('newTagInput');

const settings = useSettingsStore();

const setTagColor = (tagId: string, color: string | null) => {
  emit("setTagColor", tagId, color);
};

const removeTag = (tagId: string) => {
  emit("removeTag", tagId);
};

const updateTagName = (tagId: string, newName: string) => {
  emit("updateTagName", tagId, newName);
};

const createTag = () => {
  if (newTagName.value.length === 0) {
    return;
  }
  if (props.tags.filter(x => x.text.toLowerCase() === newTagName.value.toLowerCase()).length > 0) {
    if (settings.animationsEnabled) {
      newTagInput.value?.classList?.add('shake');
      setTimeout(() => {
        newTagInput.value?.classList?.remove('shake');
      }, 300);
    }
    return;
  }
  emit('addGlobalTag', {
    id: generateUniqueID(),
    text: newTagName.value,
  });
  newTagName.value = '';
}
</script>
<style>

.shake {
  animation: shake-animation 0.3s forwards;
}

@keyframes shake-animation {
  0% {
    transform: translate(0px, 0px);
  }
  20% {
    transform: translate(6px, 0px);
  }
  40% {
    transform: translate(-6px, 0px);
  }
  60% {
    transform: translate(6px, 0px);
  }
  70% {
    transform: translate(-6px, 0px);
  }
  80% {
    transform: translate(6px, 0px);
  }
  90% {
    transform: translate(-6px, 0px);
  }
  100% {
    transform: translate(0px, 0px);
  }
}

</style>

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
  <Modal :blur-background="false" @closeModal="closeModal()">
    <template #content>
      <main class="min-w-[32rem] max-w-3xl" @keypress.enter="renameBoard()">
        <div class="flex flex-row items-start justify-between">
          <h1 class="pointer-events-auto pr-5 text-2xl font-bold">
            Rename Board
          </h1>
          <XMarkIcon
            class="text-accent-hover size-6 cursor-pointer"
            @click="closeModal()"
          />
        </div>
        <section id="inputs" class="mt-4 flex flex-col">
          <label class="text-medium text-dim-1 mb-2 text-lg" for="boardName"
            >Board Name</label
          >
          <input
            id="boardName"
            ref="boardNameInput"
            v-model="newBoardName"
            class="placeholder:text-dim-3-placeholder bg-elevation-2 border-elevation-3 border-accent-focus h-10 max-w-80 rounded-md border p-2 transition-colors duration-300 focus:border-2 focus:border-dotted focus:outline-none"
            maxlength="500"
            placeholder="Board Name"
            type="text"
            autofocus
          />
        </section>
        <section
          id="buttons"
          class="mt-8 flex w-full flex-row items-center justify-end gap-8"
        >
          <button
            class="text-accent-hover transition-button"
            @click="closeModal()"
          >
            Cancel
          </button>
          <button
            class="bg-accent text-buttons transition-button rounded-md px-4 py-2"
            @click="renameBoard()"
          >
            Rename
          </button>
        </section>
      </main>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import type { Board } from "@/types/kanban-types";
import type { Ref } from "vue";

import emitter from "@/utils/emitter";
import { XMarkIcon } from "@heroicons/vue/24/outline";

const emit = defineEmits<{
  (e: "closeModal"): void;
  (e: "renameBoard", boardIndex: number, newBoardName: string): void;
}>();

const boardNameInput: Ref<HTMLInputElement | null> = ref(null);

const newBoardName = ref("");
const boardIndex = ref(-1);

onMounted(() => {
  emitter.on(
    "openBoardRenameModal",
    (params: { board: Board; index: number }) => {
      newBoardName.value = params.board.title;
      boardIndex.value = params.index;

      setTimeout(() => {
        if (boardNameInput.value == null) return;
        boardNameInput.value.focus();
      }, 200);
    }
  );
});

onUnmounted(() => {
  emitter.off("openBoardRenameModal");
});

onUpdated(() => {
  nextTick(() => {
    if (boardNameInput.value == null) return;
    boardNameInput.value.focus();
  });
});

const renameBoard = () => {
  if (newBoardName.value == null || !/\S/.test(newBoardName.value)) return;

  emit("renameBoard", boardIndex.value, newBoardName.value);
  closeModal();
};

const closeModal = () => {
  newBoardName.value = "";
  emit("closeModal");
};
</script>

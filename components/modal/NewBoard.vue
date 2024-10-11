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
      <main class="min-w-[32rem] max-w-3xl" @keypress.enter="createNewBoard()">
        <div class="flex flex-row items-start justify-between">
          <h1 class="pointer-events-auto pr-5 text-2xl font-bold">
            Create a new board
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
            placeholder="Enter a board name..."
            type="text"
            @focus="boardNameEmptyError = false"
            @blur="checkIfBoardNameEmpty"
          />
          <p v-if="boardNameEmptyError" class="mt-0.5 text-red-500">
            Board name cannot be empty
          </p>

          <div class="mt-3 flex flex-row gap-4">
            <SwitchRoot
              v-model:checked="exampleColumns"
              class="bg-elevation-2 bg-accent-checked relative flex h-[24px] w-[42px] cursor-pointer rounded-full shadow-sm focus-within:outline focus-within:outline-black"
            >
              <SwitchThumb
                class="bg-button-text my-auto block size-[18px] translate-x-0.5 rounded-full shadow-sm transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]"
              />
            </SwitchRoot>
            <p>Create example columns and cards</p>
          </div>
        </section>
        <section v-if="!exampleColumns" class="mt-6">
          <div class="mb-2 flex items-center gap-2">
            <h2 class="text-medium text-dim-1 text-lg">Columns</h2>
            <div
              class="bg-accent text-buttons flex cursor-pointer items-center justify-center rounded-full p-1 text-center transition-colors"
              @click="addColumnAndScrollToEnd()"
            >
              <PhPlus class="size-4" />
            </div>
          </div>
          <div class="flex max-w-xl flex-row items-center gap-2 overflow-auto">
            <div
              v-for="(column, index) in columns"
              :key="column.id"
              class="bg-elevation-2 column flex flex-row items-center gap-2 rounded-lg p-2"
            >
              <input
                v-model="column.title"
                class="bg-elevation-3 text-normal w-32 text-ellipsis rounded-md border-none px-2 py-1 focus:outline-none"
                type="text"
              />
              <PhTrash
                class="text-accent-hover size-5 cursor-pointer"
                @click="columns.splice(index, 1)"
              />
            </div>
          </div>
        </section>
        <section
          id="buttons"
          class="mt-6 flex w-full flex-row items-center justify-end gap-8"
        >
          <button
            class="text-accent-hover transition-button"
            @click="closeModal()"
          >
            Cancel
          </button>
          <button
            class="bg-accent text-buttons transition-button rounded-md px-4 py-2"
            @click="createNewBoard()"
          >
            Create Board
          </button>
        </section>
      </main>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import type { Column } from "@/types/kanban-types";
import type { Ref } from "vue";

import emitter from "@/utils/emitter";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { PhPlus, PhTrash } from "@phosphor-icons/vue";

const emit = defineEmits<{
  (e: "closeModal"): void;
}>();

const boardNameInput: Ref<HTMLInputElement | null> = ref(null);
const boardNameEmptyError = ref(false);

const newBoardName = ref("");
const exampleColumns = ref(false);
const columns: Ref<Array<Column>> = ref([
  {
    cards: [],
    id: generateUniqueID(),
    title: "Todo",
  },
  {
    cards: [],
    id: generateUniqueID(),
    title: "Work in progress",
  },
  {
    cards: [],
    id: generateUniqueID(),
    title: "Done",
  },
]);

onUpdated(() => {
  nextTick(() => {
    if (boardNameInput.value == null) return;
    boardNameInput.value.focus();
  });
});

const checkIfBoardNameEmpty = () => {
  nextTick(() => {
    if (newBoardName.value == null || !/\S/.test(newBoardName.value)) {
      boardNameEmptyError.value = true;
    } else {
      boardNameEmptyError.value = false;
    }
  });
};

const addColumnAndScrollToEnd = () => {
  columns.value.push({
    cards: [],
    id: generateUniqueID(),
    title: "New Column",
  });
  nextTick(() => {
    const columnElements = document.querySelectorAll(".column");
    columnElements[columnElements.length - 1].scrollIntoView({
      behavior: "smooth",
    });
  });
};

const createNewBoard = () => {
  if (newBoardName.value == null || !/\S/.test(newBoardName.value)) return;

  if (exampleColumns.value === true) {
    emitter.emit("createBoard", { title: newBoardName.value });
  } else {
    emitter.emit("createBoard", {
      columns: columns.value,
      title: newBoardName.value,
    });
  }

  closeModal();
};

const closeModal = () => {
  newBoardName.value = "";
  boardNameEmptyError.value = false; // we do not want to show the error before the user clicks outside the input for the first time
  exampleColumns.value = false;
  columns.value = [
    {
      cards: [],
      id: generateUniqueID(),
      title: "Todo",
    },
    {
      cards: [],
      id: generateUniqueID(),
      title: "Work in progress",
    },
    {
      cards: [],
      id: generateUniqueID(),
      title: "Done",
    },
  ];
  emit("closeModal");
};
</script>

<style scoped>
.force-flex {
  display: flex !important;
}
</style>

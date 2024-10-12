<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2024 trobonox <hello@trobo.dev>, PwshLab -->
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
  <nav
    class="flex h-screen flex-col items-center justify-between overflow-x-hidden overflow-y-auto px-8 pb-6 pt-4 my-2"
  >
    <section id="tabitem-list" class="flex flex-col items-center gap-3">
      <PinnedItem
        v-for="board in pins"
        id="tabitem"
        :key="board.id"
        :board="board"
      />
    </section>
  </nav>
</template>

<script setup lang="ts">
import emitter from "@/utils/emitter";
import type { Board } from "@/types/kanban-types";
import PinnedItem from "./PinnedItem.vue";

const store = useTauriStore().store;
const pins: Ref<Array<Board>> = ref([]);
const boards: Ref<Array<Board>> = ref([]);

onMounted(async () => {
  boards.value = (await store.get("boards")) || [];
  pins.value = (await store.get("pins")) || [];

  emitter.on("toggleBoardPin", onPinToggle);
  emitter.on("boardDeletion", onKanbanDelete);
});

const onPinToggle = async (board: Board) => {
  const boardIsPinned = findObjectById(pins.value, board.id) ? true : false;
  if (boardIsPinned) pins.value = pins.value.filter((x) => x.id !== board.id);
  else pins.value = [board, ...pins.value];

  store.set("pins", pins.value);
};

const onKanbanDelete = async (board: Board) => {
  pins.value = pins.value.filter((x) => x.id !== board.id);
  store.set("pins", pins.value);
};
</script>

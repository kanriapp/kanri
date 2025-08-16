<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2025 trobonox <hello@trobo.dev>, PwshLab -->
<!-- -->
<!-- SPDX-License-Identifier: GPL-3.0-or-later -->
<!--
Kanri is an offline Kanban board app made using Tauri and Nuxt.
Copyright (C) 2022-2025 trobonox <hello@trobo.dev>

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
    class="my-2 flex h-screen flex-col items-center justify-between overflow-y-auto overflow-x-hidden px-8 pb-6 pt-4"
  >
    <section id="tabitem-list" class="flex flex-col items-center gap-3">
      <PinnedItem
        v-for="board in pins"
        id="tabitem"
        :key="board.id"
        :board="board"
        @setPinIcon="setPinIcon"
        @setPinTextIcon="setPinTextIcon"
        @clearPinIcon="clearPinIcon"
        @unpin="unpin"
      />
    </section>
  </nav>
</template>

<script setup lang="ts">
import emitter from "@/utils/emitter";
import type { Board } from "@/types/kanban-types";
import PinnedItem from "./PinnedItem.vue";

const store = useTauriStore().store;
const pins: Ref<
  Array<{ id: string; title: string; pinIcon?: string; pinIconText?: string }>
> = ref([]);
const boards: Ref<Array<Board>> = ref([]);

onMounted(async () => {
  boards.value = (await store.get("boards")) || [];
  pins.value = (await store.get("pins")) || [];

  emitter.on("toggleBoardPin", onPinToggle);
  emitter.on("updateBoardPin", updatePin);
  emitter.on("boardDeletion", onKanbanDelete);
});

const onPinToggle = async (board: Board) => {
  const boardIsPinned = findObjectById(pins.value, board.id) ? true : false;
  if (boardIsPinned) pins.value = pins.value.filter((x) => x.id !== board.id);
  else pins.value = [filterBoardToNameAndId(board), ...pins.value];

  store.set("pins", pins.value);
};

const updatePin = async (board: Board) => {
  const boardIsPinned = findObjectById(pins.value, board.id) ? true : false;
  if (!boardIsPinned) return;

  pins.value = pins.value.map((x) =>
    x.id === board.id ? { ...x, title: board.title } : x
  );

  store.set("pins", pins.value);
};

const persistPins = () => store.set("pins", pins.value);

const setPinIcon = async (id: string, pinIcon: string) => {
  pins.value = pins.value.map((x) =>
    x.id === id ? { ...x, pinIcon, pinIconText: undefined } : x
  );
  persistPins();
};

const setPinTextIcon = (id: string, pinIconText: string) => {
  pins.value = pins.value.map((x) =>
    x.id === id ? { ...x, pinIcon: undefined, pinIconText } : x
  );
  persistPins();
};

const clearPinIcon = (id: string) => {
  pins.value = pins.value.map((x) =>
    x.id === id ? { ...x, pinIcon: undefined, pinIconText: undefined } : x
  );
  persistPins();
};

const unpin = (id: string) => {
  pins.value = pins.value.filter((x) => x.id !== id);
  persistPins();
};

const filterBoardToNameAndId = (board: Board) => {
  return { id: board.id, title: board.title };
};

const onKanbanDelete = async (board: Board) => {
  pins.value = pins.value.filter((x) => x.id !== board.id);
  store.set("pins", pins.value);
};
</script>

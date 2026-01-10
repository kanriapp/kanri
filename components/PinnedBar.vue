<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>, PwshLab -->
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
import PinnedItem from "./PinnedItem.vue";

const boardsStore = useBoardsStore();

const { pins } = storeToRefs(boardsStore);

const setPinIcon = async (id: string, pinIcon: string) => {
  boardsStore.mutateBoardPin(id, (pin => {
    pin.pinIcon = pinIcon;
    pin.pinIconText = undefined;
  }));
}

const setPinTextIcon = (id: string, pinIconText: string) => {
  boardsStore.mutateBoardPin(id, (pin => {
    pin.pinIcon = undefined;
    pin.pinIconText = pinIconText;
  }));
}

const clearPinIcon = (id: string) => {
  boardsStore.mutateBoardPin(id, (pin => {
    pin.pinIcon = undefined;
    pin.pinIconText = undefined;
  }));
}

const unpin = (id: string) => {
  pins.value = pins.value.filter(p => p.id !== id);
}
</script>

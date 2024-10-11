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
  <div class="flex flex-row items-center">
    <Tooltip direction="top">
      <template #trigger>
        <button
          class="bg-elevation-1 bg-elevation-2-hover transition-button border-elevation-2 rounded-l-2xl border-r px-3.5 py-2"
          @click="increaseZoomLevel"
        >
          <MagnifyingGlassPlusIcon class="size-5" />
        </button>
      </template>
      <template #content> Increase zoom level </template>
    </Tooltip>
    <Tooltip direction="top">
      <template #trigger>
        <button
          class="bg-elevation-1 bg-elevation-2-hover transition-button border-elevation-2 px-3.5 py-1.5"
          @click="resetZoomLevel"
        >
          {{ columnZoomLevel * 50 + 100 }}%
        </button>
      </template>
      <template #content> Reset zoom level </template>
    </Tooltip>
    <Tooltip direction="top">
      <template #trigger>
        <button
          class="bg-elevation-1 bg-elevation-2-hover transition-button border-elevation-2 rounded-r-2xl border-l px-3.5 py-2"
          @click="decreaseZoomLevel"
        >
          <MagnifyingGlassMinusIcon class="size-5" />
        </button>
      </template>
      <template #content> Decrease zoom level </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import { useTauriStore } from "@/stores/tauriStore";
import {
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
} from "@heroicons/vue/24/solid";

const store = useTauriStore().store;
const columnZoomLevel = defineModel({ type: Number, required: true });

const increaseZoomLevel = () => {
  if (columnZoomLevel.value + 1 > 2) return;
  columnZoomLevel.value++;

  nextTick(() => {
    // nextTick required for the model value to update properly before saving
    store.set("columnZoomLevel", columnZoomLevel.value);
  });
};

const decreaseZoomLevel = () => {
  if (columnZoomLevel.value - 1 < -1) return;
  columnZoomLevel.value--;

  nextTick(() => {
    store.set("columnZoomLevel", columnZoomLevel.value);
  });
};

const resetZoomLevel = () => {
  columnZoomLevel.value = 0;

  nextTick(() => {
    store.set("columnZoomLevel", columnZoomLevel.value);
  });
};
</script>

<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2025 trobonox <hello@trobo.dev> -->
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
  <div class="flex flex-row items-center">
    <Tooltip direction="top">
      <template #trigger>
        <button
          class="bg-elevation-1 bg-elevation-2-hover transition-button border-elevation-2 rounded-l-2xl border-r px-3.5 py-2"
          @click="decreaseZoomLevel"
        >
          <MagnifyingGlassMinusIcon class="size-5" />
        </button>
      </template>
      <template #content>
        {{ $t("components.kanban.zoomAdjustment.decreaseLevel") }}
      </template>
    </Tooltip>
    <div class="relative">
      <Tooltip v-if="!isEditingManualZoom" direction="top">
        <template #trigger>
          <button
            class="bg-elevation-1 bg-elevation-2-hover transition-button border-elevation-2 px-3.5 py-1.5"
            @click="startManualZoomEditing"
            @dblclick="resetZoomLevel"
          >
            {{ columnZoomLevel }}%
          </button>
        </template>
        <template #content>
          {{ $t("components.kanban.zoomAdjustment.reset") }}
        </template>
      </Tooltip>
      <input
        v-else
        ref="manualZoomInput"
        v-model="manualZoomValue"
        class="bg-elevation-1 border-elevation-2 w-20 px-3.5 py-1.5 text-center outline-none"
        inputmode="numeric"
        type="number"
        :min="ZOOM_MIN"
        :max="ZOOM_MAX"
        @blur="commitManualZoom"
        @keyup.enter.prevent="commitManualZoom"
        @keyup.esc.prevent="cancelManualZoom"
      />
    </div>
    <Tooltip direction="top">
      <template #trigger>
        <button
          class="bg-elevation-1 bg-elevation-2-hover transition-button border-elevation-2 rounded-r-2xl border-l px-3.5 py-2"
          @click="increaseZoomLevel"
        >
          <MagnifyingGlassPlusIcon class="size-5" />
        </button>
      </template>
      <template #content>
        {{ $t("components.kanban.zoomAdjustment.increaseLevel") }}
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import { useTauriStore } from "@/stores/tauriStore";
import { clampZoom, ZOOM_MAX, ZOOM_MIN, ZOOM_STEP } from "@/utils/zoom";
import {
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
} from "@heroicons/vue/24/solid";
import { nextTick, ref } from "vue";

const store = useTauriStore().store;
const columnZoomLevel = defineModel({ type: Number, required: true });
const manualZoomValue = ref(columnZoomLevel.value.toString());
const isEditingManualZoom = ref(false);
const manualZoomInput = ref<HTMLInputElement | null>(null);

const persistZoomLevel = () => {
  nextTick(() => {
    store.set("columnZoomLevel", columnZoomLevel.value);
  });
};

const setZoomLevel = (value: number) => {
  const clamped = clampZoom(value);

  if (clamped === columnZoomLevel.value) {
    manualZoomValue.value = clamped.toString();
    return;
  }

  columnZoomLevel.value = clamped;
  manualZoomValue.value = clamped.toString();
  persistZoomLevel();
};

const increaseZoomLevel = () => {
  setZoomLevel(columnZoomLevel.value + ZOOM_STEP);
};

const decreaseZoomLevel = () => {
  setZoomLevel(columnZoomLevel.value - ZOOM_STEP);
};

const startManualZoomEditing = () => {
  manualZoomValue.value = columnZoomLevel.value.toString();
  isEditingManualZoom.value = true;

  nextTick(() => {
    manualZoomInput.value?.focus();
    manualZoomInput.value?.select();
  });
};

const cancelManualZoom = () => {
  manualZoomValue.value = columnZoomLevel.value.toString();
  isEditingManualZoom.value = false;
};

const commitManualZoom = () => {
  const parsed = Number.parseInt(manualZoomValue.value, 10);

  if (Number.isNaN(parsed)) {
    cancelManualZoom();
    return;
  }

  setZoomLevel(parsed);
  isEditingManualZoom.value = false;
};

const resetZoomLevel = () => {
  setZoomLevel(100);
};
</script>

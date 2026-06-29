<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>, jynxbt -->
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
  <div
    class="bg-elevation-1 relative flex flex-row items-center gap-2 rounded-md px-2"
  >
    <span v-if="searchFilter" class="shrink-0 p-1 font-bold">{{
      searchFilter
    }}</span>
    <input
      v-model="displayModel"
      :placeholder="$t('components.kanban.searchBar.placeholder')"
      class="bg-elevation-1 w-full flex-1 py-1 focus:outline-none"
      type="text"
      @focus="showSuggestions = true"
      @blur="handleBlur"
      @input="handleInput"
      @keydown.backspace="handleBackspace"
    >
    <button
      v-if="(displayModel?.length ?? 0) > 0 || searchFilter"
      class="bg-elevation-1 bg-elevation-2-hover absolute right-2 shrink-0 rounded-md p-1"
      @click="clearSearch"
    >
      <XMarkIcon class="size-4 shrink-0 grow-0" />
    </button>
    <PhMagnifyingGlass v-else class="size-4" />
    <div
      v-if="showSuggestions"
      class="bg-elevation-1 border-elevation-2 absolute left-0 top-10 z-10 -mr-2 w-full rounded-md border p-2"
    >
      <div>
        <span class="text-dim-3 text-sm">Search filters</span>
      </div>
      <ul class="mt-0.5 text-sm">
        <li
          class="group/item bg-elevation-2-hover flex cursor-pointer items-center justify-between rounded-md p-1 py-1.5"
          @mousedown="addFilter('name:')"
        >
          <span>name: search card names</span>
          <span class="group/edit invisible group-hover/item:visible">+</span>
        </li>
        <li
          class="group/item bg-elevation-2-hover flex cursor-pointer items-center justify-between rounded-md p-1 py-1.5"
          @mousedown="addFilter('tag:')"
        >
          <span>tag: search tags</span>
          <span class="group/edit invisible group-hover/item:visible">+</span>
        </li>
        <li
          class="group/item bg-elevation-2-hover flex cursor-pointer items-center justify-between rounded-md p-1 py-1.5"
          @mousedown="addFilter('description:')"
        >
          <span>description: search descriptions</span>
          <span class="group/edit invisible group-hover/item:visible">+</span>
        </li>
        <li
          class="group/item bg-elevation-2-hover flex cursor-pointer items-center justify-between rounded-md p-1 py-1.5"
          @mousedown="addFilter('task:')"
        >
          <span>task: search tasks</span>
          <span class="group/edit invisible group-hover/item:visible">+</span>
        </li>
        <li
          class="group/item bg-elevation-2-hover flex cursor-pointer items-center justify-between rounded-md p-1 py-1.5"
          @mousedown="addFilter('attachment:')"
        >
          <span>attachment: search attachment names</span>
          <span class="group/edit invisible group-hover/item:visible">+</span>
        </li>
        <li
          class="group/item bg-elevation-2-hover flex cursor-pointer items-center justify-between rounded-md p-1 py-1.5"
          @mousedown="addFilter('time:')"
        >
          <span>time: search all dates</span>
          <span class="group/edit invisible group-hover/item:visible">+</span>
        </li>
        <li
          class="group/item bg-elevation-2-hover flex cursor-pointer items-center justify-between rounded-md p-1 py-1.5"
          @mousedown="addFilter('created:')"
        >
          <span>created: search created dates</span>
          <span class="group/edit invisible group-hover/item:visible">+</span>
        </li>
        <li
          class="group/item bg-elevation-2-hover flex cursor-pointer items-center justify-between rounded-md p-1 py-1.5"
          @mousedown="addFilter('completed:')"
        >
          <span>completed: search completed dates</span>
          <span class="group/edit invisible group-hover/item:visible">+</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { PhMagnifyingGlass } from "@phosphor-icons/vue";
import { computed, onBeforeUnmount, ref, watch } from "vue";

const showSuggestions = ref(false);
const model = defineModel<string>();
const displayModel = ref("");
const activeFilter = ref("");
const supportedFilters = ["name:", "tag:", "description:", "task:", "attachment:", "time:", "created:", "completed:"];
let updateTimeout: ReturnType<typeof setTimeout> | null = null;

const handleBlur = () => {
  setTimeout(() => {
    showSuggestions.value = false;
  }, 50);
};

const commitModelValue = () => {
  model.value = activeFilter.value + displayModel.value;
};

const updateModelValue = (immediate = false) => {
  if (updateTimeout) clearTimeout(updateTimeout);
  if (immediate) {
    commitModelValue();
    return;
  }

  updateTimeout = setTimeout(commitModelValue, 200);
};

const handleInput = () => {
  const detectedFilter = supportedFilters.find((filter) => displayModel.value.includes(filter));
  if (detectedFilter) {
    activeFilter.value = detectedFilter;
    displayModel.value = displayModel.value.replace(detectedFilter, "");
  }

  updateModelValue();
};

const handleBackspace = (event: { preventDefault: () => void }) => {
  if (displayModel.value === "" && activeFilter.value) {
    event.preventDefault();
    activeFilter.value = "";
    updateModelValue(true);
  }
};

// add a filter prefix
const addFilter = (filter: string) => {
  activeFilter.value = filter;
  updateModelValue(true);
};

const clearSearch = () => {
  displayModel.value = "";
  activeFilter.value = "";
  if (updateTimeout) clearTimeout(updateTimeout);
  model.value = "";
};

// update display value when model changes externally
watch(
  model,
  (newValue) => {
    if (!newValue) {
      displayModel.value = "";
      activeFilter.value = "";
      return;
    }
    const detectedFilter = supportedFilters.find((filter) => newValue.startsWith(filter));
    if (detectedFilter) {
      activeFilter.value = detectedFilter;
      displayModel.value = newValue.replace(detectedFilter, "");
      return;
    }

    displayModel.value = newValue;
    activeFilter.value = "";
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  if (updateTimeout) clearTimeout(updateTimeout);
});

const searchFilter = computed(() => {
  return activeFilter.value || false;
});
</script>

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
    />
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
      class="bg-elevation-1 border-elevation-2 absolute left-1 top-12 z-10 w-full rounded-md border p-2"
    >
      <div>
        <span>search options</span>
      </div>
      <ul class="text-sm">
        <li
          class="group/item bg-elevation-2-hover my-2 flex cursor-pointer items-center justify-between rounded-sm p-1"
          @mousedown="addFilter('name:')"
        >
          <span>name: card name</span>
          <span class="group/edit invisible group-hover/item:visible">+</span>
        </li>
        <li
          class="group/item bg-elevation-2-hover my-2 flex cursor-pointer items-center justify-between rounded-sm p-1"
          @mousedown="addFilter('tag:')"
        >
          <span>tag: card tag</span>
          <span class="group/edit invisible group-hover/item:visible">+</span>
        </li>
        <li
          class="group/item bg-elevation-2-hover my-2 flex cursor-pointer items-center justify-between rounded-sm p-1"
          @mousedown="addFilter('description:')"
        >
          <span>description: card description</span>
          <span class="group/edit invisible group-hover/item:visible">+</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { PhMagnifyingGlass } from "@phosphor-icons/vue";
import { ref, computed, watch } from "vue";

const showSuggestions = ref(false);
const model = defineModel<string>();
const displayModel = ref("");
const activeFilter = ref("");

const handleBlur = () => {
  setTimeout(() => {
    showSuggestions.value = false;
  }, 50);
};

const handleInput = () => {
  if (displayModel.value.includes("name:")) {
    activeFilter.value = "name:";
    displayModel.value = displayModel.value.replace("name:", "");
  } else if (displayModel.value.includes("tag:")) {
    activeFilter.value = "tag:";
    displayModel.value = displayModel.value.replace("tag:", "");
  } else if (displayModel.value.includes("description:")) {
    activeFilter.value = "description:";
    displayModel.value = displayModel.value.replace("description:", "");
  }

  updateModelValue();
};

const handleBackspace = (event: { preventDefault: () => void }) => {
  if (displayModel.value === "" && activeFilter.value) {
    event.preventDefault();
    activeFilter.value = "";
    updateModelValue();
  }
};

// add a filter prefix
const addFilter = (filter: string) => {
  activeFilter.value = filter;
  updateModelValue();
};

const clearSearch = () => {
  displayModel.value = "";
  activeFilter.value = "";
  model.value = "";
};

// update the actual model value based on filter and display value
const updateModelValue = () => {
  model.value = activeFilter.value + displayModel.value;
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
    if (newValue.startsWith("name:")) {
      activeFilter.value = "name:";
      displayModel.value = newValue.replace("name:", "");
    } else if (newValue.startsWith("tag:")) {
      activeFilter.value = "tag:";
      displayModel.value = newValue.replace("tag:", "");
    } else if (newValue.startsWith("description:")) {
      activeFilter.value = "description:";
      displayModel.value = newValue.replace("description:", "");
    } else {
      displayModel.value = newValue;
      activeFilter.value = "";
    }
  },
  { immediate: true }
);

const searchFilter = computed(() => {
  return activeFilter.value || false;
});
</script>

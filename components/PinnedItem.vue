<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>, PwshLab, gruen132 -->
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
  <ContextMenuRoot>
    <ContextMenuTrigger>
      <Tooltip v-if="isActivePin">
        <template #trigger>
          <nuxt-link :to="'/kanban/' + props.board.id">
            <div class="bg-elevation-3 transition-button rounded-md p-2">
              <span
                v-if="customChar"
                class="size-7 flex items-center justify-center text-[20px] leading-none"
                >{{ customChar }}</span
              >
              <component v-else :is="selectedIcon" class="size-7" />
            </div>
          </nuxt-link>
        </template>

        <template #content>
          {{ props.board.title }}
        </template>
      </Tooltip>

      <Tooltip v-else>
        <template #trigger>
          <nuxt-link :to="'/kanban/' + props.board.id">
            <div class="bg-elevation-2-hover transition-button rounded-md p-2">
              <span
                v-if="customChar"
                class="size-7 flex items-center justify-center text-[20px] leading-none"
                >{{ customChar }}</span
              >
              <component v-else :is="selectedIcon" class="size-7" />
            </div>
          </nuxt-link>
        </template>

        <template #content>
          {{ props.board.title }}
        </template>
      </Tooltip>
    </ContextMenuTrigger>

    <ContextMenuPortal to=".default-layout">
      <ContextMenuContent
        class="text-normal bg-primary-darker border-elevation-1 icon-menu z-[999] w-[300px] rounded-md border p-1 shadow-lg"
      >
        <div class="px-2 pt-1.5">
          <div class="mb-2 flex rounded-md bg-elevation-2 p-0.5 text-xs font-medium">
            <button
              class="flex-1 rounded-sm px-2 py-1 transition-colors"
              :class="activeTab === 'icons' ? 'bg-elevation-3' : 'hover:bg-elevation-1'
              "
              @click="activeTab = 'icons'"
            >Icons</button>
            <button
              class="flex-1 rounded-sm px-2 py-1 transition-colors"
              :class="activeTab === 'custom' ? 'bg-elevation-3' : 'hover:bg-elevation-1'"
              @click="activeTab = 'custom'"
            >Custom</button>
          </div>
        </div>

        <template v-if="activeTab === 'icons'">
          <div class="flex flex-col gap-1 px-2 pb-1">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search icons..."
              class="bg-elevation-2 focus:ring-accent mt-1 w-full rounded px-2 py-1 text-sm focus:outline-none focus:ring-1"
            />
          </div>
          <ContextMenuSeparator class="bg-elevation-1 my-1 h-px" />

          <div v-if="searchQuery" class="max-h-[300px] overflow-y-auto">
            <div class="grid grid-cols-5 gap-1 p-1">
              <ContextMenuItem
                v-for="icon in searchResults"
                :key="icon.name"
                class="bg-elevation-2-hover flex cursor-pointer items-center justify-center rounded-md p-2"
                :class="{ 'bg-elevation-3': selectedIconName === icon.name }"
                @click="selectIcon(icon.component, icon.name)"
              >
                <Tooltip>
                  <template #trigger>
                    <component :is="icon.component" class="size-5" />
                  </template>
                  <template #content>{{ icon.name }}</template>
                </Tooltip>
              </ContextMenuItem>
            </div>
          </div>

          <div v-else class="max-h-[300px] overflow-y-auto">
            <div v-for="category in categories" :key="category">
              <ContextMenuLabel class="px-2 py-1.5 text-xs uppercase tracking-wide text-dim-3">{{
                category
              }}</ContextMenuLabel>
              <div class="grid grid-cols-5 gap-1 p-1">
                <ContextMenuItem
                  v-for="icon in getIconsByCategory(category)"
                  :key="icon.name"
                  class="bg-elevation-2-hover flex cursor-pointer items-center justify-center rounded-md p-2"
                  :class="{ 'bg-elevation-3': selectedIconName === icon.name }"
                  @click="selectIcon(icon.component, icon.name)"
                >
                  <Tooltip>
                    <template #trigger>
                      <component :is="icon.component" class="size-5" />
                    </template>
                    <template #content>{{ icon.name }}</template>
                  </Tooltip>
                </ContextMenuItem>
              </div>
              <ContextMenuSeparator
                v-if="category !== categories[categories.length - 1]"
                class="bg-elevation-1 my-1 h-px"
              />
            </div>
          </div>
        </template>

        <template v-else>
          <div class="flex flex-col gap-2 px-2 py-2">
            <label class="text-xs font-medium text-dim-3">Character / Emoji</label>
            <div class="flex items-center gap-2">
              <input
                v-model="customCharInput"
                type="text"
                maxlength="5"
                placeholder="e.g. 🐱 or A"
                class="bg-elevation-2 focus:ring-accent w-full rounded px-2 py-1 text-sm focus:outline-none focus:ring-1"
                @keydown.enter.prevent="applyCustomChar"
              />
              <button
                class="bg-accent hover:bg-accent-hover disabled:bg-elevation-2 rounded px-3 py-1 text-xs font-semibold transition-colors"
                :disabled="!customCharInput.trim()"
                @click="applyCustomChar"
              >Set</button>
            </div>
            <div class="flex gap-2">
              <button
                v-if="customChar"
                class="bg-elevation-2-hover hover:bg-elevation-3 rounded px-2 py-1 text-xs"
                @click="clearCustomChar"
              >Clear</button>
            </div>
          </div>
        </template>

        <ContextMenuSeparator class="bg-elevation-1 my-2 h-px" />
        <div class="px-2 pb-2">
          <button
            class="unpin-button bg-destructive/80 hover:bg-destructive text-destructive-content w-full rounded-md px-3 py-1.5 text-sm font-semibold transition-colors"
            @click="unpin"
          >Unpin Board</button>
        </div>
      </ContextMenuContent>
    </ContextMenuPortal>
  </ContextMenuRoot>
</template>

<script setup lang="ts">
import emitter from "@/utils/emitter";
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRoot,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "radix-vue";
import type { Component } from "vue";
import {
  availableIcons,
  categories,
  getIconsByCategory,
  searchIcons,
} from "@/utils/iconManager";

const props = defineProps<{
  board: { id: string; title: string; pinIcon?: string; pinIconText?: string };
}>();

const emit = defineEmits([
  "setPinIcon",
  "setPinTextIcon",
  "clearPinIcon",
  "unpin",
]);

const isActivePin = ref(false);
const router = useRouter();
const searchQuery = ref("");

const selectedIconName = ref("article");
const selectedIcon = shallowRef<Component>(availableIcons[0].component);
const customChar = ref<string>("");
const customCharInput = ref("");
const activeTab = ref<'icons' | 'custom'>(customChar.value ? 'custom' : 'icons');

const searchResults = computed(() => {
  if (!searchQuery.value) return [];
  return searchIcons(searchQuery.value);
});

onMounted(async () => {
  emitter.on("openKanbanPage", onNavigation);
  emitter.on("closeKanbanPage", onNavigation);

  if (props.board.pinIconText) {
    customChar.value = props.board.pinIconText;
    customCharInput.value = props.board.pinIconText;
  } else if (props.board.pinIcon) {
    const savedIcon = availableIcons.find(
      (icon) => icon.name === props.board.pinIcon
    );
    if (savedIcon) {
      selectedIcon.value = savedIcon.component;
      selectedIconName.value = savedIcon.name;
    }
  }

  onNavigation();
});

onUnmounted(() => {
  emitter.off("openKanbanPage");
  emitter.off("closeKanbanPage");
});

const selectIcon = async (icon: Component, name: string) => {
  customChar.value = ""; // reset custom char when selecting an icon
  selectedIcon.value = icon;
  selectedIconName.value = name;
  emit("setPinIcon", props.board.id, name);
};

const applyCustomChar = () => {
  const value = customCharInput.value.trim();
  if (!value) return;

  // Use at most one visible grapheme cluster (allow emoji sequences, flags, etc.)
  let truncated = value;
  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
    const iterator = segmenter.segment(value)[Symbol.iterator]();
    const first = iterator.next();
    truncated = first.value ? first.value.segment : "";
  } else {
    truncated = Array.from(value)[0] || "";
  }
  customChar.value = truncated;
  emit("setPinTextIcon", props.board.id, truncated);
};

const clearCustomChar = () => {
  customChar.value = "";
  customCharInput.value = "";
  emit("clearPinIcon", props.board.id);
};

const unpin = () => {
  emit("unpin", props.board.id);
};

const onNavigation = () => {
  isActivePin.value = false;

  if (router.currentRoute.value.path.includes("/kanban/" + props.board.id)) {
    isActivePin.value = true;
  }
};
</script>

<style scoped>
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: var(--elevation-2);
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: var(--elevation-3);
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: var(--elevation-4);
}

.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: var(--elevation-3) var(--elevation-2);
}
</style>

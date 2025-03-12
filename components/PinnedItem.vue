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
  <ContextMenuRoot>
    <ContextMenuTrigger>
      <Tooltip v-if="isActivePin">
        <template #trigger>
          <nuxt-link :to="'/kanban/' + props.board.id">
            <div class="bg-elevation-3 transition-button rounded-md p-2">
              <component :is="selectedIcon" class="size-7" />
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
              <component :is="selectedIcon" class="size-7" />
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
        class="text-normal bg-primary-darker border-elevation-1 icon-menu z-[999] min-w-[240px] rounded-md border p-1 shadow-lg"
      >
        <div class="flex flex-col gap-1 px-2 py-1.5">
          <span class="text-sm font-medium">Change Icon</span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search icons..."
            class="bg-elevation-2 focus:ring-accent mt-1 w-full rounded px-2 py-1 text-sm focus:outline-none focus:ring-1"
          />
        </div>
        <ContextMenuSeparator class="bg-elevation-1 my-1 h-px" />

        <div v-if="searchQuery" class="max-h-[300px] overflow-y-auto">
          <div class="grid grid-cols-4 gap-1 p-1">
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

        <div v-else class="max-h-[400px] overflow-y-auto">
          <div v-for="category in categories" :key="category">
            <ContextMenuLabel class="px-2 py-1.5 text-sm">{{
              category
            }}</ContextMenuLabel>
            <div class="grid grid-cols-4 gap-1 p-1">
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
      </ContextMenuContent>
    </ContextMenuPortal>
  </ContextMenuRoot>
</template>

<script setup lang="ts">
import emitter from "@/utils/emitter";
import { useTauriStore } from "@/stores/tauriStore";
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

interface PinnedIcons {
  [key: string]: string;
}


const props = defineProps<{
  board: { id: string; title: string };
}>();

const store = useTauriStore().store;
const isActivePin = ref(false);
const router = useRouter();
const searchQuery = ref("");

const selectedIconName = ref("article");
const selectedIcon = ref<Component>(availableIcons[0].component);

const searchResults = computed(() => {
  if (!searchQuery.value) return [];
  return searchIcons(searchQuery.value);
});

onMounted(async () => {
  emitter.on("openKanbanPage", onNavigation);
  emitter.on("closeKanbanPage", onNavigation);

  const savedIcons = ((await store.get("pinnedIcons")) as PinnedIcons) || {};
  if (savedIcons[props.board.id]) {
    const savedIcon = availableIcons.find(
      (icon) => icon.name === savedIcons[props.board.id]
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
  selectedIcon.value = icon;
  selectedIconName.value = name;

  const savedIcons = ((await store.get("pinnedIcons")) as PinnedIcons) || {};
  savedIcons[props.board.id] = name;
  await store.set("pinnedIcons", savedIcons);
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

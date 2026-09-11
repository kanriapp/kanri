<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev> -->
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

<!--
  A single dashboard board-preview card. Split out of pages/index.vue so the
  same card (with the same "..." menu) can be reused in the flat board grid,
  inside a category section, and inside the "Uncategorized" section.
-->

<template>
  <nuxt-link
    id="board-preview"
    :to="'/kanban/' + board.id"
    class="bg-board-preview border-elevation-1 flex flex-col rounded-md border-2 shadow-xl transition-transform hover:-translate-y-1"
  >
    <LazyKanbanBoardPreview
      :board="board"
      :is-simple-preview-mode="isSimplePreview"
    />
    <div
      class="border-accent flex flex-row justify-between border-t px-1 py-2"
    >
      <span
        class="text-no-overflow w-fit max-w-[180px] px-1 text-lg font-semibold"
      >
        {{ board.title }}
      </span>
      <Dropdown align="end" :side-offset="-10">
        <template #trigger>
          <button
            class="bg-elevation-3-hover transition-button rounded-md px-1 py-0.5"
            @click.prevent
          >
            <EllipsisHorizontalIcon class="size-6" />
          </button>
        </template>

        <template #content>
          <div class="flex flex-col">
            <!-- Group 1: Board actions -->
            <DropdownMenuItem
              class="bg-elevation-2-hover flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-1.5 pr-6 text-left"
              @click="$emit('rename')"
            >
              <span class="text-dim-2"><PhPencil class="size-5" /></span>
              <span>{{ $t("pages.kanban.renameBoardAction") }}</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              class="bg-elevation-2-hover flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-1.5 pr-6 text-left"
              @click="$emit('duplicate')"
            >
              <span class="text-dim-2"><PhCopy class="size-5" /></span>
              <span>{{ $t("pages.kanban.duplicateBoardAction") }}</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              class="bg-elevation-2-hover flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-1.5 pr-6 text-left"
              @click="$emit('export')"
            >
              <span class="text-dim-2"><PhExport class="size-5" /></span>
              <span>{{ $t("pages.kanban.exportBoardAction") }}</span>
            </DropdownMenuItem>

            <template v-if="categoriesEnabled">
              <div class="border-elevation-3 my-1 border-t"/>

              <!-- Group 2: Categorization -->
              <DropdownMenuSub>
                <DropdownMenuSubTrigger
                  class="bg-elevation-2-hover flex w-full cursor-pointer items-center justify-between gap-2 rounded-md px-4 py-1.5 pr-3 text-left"
                >
                  <span class="flex items-center gap-2">
                    <span class="text-dim-2"><PhFolder class="size-5" /></span>
                    <span>{{ $t("pages.index.moveToCategoryAction") }}</span>
                  </span>
                  <ChevronRightIcon class="size-4 shrink-0" />
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal to=".default-layout">
                  <DropdownMenuSubContent
                    class="bg-primary-darker border-elevation-1 z-[99999] min-w-[160px] rounded-md border p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] outline-none will-change-[opacity,transform]"
                    :side-offset="4"
                  >
                    <p v-if="categories.length === 0" class="text-dim-3 px-4 py-1.5 text-sm">
                      {{ $t("pages.index.newCategoryButton") }}
                    </p>
                    <DropdownMenuItem
                      v-for="category in categories"
                      :key="category.id"
                      class="bg-elevation-2-hover flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-1.5 pr-6 text-left"
                      :class="{ 'text-accent': category.id === currentCategoryId }"
                      @click="$emit('moveToCategory', category.id)"
                    >
                      <span class="text-no-overflow max-w-[160px]">{{ category.title }}</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>

              <DropdownMenuItem
                v-if="currentCategoryId"
                class="bg-elevation-2-hover flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-1.5 pr-6 text-left"
                @click="$emit('moveToCategory', null)"
              >
                <span class="text-dim-2"><PhFolderMinus class="size-5" /></span>
                <span>{{ $t("pages.index.removeFromCategoryAction") }}</span>
              </DropdownMenuItem>

              <template v-if="showCategoryReorder">
                <DropdownMenuItem
                  v-if="!isFirstInCategory"
                  class="bg-elevation-2-hover flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-1.5 pr-6 text-left"
                  @click="$emit('moveEarlier')"
                >
                  <span class="text-dim-2"><PhCaretLeft class="size-5" /></span>
                  <span>{{ $t("pages.index.moveEarlierInCategoryAction") }}</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  v-if="!isLastInCategory"
                  class="bg-elevation-2-hover flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-1.5 pr-6 text-left"
                  @click="$emit('moveLater')"
                >
                  <span class="text-dim-2"><PhCaretRight class="size-5" /></span>
                  <span>{{ $t("pages.index.moveLaterInCategoryAction") }}</span>
                </DropdownMenuItem>
              </template>
            </template>

            <div class="border-elevation-3 my-1 border-t"/>
            <!-- Group 3: Danger zone -->
            <DropdownMenuItem
              class="bg-elevation-2-hover flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-1.5 pr-6 text-left text-red-500"
              @click="$emit('delete')"
            >
              <span>
                <PhTrash class="size-5" />
              </span>
              <span>{{ $t("pages.kanban.deleteBoardAction") }}</span>
            </DropdownMenuItem>
          </div>
        </template>
      </Dropdown>
    </div>
  </nuxt-link>
</template>

<script setup lang="ts">
import type { Board, BoardCategory } from "@/types/kanban-types";

import { ChevronRightIcon } from "@heroicons/vue/24/outline";
import { EllipsisHorizontalIcon } from "@heroicons/vue/24/solid";
import {
  PhPencil,
  PhCopy,
  PhExport,
  PhTrash,
  PhFolder,
  PhFolderMinus,
  PhCaretLeft,
  PhCaretRight,
} from "@phosphor-icons/vue";

withDefaults(
  defineProps<{
    board: Board;
    isSimplePreview: boolean;
    // Whether the board-categories feature is turned on at all. When false,
    // none of the categorization menu items are shown (unmodified behavior).
    categoriesEnabled?: boolean;
    categories?: BoardCategory[];
    currentCategoryId?: string | null;
    // Only true when this card is rendered inside a category section, so we
    // know whether "move earlier/later" makes sense (not shown in
    // "Uncategorized", since that list isn't manually orderable).
    showCategoryReorder?: boolean;
    isFirstInCategory?: boolean;
    isLastInCategory?: boolean;
  }>(),
  {
    categoriesEnabled: false,
    categories: () => [],
    currentCategoryId: null,
    showCategoryReorder: false,
    isFirstInCategory: false,
    isLastInCategory: false,
  }
);

defineEmits<{
  (e: "rename"): void;
  (e: "duplicate"): void;
  (e: "export"): void;
  (e: "delete"): void;
  (e: "moveToCategory", categoryId: string | null): void;
  (e: "moveEarlier"): void;
  (e: "moveLater"): void;
}>();
</script>

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
  <Tooltip v-if="isActivePin">
    <template #trigger>
      <nuxt-link :to="'/kanban/' + props.board.id">
        <div class="bg-elevation-3 transition-button rounded-md p-2">
          <PhArticle class="size-7" />
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
          <PhArticle class="size-7" />
        </div>
      </nuxt-link>
    </template>

    <template #content>
      {{ props.board.title }}
    </template>
  </Tooltip>
</template>

<script setup lang="ts">
import emitter from "@/utils/emitter";
import { PhArticle } from "@phosphor-icons/vue";
import type { Board } from "@/types/kanban-types";

const props = defineProps<{
  board: Board;
}>();

const isActivePin = ref(false);
const router = useRouter();

onMounted(async () => {
  emitter.on("openKanbanPage", onNavigation);
  emitter.on("closeKanbanPage", onNavigation);

  onNavigation();
});

onBeforeUnmount(() => {
  // emitter.off("openKanbanPage");
  // emitter.off("closeKanbanPage");
});

const onNavigation = () => {
  isActivePin.value = false;

  if (router.currentRoute.value.path.includes("/kanban/" + props.board.id)) {
    isActivePin.value = true;
  }
};
</script>

<style scoped></style>

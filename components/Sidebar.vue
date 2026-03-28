<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>, PwshLab, gitoak -->
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
    class="border-elevation-1 bg-sidebar mr-8 flex h-screen flex-col items-center justify-between overflow-hidden border-r-2 px-8 pb-6 pt-5 shadow-md"
  >
    <ModalNewBoard
      v-show="newBoardModalVisible"
      @closeModal="newBoardModalVisible = false"
    />
    <Teleport to=".default-layout">
      <ModalHelp
        v-show="showSidebarHelpModal"
        @closeModal="showSidebarHelpModal = false"
      />
    </Teleport>

    <section id="items-top" class="flex flex-col items-center gap-4">
      <div id="logo" class="flex flex-row rounded-md">
        <IconKanri
          class="text-accent-logo-icon size-9 pl-1"
          @click="$router.push('/')"
        />
      </div>

      <Tooltip :label="$t('components.sidebar.home')">
        <template #trigger>
          <button
            class="bg-elevation-2-hover transition-button rounded-md p-2"
            @click="$router.push('/')"
          >
            <PhHouse class="size-7" />
          </button>
        </template>
      </Tooltip>

      <Tooltip v-if="showSidebarBackArrow" :label="$t('components.sidebar.back')">
        <template #trigger>
          <button
            class="bg-elevation-2-hover transition-button rounded-md p-2"
            @click="$router.go(-1)"
          >
            <PhArrowBendUpLeft class="size-7" />
          </button>
        </template>
      </Tooltip>

      <Tooltip v-if="showSidebarAddButton" :label="$t('components.sidebar.createNewBoard')">
        <template #trigger>
          <button
            class="bg-elevation-2-hover transition-button rounded-md p-2"
            @click="newBoardModalVisible = true"
          >
            <IconPhPlusCircleDuotone class="text-accent size-7" />
          </button>
        </template>
      </Tooltip>
    </section>

    <PinnedBar />

    <section id="icons-bottom" class="flex flex-col items-center gap-4">
      <Tooltip :label="$t('components.sidebar.importExport')">
        <template #trigger>
          <nuxt-link to="/import">
            <div class="bg-elevation-2-hover transition-button rounded-md p-2">
              <PhArrowsLeftRight class="size-7" />
            </div>
          </nuxt-link>
        </template>
      </Tooltip>

      <Tooltip :label="$t('components.sidebar.help')">
        <template #trigger>
          <button
            class="bg-elevation-2-hover transition-button rounded-md p-2"
            @click="showSidebarHelpModal = true"
          >
            <PhQuestion class="size-7" />
          </button>
        </template>
      </Tooltip>

      <Tooltip :label="$t('components.sidebar.settings')">
        <template #trigger>
          <nuxt-link to="/settings">
            <div class="bg-elevation-2-hover transition-button rounded-md p-2">
              <PhGearSix class="size-7" />
            </div>
          </nuxt-link>
        </template>
      </Tooltip>
    </section>
  </nav>
</template>

<script setup lang="ts">
import {
  PhArrowBendUpLeft,
  PhHouse,
  PhArrowsLeftRight,
  PhGearSix,
  PhQuestion,
} from "@phosphor-icons/vue";

const { showSidebarAddButton, showSidebarBackArrow, showSidebarHelpModal } = storeToRefs(useLayoutStore());

const newBoardModalVisible = ref(false);

onMounted(async () => {
  document.addEventListener("keydown", keyDownListener);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", keyDownListener);
});

const keyDownListener = (e: KeyboardEvent) => {
  if (e.key === "F1") {
    showSidebarHelpModal.value = true;
    return;
  }
};
</script>

<style scoped>
.bg-sidebar {
  background: radial-gradient(
    circle at top left,
    var(--elevation-1) 10%,
    transparent
  );
}
</style>

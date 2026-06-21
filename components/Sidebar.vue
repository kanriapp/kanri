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
    class="border-elevation-1 bg-sidebar z-10 mr-5 flex h-screen flex-col items-center justify-between overflow-hidden border-r px-5 pb-6 pt-5 shadow-sm"
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

    <section id="items-top" class="flex flex-col items-center gap-3">
      <div id="logo" class="flex flex-row rounded-md">
        <IconKanri
          class="text-accent-logo-icon sidebar-logo size-9 pl-1"
          @click="$router.push('/')"
        />
      </div>

      <Tooltip :label="$t('components.sidebar.home')">
        <template #trigger>
          <button
            :class="sidebarActionClass('/')"
            @click="$router.push('/')"
          >
            <PhHouse class="size-6" />
          </button>
        </template>
      </Tooltip>

      <Tooltip :label="$t('unifiedTodo.title')">
        <template #trigger>
          <nuxt-link to="/unified-todo">
            <div :class="sidebarActionClass('/unified-todo')">
              <PhListChecks class="size-6" />
            </div>
          </nuxt-link>
        </template>
      </Tooltip>

      <Tooltip :label="$t('weeklyCalendar.title')">
        <template #trigger>
          <nuxt-link to="/weekly-calendar">
            <div :class="sidebarActionClass('/weekly-calendar')">
              <PhCalendarBlank class="size-6" />
            </div>
          </nuxt-link>
        </template>
      </Tooltip>

      <Tooltip :label="$t('globalWorkflow.title')">
        <template #trigger>
          <nuxt-link to="/global-workflow">
            <div :class="sidebarActionClass('/global-workflow')">
              <PhKanban class="size-6" />
            </div>
          </nuxt-link>
        </template>
      </Tooltip>

      <Tooltip v-if="showSidebarBackArrow" :label="$t('components.sidebar.back')">
        <template #trigger>
          <button
            :class="sidebarActionClass()"
            @click="$router.go(-1)"
          >
            <PhArrowBendUpLeft class="size-6" />
          </button>
        </template>
      </Tooltip>

      <Tooltip v-if="showSidebarAddButton" :label="$t('components.sidebar.createNewBoard')">
        <template #trigger>
          <button
            :class="sidebarActionClass()"
            @click="newBoardModalVisible = true"
          >
            <IconPhPlusCircleDuotone class="text-accent size-6" />
          </button>
        </template>
      </Tooltip>
    </section>

    <PinnedBar />

    <section id="icons-bottom" class="flex flex-col items-center gap-3">
      <Tooltip :label="$t('components.sidebar.importExport')">
        <template #trigger>
          <nuxt-link to="/import">
            <div :class="sidebarActionClass('/import')">
              <PhArrowsLeftRight class="size-6" />
            </div>
          </nuxt-link>
        </template>
      </Tooltip>

      <Tooltip :label="$t('components.sidebar.help')">
        <template #trigger>
          <button
            :class="sidebarActionClass()"
            @click="showSidebarHelpModal = true"
          >
            <PhQuestion class="size-6" />
          </button>
        </template>
      </Tooltip>

      <Tooltip :label="$t('components.sidebar.settings')">
        <template #trigger>
          <nuxt-link to="/settings">
            <div :class="sidebarActionClass('/settings')">
              <PhGearSix class="size-6" />
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
  PhListChecks,
  PhCalendarBlank,
  PhKanban,
  PhQuestion,
} from "@phosphor-icons/vue";

const { showSidebarAddButton, showSidebarBackArrow, showSidebarHelpModal } = storeToRefs(useLayoutStore());
const route = useRoute();

const newBoardModalVisible = ref(false);

const isActiveRoute = (path?: string) => Boolean(path && route.path === path);

const sidebarActionClass = (path?: string) => [
  "sidebar-action bg-elevation-2-hover transition-button rounded-lg p-2",
  isActiveRoute(path) ? "sidebar-action-active" : "",
];

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
  background-color: color-mix(in srgb, var(--bg-primary) 94%, var(--elevation-1));
}

.sidebar-logo,
.sidebar-action {
  transition:
    background-color var(--motion-fast) var(--motion-ease-interaction),
    box-shadow var(--motion-fast) var(--motion-ease-interaction),
    color var(--motion-fast) var(--motion-ease-interaction),
    opacity var(--motion-fast) var(--motion-ease-interaction),
    transform var(--motion-fast) var(--motion-ease-interaction);
}

.sidebar-logo {
  cursor: pointer;
}

.sidebar-logo:hover {
  transform: translateY(-1px) scale(1.02);
}

.sidebar-action {
  color: var(--text-dim-1);
}

.sidebar-action:hover {
  color: var(--text);
}

.sidebar-action-active {
  background-color: color-mix(in srgb, var(--accent) 16%, var(--elevation-2));
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--accent) 34%, transparent);
  color: var(--accent);
}
</style>

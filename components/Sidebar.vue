<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2023 trobonox <hello@trobo.tech> -->
<!-- -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

<template>
  <nav
    class="bg-elevation-1 mr-8 flex h-screen flex-col items-center justify-between overflow-hidden px-8 pb-6 pt-4 shadow-md"
    :class="zIndexDown ? '' : 'z-50'"
  >
    <ModalNewBoard
      v-show="newBoardModalVisible"
      @closeModal="newBoardModalVisible = false"
    />
    <Teleport to=".default-layout">
      <ModalHelp
        v-show="helpModalVisible"
        @closeModal="helpModalVisible = false"
      />
    </Teleport>

    <section
      id="items-top"
      class="flex flex-col items-center gap-4"
    >
      <div
        id="logo"
        class="flex flex-row rounded-md"
      >
        <IconKanri class="h-12 w-12" />
      </div>
      <button
        v-if="showAddButton"
        v-tooltip.left-start="'Home'"
        class="bg-elevation-2-hover transition-button rounded-md p-2"
        @click="$router.push('/')"
      >
        <Icon name="ph:house" class="h-7 w-7" />
      </button>
      <button
        v-else
        v-tooltip.left-start="'Back'"
        class="bg-elevation-2-hover transition-button rounded-md p-2"
        @click="$router.go(-1)"
      >
        <Icon name="ph:arrow-bend-up-left" class="h-7 w-7" />
      </button>
      <button
        v-if="showAddButton"
        v-tooltip.left-start="'Create a new board'"
        class="bg-elevation-2-hover transition-button rounded-md p-2"
        @click="newBoardModalVisible = true"
      >
        <Icon name="ph:plus-circle-duotone" class="text-accent h-7 w-7" />
      </button>
    </section>

    <section
      id="icons-bottom"
      class="flex flex-col items-center gap-4"
    >
      <nuxt-link
        v-tooltip.left-start="'Import/Export'"
        to="/import"
      >
        <div class="bg-elevation-2-hover transition-button rounded-md p-2">
          <Icon name="ph:arrows-left-right" class="h-7 w-7" />
        </div>
      </nuxt-link>
      <button
        v-tooltip.left-start="'Help'"
        class="bg-elevation-2-hover transition-button rounded-md p-2"
        @click="helpModalVisible = true"
      >
        <Icon name="ph:question" class="h-7 w-7" />
      </button>
      <nuxt-link
        v-tooltip.left-start="'Settings'"
        to="/settings"
      >
        <div class="bg-elevation-2-hover transition-button rounded-md p-2">
          <Icon name="ph:gear-six" class="h-7 w-7" />
        </div>
      </nuxt-link>
    </section>
  </nav>
</template>

<script setup lang="ts">
import emitter from "@/utils/emitter";

const helpModalVisible = ref(false);
const newBoardModalVisible = ref(false);

const zIndexDown = ref(false);
const showAddButton = ref(true);

onMounted(() => {
    document.addEventListener("keydown", keyDownListener);

    emitter.on("zIndexDown", () => {
        zIndexDown.value = true;
    });

    emitter.on("zIndexBack", () => {
        zIndexDown.value = false;
    });

    emitter.on("openKanbanPage", () => {
        showAddButton.value = false;
    });

    emitter.on("closeKanbanPage", () => {
        showAddButton.value = true;
    });

    emitter.on("showSidebarBackArrow", () => {
        showAddButton.value = false;
    });

    emitter.on("hideSidebarBackArrow", () => {
        showAddButton.value = true;
    });
});

onBeforeUnmount(() => {
    document.removeEventListener("keydown", keyDownListener);
});

const keyDownListener = (e: KeyboardEvent) => {
    if (e.key === "F1") {
        helpModalVisible.value = true;
        return;
    }
}
</script>

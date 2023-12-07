<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2023 trobonox <hello@trobo.tech> -->
<!-- -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

<template>
  <nav
    :class="zIndexDown ? '' : 'z-50'"
    class="border-elevation-1 bg-sidebar mr-8 flex h-screen flex-col items-center justify-between overflow-hidden border-r-2 px-8 pb-6 pt-4 shadow-md"
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
        <IconKanriLightMode
          v-if="lightModeKanriIcon"
          class="h-10 w-10"
          @click="$router.push('/')"
        />
        <IconKanri
          v-else
          class="h-10 w-10"
          @click="$router.push('/')"
        />
      </div>
      <button
        v-if="showAddButton"
        v-tooltip.left-start="'Home'"
        class="bg-elevation-2-hover transition-button rounded-md p-2"
        @click="$router.push('/')"
      >
        <PhHouse class="h-7 w-7" />
      </button>
      <button
        v-else
        v-tooltip.left-start="'Back'"
        class="bg-elevation-2-hover transition-button rounded-md p-2"
        @click="$router.go(-1)"
      >
        <PhArrowBendUpLeft class="h-7 w-7" />
      </button>
      <button
        v-if="showAddButton"
        v-tooltip.left-start="'Create a new board'"
        class="bg-elevation-2-hover transition-button rounded-md p-2"
        @click="newBoardModalVisible = true"
      >
        <IconPhPlusCircleDuotone class="text-accent h-7 w-7" />
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
          <PhArrowsLeftRight class="h-7 w-7" />
        </div>
      </nuxt-link>
      <button
        v-tooltip.left-start="'Help'"
        class="bg-elevation-2-hover transition-button rounded-md p-2"
        @click="helpModalVisible = true"
      >
        <PhQuestion class="h-7 w-7" />
      </button>
      <nuxt-link
        v-tooltip.left-start="'Settings'"
        to="/settings"
      >
        <div class="bg-elevation-2-hover transition-button rounded-md p-2">
          <PhGearSix class="h-7 w-7" />
        </div>
      </nuxt-link>
    </section>
  </nav>
</template>

<script setup lang="ts">
import emitter from "@/utils/emitter";
import { PhArrowBendUpLeft, PhHouse } from "@phosphor-icons/vue";
import { PhArrowsLeftRight, PhGearSix, PhQuestion } from "@phosphor-icons/vue";

const store = useTauriStore().store;

const helpModalVisible = ref(false);
const newBoardModalVisible = ref(false);

const zIndexDown = ref(false);
const showAddButton = ref(true);

const savedColors: Ref<any> = ref(null);

onMounted(async () => {
    document.addEventListener("keydown", keyDownListener);

    savedColors.value = await store.get("colors");

    emitter.on("updateColors", async () => {
        savedColors.value = await store.get("colors");
    })

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

const lightModeKanriIcon = computed(() => {
    if (!savedColors.value) return false;

    if (getContrast(savedColors.value.elevation1) === 'text-gray-800') {
        return true;
    }

    return false;
})

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

<style scoped>
.bg-sidebar {
    background: radial-gradient(circle at top left, var(--elevation-1) 10%, transparent);
}
</style>

<template>
  <nav
    class="bg-elevation-1 mr-8 flex h-screen flex-col items-center justify-between overflow-hidden px-8 pb-6 pt-4 shadow-md"
    :class="zIndexDown ? '' : 'z-50'"
  >
    <ModalNewBoard
      v-show="newBoardModalVisible"
      @closeModal="newBoardModalVisible = false"
    />
    <ModalHelp
      v-show="helpModalVisible"
      @closeModal="helpModalVisible = false"
    />

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
      <nuxt-link to="/">
        <div class="bg-elevation-2-hover rounded-md p-2">
          <HomeIcon
            v-if="showAddButton"
            class="h-7 w-7"
          />
          <ArrowUturnLeftIcon
            v-else
            class="h-7 w-7"
          />
        </div>
      </nuxt-link>
      <button
        v-if="showAddButton"
        v-tooltip.left-start="'Create a new board'"
        class="bg-elevation-2-hover rounded-md p-2"
        @click="newBoardModalVisible = true"
      >
        <PlusCircleIcon class="text-accent h-7 w-7" />
      </button>
    </section>

    <section
      id="icons-bottom"
      class="flex flex-col items-center gap-4"
    >
      <button
        class="bg-elevation-2-hover rounded-md p-2"
        @click="helpModalVisible = true"
      >
        <QuestionMarkCircleIcon class="h-7 w-7" />
      </button>
      <nuxt-link to="/settings">
        <div class="bg-elevation-2-hover rounded-md p-2">
          <Cog6ToothIcon class="h-7 w-7" />
        </div>
      </nuxt-link>
    </section>
  </nav>
</template>

<script setup lang="ts">
import emitter from "~/utils/emitter";

import { Cog6ToothIcon, HomeIcon, PlusCircleIcon, QuestionMarkCircleIcon, ArrowUturnLeftIcon } from "@heroicons/vue/24/outline";

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

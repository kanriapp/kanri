<template>
    <nav
        class="flex flex-col items-center justify-between h-screen px-8 pb-6 pt-4 mr-8 bg-elevation-1 overflow-hidden shadow-md"
        :class="zIndexDown ? '' : 'z-50'"
    >
        <ModalNewBoard v-show="newBoardModalVisible" @closeModal="newBoardModalVisible = false" />
        <ModalHelp v-show="helpModalVisible" @closeModal="helpModalVisible = false" />

        <section id="items-top" class="flex flex-col items-center gap-4">
            <div id="logo" class="flex flex-row rounded-md">
                <IconKanri class="w-12 h-12" />
            </div>
            <nuxt-link to="/">
                <div class="p-2 bg-elevation-2-hover rounded-md">
                    <HomeIcon v-if="showAddButton" class="h-7 w-7" />
                    <ArrowUturnLeftIcon v-else class="h-7 w-7" />
                </div>
            </nuxt-link>
            <button
                v-if="showAddButton"
                class="p-2 bg-elevation-2-hover rounded-md"
                @click="newBoardModalVisible = true"
                v-tooltip.left-start="'Create a new board'"
            >
                <PlusCircleIcon class="h-7 w-7 text-accent" />
            </button>
        </section>

        <section id="icons-bottom" class="flex flex-col items-center gap-4">
            <button @click="helpModalVisible = true" class="p-2 bg-elevation-2-hover rounded-md">
                <QuestionMarkCircleIcon class="h-7 w-7" />
            </button>
            <nuxt-link to="/settings">
                <div class="p-2 bg-elevation-2-hover rounded-md">
                    <Cog6ToothIcon class="h-7 w-7" />
                </div>
            </nuxt-link>
        </section>
    </nav>
</template>

<script setup>
import emitter from "~/utils/emitter.js";

import { Cog6ToothIcon, HomeIcon, PlusCircleIcon, QuestionMarkCircleIcon, ArrowUturnLeftIcon } from "@heroicons/vue/24/outline";

const helpModalVisible = ref(false);
const newBoardModalVisible = ref(false);

const zIndexDown = ref(false);
const showAddButton = ref(true);

onMounted(() => {
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
</script>

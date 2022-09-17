<template>
    <nav
        class="flex flex-col items-center justify-between h-screen px-2 pb-6 pt-4 mr-8 bg-elevation-1 sticky left-0 top-0"
        :class="zIndexDown ? '' : 'z-50'"
    >
        <ModalHelp v-show="modalVisible" ref="modal" @closeModal="modalVisible = false" />
        <section id="items-top" class="flex flex-col items-center gap-4">
            <!-- temporary logo placeholder -->
            <div id="logo" class="flex flex-row p-1 rounded-md">
                <IconKanri class=" w-10 h-10" />
            </div>
            <nuxt-link to="/">
                <div class="p-2 bg-elevation-2-hover rounded-md">
                    <HomeIcon v-if="showAddButton" class="h-6 w-6" />
                    <ArrowUturnLeftIcon v-else class="h-6 w-6" />
                </div>
            </nuxt-link>
            <button
                v-if="showAddButton"
                class="p-2 bg-elevation-2-hover rounded-md"
                @click="emitter.emit('createBoard')"
                v-tooltip.left-start="'Create a new board'"
            >
                <PlusCircleIcon class="h-6 w-6 text-accent" />
            </button>
        </section>
        <section id="icons-bottom" class="flex flex-col items-center gap-4">
            <button @click="modalVisible = true" class="p-2 bg-elevation-2-hover rounded-md">
                <QuestionMarkCircleIcon class="h-6 w-6" />
            </button>
            <nuxt-link to="/settings">
                <div class="p-2 bg-elevation-2-hover rounded-md">
                    <Cog6ToothIcon class="h-6 w-6" />
                </div>
            </nuxt-link>
        </section>
    </nav>
</template>

<script setup>
import emitter from "~/utils/emitter.js";

import { Cog6ToothIcon, HomeIcon, PlusCircleIcon, QuestionMarkCircleIcon, ArrowUturnLeftIcon } from "@heroicons/vue/24/outline";

const modalVisible = ref(false);
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

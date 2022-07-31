<template>
    <nav class="flex flex-col items-center justify-between h-screen px-4 pb-6 pt-4 mr-8 bg-elevation-1 sticky left-0 top-0">
        <ModalHelp
            v-show="modalVisible"
            ref="modal"
            @closeModal="modalVisible = false"
        />
        <section id="items-top" class="flex flex-col items-center gap-4">
            <!-- temporary logo placeholder -->
            <div id="logo" class="flex flex-row p-2 mb-2 bg-elevation-2 rounded-md">
                <div class=" h-9 w-4 mr-1 bg-violet-600 rounded-sm"></div>
                <div class="flex flex-col gap-1">
                    <div class=" h-4 w-4 bg-teal-500 rounded-sm"></div>
                    <div class="h-4 w-4 bg-blue-500 rounded-sm"></div>
                </div>
            </div>
            <nuxt-link to="/">
                <div class="p-2 bg-elevation-2 bg-elevation-3-hover cursor-pointer rounded-md">
                    <HomeIcon class="h-6 w-6" />
                </div>
            </nuxt-link>
            <button class="rounded-md bg-accent text-buttons p-2" @click="emitter.emit('createBoard')">
                <PlusIcon class="h-6 w-6" />
            </button>
        </section>
        <section id="icons-bottom" class="flex flex-col items-center gap-4">
            <button @click="modalVisible = true">
                <div class="p-2 bg-elevation-2 bg-elevation-3-hover cursor-pointer rounded-md">
                    <QuestionMarkCircleIcon class="h-6 w-6" />
                </div>
            </button>
            <nuxt-link to="/settings">
                <div class="p-2 bg-elevation-2 bg-elevation-3-hover cursor-pointer rounded-md">
                    <CogIcon class="h-6 w-6" />
                </div>
            </nuxt-link>
        </section>
    </nav>
</template>

<script setup>
import emitter from "~/utils/emitter.js"

import { CogIcon, HomeIcon, PlusIcon, QuestionMarkCircleIcon } from "@heroicons/vue/outline"

const modalVisible = ref(false)
</script>

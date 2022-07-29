<template>
    <nav class="flex flex-col items-center justify-between h-screen px-4 pb-6 pt-4 mr-8 bg-elevation-1">
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
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                </div>
            </nuxt-link>
            <button class="rounded-md bg-accent p-2" @click="emitter.emit('createBoard')">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
            </button>
        </section>
        <section id="icons-bottom" class="flex flex-col items-center gap-4">
            <button @click="modalVisible = true">
                <div class="p-2 bg-elevation-2 bg-elevation-3-hover cursor-pointer rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            </button>
            <nuxt-link to="/settings">
                <div class="p-2 bg-elevation-2 bg-elevation-3-hover cursor-pointer rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
            </nuxt-link>
        </section>
    </nav>
</template>

<script setup>
import emitter from "~/utils/emitter.js"

const modalVisible = ref(false)
</script>

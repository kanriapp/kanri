<template>
    <Modal
        :blurBackground="false"
        @closeModal="closeModal()"
    >
        <template v-slot:content>
            <main class="max-w-[48rem] min-w-[32rem]" @keypress.enter="renameBoard()">
                <div class="flex flex-row justify-between items-start">
                    <h1 class="pointer-events-auto pr-5 text-2xl font-bold">Rename Board</h1>
                    <XMarkIcon class="h-6 w-6 cursor-pointer text-accent-hover" @click="closeModal()" />
                </div>
                <section id="inputs" class="flex flex-col mt-4">
                    <label for="boardName" class="text-lg text-medium text-dim-1 mb-2">Board Name</label>
                    <input type="text" ref="boardNameInput" id="boardName" placeholder="Board Name" v-model="newBoardName" class="max-w-[20rem] h-10 p-2 placeholder:text-dim-3-placeholder bg-elevation-2 rounded-md border border-elevation-3 border-accent-focus focus:border-2 focus:outline-none focus:border-dotted transition-colors duration-300" />
                </section>
                <section id="buttons" class="flex flex-row items-center justify-end gap-8 w-full mt-8">
                    <button class="text-accent-hover" @click="closeModal()">Cancel</button>
                    <button class="bg-accent px-4 py-2 rounded-md" @click="renameBoard()">Create Board</button>
                </section>
            </main>
        </template>
    </Modal>
</template>

<script setup lang="ts">
import emitter from "~/utils/emitter";

import { XMarkIcon } from '@heroicons/vue/24/outline';

import { Ref } from "vue";
import { Board } from "~/types/kanban-types";

const emit = defineEmits(["closeModal", "renameBoard"]);

const boardNameInput: Ref<HTMLInputElement | null> = ref(null);

const newBoardName = ref("");
const boardIndex = ref(-1);

onMounted(() => {
    emitter.on("openBoardRenameModal", (params: {index: number, board: Board}) => {
        newBoardName.value = params.board.title;
        boardIndex.value = params.index;
    })
});

onUpdated(() => {
    nextTick(() => {
        if (boardNameInput.value == null) return; 
        boardNameInput.value.focus();
    });
});

const renameBoard = () => {
    emit("renameBoard", boardIndex.value, newBoardName.value);
    newBoardName.value = "";
    emit("closeModal");
}

const closeModal = () => {
    newBoardName.value = "";
    emit("closeModal");
}
</script>

<template>
  <Modal
    :blur-background="false"
    @closeModal="closeModal()"
  >
    <template #content>
      <main
        class="min-w-[32rem] max-w-[48rem]"
        @keypress.enter="renameBoard()"
      >
        <div class="flex flex-row items-start justify-between">
          <h1 class="pointer-events-auto pr-5 text-2xl font-bold">
            Rename Board
          </h1>
          <XMarkIcon
            class="text-accent-hover h-6 w-6 cursor-pointer"
            @click="closeModal()"
          />
        </div>
        <section
          id="inputs"
          class="mt-4 flex flex-col"
        >
          <label
            for="boardName"
            class="text-medium text-dim-1 mb-2 text-lg"
          >Board Name</label>
          <input
            id="boardName"
            ref="boardNameInput"
            v-model="newBoardName"
            type="text"
            maxlength="500"
            placeholder="Board Name"
            class="placeholder:text-dim-3-placeholder bg-elevation-2 border-elevation-3 border-accent-focus h-10 max-w-[20rem] rounded-md border p-2 transition-colors duration-300 focus:border-2 focus:border-dotted focus:outline-none"
          >
        </section>
        <section
          id="buttons"
          class="mt-8 flex w-full flex-row items-center justify-end gap-8"
        >
          <button
            class="text-accent-hover"
            @click="closeModal()"
          >
            Cancel
          </button>
          <button
            class="bg-accent rounded-md px-4 py-2"
            @click="renameBoard()"
          >
            Rename
          </button>
        </section>
      </main>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import emitter from "@/utils/emitter";
import { Board } from "@/types/kanban-types";
import { Ref } from "vue";
import { XMarkIcon } from '@heroicons/vue/24/outline';

const emit = defineEmits<{
    (e: "closeModal"): void,
    (e: "renameBoard", boardIndex: number, newBoardName: string): void
}>();

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
    if (newBoardName.value == null || !(/\S/.test(newBoardName.value))) return;

    emit("renameBoard", boardIndex.value, newBoardName.value);
    closeModal();
}

const closeModal = () => {
    newBoardName.value = "";
    emit("closeModal");
}
</script>

<template>
  <div class="pt-8 pl-8">
    <ModalRenameBoard
      v-show="renameBoardModalVisible"
      @closeModal="renameBoardModalVisible = false"
      @renameBoard="renameBoard"
    />

    <h1 class="text-4xl font-bold">
      Welcome back to Kanri!
    </h1>
    <h2
      v-if="boards.length !== 0"
      class="text-dim-3 ml-1"
    >
      Your boards are ready and waiting for you.
    </h2>

    <main id="boards">
      <div
        v-if="boards.length === 0 && loading === false"
        class="items-left bg-elevation-1 mt-5 flex w-fit flex-col justify-center rounded-md p-2"
      >
        <h3 class="text-xl font-bold">
          So empty here!
        </h3>
        <span>Create a board to get started with tracking your tasks better.</span>
        <IconArrow />
      </div>

      <div
        v-else
        class="mt-5 mb-8 flex flex-row flex-wrap gap-6"
      >
        <nuxt-link
          v-for="(board, index) in boards"
          id="board-preview"
          :key="index"
          class="bg-elevation-1 flex flex-col rounded-md transition-transform hover:-translate-y-1"
          :to="'/kanban/' + index"
        >
          <KanbanBoardPreview
            :board="board"
            class=""
          />
          <div class="flex flex-row justify-between px-1 py-2">
            <span class="text-no-overflow w-fit max-w-[180px] px-1 text-lg font-semibold">
              {{ board.title }}
            </span>

            <VDropdown
              :distance="2"
              placement="bottom-end"
            >
              <button
                class="bg-elevation-3-hover rounded-md py-0.5 px-1"
                @click.prevent
              >
                <EllipsisHorizontalIcon class="h-6 w-6" />
              </button>

              <template
                #popper
              >
                <div class="flex flex-col">
                  <button
                    v-close-popper
                    class="px-4 py-1.5 hover:bg-gray-200"
                    @click="renameBoardModal(index)"
                  >
                    Rename
                  </button>
                  <button
                    v-close-popper
                    class="px-4 py-1.5 hover:bg-gray-200"
                    @click="deleteBoard(index)"
                  >
                    Delete
                  </button>
                </div>
              </template>
            </VDropdown>
          </div>
        </nuxt-link>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ask } from "@tauri-apps/api/dialog";

import { useTauriStore } from "@/stores/tauriStore";

import { generateUniqueID } from "@/utils/idGenerator.js";
import emitter from "@/utils/emitter";

import { EllipsisHorizontalIcon } from "@heroicons/vue/24/solid";

import type { Board } from "@/types/kanban-types";
import { Ref } from "vue";

const store = useTauriStore().store;
const boards: Ref<Array<Board>> = ref([]);

const loading = ref(true);
const renameBoardModalVisible = ref(false);

onMounted(async () => {
    emitter.on("createBoard", (title: string) => {
        createNewBoard(title);
    });

    boards.value = (await store.get("boards")) || [];
    loading.value = false;
});

const createNewBoard = (title: string) => {
    const board: Board = {
        id: generateUniqueID(),
        title: title,
        columns: [
            {
                id: generateUniqueID(),
                title: "Todo",
                cards: [
                    {
                        name: "Eat something tasty",
                        description: "",
                    },
                    {
                        name: "Do some important task",
                        description: "This is an extended description for an example task",
                    },
                ],
            },
            {
                id: generateUniqueID(),
                title: "Doing",
                cards: [{ name: "Doing something cool", description: "" }],
            },
            {
                id: generateUniqueID(),
                title: "Done",
                cards: [],
            },
        ],
    };

    boards.value = [...boards.value, board];
    store.set("boards", boards.value);
};

const renameBoardModal = (index: number) => {
    const selectedBoard = boards.value[index];
    if (selectedBoard == null) {
        return console.error("Could not find board with index: ", index);
    }

    emitter.emit("openBoardRenameModal", {index: index, board: selectedBoard});
    renameBoardModalVisible.value = true;
};

const renameBoard = (index: number, name: string) => {
    if (boards.value[index] == null) {
        return console.error("Could not find board with index: ", index);
    }

    boards.value[index].title = name;
    store.set("boards", boards.value);
}

const deleteBoard = async (index: number) => {
    const yes = await ask(
        `Are you sure you want to delete the board "${boards.value[index].title}"?`,
        { title: "Kanri", type: "warning" }
    );

    if (!yes) return;

    boards.value.splice(index, 1);
    store.set("boards", boards.value);
};
</script>

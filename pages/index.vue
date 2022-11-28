<template>
    <div class="pt-8 pl-8">
        <ModalRenameBoard v-show="renameBoardModalVisible" @closeModal="renameBoardModalVisible = false" @renameBoard="renameBoard" />

        <h1 class="text-4xl font-bold">Welcome back to Kanri!</h1>
        <h2 class="ml-1 text-dim-3" v-if="boards.length !== 0">
            Your boards are ready and waiting for you.
        </h2>

        <main id="boards">
            <div
                v-if="boards.length === 0 && loading === false"
                class="flex flex-col justify-center p-2 mt-5 items-left bg-elevation-1 rounded-md w-fit"
            >
                <h3 class="text-xl font-bold">So empty here!</h3>
                <span>Create a board to get started with tracking your tasks better.</span>
                <IconArrow />
            </div>

            <div v-else class="flex flex-row flex-wrap mt-5 mb-8 gap-6">
                <nuxt-link
                    v-for="(board, index) in boards"
                    id="board-preview"
                    class="flex flex-col bg-elevation-1 rounded-md hover:-translate-y-1 transition-transform"
                    :key="index"
                    :to="'/kanban/' + index"
                >
                    <KanbanBoardPreview :board="board" class="filter" />
                    <div class="flex flex-row justify-between px-1 py-2">
                        <span class="px-1 text-lg font-semibold w-fit max-w-[180px] text-no-overflow">
                            {{ board.title }}
                        </span>

                        <VDropdown :distance="2" placement="bottom-end">
                            <button
                                @click.prevent
                                class="py-0.5 px-1 bg-elevation-3-hover rounded-md"
                            >
                                <EllipsisHorizontalIcon class="h-6 w-6" />
                            </button>

                            <template #popper class="bg-elevation-1">
                                <div class="flex flex-col">
                                    <button
                                        class="hover:bg-gray-200 px-4 py-1.5"
                                        @click="renameBoardModal(index)"
                                    >
                                        Rename
                                    </button>
                                    <button
                                        class="hover:bg-gray-200 px-4 py-1.5"
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

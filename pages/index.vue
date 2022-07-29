<template>
    <div class="mt-8">
        <h1 class="text-4xl font-bold">Welcome back to Kanri!</h1>
        <h2 class="ml-1 text-dim-3" v-if="boards.length !== 0">
            Your boards are ready and waiting for you.
        </h2>

        <main id="boards">
            <div
                v-if="boards.length === 0"
                class="flex flex-col justify-center p-2 mt-5 items-left bg-elevation-1 rounded-md"
            >
                <h3 class="text-xl font-bold">So empty here!</h3>
                <span
                    >Create a board to get started with tracking your tasks
                    better.</span
                >
                <ArrowIcon />
            </div>

            <div v-else class="flex flex-row flex-wrap mt-5 mb-8 gap-6">
                <nuxt-link
                    v-for="(board, index) in boards"
                    id="board-preview"
                    class="flex flex-col bg-elevation-1 bg-elevation-2-hover rounded-md group"
                    :key="index"
                    :to="'/kanban/' + index"
                >
                    <img
                        class="w-56 rounded-t-md filter group-hover:contrast-50"
                        src="https://images.unsplash.com/photo-1656751609190-e0168efca2da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                        alt="pog"
                    />
                    <div class="flex flex-row justify-between px-1 py-2">
                        <span class="px-1 text-lg font-semibold">
                            {{ board.title }}
                        </span>
                        <VDropdown :distance="2" placement="bottom-end">
                            <button
                                @click.prevent
                                class="px-1 bg-elevation-3-hover rounded-md"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    stroke-width="2"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                                    />
                                </svg>
                            </button>

                            <template #popper class="bg-elevation-1">
                                <div class="flex flex-col">
                                    <button
                                        class="hover:bg-gray-200 px-4 py-1.5"
                                        @click="boardAction(index)"
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

<script setup>
import { useTauriStore } from "@/stores/tauriStore";
import { generateUniqueID } from "~/utils/idGenerator.js";
import emitter from "~/utils/emitter.js";

const store = useTauriStore().store;
const boards = ref([]);

onMounted(async () => {
    emitter.on("createBoard", () => {
        createNewBoard();
    });

    boards.value = (await store.get("boards")) || [];
    console.log(boards.value);
});

const boardAction = (board) => {
    console.log(board);
};

const createNewBoard = () => {
    // TODO: make a nicer onboarding process with a modal (instead of creating a full placeholder board)

    const board = {
        id: generateUniqueID(),
        title: "New Board",
        lists: [
            {
                id: generateUniqueID(),
                title: "New Column 1",
                cards: [
                    {
                        name: "Example Card 1",
                        description: "",
                    },
                    {
                        name: "Example Card 2",
                        description: "",
                    },
                ],
            },
            {
                id: generateUniqueID(),
                title: "New Column 2",
                cards: [{ name: "Example Card 3", description: "" }],
            },
        ],
    };

    boards.value = [...boards.value, board];
    store.set("boards", boards.value);
};

const deleteBoard = (index) => {
    boards.value.splice(index, 1);
};
</script>

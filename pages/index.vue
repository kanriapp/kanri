<template>
    <div class="mt-8">
        <h1 class="font-bold text-4xl">Welcome back to Kanri!</h1>
        <h2 class="ml-1 text-dim-3" v-if="boards.length !== 0">Your boards are ready and waiting for you.</h2>

        <main id="boards">
            <div v-if="boards.length === 0" class="flex flex-col items-left justify-center p-2 mt-5 bg-elevation-1 rounded-md">
                <h3 class="font-bold text-xl">So empty here!</h3>
                <span>Create a board to get started with tracking your tasks better.</span>
                <svg width="422" height="422" viewBox="0 0 422 422" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-12 h-12">
                    <path d="M3.88902 273.641C21.637 262.625 37.549 249.773 52.237 235.085C57.133 230.189 65.701 233.86 65.701 240.593C65.701 246.101 66.313 251.609 66.313 257.116C119.557 266.908 172.801 271.192 227.27 271.804C273.17 273.028 334.982 277.924 376.598 255.892C408.422 238.756 413.318 198.975 399.854 168.375C394.346 155.523 384.554 145.119 372.314 137.775C358.238 129.207 344.162 134.103 329.474 130.431C327.638 129.819 327.026 127.371 328.25 125.535C350.894 101.667 390.674 129.207 405.362 148.791C426.17 176.331 427.394 216.724 409.034 245.487C382.106 288.328 317.846 285.267 274.394 286.491C205.85 288.939 133.634 287.103 66.313 271.803C66.313 277.923 65.701 283.431 63.865 289.551C63.865 290.775 63.254 291.387 62.641 291.999C67.537 296.282 63.253 307.299 54.685 305.463C36.937 301.791 19.189 296.282 2.66499 288.327C-1.61901 284.657 -0.394977 276.701 3.88902 273.641ZM51.013 257.729C42.445 265.073 33.877 272.417 24.085 279.149C32.652 282.821 41.833 285.269 51.013 287.717C51.013 287.105 51.013 286.492 51.013 285.269C52.849 276.089 52.237 266.909 51.013 257.729Z" fill="currentColor"/>
                </svg>
            </div>

            <div v-else class="mt-5 mb-8 flex flex-row gap-6 flex-wrap">
                <nuxt-link
                    v-for="(board, index) in boards"
                    id="board-preview" class="flex flex-col bg-elevation-1 bg-elevation-2-hover rounded-md group"
                    :key="index"
                    :to="'/kanban/' + index"
                >
                    <img class="w-56 rounded-t-md filter group-hover:contrast-50" src="https://images.unsplash.com/photo-1656751609190-e0168efca2da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="pog">
                    <div class="flex flex-row justify-between py-2 px-1">
                        <span class="text-lg font-semibold px-1"> {{ board.title }} </span>
                        <VDropdown :distance="2" placement="bottom-end">
                            <button @click.prevent class="bg-elevation-3-hover rounded-md px-1">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                </svg>
                            </button>

                            <template #popper class="bg-elevation-1">
                                <div class="flex flex-col">
                                    <button class="hover:bg-gray-200 px-4 py-1.5" @click="boardAction(index)">Rename</button>
                                    <button class="hover:bg-gray-200 px-4 py-1.5" @click="boardAction(index)">Delete</button>
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
import { useTauriStore } from "@/stores/tauriStore"
import { generateUniqueID } from "~/utils/idGenerator.js";
import emitter from "~/utils/emitter.js"

const store = useTauriStore().store
const boards = ref([])

onMounted(async () => {
    emitter.on("createBoard", () => {
        createNewBoard()
    })

    boards.value = await store.get("boards") || []
    console.log(boards.value)
})

const boardAction = (board) => {
    console.log(board)
}

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

    boards.value = [...boards.value, board]
    store.set("boards", [...old_boards, board])
}
</script>

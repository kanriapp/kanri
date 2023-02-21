<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2023 trobonox <hello@trobo.tech> -->
<!-- -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

<template>
  <div class="pt-8 pl-8">
    <ModalRenameBoard
      v-show="renameBoardModalVisible"
      @closeModal="renameBoardModalVisible = false"
      @renameBoard="renameBoard"
    />

    <ModalConfirmation
      v-show="deleteBoardModalVisible"
      title="Delete Board?"
      description="Are you sure you want to delete the board? This action is irreverisble."
      confirm-button-text="Delete"
      close-button-text="Cancel"
      @closeModal="deleteBoardModalVisible = false"
      @confirmAction="deleteBoard"
    />

    <section id="welcome-text">
      <h1 class="text-4xl font-bold">
        Welcome back to Kanri!
      </h1>
      <h2
        v-if="boards.length !== 0"
        class="text-dim-3 ml-1"
      >
        Your boards are ready and waiting for you.
      </h2>
      <p
        v-if="editSortWarning"
        class="mt-1 text-red-500"
      >
        Warning: there is at least one board which does not have a valid last edited date. This is probably a remainder from a board created in an old version of Kanri. <br> Please edit all boards at least once to mitigate this behaviour.
      </p>
    </section>

    <section
      v-if="!(boards.length === 0 && loading === false)"
      id="filters"
      class="mt-2"
    >
      <div class="bg-elevation-1 bg-elevation-2-hover transition-button hide-popper-arrow w-fit rounded-md hover:cursor-pointer">
        <VDropdown
          :distance="12"
          placement="bottom-start"
        >
          <button class="flex flex-row items-center gap-2 px-4 py-2">
            <FunnelIcon class="h-6 w-6" />
            <p>{{ sortingOptionText }}</p>
            <ChevronDownIcon class="h-4 w-4" />
          </button>

          <template #popper>
            <div class="flex flex-col">
              <button
                v-close-popper
                class="px-4 py-1.5 hover:bg-gray-200"
                @click="sortBoardsAlphabetically()"
              >
                Sort Alphabetically
              </button>
              <button
                v-close-popper
                class="px-4 py-1.5 hover:bg-gray-200"
                @click="sortBoardsByCreationDate()"
              >
                Sort by creation date
              </button>
              <button
                v-close-popper
                class="px-4 py-1.5 hover:bg-gray-200"
                @click="sortBoardsByEditDate()"
              >
                Sort by last edited
              </button>
            </div>
          </template>
        </VDropdown>
      </div>
    </section>

    <main id="boards">
      <div
        v-if="boards.length === 0 && loading === false"
        class="items-left mt-2 flex w-fit flex-col justify-center rounded-md p-2"
      >
        <h3 class="text-xl font-bold">
          So empty here!
        </h3>
        <span>Create a board to get started with tracking your tasks better.</span>
        <IconArrow />

        <h3 class="mt-8 mb-0.5 text-xl font-bold">
          Have some data already?
        </h3>
        <p class="mb-4">
          You can import data from another Kanri instance or Trello below:
        </p>
        <div class="flex flex-row gap-4">
          <button @click="importFromKanri" class="bg-elevation-1 bg-elevation-2-hover border-accent cursor-pointer rounded-md border border-dotted p-4 font-semibold">
            Import from Kanri
          </button>
          <button @click="importFromTrello" class="bg-elevation-1 bg-elevation-2-hover border-accent cursor-pointer rounded-md border border-dotted p-4 font-semibold">
            Import from Trello
          </button>
        </div>
      </div>

      <div
        v-else
        class="mt-5 mb-8 flex flex-row flex-wrap gap-6"
      >
        <TransitionGroup
          v-if="!loading"
          name="list"
          tag="div"
          class="flex flex-row flex-wrap gap-6"
        >
          <nuxt-link
            v-for="(board, index) in boards"
            id="board-preview"
            :key="board.id"
            class="bg-elevation-1 flex flex-col rounded-md transition-transform hover:-translate-y-1"
            :to="'/kanban/' + board.id"
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
                  class="bg-elevation-3-hover transition-button rounded-md py-0.5 px-1"
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
                      @click="deleteBoardModal(index)"
                    >
                      Delete
                    </button>
                  </div>
                </template>
              </VDropdown>
            </div>
          </nuxt-link>
        </TransitionGroup>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import emitter from "@/utils/emitter";
import { useTauriStore } from "@/stores/tauriStore";
import { generateUniqueID } from "@/utils/idGenerator.js";
import type { Board } from "@/types/kanban-types";
import { kanriJsonSchema } from "@/types/json-schemas"

import { Ref } from "vue";

import { z, ZodError } from "zod";

import { readTextFile } from '@tauri-apps/api/fs';
import { open, message } from '@tauri-apps/api/dialog';

import { EllipsisHorizontalIcon } from "@heroicons/vue/24/solid";
import { FunnelIcon } from "@heroicons/vue/24/outline";
import { ChevronDownIcon } from "@heroicons/vue/24/outline"

const store = useTauriStore().store;
const boards: Ref<Array<Board>> = ref([]);

const loading = ref(true);
const editSortWarning = ref(false);
const renameBoardModalVisible = ref(false);
const deleteBoardModalVisible = ref(false);

const sortingOptionText = ref("Sort by creation date");

onMounted(async () => {
    emitter.on("createBoard", (title: string) => {
        createNewBoard(title);
    });

    emitter.emit("hideSidebarBackArrow");

    boards.value = (await store.get("boards")) || [];

    await setSorting();

    loading.value = false;
});


const setSorting = async () => {
    const sortingOption = await store.get("boardSortingOption");
    if (sortingOption == null) {
        await store.set("boardSortingOption", "default");
    }

    switch (sortingOption) {
    case "alphabetically":
        sortBoardsAlphabetically();
        break;

    case "edited":
        sortBoardsByEditDate();
        break;

    default:
        break;
    }
}

const createNewBoard = async (title: string) => {
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
        lastEdited: new Date()
    };

    boards.value = [...boards.value, board];
    store.set("boards", boards.value);

    await setSorting();
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

const deleteBoardModal = (index: number | undefined) => {
    if (index == undefined) return console.error("Undefined board to delete, this should not happen!");

    const selectedBoard = boards.value[index];
    if (selectedBoard == null) {
        return console.error("Could not find board with index: ", index);
    }

    emitter.emit("openBoardDeleteModal", { index: index, description: `Are you sure you want to delete the board "${selectedBoard.title}"? This action cannot be undone.` });
    deleteBoardModalVisible.value = true;
}

const deleteBoard = async (boardIndex: number | undefined) => {
    if (boardIndex === -1 || boardIndex == undefined) return;

    boards.value.splice(boardIndex, 1);
    store.set("boards", boards.value);
};

const sortBoardsAlphabetically = () => {
    editSortWarning.value = false;

    boards.value.sort((a, b) => {
        return a.title.localeCompare(b.title);
    });
    store.set("boardSortingOption", "alphabetically");
    sortingOptionText.value = "Alphabetical sort";
}

const sortBoardsByCreationDate = async () => {
    editSortWarning.value = false;

    boards.value = (await store.get("boards")) || [];
    store.set("boardSortingOption", "default");
    sortingOptionText.value = "Sort by creation date";
}

const sortBoardsByEditDate = () => {
    boards.value.sort((a, b) => {
        if (!a.lastEdited || !b.lastEdited) {
            editSortWarning.value = true;
            return -1;
        }

        return new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime();
    });
    store.set("boardSortingOption", "edited");
    sortingOptionText.value = "Sort by edit date";
}

const importFromKanri = async () => {
    const selected = await open({
        multiple: false,
        filters: [{
            name: 'JSON File',
            extensions: ['json']
        }]
    });

    if (selected === null) return;

    const textFile = await readTextFile(selected as string);
    if (!textFile) return;

    let parsedJson = null;
    try {
        parsedJson = JSON.parse(textFile);
    }
    catch (error) {
        console.error("Could not parse imported JSON;", error);
        await message('Could not load JSON file! Please check the file is correct.', { title: 'Kanri', type: 'error' });
    }
    if (parsedJson === null) return;

    let zodParsed = null;
    try {
        zodParsed = kanriJsonSchema.parse(parsedJson);
    }
    catch (error) {
        console.error(error);
        //@ts-ignore
        if (error.issues[0].code === "invalid_type" && error.issues[0].path[0] === "boards" && error.issues[0].received === "null") {
            return await message('Cannot load files with no boards. Please import a file with at least one board.', { title: 'Kanri', type: 'error' });
        }

        await message('Could not load JSON file! Please check the file is formatted correctly and not from an old version of Kanri.', { title: 'Kanri', type: 'error' });
    }
    if (zodParsed === null) return;

    store.set("boards", zodParsed.boards);
    store.set("colors", zodParsed.colors);
    store.set("activeTheme", zodParsed.activeTheme);
    if (zodParsed.columnZoomLevel) {
        store.set("columnZoomLevel", zodParsed.columnZoomLevel);
    }

    // Manual refresh
    boards.value = (await store.get("boards")) || [];
}

const importFromTrello = () => {
    // TODO
}
</script>

<style scoped>
.list-move,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

.list-leave-active {
    position: absolute;
}
</style>

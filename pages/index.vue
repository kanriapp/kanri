<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2024 trobonox <hello@trobo.dev>, gitoak, PwshLab -->
<!-- -->
<!-- SPDX-License-Identifier: GPL-3.0-or-later -->
<!--
Kanri is an offline Kanban board app made using Tauri and Nuxt.
Copyright (C) 2022-2024 trobonox <hello@trobo.dev>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>. -->

<template>
  <div class="overflow-auto pl-8 pt-6">
    <ModalRenameBoard
      v-show="renameBoardModalVisible"
      @closeModal="renameBoardModalVisible = false"
      @renameBoard="renameBoard"
    />

    <ModalConfirmation
      v-show="deleteBoardModalVisible"
      :close-button-text="$t('general.cancelAction')"
      :confirm-button-text="$t('general.deleteAction')"
      :description="
        $t('pages.index.deleteActionConfirmationText', {
          boardName: boards[boardToBeDeletedIndex]?.title,
        })
      "
      :title="$t('pages.index.deleteActionConfirmationHeading')"
      @closeModal="
        deleteBoardModalVisible = false;
        boardToBeDeletedIndex = -1;
      "
      @confirmAction="deleteBoard"
    />

    <ModalChangelog
      v-show="changelogModalVisible"
      @closeModal="changelogModalVisible = false"
    />

    <section id="welcome-text">
      <h1 class="text-4xl font-bold">
        {{ $t("pages.index.welcome") }}
      </h1>
      <h2 v-if="boards.length !== 0" class="text-dim-3 ml-1">
        {{ $t("pages.index.welcomeSubtext") }}
      </h2>
      <p v-if="editSortWarning" class="mt-1 text-red-500">
        {{ $t("pages.index.editSortWarning") }}
      </p>
    </section>

    <section
      v-if="!(boards.length === 0 && loading === false)"
      id="filters"
      class="mt-2"
    >
      <div
        class="bg-elevation-1 bg-elevation-2-hover transition-button hide-popper-arrow w-fit rounded-md hover:cursor-pointer"
      >
        <Dropdown>
          <template #trigger>
            <button class="flex flex-row items-center gap-2 px-4 py-2">
              <PhFunnel class="size-6" />
              <p>{{ sortingOptionText }}</p>
              <ChevronDownIcon class="size-4" />
            </button>
          </template>

          <template #content>
            <DropdownMenuRadioGroup
              v-model="sortingOptionRef"
              class="flex flex-col"
            >
              <DropdownMenuRadioItem
                value="alphabetically"
                class="bg-elevation-2-hover flex w-full cursor-pointer flex-row items-center rounded-md px-4 py-1.5 pl-[25px]"
                @click="sortBoardsAlphabetically()"
              >
                <DropdownMenuItemIndicator class="absolute left-2 w-[25px]">
                  <CheckIcon class="size-4" />
                </DropdownMenuItemIndicator>
                {{ $t("pages.index.sortAlphabetically") }}
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value="default"
                class="bg-elevation-2-hover flex w-full cursor-pointer flex-row items-center rounded-md px-4 py-1.5 pl-[25px] text-left"
                @click="sortBoardsByCreationDate()"
              >
                <DropdownMenuItemIndicator class="absolute left-2 w-[25px]">
                  <CheckIcon class="size-4" />
                </DropdownMenuItemIndicator>
                {{ $t("pages.index.sortByCreationDate") }}
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value="edited"
                class="bg-elevation-2-hover flex w-full cursor-pointer flex-row items-center rounded-md px-4 py-1.5 pl-[25px] text-left"
                @click="sortBoardsByEditDate()"
              >
                <DropdownMenuItemIndicator class="absolute left-2 w-[25px]">
                  <CheckIcon class="size-4" />
                </DropdownMenuItemIndicator>
                {{ $t("pages.index.sortByLastEdited") }}
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator class="bg-elevation-2 m-[5px] h-px" />
            <DropdownMenuCheckboxItem
              v-model:checked="reverseSortOrder"
              class="bg-elevation-2-hover flex w-full cursor-pointer flex-row items-center rounded-md px-4 py-1.5 pl-[25px] text-left"
              @click="reverseCurrentSorting"
            >
              <DropdownMenuItemIndicator class="absolute left-2 w-[25px]">
                <CheckIcon class="size-4" />
              </DropdownMenuItemIndicator>
              {{ $t("pages.index.reversedSortOrder") }}
            </DropdownMenuCheckboxItem>
          </template>
        </Dropdown>
      </div>
    </section>

    <main id="boards">
      <div
        v-if="boards.length === 0 && loading === false"
        class="items-left mt-2 flex w-fit flex-col justify-center rounded-md p-2"
      >
        <h3 class="text-xl font-bold">
          {{ $t("pages.index.noBoardsHeading") }}
        </h3>
        <span>{{ $t("pages.index.createBoardPrompt") }}</span>
        <IconArrow />

        <h3 class="mb-0.5 mt-8 text-xl font-bold">
          {{ $t("pages.index.importDataHeading") }}
        </h3>
        <p class="mb-4">
          {{ $t("pages.index.importDataPrompt") }}
        </p>
        <nuxt-link
          class="bg-elevation-1 bg-elevation-2-hover border-accent cursor-pointer rounded-md border border-dotted p-4 text-center font-semibold"
          to="/import"
        >
          {{ $t("pages.index.importDataButton") }}
        </nuxt-link>

        <div class="flex w-full flex-col items-start">
          <h3 class="mb-4 mt-10 text-xl font-bold">
            {{ $t("pages.index.getUpdatesHeading") }}
          </h3>
          <a
            href="https://discord.gg/AVqHrvxB9C"
            target="_blank"
            class="bg-accent cursor-pointer rounded-md px-6 py-2 text-center font-semibold transition-colors"
            >{{ $t("pages.index.joinDiscordButton") }}</a
          >
        </div>
      </div>

      <div v-else class="mb-8 mt-6 flex flex-row flex-wrap gap-6">
        <TransitionGroup
          v-if="!loading"
          class="flex flex-row flex-wrap gap-6"
          name="list"
          tag="div"
        >
          <nuxt-link
            v-for="(board, index) in boards"
            id="board-preview"
            :key="board.id"
            :to="'/kanban/' + board.id"
            class="bg-board-preview border-elevation-1 flex flex-col rounded-md border-2 shadow-xl transition-transform hover:-translate-y-1"
          >
            <LazyKanbanBoardPreview
              :board="board"
              :is-simple-preview-mode="boards.length >= 25"
            />
            <div
              class="border-accent flex flex-row justify-between border-t px-1 py-2"
            >
              <span
                class="text-no-overflow w-fit max-w-[180px] px-1 text-lg font-semibold"
              >
                {{ board.title }}
              </span>
              <Dropdown align="end" :side-offset="-10">
                <template #trigger>
                  <button
                    class="bg-elevation-3-hover transition-button rounded-md px-1 py-0.5"
                    @click.prevent
                  >
                    <EllipsisHorizontalIcon class="size-6" />
                  </button>
                </template>

                <template #content>
                  <div class="flex flex-col items-start">
                    <DropdownMenuItem
                      class="bg-elevation-2-hover w-full cursor-pointer rounded-md px-2 py-1.5 text-left"
                      @click="renameBoardModal(index)"
                    >
                      {{ $t("general.renameAction") }}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      class="bg-elevation-2-hover w-full cursor-pointer rounded-md px-2 py-1.5 text-left"
                      @click="deleteBoardModal(index)"
                    >
                      {{ $t("general.deleteAction") }}
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuArrow
                    class="fill-bg-primary-darker"
                    :width="10"
                  />
                </template>
              </Dropdown>
            </div>
          </nuxt-link>
        </TransitionGroup>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { Board, Column } from "@/types/kanban-types";
import type { Ref } from "vue";

import { useTauriStore } from "@/stores/tauriStore";
import emitter from "@/utils/emitter";
import { generateUniqueID } from "@/utils/idGenerator.js";
import { ChevronDownIcon } from "@heroicons/vue/24/outline";
import { CheckIcon, EllipsisHorizontalIcon } from "@heroicons/vue/24/solid";
import { PhFunnel } from "@phosphor-icons/vue";
import { useI18n } from "vue-i18n";

const store = useTauriStore().store;
const boards: Ref<Array<Board>> = ref([]);

const loading = ref(true);
const editSortWarning = ref(false);
const renameBoardModalVisible = ref(false);
const deleteBoardModalVisible = ref(false);
const changelogModalVisible = ref(false);

const sortingOptionRef = ref("");
const reverseSortOrder = ref(false);
const sortingOptionText = ref("Sort by creation date");

const boardToBeDeletedIndex = ref(-1);
const { t } = useI18n();

onMounted(async () => {
  emitter.on("createBoard", async ({ columns, title }) => {
    await createNewBoard(title, columns);
  });

  emitter.on("openChangelogModal", () => (changelogModalVisible.value = true));

  emitter.emit("hideSidebarBackArrow");

  boards.value = (await store.get("boards")) || [];

  await setSorting();

  loading.value = false;
});

onBeforeUnmount(() => {
  // Make sure we properly remove our event listeners
  emitter.off("createBoard");
  emitter.off("openChangelogModal");
});

const setSorting = async () => {
  const sortingOption = await store.get("boardSortingOption");
  if (sortingOption == null) {
    await store.set("boardSortingOption", "default");
  }

  let savedSortPreference = await store.get("reverseSorting");
  if (savedSortPreference == null) {
    savedSortPreference = "false";
  }
  savedSortPreference = Boolean(savedSortPreference as string).valueOf();

  sortingOptionRef.value = (sortingOption as string) || "default";
  reverseSortOrder.value = savedSortPreference as boolean;

  switch (sortingOption) {
    case "alphabetically":
      sortBoardsAlphabetically();
      break;

    case "edited":
      sortBoardsByEditDate();
      break;

    default:
      if (reverseSortOrder.value) {
        boards.value.reverse();
      }
      break;
  }
};

const reverseCurrentSorting = async () => {
  let savedSortPreference = await store.get("reverseSorting");
  if (savedSortPreference == null) {
    savedSortPreference = "false";
  }
  savedSortPreference = Boolean(savedSortPreference as string).valueOf();

  reverseSortOrder.value = !savedSortPreference;
  await store.set("reverseSorting", !savedSortPreference);

  boards.value.reverse();
};

const createNewBoard = async (title: string, columns?: Column[]) => {
  const exampleColumns = [
    {
      cards: [
        {
          description: "",
          name: "Eat something tasty",
        },
        {
          description: "This is an extended description for an example task",
          name: "Do some important task",
        },
      ],
      id: generateUniqueID(),
      title: "Todo",
    },
    {
      cards: [{ description: "", name: "Doing something cool" }],
      id: generateUniqueID(),
      title: "Doing",
    },
    {
      cards: [],
      id: generateUniqueID(),
      title: "Done",
    },
  ];

  const board: Board = {
    columns: columns || exampleColumns,
    id: generateUniqueID(),
    lastEdited: new Date(),
    title: title,
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

  emitter.emit("openBoardRenameModal", { board: selectedBoard, index: index });
  renameBoardModalVisible.value = true;
};

const renameBoard = async (index: number, name: string) => {
  if (boards.value[index] == null) {
    return console.error("Could not find board with index: ", index);
  }

  boards.value[index].title = name;
  boards.value[index].lastEdited = new Date();
  store.set("boards", boards.value);

  await setSorting();
};

const deleteBoardModal = (index: number | undefined) => {
  if (index == undefined)
    return console.error("Undefined board to delete, this should not happen!");

  boardToBeDeletedIndex.value = index;

  const selectedBoard = boards.value[index];
  if (selectedBoard == null) {
    return console.error("Could not find board with index: ", index);
  }

  emitter.emit("openBoardDeleteModal", {
    description: t("pages.index.deleteActionConfirmationText", {
      boardName: selectedBoard.title,
    }),
    index: index,
  });
  deleteBoardModalVisible.value = true;
};

const deleteBoard = async (boardIndex: number | undefined) => {
  if (boardIndex === -1 || boardIndex == undefined) return;

  const deletedBoard = boards.value.splice(boardIndex, 1);
  store.set("boards", boards.value);

  deletedBoard.forEach((board) => emitter.emit("boardDeletion", board));
};

const sortBoardsAlphabetically = () => {
  editSortWarning.value = false;

  boards.value.sort((a, b) => {
    return a.title.localeCompare(b.title);
  });

  if (reverseSortOrder.value) {
    boards.value.reverse();
  }

  store.set("boardSortingOption", "alphabetically");
  sortingOptionText.value = t("pages.index.sortAlphabetically");
};

const sortBoardsByCreationDate = async () => {
  editSortWarning.value = false;

  boards.value = (await store.get("boards")) || [];
  if (reverseSortOrder.value) {
    boards.value.reverse();
  }

  store.set("boardSortingOption", "default");
  sortingOptionText.value = t("pages.index.sortByCreationDate");
};

const sortBoardsByEditDate = () => {
  boards.value.sort((a, b) => {
    if (!a.lastEdited || !b.lastEdited) {
      editSortWarning.value = true;
      return -1;
    }

    return new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime();
  });

  if (reverseSortOrder.value) {
    boards.value.reverse();
  }

  store.set("boardSortingOption", "edited");
  sortingOptionText.value = t("pages.index.sortByLastEdited");
};
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

.bg-board-preview {
  background: radial-gradient(
    circle at bottom left,
    var(--elevation-1) 30%,
    transparent
  );
}
</style>

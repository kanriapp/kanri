<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2024 trobonox <hello@trobo.dev>, PwshLab -->
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
  <div
    ref="columnDOMElement"
    :class="columnSizeClass"
    class="kanban-column bg-elevation-1 max-h-column flex flex-col rounded-lg p-2"
  >
    <div
      id="board-title"
      :class="titleTextClassZoom"
      class="flex flex-row items-start justify-between gap-4"
    >
      <div v-if="!titleEditing" class="flex flex-row items-start gap-1.5">
        <h1
          class="stop-text-overflow ml-1 font-bold"
          @click="enableTitleEditing()"
        >
          {{ boardTitle }}
        </h1>
        <span
          v-if="cardCountDisplayEnabled"
          class="bg-elevation-2 mt-1 rounded-2xl px-2 py-0.5 text-xs"
          >{{ cards.length }}</span
        >
      </div>

      <input
        v-if="titleEditing"
        ref="titleInput"
        v-model="titleNew"
        v-focus
        class="bg-elevation-2 border-accent text-no-overflow mr-2 w-full rounded-sm border-2 border-dotted px-2 outline-none"
        maxlength="1000"
        type="text"
        @blur="updateColumnTitle"
        @keypress.enter="
          updateColumnTitle();
          emitter.emit('columnActionDone');
        "
      />

      <div class="flex flex-row items-center gap-2">
        <Tooltip v-if="addToTopButtonShown" direction="top">
          <template #trigger>
            <PlusIcon
              class="text-dim-4 text-accent-hover cursor-pointe mt-1.5 size-4 shrink-0 grow-0"
              @click="enableCardAddMode(true)"
            />
          </template>

          <template #content>Add card at the top of the column</template>
        </Tooltip>

        <ClickCounter
          @double-click="$emit('removeColumnNoConfirmation', id)"
          @single-click="$emit('removeColumn', id)"
        >
          <XMarkIcon
            class="text-dim-4 text-accent-hover mt-1.5 size-4 shrink-0 grow-0 cursor-pointer"
          />
        </ClickCounter>
      </div>
    </div>

    <Container
      :get-child-payload="getChildPayload"
      class="max-h-65vh custom-scrollbar mt-2 overflow-y-auto rounded-sm"
      drag-class="cursor-grabbing"
      drag-handle-selector=".kanbancard-drag"
      group-name="cards"
      orientation="vertical"
      :get-ghost-parent="getGhostParent"
      @drop="onDrop"
    >
      <Draggable
        v-for="(card, index) in filteredCards"
        :key="card.id"
        :class="draggingEnabled ? 'kanbancard-drag' : 'nomoredragging'"
        :index="index"
      >
        <KanbanCard
          :card="card"
          :index="index"
          :zoom-level="zoomLevel"
          @disable-dragging="disableDragging"
          @enable-dragging="enableDragging"
          @open-edit-card-modal="openEditCardModal"
          @remove-card="removeCard"
          @remove-card-with-confirmation="removeCardWithConfirmation"
          @set-card-title="setCardTitle"
          @update-card-tags="updateCardTags"
          @duplicate-card="duplicateCard"
        />
      </Draggable>
    </Container>

    <div v-if="cardAddMode" class="mt-2 flex flex-col">
      <textarea
        id="newCardInput"
        ref="newCardInput"
        v-model="newCardName"
        v-focus
        v-resizable
        class="bg-elevation-2 border-accent-focus mb-2 h-12 overflow-hidden rounded-sm p-1 focus:border-2 focus:border-dotted focus:outline-none"
        maxlength="5000"
        placeholder="Enter a card title..."
        type="text"
        @keypress.enter="
          addCard();
          emitter.emit('columnActionDone');
        "
      />
      <div class="flex w-full flex-row justify-start gap-2">
        <button
          id="submitButton"
          class="text-buttons transition-button bg-accent rounded-md px-2 py-1"
          @click="
            addCard();
            emitter.emit('columnActionDone');
          "
        >
          Add Card
        </button>
        <button
          class="bg-elevation-3-hover transition-button rounded-md px-2 py-1"
          @click="
            cardAddMode = !cardAddMode;
            cardAddModeAddToTopOfColumn = false;
            newCardName = '';
            draggingEnabled = true;
            emit('enableDragging');
            emitter.emit('columnActionDone');
          "
        >
          Cancel
        </button>
      </div>
    </div>

    <div
      v-if="!cardAddMode"
      class="text-dim-1 bg-elevation-3-hover mt-2 flex cursor-pointer flex-row gap-1 rounded-md py-1 font-medium"
      @click="enableCardAddMode()"
    >
      <PlusIcon class="size-6 p-0.5" />
      <h2>Add Card</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Card, Column, Tag } from "@/types/kanban-types";
import type { Ref } from "vue";

import { applyDrag } from "@/utils/drag-n-drop";
import emitter from "@/utils/emitter";
import { PlusIcon, XMarkIcon } from "@heroicons/vue/24/solid";
//@ts-expect-error, sadly this library does not have ts typings
import { Container, Draggable } from "vue3-smooth-dnd";

const props = defineProps<{
  cardsList: Array<Card>;
  colIndex: number;
  id: string;
  title: string;
  zoomLevel: number;
  addToTopButtonShown?: boolean;
  cardCountDisplayEnabled?: boolean;
  cardSearchQuery?: string;
}>();

const emit = defineEmits<{
  (e: "disableDragging"): void;
  (e: "enableDragging"): void;
  (e: "openEditCardModal", columnId: string, cardIndex: number, el: Card): void;
  (
    e: "removeCardWithConfirmation",
    columnId: string,
    cardIndex: number,
    cardRef: Ref<HTMLDivElement | null>
  ): void;
  (e: "removeColumn", columnId: string): void;
  (e: "removeColumnNoConfirmation", columnId: string): void;
  (e: "setColumnEditIndex", columnId: number, eventType: string): void;
  (e: "updateStorage", column: Column): void;
  (
    e: "updateCardTags",
    columnId: string,
    cardIndex: number,
    tags: Array<Tag>
  ): void;
}>();

const titleInput: Ref<HTMLInputElement | null> = ref(null);
const newCardInput: Ref<HTMLInputElement | null> = ref(null);

const cards = ref<Card[]>(props.cardsList);
const newCardName = ref("");
const cardAddMode = ref(false);
const cardAddModeAddToTopOfColumn = ref(false);

const titleNew = ref(props.title);
const titleEditing = ref(false);

const draggingEnabled = ref(true);

const boardTitle = ref(props.title);

const columnDOMElement = ref<HTMLDivElement | null>(null);

onMounted(() => {
  document.addEventListener("keydown", keyDownListener);

  emitter.on("enableColumnTitleEditing", (columnID) => {
    if (columnID === props.id) {
      enableTitleEditing();
    }
  });

  emitter.on("enableColumnCardAddMode", (columnID) => {
    if (columnID === props.id) {
      enableCardAddMode();
    } else {
      cardAddMode.value = false;
      newCardName.value = "";
      draggingEnabled.value = true;
    }
  });

  emitter.on("resetColumnInputs", () => {
    cardAddMode.value = false;
    newCardName.value = "";
    titleEditing.value = false;
  });

  emitter.on("columnDraggingOn", () => {
    enableDragging();
  });

  emitter.on("columnDraggingOff", () => {
    disableDragging();
  });

  /**
   * Enforce adding IDs to all cards
   * TODO: Potentially remove later on in a version with breaking change to make ID non-optional
   */
  if (cards.value.length > 0) {
    cards.value.forEach((card) => {
      if (!card.id) {
        card.id = generateUniqueID();
        updateStorage();
      }
    });
  }
});

const titleTextClassZoom = computed(() => {
  switch (props.zoomLevel) {
    case 0:
      return ["text-lg"];

    case -1:
      return ["text-md"];

    case 1:
      return ["text-xl"];

    case 2:
      return ["text-2xl"];

    default:
      return [""];
  }
});

const columnSizeClass = computed(() => {
  switch (props.zoomLevel) {
    case 0:
      return ["w-64"];

    case -1:
      return ["w-48"];

    case 1:
      return ["w-96"];

    case 2:
      return ["w-[560px]"];

    default:
      return [""];
  }
});

const escRegXp = (str: string) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const fuzzyMatch = (input: string, str: string) => {
  input =
    ".*" +
    input
      .toLowerCase()
      .split("")
      .map((x) => `${escRegXp(x)}.*`)
      .join("");

  const regexp = new RegExp(input, "i");
  return regexp.test(str);
};

const filteredCards = computed(() => {
  if (props.cardSearchQuery == null || !/\S/.test(props.cardSearchQuery)) {
    return cards.value;
  }

  return cards.value.filter((card) => {
    const searchQuery = props.cardSearchQuery ?? "";
    const cardName = card.name;
    const cardTags = card.tags || [];

    return (
      fuzzyMatch(searchQuery, cardName) ||
      cardTags.some((tag) => tag.text.includes(searchQuery))
    );
  });
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", keyDownListener);

  emitter.off("enableColumnTitleEditing");
  emitter.off("enableColumnCardAddMode");
  emitter.off("resetColumnInputs");
  emitter.off("columnDraggingOn");
  emitter.off("columnDraggingOff");
});

const keyDownListener = (e: { key: string }) => {
  if (e.key === "Escape") {
    cardAddMode.value = false;
    newCardName.value = "";
    titleEditing.value = false;

    emitter.emit("columnActionDone");
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onDrop = (dropResult: any) => {
  cards.value = applyDrag(cards.value, dropResult);
  updateStorage();
};

const getChildPayload = (index: number) => {
  return cards.value[index];
};

const enableDragging = () => {
  draggingEnabled.value = true;
  emit("enableDragging");
};

const disableDragging = () => {
  draggingEnabled.value = false;
  emit("disableDragging");
};

const enableTitleEditing = () => {
  emit("setColumnEditIndex", props.colIndex, "title-edit");
  disableDragging();

  titleEditing.value = true;
  titleNew.value = boardTitle.value;
};

const enableCardAddMode = (addToTopOfColumn?: boolean) => {
  emit("setColumnEditIndex", props.colIndex, "card-add");
  disableDragging();

  newCardName.value = "";
  cardAddMode.value = true;
  cardAddModeAddToTopOfColumn.value = addToTopOfColumn || false;
};

const updateColumnTitle = () => {
  enableDragging();

  if (titleNew.value == null || !/\S/.test(titleNew.value)) {
    titleNew.value = "";
    titleEditing.value = false;
    return;
  }

  boardTitle.value = titleNew.value;
  titleNew.value = "";

  titleEditing.value = false;
  updateStorage();
};

const updateCardTags = (cardIndex: number, tags: Array<Tag>) => {
  emit("updateCardTags", props.id, cardIndex, tags);
};

const addCard = () => {
  enableDragging();

  if (newCardName.value == null || !/\S/.test(newCardName.value)) return;

  if (cardAddModeAddToTopOfColumn.value) {
    cards.value = [
      { id: generateUniqueID(), name: newCardName.value },
      ...cards.value,
    ];
  } else {
    cards.value[cards.value.length] = {
      id: generateUniqueID(),
      name: newCardName.value,
    };
    scrollCardIntoView();
  }

  newCardName.value = "";
  cardAddMode.value = false;
  cardAddModeAddToTopOfColumn.value = false;
  updateStorage();
};

const duplicateCard = (index: number) => {
  const cardDuplicate = JSON.parse(JSON.stringify(cards.value[index]));
  cardDuplicate.id = generateUniqueID();
  cardDuplicate.name = `${cardDuplicate.name} - Copy`;

  cards.value.splice(index + 1, 0, cardDuplicate);

  updateStorage();
};

const scrollCardIntoView = () => {
  // only get elements that are inside this column
  if (!columnDOMElement.value) return;
  const cards = columnDOMElement.value.getElementsByClassName("kanban-card");

  if (!cards || cards.length === 0) return;

  cards[cards.length - 1].scrollIntoView({ behavior: "smooth" });
};

const removeCardWithConfirmation = (
  cardIndex: number,
  cardRef: Ref<HTMLDivElement | null>
) => {
  emit("removeCardWithConfirmation", props.id, cardIndex, cardRef);
};

const removeCard = (index: number) => {
  cards.value.splice(index, 1);
  updateStorage();
};

const setCardTitle = (cardIndex: number, name: string) => {
  cards.value[cardIndex].name = name;
  updateStorage();
};

const openEditCardModal = (index: number, el: Card) => {
  disableDragging();

  emit("openEditCardModal", props.id, index, el);
};

const updateStorage = () => {
  const column = {
    cards: cards.value,
    id: props.id,
    title: boardTitle.value,
  };

  emit("updateStorage", column);
};

const getGhostParent = () => {
  return document.getElementById("kanban-cols-container");
};
</script>

<style scoped>
.max-h-column {
  max-height: calc(90vh - 100px);
}

.stop-text-overflow {
  /* These are technically the same, but use both */
  overflow-wrap: break-word;
  word-wrap: break-word;

  -ms-word-break: break-all;
  /* This is the dangerous one in WebKit, as it breaks things wherever */
  word-break: break-all;
  /* Instead use this non-standard one: */
  word-break: break-word;

  /* Adds a hyphen where the word breaks, if supported (No Blink) */
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
}
</style>

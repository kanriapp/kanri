<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>, PwshLab, jynxbt, tareqdayya, qunm00 -->
<!-- -->
<!-- SPDX-License-Identifier: GPL-3.0-or-later -->
<!--
Kanri is an offline Kanban board app made using Tauri and Nuxt.
Copyright (C) 2022-2026 trobonox <hello@trobo.dev>

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
    :class="[
      'kanban-column bg-elevation-1 max-h-column flex flex-col rounded-lg p-2',
      columnSizeClass,
      columnSpacingClass,
    ]"
  >
    <div
      id="board-title"
      :class="[
        'flex flex-row justify-between gap-4',
        titleTextClassZoom,
      ]"
    >
      <div v-if="!titleEditing" class="flex flex-row items-center gap-1.5">
        <h1
          class="stop-text-overflow ml-1 text-lg font-bold"
          @click="enableTitleEditing()"
        >
          {{ props.title }}
        </h1>
        <span
          v-if="cardCountDisplayEnabled"
          :class="['bg-elevation-2 rounded-2xl px-2 py-0.5', badgeSizeClass]"
          >{{ cards.length }}</span
        >
      </div>

      <input
        v-if="titleEditing"
        ref="titleInput"
        v-model="titleNew"
        v-focus
        :v-disable-spellcheck="settings.disableSpellcheck"
        :class="[
          'bg-elevation-2 border-accent text-no-overflow -m-2 mr-2 w-full rounded-sm border-2 border-dotted px-2 text-lg font-bold outline-none',
          inputSizeClass,
        ]"
        maxlength="1000"
        type="text"
        @blur="updateColumnTitle"
        @keypress.enter="
          updateColumnTitle();
          emitter.emit('columnActionDone');
        "
      >
      
      <Dropdown align="end">
        <template #trigger>
          <button
          class="bg-elevation-1 bg-elevation-2-hover transition-button h-full rounded-md"
          @click.prevent
          >
          <EllipsisHorizontalIcon class="size-6" />
          </button>
        </template>
        <template #content>
            <DropdownMenuItem
              class="bg-elevation-2-hover flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-1.5 pr-6 text-left"
              @click="enableCardAddMode(true)"
            >
                {{$t('components.kanban.column.addCardTop')}}
            </DropdownMenuItem>
            <DropdownMenuItem
              class="bg-elevation-2-hover flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-1.5 pr-6 text-left"
              @click="$emit('removeAllColumnCards', id)"
            >
                 {{$t('components.kanban.card.deleteAllColumnCardsAction')}}               
            </DropdownMenuItem>
            <DropdownMenuItem
              class="bg-elevation-2-hover flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-1.5 pr-6 text-left"
              @click="$emit('removeColumn', id)"
            >
                {{$t('components.kanban.column.deleteColumnAction')}}
            </DropdownMenuItem>
        </template>
      </Dropdown>
    </div>

    <Container
      :get-child-payload="getChildPayload"
      :class="[
        'max-h-65vh custom-scrollbar mt-2 overflow-y-auto rounded-sm',
        containerSpacingClass,
      ]"
      drag-class="cursor-grabbing"
      drag-handle-selector=".kanbancard-drag"
      :animation-duration="120"
      :drag-begin-delay="0"
      group-name="cards"
      orientation="vertical"
      :get-ghost-parent="getGhostParent"
      @drop="onDrop"
    >
      <Draggable
        v-for="(card, index) in filteredCards"
        :key="card.id"
        :class="[
          draggingEnabled ? 'kanbancard-drag' : 'nomoredragging',
          cardSpacingClass,
        ]"
        :index="index"
      >
        <KanbanCard
          :board-assets="boardAssets || []"
          :card="card"
          :index="index"
          :zoom-level="zoomLevel"
          @disable-dragging="disableDragging"
          @enable-dragging="enableDragging"
          @open-edit-card-modal="openEditCardModal"
          @remove-card="removeCard"
          @remove-card-with-confirmation="removeCardWithConfirmation"
          @set-card-name="setCardName"
          @update-card-tags="updateCardTags"
          @duplicate-card="duplicateCard"
        />
      </Draggable>
    </Container>

    <div
      v-if="cardAddMode"
      :class="['mt-2 flex flex-col', addCardFormSpacingClass]"
    >
      <textarea
        id="newCardInput"
        ref="newCardInput"
        v-model="newCardName"
        v-focus
        v-resizable
        :class="[
          'bg-elevation-2 border-accent-focus mb-2 overflow-hidden rounded-sm border-2 border-transparent p-1 focus:border-dotted focus:outline-none',
          textAreaSizeClass,
        ]"
        maxlength="5000"
        :placeholder="$t('components.kanban.column.addCardPlaceholder')"
        type="text"
        @keypress.enter="
          addCard();
          emitter.emit('columnActionDone');
        "
      />
      <div class="flex w-full flex-row justify-start gap-2">
        <button
          id="submitButton"
          :class="[
            'text-buttons transition-button bg-accent rounded-md px-2 py-1',
            buttonSizeClass,
          ]"
          @click="
            addCard();
            emitter.emit('columnActionDone');
          "
        >
          {{ $t("general.addAction") }}
        </button>
        <button
          :class="[
            'bg-elevation-3-hover transition-button rounded-md px-2 py-1',
            buttonSizeClass,
          ]"
          @click="
            cardAddMode = !cardAddMode;
            cardAddModeAddToTopOfColumn = false;
            newCardName = '';
            draggingEnabled = true;
            emit('enableDragging');
            emitter.emit('columnActionDone');
          "
        >
          {{ $t("general.cancelAction") }}
        </button>
      </div>
    </div>

    <div
      v-if="!cardAddMode"
      :class="[
        'text-dim-1 bg-elevation-3-hover mt-2 flex cursor-pointer flex-row items-center gap-1 rounded-md py-1 font-medium',
        addCardButtonSpacingClass,
      ]"
      @click="enableCardAddMode()"
    >
      <PlusIcon :class="['p-0.5', addCardIconSizeClass]" />
      <h2 :class="addCardTextSizeClass">
        {{ $t("components.kanban.column.addCard") }}
      </h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BoardAsset, Card, Tag } from "@/types/kanban-types";
import type { Ref } from "vue";

import { applyDrag } from "@/utils/drag-n-drop";
import { getCurrentTimestamp } from "@/utils/dateTime";
import emitter from "@/utils/emitter";
import { richHtmlToText } from "@/utils/richContent";
import { PlusIcon, EllipsisHorizontalIcon } from "@heroicons/vue/24/solid";
//@ts-expect-error, sadly this library does not have ts typings
import { Container, Draggable } from "vue3-smooth-dnd";

const props = defineProps<{
  cardsList: Array<Card>;
  colIndex: number;
  id: string;
  title: string;
  zoomLevel: number;
  addToTopButtonShown?: boolean;
  boardAssets?: Array<BoardAsset>;
  cardCountDisplayEnabled?: boolean;
  cardSearchQuery?: string;
}>();

const emit = defineEmits<{
  // drag and drop
  (e: "disableDragging"): void;
  (e: "enableDragging"): void;

  // card actions
  (e: "openEditCardModal", columnId: string, el: Card): void;
  (e: "addCard", columnId: string, card: Card, addToTop: boolean | undefined): void;
  (e: "removeCard", columnId: string, cardId: string | undefined): void;
  (e: "removeAllColumnCards", columnId: string): void;
  (
    e: "removeCardWithConfirmation",
    columnId: string,
    cardId: string | undefined,
    cardRef: Ref<HTMLDivElement | null>
  ): void;
  (
    e: "updateCardTags",
    columnId: string,
    cardId: string | undefined,
    tags: Array<Tag>
  ): void;

  // column actions
  (e: "updateColumnTitle", columnId: string, title: string): void;
  (e: "removeColumn", columnId: string): void;
  (e: "removeColumnNoConfirmation", columnId: string): void;
  (e: "setColumnEditIndex", columnIndex: number, eventType: string): void;
  (e: "setCardName", columnId: string, cardId: string | undefined, name: string): void;
  (e: "duplicateCard", columnId: string, cardId: string | undefined): void;
  (e: "reorderCards", columnId: string, newCardsOrder: Array<Card>): void;
}>();

const settings = useSettingsStore();

const titleInput: Ref<HTMLInputElement | null> = ref(null);
const newCardInput: Ref<HTMLInputElement | null> = ref(null);

const cards = ref<Card[]>(props.cardsList);
const newCardName = ref("");
const cardAddMode = ref(false);
const cardAddModeAddToTopOfColumn = ref(false);

const titleNew = ref(props.title);
const titleEditing = ref(false);

provide('columnId', props.id);

const draggingEnabled = ref(true);

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
      }
    });
  }
});

// TODO: get rid of this watcher by using props.cardsList directly
watch(
  () => props.cardsList,
  (newCards) => {
    cards.value = newCards;
  }
);

// enhanced scaling classes based on zoom level
const titleTextClassZoom = computed(() => {
  switch (props.zoomLevel) {
    case -1:
      return "text-md";
    case 0:
      return "text-lg";
    case 1:
      return "text-xl";
    case 2:
      return "text-2xl";
    default:
      return "";
  }
});

const columnSizeClass = computed(() => {
  switch (props.zoomLevel) {
    case -1:
      return "w-48";
    case 0:
      return "w-64";
    case 1:
      return "w-96";
    case 2:
      return "w-[560px]";
    default:
      return "";
  }
});

// new scaled classes for other elements
const badgeSizeClass = computed(() => {
  switch (props.zoomLevel) {
    case -1:
      return "text-xs";
    case 0:
      return "text-xs";
    case 1:
      return "text-sm";
    case 2:
      return "text-base";
    default:
      return "text-xs";
  }
});

const inputSizeClass = computed(() => {
  switch (props.zoomLevel) {
    case -1:
      return "text-sm py-0.5";
    case 0:
      return "text-base py-1";
    case 1:
      return "text-lg py-1.5";
    case 2:
      return "text-xl py-2";
    default:
      return "text-base py-1";
  }
});

const columnSpacingClass = computed(() => {
  switch (props.zoomLevel) {
    case -1:
      return "p-1.5";
    case 0:
      return "p-2";
    case 1:
      return "p-3";
    case 2:
      return "p-4";
    default:
      return "p-2";
  }
});

const containerSpacingClass = computed(() => {
  if (cards.value.length === 0) {
    return "p-6";
  }

  switch (props.zoomLevel) {
    case -1:
      return "mt-1.5";
    case 0:
      return "mt-2";
    case 1:
      return "mt-3";
    case 2:
      return "mt-4";
    default:
      return "mt-2";
  }
});

const cardSpacingClass = computed(() => {
  switch (props.zoomLevel) {
    case -1:
      return "mb-1.5";
    case 0:
      return "mb-2";
    case 1:
      return "mb-3";
    case 2:
      return "mb-4";
    default:
      return "mb-2";
  }
});

const textAreaSizeClass = computed(() => {
  switch (props.zoomLevel) {
    case -1:
      return "h-10 text-sm";
    case 0:
      return "h-12 text-base";
    case 1:
      return "h-16 text-lg";
    case 2:
      return "h-20 text-xl";
    default:
      return "h-12 text-base";
  }
});

const buttonSizeClass = computed(() => {
  switch (props.zoomLevel) {
    case -1:
      return "text-sm px-1.5 py-0.5";
    case 0:
      return "text-base px-2 py-1";
    case 1:
      return "text-lg px-3 py-1.5";
    case 2:
      return "text-xl px-4 py-2";
    default:
      return "text-base px-2 py-1";
  }
});

const addCardFormSpacingClass = computed(() => {
  switch (props.zoomLevel) {
    case -1:
      return "mt-1.5";
    case 0:
      return "mt-2";
    case 1:
      return "mt-3";
    case 2:
      return "mt-4";
    default:
      return "mt-2";
  }
});

const addCardButtonSpacingClass = computed(() => {
  switch (props.zoomLevel) {
    case -1:
      return "mt-1.5 py-0.5";
    case 0:
      return "mt-2 py-1";
    case 1:
      return "mt-3 py-1.5";
    case 2:
      return "mt-4 py-2";
    default:
      return "mt-2 py-1";
  }
});

const addCardIconSizeClass = computed(() => {
  switch (props.zoomLevel) {
    case -1:
      return "size-4";
    case 0:
      return "size-6";
    case 1:
      return "size-8";
    case 2:
      return "size-10";
    default:
      return "size-6";
  }
});

const addCardTextSizeClass = computed(() => {
  switch (props.zoomLevel) {
    case -1:
      return "text-sm";
    case 0:
      return "text-base";
    case 1:
      return "text-lg";
    case 2:
      return "text-xl";
    default:
      return "text-base";
  }
});

const fuzzyMatch = (input: string, str: string) => {
  const inputWords = input.toLowerCase().split(/\s+/);
  const strWords = str.toLowerCase().split(/\s+/);

  let matches = 0;

  inputWords.forEach((inputWord) => {
    strWords.forEach((strWord) => {
      let inputIndex = 0;
      let strIndex = 0;
      let wordMatches = 0;

      while (inputIndex < inputWord.length && strIndex < strWord.length) {
        if (inputWord[inputIndex] === strWord[strIndex]) {
          wordMatches++;
          inputIndex++;
        }
        strIndex++;
      }

      const matchRatio = wordMatches / inputWord.length;
      if (matchRatio >= 0.6) {
        // Adjust the threshold as needed
        matches++;
      }
    });
  });

  return matches === inputWords.length;
};

const padTwoDigits = (value: number) => {
  return String(value).padStart(2, "0");
};

const getTimeSearchTokens = (value: Date | string | null | undefined) => {
  if (value == null) return [];

  const rawValue = String(value);
  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    return [rawValue.toLowerCase()];
  }

  const year = parsedDate.getFullYear();
  const month = padTwoDigits(parsedDate.getMonth() + 1);
  const day = padTwoDigits(parsedDate.getDate());
  const hours = padTwoDigits(parsedDate.getHours());
  const minutes = padTwoDigits(parsedDate.getMinutes());
  const seconds = padTwoDigits(parsedDate.getSeconds());

  return [
    rawValue.toLowerCase(),
    `${year}-${month}-${day}`,
    `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
    parsedDate.toISOString().toLowerCase(),
  ];
};

const getTaskContent = (card: Card) => {
  const cardTasks = card.tasks || [];
  return cardTasks.map((task) => {
    const taskAttachments = getAttachmentContent(task.attachments || []);
    const subtasks = (task.subtasks || []).map(subtask => subtask.name || "").join(" ");
    return `${task.name || ""} ${richHtmlToText(task.description)} ${subtasks} ${taskAttachments}`;
  }).join(" ").toLowerCase();
};

const getAttachmentContent = (attachments: Card["attachments"]) => {
  const boardAssets = props.boardAssets || [];
  return (attachments || [])
    .map(attachment => boardAssets.find(asset => asset.id === attachment.assetId)?.name || "")
    .join(" ")
    .toLowerCase();
};

const getCreatedTimeContent = (card: Card) => {
  const taskCreatedAt = (card.tasks || []).flatMap((task) => getTimeSearchTokens(task.createdAt));
  return [...getTimeSearchTokens(card.createdAt), ...taskCreatedAt].join(" ");
};

const getCompletedTimeContent = (card: Card) => {
  const taskCompletedAt = (card.tasks || []).flatMap((task) => getTimeSearchTokens(task.completedAt));
  return taskCompletedAt.join(" ");
};

const getAllTimeContent = (card: Card) => {
  return `${getCreatedTimeContent(card)} ${getCompletedTimeContent(card)}`.trim();
};

const filteredCards = computed(() => {
  if (props.cardSearchQuery == null || !/\S/.test(props.cardSearchQuery)) {
    return cards.value;
  }

  const searchQuery = props.cardSearchQuery.trim();
  const normalizedSearchQuery = searchQuery.toLowerCase();

  // check for name: filter
  if (searchQuery.startsWith("name:")) {
    const nameQuery = searchQuery.substring(5).trim().toLowerCase();
    if (!nameQuery) return cards.value;

    return cards.value.filter((card) => {
      const cardName = card.name || "";
      return cardName.toLowerCase().includes(nameQuery);
    });
  }

  // check for tag: filter
  if (searchQuery.startsWith("tag:")) {
    const tagQuery = searchQuery.substring(4).trim().toLowerCase();
    if (!tagQuery) return cards.value;

    return cards.value.filter((card) => {
      const cardTags = card.tags || [];
      return cardTags.some((tag) => tag.text.toLowerCase().includes(tagQuery));
    });
  }

  // check for description: filter
  if (searchQuery.startsWith("description:")) {
    const descriptionQuery = searchQuery.substring(12).trim().toLowerCase();
    if (!descriptionQuery) return cards.value;

    return cards.value.filter((card) => {
      const cardDescription = card.description || "";
      return richHtmlToText(cardDescription).toLowerCase().includes(descriptionQuery);
    });
  }

  // check for task: filter
  if (searchQuery.startsWith("task:")) {
    const taskQuery = searchQuery.substring(5).trim().toLowerCase();
    if (!taskQuery) return cards.value;

    return cards.value.filter((card) => {
      return getTaskContent(card).includes(taskQuery);
    });
  }

  // check for attachment: filter
  if (searchQuery.startsWith("attachment:")) {
    const attachmentQuery = searchQuery.substring(11).trim().toLowerCase();
    if (!attachmentQuery) return cards.value;

    return cards.value.filter((card) => {
      return getAttachmentContent(card.attachments).includes(attachmentQuery) ||
        (card.tasks || []).some(task => getAttachmentContent(task.attachments || []).includes(attachmentQuery));
    });
  }

  // check for created: filter
  if (searchQuery.startsWith("created:")) {
    const createdQuery = searchQuery.substring(8).trim().toLowerCase();
    if (!createdQuery) return cards.value;

    return cards.value.filter((card) => {
      return getCreatedTimeContent(card).includes(createdQuery);
    });
  }

  // check for completed: filter
  if (searchQuery.startsWith("completed:")) {
    const completedQuery = searchQuery.substring(10).trim().toLowerCase();
    if (!completedQuery) return cards.value;

    return cards.value.filter((card) => {
      return getCompletedTimeContent(card).includes(completedQuery);
    });
  }

  // check for time: filter
  if (searchQuery.startsWith("time:")) {
    const timeQuery = searchQuery.substring(5).trim().toLowerCase();
    if (!timeQuery) return cards.value;

    return cards.value.filter((card) => {
      return getAllTimeContent(card).includes(timeQuery);
    });
  }

  // default search (name, description, tags, task content, created/completed time)
  return cards.value.filter((card) => {
    const cardName = card.name;
    const cardDescription = card.description || "";
    const cardTags = card.tags || [];
    const cardTaskContent = getTaskContent(card);
    const cardAttachmentContent = getAttachmentContent(card.attachments);
    const cardTimeContent = getAllTimeContent(card);

    return (
      fuzzyMatch(searchQuery, cardName) ||
      richHtmlToText(cardDescription).toLowerCase().includes(normalizedSearchQuery) ||
      cardTags.some((tag) => tag.text.toLowerCase().includes(normalizedSearchQuery)) ||
      cardTaskContent.includes(normalizedSearchQuery) ||
      cardAttachmentContent.includes(normalizedSearchQuery) ||
      cardTimeContent.includes(normalizedSearchQuery)
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
  emit("reorderCards", props.id, cards.value);
};

const getChildPayload = (index: number) => {
  // if we have search query, re-calculate the index
  if (props.cardSearchQuery) {
    return filteredCards.value[index];
  }

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
  titleNew.value = props.title;
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

  emit("updateColumnTitle", props.id, titleNew.value);
  titleNew.value = "";

  titleEditing.value = false;
};

const updateCardTags = (cardId: string | undefined, tags: Array<Tag>) => {
  emit("updateCardTags", props.id, cardId, tags);
};

const addCard = () => {
  enableDragging();

  if (newCardName.value == null || !/\S/.test(newCardName.value)) return;

  const card: Card = {
    id: generateUniqueID(),
    attachments: [],
    createdAt: getCurrentTimestamp(),
    name: newCardName.value,
    description: "",
    color: "",
    tasks: [],
    dueDate: null,
    isDueDateCounterRelative: false,
    isDueDateCompleted: false,
    tags: [],
  };

  emit("addCard", props.id, card, cardAddModeAddToTopOfColumn.value);
  if (!cardAddModeAddToTopOfColumn.value) {
    // scroll to the new card only if adding to bottom
    scrollCardIntoView();
  }

  newCardName.value = "";
  cardAddMode.value = false;
  cardAddModeAddToTopOfColumn.value = false;
};

const duplicateCard = (cardId: string | undefined) => {
  emit("duplicateCard", props.id, cardId);
};

const scrollCardIntoView = () => {
  // only get elements that are inside this column
  if (!columnDOMElement.value) return;
  const cards = columnDOMElement.value.getElementsByClassName("kanban-card");

  if (!cards || cards.length === 0) return;

  const lastCard = cards.item(cards.length - 1) as HTMLElement | null;
  if (!lastCard) return;

  lastCard.scrollIntoView({ behavior: "smooth" });
};

const removeCardWithConfirmation = (
  cardId: string | undefined,
  cardRef: Ref<HTMLDivElement | null>
) => {
  emit("removeCardWithConfirmation", props.id, cardId, cardRef);
};

const removeCard = (id: string | undefined) => {
  emit("removeCard", props.id, id);
};

const setCardName = (cardId: string | undefined, name: string) => {
  emit("setCardName", props.id, cardId, name);
};

const openEditCardModal = (el: Card) => {
  disableDragging();

  emit("openEditCardModal", props.id, el);
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

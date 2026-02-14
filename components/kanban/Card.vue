<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>, Khusyasy, PwshLab, jynxbt, tareqdayya, qunm00 -->
<!-- -->
<!-- SPDX-License-Identifier: Apache-2.0 -->
<!--
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

<template>
  <ContextMenuRoot>
    <ContextMenuTrigger as-child>
      <div
        ref="cardRef"
        :class="[
          name === '---' ? 'separator-card' : zoomClass,
          cardBackgroundColor.startsWith('#') ? '' : cardBackgroundColor,
          cardTextColor,
        ]"
        :style="[
          cardBackgroundColor.startsWith('#')
            ? { 'background-color': cardBackgroundColor }
            : {},
        ]"
        class="kanban-card border-elevation-3 flex min-h-[30px] w-full cursor-pointer flex-col items-start gap-1 rounded-[3px] border p-3"
        @click.self="$emit('openEditCardModal', card)"
      >
        <div
          :class="{ 'pb-1': cardHasNoExtraProperties }"
          class="flex w-full flex-row items-start justify-between"
        >
          <p class="text-no-overflow mr-2 w-full min-w-[28px]">
            <ClickCounter
              v-if="!cardNameEditMode"
              @double-click="enableCardEditMode"
              @single-click="$emit('openEditCardModal', card)"
            >
              <hr v-if="name === '---'" class="mt-0.5" />
              <p v-else ref="cardNameText">
                {{ name }}
              </p>
            </ClickCounter>
            <textarea
              v-else
              ref="cardNameInput"
              v-model="name"
              v-focus
              v-resizable
              class="bg-elevation-3 text-normal m-0 size-full resize-none rounded-sm p-0 focus:outline-none"
              maxlength="1000"
              type="text"
              @blur="updateCardName"
              @keypress.enter="updateCardName"
            />
          </p>

          <ClickCounter
            v-if="name !== '---'"
            class="cursor-pointer"
            @double-click="deleteCardWithAnimation(card.id)"
            @single-click="deleteCardWithConfirmation(card.id)"
          >
            <XMarkIcon
              class="text-accent-hover mt-[4px] size-4"
              :class="[cardTextColor, iconSizeClass]"
            />
          </ClickCounter>
        </div>

        <div
          v-if="cardTags && cardTags?.length > 0"
          class="-ml-0.5 -mt-0.5 mb-1 flex flex-row flex-wrap items-center gap-1"
          @click="$emit('openEditCardModal', card)"
        >
          <div v-for="tag in cardTags" :key="tag.id">
            <KanbanTagDisplay :tag="tag" :zoom-level="zoomLevel" />
          </div>
        </div>

        <div
          class="flex flex-row flex-wrap items-center gap-2"
          @click="$emit('openEditCardModal', card)"
        >
          <PhTextAlignLeft
            v-if="!isDescriptionEmpty"
            :class="[cardTextColorDim, iconSizeClass]"
          />

          <div
            v-if="tasks && taskCompletionStatus !== '0/0'"
            :class="{
              'bg-accent text-buttons rounded-sm px-1': allTasksCompleted,
            }"
            class="flex flex-row items-center gap-1"
          >
            <PhChecks
              v-if="allTasksCompleted"
              class="text-buttons"
              :class="iconSizeClass"
            />
            <PhListChecks v-else :class="[cardTextColorDim, iconSizeClass]" />
            <span
              :class="[
                allTasksCompleted ? 'text-buttons' : cardTextColorDim,
                taskTextClass,
              ]"
              >{{ taskCompletionStatus }}</span
            >
          </div>

          <div
            v-if="dueDate"
            class="flex flex-row items-center gap-1"
            :class="{
              'text-buttons rounded-sm bg-accent px-1': isDueDateCompleted,
              'text-buttons rounded-sm bg-red-600 px-1': dueDateOverdue && !isDueDateCompleted,
            }"
          >
            <PhCheckCircle
              v-if="isDueDateCompleted"
              class="text-buttons"
              :class="iconSizeClass"
            />
            <PhClock v-else :class="iconSizeClass" />
            <span :class="taskTextClass">{{ getFormattedDueDate }}</span>
          </div>
        </div>
      </div>
    </ContextMenuTrigger>
    <ContextMenuPortal to=".default-layout">
      <ContextMenuContent :class="contextMenuClass">
        <ContextMenuItem
          value="Edit Name"
          class="bg-elevation-2-hover flex w-full cursor-pointer flex-row items-center rounded-md px-4 py-1.5"
          @click="enableCardEditMode()"
        >
          {{ $t("general.editNameAction") }}
        </ContextMenuItem>
        <KanbanMoveTo :card="card" />
        <ContextMenuItem
          value="Duplicate"
          class="bg-elevation-2-hover flex w-full cursor-pointer flex-row items-center rounded-md px-4 py-1.5"
          @click="$emit('duplicateCard', card.id)"
        >
          {{ $t("general.duplicateAction") }}
        </ContextMenuItem>
        <ContextMenuItem
          value="Delete"
          class="bg-elevation-2-hover flex w-full cursor-pointer flex-row items-center rounded-md px-4 py-1.5"
          @click="deleteCardWithConfirmation(card.id)"
        >
          {{ $t("general.deleteAction") }}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenuPortal>
  </ContextMenuRoot>
</template>

<script setup lang="ts">
import type { Card, Tag } from "@/types/kanban-types";

import { getContrast } from "~/utils/colorUtils";
import { XMarkIcon } from "@heroicons/vue/24/solid";
import {
  PhCheckCircle,
  PhChecks,
  PhClock,
  PhListChecks,
  PhTextAlignLeft,
} from "@phosphor-icons/vue";

import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuPortal,
  ContextMenuRoot,
  ContextMenuTrigger,
} from "radix-vue";

const props = defineProps<{
  card: Card;
  zoomLevel: number;
}>();

const emit = defineEmits<{
  (e: "disableDragging"): void;
  (e: "enableDragging"): void;
  (e: "openEditCardModal", card: Card): void;
  (e: "removeCard", id: string | undefined): void;
  (
    e: "removeCardWithConfirmation",
    cardId: string | undefined,
    cardRef: Ref<HTMLDivElement | null>
  ): void;
  (e: "setCardName", cardId: string | undefined, name: string): void;
  (e: "updateCardTags", cardId: string | undefined, tags: Array<Tag>): void;
  (e: "duplicateCard", cardId: string | undefined): void;
}>();

const { locale } = useI18n();

const globalSettingsStore = useSettingsStore();
const themeStore = useThemeStore();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const savedColors: Ref<any> = ref(null); // TODO: add types for saved theme in board
const cardRef: Ref<HTMLDivElement | null> = ref(null);

const name = ref(props.card.name);
const description = ref(props.card.description);
const tasks = ref(props.card.tasks);
const dueDate = ref(props.card.dueDate);
const isDueDateRelative = ref(props.card.isDueDateCounterRelative);
const isDueDateCompleted = ref(props.card.isDueDateCompleted ?? false);
const cardTags = ref(props.card.tags);

const cardNameEditMode = ref(false);
const cardNameInput: Ref<HTMLTextAreaElement | null> = ref(null);
const cardNameText: Ref<HTMLParagraphElement | null> = ref(null);

watch(
  props,
  (_, newData) => {
    name.value = newData.card.name;
    description.value = newData.card.description;
    tasks.value = newData.card.tasks;
    dueDate.value = newData.card.dueDate;
    isDueDateRelative.value = newData.card.isDueDateCounterRelative;
    cardTags.value = newData.card.tags;
    isDueDateCompleted.value = newData.card.isDueDateCompleted ?? false;
  },
  { deep: true }
);

onMounted(() => {
  savedColors.value = themeStore.colors;
});

const cardHasNoExtraProperties = computed(() => {
  return (
    (!tasks.value || tasks.value.length === 0) &&
    isDescriptionEmpty &&
    !dueDate.value &&
    (props.card.tags || []).length === 0 &&
    !props.card.name.startsWith("---")
  );
});

const isDescriptionEmpty = computed(() => {
  if (!description.value) return true;
  if (description.value == "<p></p>" || !/\S/.test(description.value))
    return true;

  return false;
});

const taskCompletionStatus = computed(() => {
  if (!tasks.value) return "0/0";

  const totalTasks = tasks.value.length;
  const completedTasks = tasks.value.filter((task) => task.finished).length;

  return `${completedTasks}/${totalTasks}`;
});

const allTasksCompleted = computed(() => {
  if (!tasks.value) return false;

  const totalTasks = tasks.value.length;
  const completedTasks = tasks.value.filter((task) => task.finished).length;

  if (totalTasks === completedTasks) return true;

  return false; //default return
});

// New computed properties for scaling elements
const zoomClass = computed(() => {
  switch (props.zoomLevel) {
    case -1:
      return "zoom-down text-sm";
    case 0:
      return "zoom-normal";
    case 1:
      return "zoom-up text-xl";
    case 2:
      return "zoom-up-2x text-2xl";
    default:
      return "zoom-normal";
  }
});

const iconSizeClass = computed(() => {
  switch (props.zoomLevel) {
    case -1:
      return "size-3";
    case 0:
      return "size-4";
    case 1:
      return "size-5";
    case 2:
      return "size-8";
    default:
      return "size-4";
  }
});

const taskTextClass = computed(() => {
  switch (props.zoomLevel) {
    case -1:
      return "text-xs";
    case 0:
      return "text-sm";
    case 1:
      return "text-base";
    case 2:
      return "text-lg";
    default:
      return "text-sm";
  }
});

const cardBackgroundColor = computed(() => {
  if (!props.card.color) return "bg-elevation-2";

  return props.card.color;
});

const cardTextColor = computed(() => {
  if (cardBackgroundColor.value === "bg-elevation-2") {
    if (savedColors.value) {
      return getContrast(savedColors.value.elevation2);
    }
  }

  if (cardBackgroundColor.value.startsWith("#")) {
    return getContrast(cardBackgroundColor.value);
  }

  return "text-gray-50";
});

const cardTextColorDim = computed(() => {
  if (cardBackgroundColor.value === "bg-elevation-2") {
    if (savedColors.value) {
      if (getContrast(savedColors.value.elevation2) === "text-gray-50") {
        return "text-gray-300";
      }
      return "text-gray-700";
    }
  }

  if (cardBackgroundColor.value.startsWith("#")) {
    if (getContrast(cardBackgroundColor.value) === "text-gray-50") {
      return "text-gray-300";
    }
    return "text-gray-700";
  }

  return "text-gray-300";
});

const contextMenuClass = computed(() => {
  let contextMenuClasses =
    "bg-primary-darker border-elevation-1 z-[99999] min-w-[100px] rounded-md border p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] outline-none will-change-[opacity,transform]";

  if (globalSettingsStore.animationsEnabled) {
    contextMenuClasses +=
      " data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade";
  }

  return contextMenuClasses;
});

const getFormattedDueDate = computed(() => {
  if (!dueDate.value) return "";

  //relative countdown showing in 2 days in 2 hours etc
  if (isDueDateRelative.value) {
    const now = new Date();
    const dueDateTimestamp = new Date(dueDate.value).getTime();
    const timeDifference = dueDateTimestamp - now.getTime();

    if (timeDifference <= 0) {
      const secondsPast = Math.floor(-timeDifference / 1000);
      const minutesPast = Math.floor(secondsPast / 60);
      const hoursPast = Math.floor(minutesPast / 60);
      const daysPast =
        hoursPast % 24 > 12
          ? Math.ceil(hoursPast / 24)
          : Math.floor(hoursPast / 24);

      const seconds = secondsPast % 60;
      const minutes = minutesPast % 60;
      const hours = hoursPast % 24;
      const days = daysPast;

      const daysAgo = days > 0 ? `${days} day${days > 1 ? "s" : ""} ago` : "";
      const hoursAgo = hours > 0 ? `${hours}h ago` : "";
      const minutesAgo =
        minutes > 0 ? `${minutes}min${minutes > 1 ? "s" : ""} ago` : "";
      const secondsAgo = seconds > 0 ? `${seconds}s ago` : "";

      return daysAgo || hoursAgo || minutesAgo || secondsAgo;
    }

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days =
      hours % 24 > 12 ? Math.ceil(hours / 24) : Math.floor(hours / 24);

    if (days > 0) {
      return `in ${days} day${days > 1 ? "s" : ""}`;
    } else if (hours > 0) {
      return `in ${hours}h`;
    } else if (minutes > 0) {
      return `in ${minutes}min${minutes > 1 ? "s" : ""}`;
    } else {
      return `in ${seconds}s}`;
    }
  }

  return new Date(dueDate.value).toLocaleDateString(locale.value);
});

const dueDateOverdue = computed(() => {
  if (!dueDate.value) return false;

  const now = new Date();
  const dueDateTimestamp = new Date(dueDate.value).getTime();
  const timeDifference = dueDateTimestamp - now.getTime();

  if (timeDifference <= 0) return true;

  return false;
});

const deleteCardWithConfirmation = (id: string | undefined) => {
  /*
    TODO: rewrite this, we are passing a ref through an emit which works for this usecase of DOM manipulation but might break reactivity
    need to figure out a better way to handle this, especially because we go back and forth between the card component and the parent
    (how this works at the moment: click x -> emit removeCardWithConfirmation -> parent component opens confirmation modal and checks if we actually want the deletion -> if yes, manipulate the DOM of the card component and then delete the card)
  */

  if (id) {
    // eslint-disable-next-line vue/no-ref-as-operand
    emit("removeCardWithConfirmation", id, cardRef);
  }
};

const deleteCardWithAnimation = (id: string | undefined) => {
  if (!cardRef.value) return;

  const oldClasses = cardRef.value.classList.value;
  cardRef.value.classList.value = oldClasses + " card-hidden";

  setTimeout(() => {
    emit("removeCard", id);

    if (!cardRef.value) return;
    cardRef.value.classList.value = oldClasses;
  }, 250);
};

const enableCardEditMode = () => {
  emit("disableDragging");

  cardNameEditMode.value = true;

  if (cardNameText.value == null) return;

  const textAreaHeight = `height: ${cardNameText.value.scrollHeight}px`;

  nextTick(() => {
    if (cardNameInput.value == null) return;
    cardNameInput.value.setAttribute("style", textAreaHeight);
  });
};

const updateCardName = () => {
  if (name.value == null || !/\S/.test(name.value)) {
    name.value = props.card.name;
    cardNameEditMode.value = false;
    return;
  }

  // TODO: clean up logic and just pass card as prop; fix reactivity issues!
  emit("setCardName", props.card?.id, name.value);
  cardNameEditMode.value = false;
  emit("enableDragging");
};
</script>

<style scoped>
.kanban-card {
  transition-duration: 550ms;
  transition-timing-function: ease-out;
  transition-property: opacity, text-decoration;
  opacity: 100%;
}

.kanban-card.card-hidden {
  opacity: 0%;
  text-decoration: line-through;
}

.separator-card {
  margin-bottom: 0 !important;
  gap: 0.25rem !important;
}

/* Zoom level classes for scaling */
.zoom-down {
  padding: 0.5rem !important;
  margin-bottom: 0.45rem !important;
  gap: 0.25rem !important;
}

.zoom-normal {
  padding: 0.75rem !important;
  margin-bottom: 0.1rem !important;
  gap: 0.25rem !important;
}

.zoom-up {
  padding: 1rem !important;
  margin-bottom: 1rem !important;
  gap: 0.375rem !important;
}

.zoom-up-2x {
  padding: 1.25rem !important;
  margin-bottom: 1.25rem !important;
  gap: 0.5rem !important;
}
</style>

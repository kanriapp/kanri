<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2024 trobonox <hello@trobo.dev>, Khusyasy, PwshLab -->
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
          cardTextClassZoom,
          cardBackgroundColor.startsWith('#') ? '' : cardBackgroundColor,
          cardTextColor,
        ]"
        :style="[
          cardBackgroundColor.startsWith('#')
            ? { 'background-color': cardBackgroundColor }
            : {},
        ]"
        class="kanban-card border-elevation-3 mb-3 flex min-h-[30px] w-full cursor-pointer flex-col items-start gap-1 rounded-[3px] border p-3"
        @click.self="$emit('openEditCardModal', index, card)"
      >
        <div
          :class="{ 'pb-1': cardHasNoExtraProperties }"
          class="flex w-full flex-row items-start justify-between"
        >
          <p class="text-no-overflow mr-2 w-full min-w-[28px]">
            <ClickCounter
              v-if="!cardNameEditMode"
              @double-click="enableCardEditMode"
              @single-click="$emit('openEditCardModal', index, card)"
            >
              <p ref="cardNameText">
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
            class="cursor-pointer"
            @double-click="deleteCardWithAnimation(index)"
            @single-click="deleteCardWithConfirmation(index)"
          >
            <XMarkIcon
              class="text-accent-hover mt-[3px] size-4"
              :class="cardTextColor"
            />
          </ClickCounter>
        </div>

        <div
          v-if="cardTags && cardTags?.length > 0"
          class="-ml-0.5 -mt-0.5 mb-1 flex flex-row flex-wrap items-center gap-1"
          @click="$emit('openEditCardModal', index, card)"
        >
          <div v-for="tag in cardTags" :key="tag.id">
            <KanbanTagDisplay :tag="tag" />
          </div>
        </div>

        <div
          class="flex flex-row flex-wrap items-center gap-2"
          @click="$emit('openEditCardModal', index, card)"
        >
          <PhTextAlignLeft
            v-if="!isDescriptionEmpty"
            :class="[cardTextColorDim]"
            class="size-5"
          />

          <div
            v-if="tasks && taskCompletionStatus !== '0/0'"
            :class="{
              'bg-accent text-buttons rounded-sm px-1': allTasksCompleted,
            }"
            class="flex flex-row items-center gap-1"
          >
            <PhChecks v-if="allTasksCompleted" class="text-buttons size-5" />
            <PhListChecks v-else :class="[cardTextColorDim]" class="size-5" />
            <span
              :class="allTasksCompleted ? 'text-buttons' : cardTextColorDim"
              class="text-sm"
              >{{ taskCompletionStatus }}</span
            >
          </div>

          <div
            v-if="dueDate"
            class="flex flex-row items-center gap-1"
            :class="{
              'text-buttons rounded-sm bg-red-600 px-1': dueDateOverdue,
            }"
          >
            <PhClock class="size-4" />
            <span class="text-sm">{{ getFormattedDueDate }}</span>
          </div>
        </div>
      </div>
    </ContextMenuTrigger>
    <ContextMenuPortal to=".default-layout">
      <ContextMenuContent
        class="bg-primary-darker border-elevation-1 z-[99999] min-w-[100px] rounded-md border p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] outline-none will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
      >
        <ContextMenuItem
          value="Edit Name"
          class="bg-elevation-2-hover flex w-full cursor-pointer flex-row items-center rounded-md px-4 py-1.5 pl-[25px]"
          @click="enableCardEditMode()"
        >
          Edit Name
        </ContextMenuItem>
        <ContextMenuItem
          value="Duplicate"
          class="bg-elevation-2-hover flex w-full cursor-pointer flex-row items-center rounded-md px-4 py-1.5 pl-[25px]"
          @click="$emit('duplicateCard', index)"
        >
          Duplicate
        </ContextMenuItem>
        <ContextMenuItem
          value="Delete"
          class="bg-elevation-2-hover flex w-full cursor-pointer flex-row items-center rounded-md px-4 py-1.5 pl-[25px]"
          @click="deleteCardWithConfirmation(index)"
        >
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenuPortal>
  </ContextMenuRoot>
</template>

<script setup lang="ts">
import type { Card, Tag } from "@/types/kanban-types";

import { useTauriStore } from "@/stores/tauriStore";
import { getContrast } from "@/utils/colorUtils";
import { XMarkIcon } from "@heroicons/vue/24/solid";
import {
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
  index: number;
  zoomLevel: number;
}>();

const emit = defineEmits<{
  (e: "disableDragging"): void;
  (e: "enableDragging"): void;
  (e: "openEditCardModal", index: number, card: Card): void;
  (e: "removeCard", index: number): void;
  (
    e: "removeCardWithConfirmation",
    index: number,
    cardRef: Ref<HTMLDivElement | null>
  ): void;
  (e: "setCardTitle", index: number, name: string): void;
  (e: "updateCardTags", index: number, tags: Array<Tag>): void;
  (e: "duplicateCard", index: number): void;
}>();

const store = useTauriStore().store;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const savedColors: Ref<any> = ref(null); // TODO: add types for saved theme in board
const cardRef: Ref<HTMLDivElement | null> = ref(null);

const name = ref(props.card.name);
const description = ref(props.card.description);
const tasks = ref(props.card.tasks);
const dueDate = ref(props.card.dueDate);
const isDueDateRelative = ref(props.card.isDueDateCounterRelative);
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
  },
  { deep: true }
);

onMounted(async () => {
  savedColors.value = await store.get("colors");

  emitter.on("globalTagsUpdated", ({ tags }) => {
    if (!tags) return;

    tags.forEach((tag) => {
      const savedTag = cardTags.value?.find((cardTag) => tag.id === cardTag.id);
      if (savedTag) {
        savedTag.text = tag.text;
        savedTag.color = tag.color;
        savedTag.style = tag.style;

        emit("updateCardTags", props.index, cardTags.value ?? []);
      }
    });
  });
});

onUnmounted(() => {
  emitter.off("globalTagsUpdated");
});

const cardHasNoExtraProperties = computed(() => {
  return (
    (!tasks.value || tasks.value.length === 0) &&
    isDescriptionEmpty &&
    !dueDate.value &&
    (props.card.tags || []).length === 0
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

const cardTextClassZoom = computed(() => {
  switch (props.zoomLevel) {
    case 0:
      return "";

    case -1:
      return "text-sm";

    case 1:
      return "text-xl";

    case 2:
      return "text-2xl";

    default:
      return "";
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
      const daysPast = Math.ceil(hoursPast / 24);

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
    const days = Math.ceil(hours / 24);

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

  return new Date(dueDate.value).toLocaleDateString();
});

const dueDateOverdue = computed(() => {
  if (!dueDate.value) return false;

  const now = new Date();
  const dueDateTimestamp = new Date(dueDate.value).getTime();
  const timeDifference = dueDateTimestamp - now.getTime();

  if (timeDifference <= 0) return true;

  return false;
});

const deleteCardWithConfirmation = (index: number) => {
  emit("removeCardWithConfirmation", index, cardRef);
};

const deleteCardWithAnimation = (index: number) => {
  if (!cardRef.value) return;

  const oldClasses = cardRef.value.classList.value;
  cardRef.value.classList.value = oldClasses + " card-hidden";

  setTimeout(() => {
    emit("removeCard", index);

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

  emit("setCardTitle", props.index, name.value);
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
</style>

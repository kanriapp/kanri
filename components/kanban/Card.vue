<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2023 trobonox <hello@trobo.tech> -->
<!-- -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

<template>
  <div
    ref="cardRef"
    class="kanban-card border-elevation-3 flex cursor-pointer flex-col items-start gap-1 border"
    :class="[cardTextClassZoom, cardBackgroundColor, cardTextColor]"
    @click.self="$emit('openKanbanModal', $event, index, card)"
  >
    <div
      class="flex w-full flex-row items-center justify-between"
      :class="{'pb-1.5': (!tasks && (!description || !(/\S/.test(description))))}"
    >
      <p
        class="text-no-overflow mr-2 w-full min-w-[24px]"
      >
        <ClickCounter
          v-if="!cardNameEditMode"
          @single-click="$emit('openKanbanModal', $event, index, card)"
          @double-click="enableCardEditMode"
        >
          <p ref="cardNameText">
            {{ name }}
          </p>
        </ClickCounter>
        <textarea
          v-else
          ref="cardNameInput"
          v-model="name"
          v-resizable
          v-focus
          type="text"
          maxlength="1000"
          class="bg-elevation-3 m-0 h-full w-full resize-none rounded-sm p-0 focus:outline-none"
          @blur="updateCardName"
          @keypress.enter="updateCardName"
        />
      </p>
      <ClickCounter
        class="cursor-pointer"
        @single-click="deleteCardWithConfirmation(index)"
        @double-click="deleteCardWithAnimation(index)"
      >
        <XMarkIcon class="text-dim-1 text-accent-hover h-4 w-4" />
      </ClickCounter>
    </div>
    <div
      class="flex flex-row items-center gap-2"
      @click="$emit('openKanbanModal', $event, index, card)"
    >
      <PhTextAlignLeft
        v-if="description && (/\S/.test(description))"
        class="h-5 w-5"
        :class="[cardTextColorDim]"
      />
      <div
        v-if="tasks && taskCompletionStatus !== '0/0'"
        class="flex flex-row items-center gap-1"
        :class="{'bg-accent text-buttons rounded-sm px-1': allTasksCompleted}"
      >
        <PhChecks
          v-if="allTasksCompleted"
          class="text-buttons h-5 w-5"
        />
        <PhListChecks
          v-else
          class="h-5 w-5"
          :class="[cardTextColorDim]"
        />
        <span
          class="text-sm"
          :class="allTasksCompleted ? 'text-buttons' : cardTextColorDim"
        >{{ taskCompletionStatus }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTauriStore } from "@/stores/tauriStore";
import { getContrast } from "@/utils/colorUtils"
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { Card } from '@/types/kanban-types';
import { PhChecks, PhListChecks, PhTextAlignLeft } from "@phosphor-icons/vue";

const props = defineProps<{
    index: number,
    card: Card,
    zoomLevel: number
}>();

const emit = defineEmits<{
    (e: "removeCard", index: number): void,
    (e: "removeCardWithConfirmation", index: number, cardRef: Ref<HTMLDivElement | null>): void,
    (e: "enableDragging"): void,
    (e: "disableDragging"): void,
    (e: "openKanbanModal", event: Event, index: number, card: Card): void,
    (e: "setCardTitle", index: number, name: string): void
}>();

const store = useTauriStore().store;

const savedColors: Ref<any> = ref(null);
const cardRef: Ref<HTMLDivElement | null> = ref(null);

const name = ref(props.card.name);
const description = ref(props.card.description);
const tasks = ref(props.card.tasks);
const cardNameEditMode = ref(false);

const cardNameInput: Ref<HTMLTextAreaElement | null> = ref(null);
const cardNameText: Ref<HTMLParagraphElement | null> = ref(null);

watch(props, (_, newData) => {
    name.value = newData.card.name;
    description.value = newData.card.description;
    tasks.value = newData.card.tasks;
});

onMounted(async () => {
    savedColors.value = await store.get("colors");
})

const taskCompletionStatus = computed(() => {
    if (!tasks.value) return "0/0";

    const totalTasks = tasks.value.length;
    const completedTasks = tasks.value.filter(task => task.finished).length;

    return `${completedTasks}/${totalTasks}`;
});

const allTasksCompleted = computed(() => {
    if (!tasks.value) return false;

    const totalTasks = tasks.value.length;
    const completedTasks = tasks.value.filter(task => task.finished).length;

    if (totalTasks === completedTasks) return true;
})


const cardTextClassZoom = computed(() => {
    switch (props.zoomLevel) {
    case 0:
        return ""

    case -1:
        return "text-sm"

    case 1:
        return "text-xl"

    case 2:
        return "text-2xl"

    default:
        return ""
    }
});

const cardBackgroundColor = computed(() => {
    if (!props.card.color) return "bg-elevation-2";

    return props.card.color;
})

const cardTextColor = computed(() => {
    if (cardBackgroundColor.value === "bg-elevation-2") {
        if (savedColors.value) {
            //@ts-ignore
            return getContrast(savedColors.value.elevation2);
        }
    }

    return "text-gray-50";
});

const cardTextColorDim = computed(() => {
    if (cardBackgroundColor.value === "bg-elevation-2") {
        if (savedColors.value) {
            if (getContrast(savedColors.value.elevation2) === "text-gray-50") {
                return "text-gray-300";
            }
            return "text-gray-700"
        }
    }

    return "text-gray-300";
});

const deleteCardWithConfirmation = (index: number) => {
    emit("removeCardWithConfirmation", index, cardRef);
}

const deleteCardWithAnimation = (index: number) => {
    if (!cardRef.value) return;

    const oldClasses = cardRef.value.classList.value;
    cardRef.value.classList.value = oldClasses + " card-hidden";

    setTimeout(() => {
        emit("removeCard", index);

        if (!cardRef.value) return;
        cardRef.value.classList.value = oldClasses;
    }, 250);
}

const enableCardEditMode = () => {
    emit("disableDragging");

    cardNameEditMode.value = true;

    if (cardNameText.value == null) return;

    const textAreaHeight = `height: ${cardNameText.value.scrollHeight}px`;

    nextTick(() => {
        if (cardNameInput.value == null) return;
        cardNameInput.value.setAttribute("style", textAreaHeight);
    });
}

const updateCardName = () => {
    if (name.value == null || !(/\S/.test(name.value))) {
        name.value = props.card.name;
        cardNameEditMode.value = false;
        return;
    }

    emit("setCardTitle", props.index, name.value);
    cardNameEditMode.value = false;
    emit("enableDragging");
}
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

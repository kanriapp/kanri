<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2023 trobonox <hello@trobo.tech> -->
<!-- -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

<template>
  <div
    ref="cardRef"
    class="kanban-card flex cursor-pointer flex-row justify-between bg-blue-600"
    :class="[cardTextClassZoom, cardBackgroundColor, cardTextColor]"
    @click.self="$emit('openKanbanModal', $event, index, card)"
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
        class="bg-elevation-3 h-full w-full resize-none rounded-sm focus:outline-none"
        @blur="updateCardName"
        @keypress.enter="updateCardName"
      />
    </p>

    <div
      class="cursor-pointer"
      @click="deleteCardWithAnimation(index)"
    >
      <XMarkIcon class="text-dim-1 text-accent-hover h-4 w-4" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTauriStore } from "@/stores/tauriStore";
import { getContrast } from "@/utils/colorUtils"
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { Card } from '@/types/kanban-types';

const props = defineProps<{
    index: number,
    card: Card,
    zoomLevel: number
}>();

const emit = defineEmits<{
    (e: "removeCard", index: number): void,
    (e: "enableDragging"): void,
    (e: "disableDragging"): void,
    (e: "openKanbanModal", event: Event, index: number, card: Card): void,
    (e: "setCardTitle", index: number, name: string): void
}>();

const store = useTauriStore().store;

const savedColors = ref(null);
const cardRef: Ref<HTMLDivElement | null> = ref(null);

const name = ref(props.card.name);
const cardNameEditMode = ref(false);

const cardNameInput: Ref<HTMLTextAreaElement | null> = ref(null);
const cardNameText: Ref<HTMLParagraphElement | null> = ref(null);

watch(props, (_, newData) => {
    name.value = newData.card.name;
});

onMounted(async () => {
    savedColors.value = await store.get("colors");
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
})

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

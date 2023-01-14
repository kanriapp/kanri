<template>
  <ClickCounter
    v-if="!cardNameEditMode"
    @single-click="$emit('openKanbanModal')"
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
    type="text"
    maxlength="1000"
    class="bg-elevation-3 h-full w-full resize-none rounded-sm focus:outline-none"
    @blur="updateCardName"
    @keypress.enter="updateCardName"
  />
</template>

<script setup lang="ts">
import { Ref } from "vue";
import { Card } from "@/types/kanban-types";

const props =defineProps<{
    card: Card;
    cardIndex: number;
}>();

const emit = defineEmits<{
    (e: "openKanbanModal"): void,
    (e: "updateCardName", cardIndex: number, cardName: string): void,
    (e: "enableDragging"): void,
    (e: "disableDragging"): void,
}>();

const name = ref(props.card.name);
const cardNameEditMode = ref(false);

const cardNameInput: Ref<HTMLTextAreaElement | null> = ref(null);
const cardNameText: Ref<HTMLParagraphElement | null> = ref(null);

watch(props, (_, newData) => {
    name.value = newData.card.name;
});

const enableCardEditMode = () => {
    emit("disableDragging");

    cardNameEditMode.value = true;

    console.log(cardNameText.value);
    
    if (cardNameText.value == null) return; 

    const textAreaHeight = `height: ${cardNameText.value.scrollHeight}px`;
    
    nextTick(() => {
        if (cardNameInput.value == null) return;
        cardNameInput.value.setAttribute("style", textAreaHeight);
        cardNameInput.value.focus();
    });

}

const updateCardName = () => {
    if (name.value == null || !(/\S/.test(name.value))) {
        name.value = props.card.name;
        cardNameEditMode.value = false;
        return;
    }

    emit("updateCardName", props.cardIndex, name.value);
    cardNameEditMode.value = false;
    emit("enableDragging");
}
</script>

<template>
  <div class="bg-elevation-1 max-h-column flex w-64 flex-col rounded-md p-2 shadow-lg">
    <div
      id="board-title"
      class="flex flex-row items-start justify-between gap-4"
    >
      <h1
        v-if="!titleEditing"
        class="text-no-overflow ml-1 text-lg font-bold"
        @click="enableTitleEditing()"
      >
        {{ boardTitle }}
      </h1>

      <input
        v-if="titleEditing"
        ref="titleInput"
        v-model="titleNew"
        type="text"
        maxlength="1000"
        class="bg-elevation-2 border-accent text-no-overflow mr-2 w-full rounded-sm border-2 border-dotted px-2 text-lg outline-none"
        @blur="updateColumnTitle"
        @keypress.enter="
          updateColumnTitle();
          emitter.emit('columnActionDone');
        "
      >

      <XMarkIcon
        class="text-dim-4 text-accent-hover mt-2 h-4 w-4 shrink-0 grow-0 cursor-pointer"
        @click="$emit('removeColumn', id)"
      />
    </div>

    <Container
      group-name="cards"
      :get-child-payload="getChildPayload"
      class="max-h-65vh custom-scrollbar mt-2 overflow-y-auto rounded-sm"
      drag-handle-selector=".kanbancard-drag"
      orientation="vertical"
      drag-class="cursor-grabbing"
      @drop="onDrop"
    >
      <Draggable
        v-for="(card, index) in cards"
        :key="index"
        class="bg-elevation-2 mb-3 min-h-[30px] cursor-grab rounded-sm px-3 pt-3 pb-5"
        :class="draggingEnabled ? 'kanbancard-drag' : 'nomoredragging'"
      >
        <div
          class="flex cursor-pointer flex-row justify-between"
          @click.self="(event) => openKanbanModal(event, index, card)"
        >
          <p
            class="text-no-overflow mr-2 w-full min-w-[24px]"
          >
            <KanbanCard
              :card="card"
              :card-index="index"
              @updateCardName="setCardTitle"
              @disableDragging="disableDragging"
              @enableDragging="enableDragging"
              @openKanbanModal="(event) => openKanbanModal(event, index, card)"
            />
          </p>

          <div
            class="cursor-pointer"
            @click="removeCard(index)"
          >
            <XMarkIcon class="text-dim-4 text-accent-hover h-4 w-4" />
          </div>
        </div>
      </Draggable>
    </Container>

    <div
      v-if="cardAddMode"
      class="mt-2 flex flex-col"
    >
      <textarea
        id="newCardInput"
        ref="newCardInput"
        v-model="newCardName"
        v-resizable
        type="text"
        maxlength="5000"
        placeholder="Enter a card title..."
        class="bg-elevation-2 border-accent-focus mb-2 h-12 overflow-hidden rounded-sm p-1 focus:border-2 focus:border-dotted focus:outline-none"
        @blur="
          addCard($event);
        "
        @keypress.enter="
          addCard($event);
          emitter.emit('columnActionDone');
        "
      />
      <div class="flex w-full flex-row justify-start gap-2">
        <button
          id="submitButton"
          class="text-buttons bg-accent rounded-md px-2 py-1"
          @click="
            addCard($event);
            emitter.emit('columnActionDone');
          "
        >
          Add Card
        </button>
        <button
          class="bg-elevation-3-hover rounded-md px-2 py-1"
          @click="
            cardAddMode = !cardAddMode;
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
      <PlusIcon class="h-6 w-6 p-0.5" />
      <h2>Add Card</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
//@ts-ignore, sadly this library does not have ts typings
import { Container, Draggable } from "vue3-smooth-dnd";

import { XMarkIcon, PlusIcon } from "@heroicons/vue/24/solid";

import { applyDrag } from "@/utils/drag-n-drop";
import emitter from "@/utils/emitter";

import { Card, Column } from "~/types/kanban-types";
import type { Ref } from "vue"

const props = defineProps<{
    id: string;
    title: string;
    cardsList: Array<Card>;
}>();

const emit = defineEmits<{
  (e: "updateStorage", column: Column): void,
  (e: "removeColumn", columnId: string): void,
  (e: "enableDragging"): void,
  (e: "disableDragging"): void,
  (e: "openKanbanModal", columnId: string, cardIndex: number, el: Card ): void,
}>();

const titleInput: Ref<HTMLInputElement | null> = ref(null);
const newCardInput: Ref<HTMLInputElement | null> = ref(null);

const cards = ref<Card[]>(props.cardsList);
const newCardName = ref("");
const cardAddMode = ref(false);

const titleNew = ref(props.title);
const titleEditing = ref(false);

const draggingEnabled = ref(true);

const boardTitle = ref(props.title);

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
        }
    });

    emitter.on("resetColumnInputs", () => {
        cardAddMode.value = false;
        newCardName.value = "";
        titleEditing.value = false;
    });
});

onBeforeUnmount(() => {
    document.removeEventListener("keydown", keyDownListener);
});

const keyDownListener = (e: { key: string; }) => {
    if (e.key === "Escape") {
        cardAddMode.value = false;
        newCardName.value = "";
        titleEditing.value = false;

        emitter.emit("columnActionDone");
    }
};

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
}

const disableDragging = () => {
    draggingEnabled.value = false;
    emit("disableDragging");
}

const enableTitleEditing = () => {
    disableDragging();

    titleEditing.value = true;
    titleNew.value = boardTitle.value;
    nextTick(() => {
        if (titleInput.value == null) return;
        titleInput.value.focus();
    });
}

const enableCardAddMode = () => {
    disableDragging();

    cardAddMode.value = true;

    nextTick(() => {
        if (newCardInput.value == null) return;
        newCardInput.value.focus()
    });
}

const updateColumnTitle = () => {
    disableDragging();

    if (titleNew.value == null || !(/\S/.test(titleNew.value))) {
        titleNew.value = "";
        titleEditing.value = false;
        return;
    }

    boardTitle.value = titleNew.value;
    titleNew.value = "";

    titleEditing.value = false;
    updateStorage();
}

const addCard = (event: MouseEvent | FocusEvent | KeyboardEvent) => {
    enableDragging();

    if (
        //@ts-ignore
        (event.relatedTarget && event.relatedTarget.id === "submitButton") ||
        event instanceof KeyboardEvent
    ) {
        cards.value[cards.value.length] = { name: newCardName.value };
    }

    newCardName.value = "";
    cardAddMode.value = false;
    updateStorage();
};

const removeCard = (index: number) => {
    cards.value.splice(index, 1);
    updateStorage();
};

const setCardTitle = (cardIndex: number, name: string) => {
    cards.value[cardIndex].name = name;
    updateStorage();
};

const setCardDescription = (cardIndex: number, description: string) => {
    cards.value[cardIndex].description = description;
    updateStorage();
};

const openKanbanModal = (_: any, index: number, el: Card) => {
    disableDragging();
    emitter.emit("zIndexDown");

    emit("openKanbanModal", props.id, index, el);
};

const closeModal = () => {
    enableDragging();
};

const updateStorage = () => {
    const column = {
        id: props.id,
        title: boardTitle.value,
        cards: cards.value,
    };

    emit("updateStorage", column);
};

defineExpose({ setCardTitle, setCardDescription, closeModal, enableDragging });
</script>

<style scoped>
.max-h-column {
   max-height: 75vh;
}
</style>

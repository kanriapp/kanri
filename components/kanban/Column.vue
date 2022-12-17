<template>
    <div class="bg-elevation-1 flex w-64 flex-col rounded-md p-2 shadow-lg max-h-column">
        <ModalKanban
            v-show="modalVisible"
            ref="modal"
            @setCardTitle="setCardTitle"
            @setCardDescription="setCardDescription"
            @closeModal="closeModal"
        />

        <div id="board-title" class="flex flex-row items-start justify-between gap-4">
            <h1
                v-if="!titleEditing"
                @click="enableTitleEditing()"
                class="text-no-overflow ml-1 text-lg font-bold"
            >
                {{ titleNew }}
            </h1>

            <input
                ref="titleInput"
                v-if="titleEditing"
                type="text"
                v-model="titleNew"
                class="bg-elevation-2 border-accent text-no-overflow mr-2 w-full rounded-sm border-2 border-dotted px-2 text-lg outline-none"
                @blur="updateColumnTitle"
                @keypress.enter="
                    updateColumnTitle();
                    emitter.emit('columnActionDone');
                "
            />

            <XMarkIcon
                class="mt-2 h-4 w-4 text-dim-4 flex-shrink-0 flex-grow-0 text-accent-hover cursor-pointer"
                @click="$emit('removeColumn', id)"
            />
        </div>

        <Container
            group-name="cards"
            :get-child-payload="getChildPayload"
            class="max-h-65vh custom-scrollbar mt-2 overflow-y-auto rounded-sm"
            @drop="onDrop"
            :drag-handle-selector="dragHandleSelector"
            orientation="vertical"
            drag-class="cursor-grabbing"
        >
            <Draggable
                v-for="(card, index) in cards"
                :key="index"
                class="bg-elevation-2 mb-3 cursor-grab rounded-sm px-3 pt-3 pb-5"
            >
                <div
                    class="flex cursor-pointer flex-row justify-between"
                    @click.self="(event) => openModal(event, index, card)"
                >
                    <p
                        class="text-no-overflow mr-2 min-w-[24px]"
                        @click="(event) => openModal(event, index, card)"
                    >
                        {{ card.name }}
                    </p>

                    <div class="cursor-pointer" @click="removeCard(index)">
                        <XMarkIcon class="h-4 w-4 text-dim-4 text-accent-hover" />
                    </div>
                </div>
            </Draggable>
        </Container>

        <div v-if="cardAddMode" class="mt-2 flex flex-col">
            <textarea
                id="newCardInput"
                ref="newCardInput"
                type="text"
                placeholder="Enter a card title..."
                v-model="newCardName"
                class="bg-elevation-2 border-accent-focus mb-2 h-12 overflow-hidden rounded-sm p-1 focus:border-2 focus:border-dotted focus:outline-none"
                @blur="
                    addCard($event);
                "
                @keypress.enter="
                    addCard($event);
                    emitter.emit('columnActionDone');
                "
                v-resizable
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
                    @click="
                        cardAddMode = !cardAddMode;
                        newCardName = '';
                        emitter.emit('columnActionDone');
                    "
                    class="bg-elevation-3-hover rounded-md px-2 py-1"
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

import { Card } from "~/types/kanban-types";
import type { Ref } from "vue"

const props = defineProps<{
    id: string;
    title: string;
    cardsList: Array<Card>;
}>();

const emit = defineEmits(["updateStorage", "removeColumn", "disableDragging", "enableDragging"]);

const titleInput: Ref<HTMLInputElement | null> = ref(null);
const newCardInput: Ref<HTMLInputElement | null> = ref(null);

const cards = ref<Card[]>(props.cardsList);
const newCardName = ref("");
const cardAddMode = ref(false);
const titleNew = ref(props.title);
const titleEditing = ref(false);
const modalVisible = ref(false);
const draggingEnabled = ref(true);

const enableTitleEditing = () => {
    titleEditing.value = true;
    nextTick(() => {
        if (titleInput.value == null) return;
        titleInput.value.focus();
    });
}

const enableCardAddMode = () => {
    cardAddMode.value = true;

    nextTick(() => {
        if (newCardInput.value == null) return;
        newCardInput.value.focus()
    });
}

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

const dragHandleSelector = computed(() => {
    return draggingEnabled.value ? "" : "dragging_disabled";
});

const onDrop = (dropResult: any) => {
    cards.value = applyDrag(cards.value, dropResult);
    updateStorage();
};

const getChildPayload = (index: number) => {
    return cards.value[index];
};

const updateColumnTitle = () => {
    if (titleNew.value == null || !(/\S/.test(titleNew.value))) return;

    titleEditing.value = false;
    updateStorage();
}

const addCard = (event: MouseEvent | FocusEvent | KeyboardEvent) => {
    if (newCardName.value == null || !(/\S/.test(newCardName.value))) return;

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

const openModal = (_: any, index: number, el: Card) => {
    draggingEnabled.value = false;
    emit("disableDragging");
    emitter.emit("openKanbanModal", { index, el });
    emitter.emit("zIndexDown");
    modalVisible.value = true;
};

const closeModal = () => {
    modalVisible.value = false;
    draggingEnabled.value = true;
    emit("enableDragging");
    emitter.emit("zIndexBack");
};

const updateStorage = () => {
    const column = {
        id: props.id,
        title: titleNew.value,
        cards: cards.value,
    };

    emit("updateStorage", column);
};
</script>

<style scoped>
.max-h-column {
    max-height: 75vh;
}
</style>

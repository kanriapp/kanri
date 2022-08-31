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
                @click="
                    titleEditing = true;
                    $nextTick(() => $refs.titleInput.focus());
                "
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
                @blur="
                    titleEditing = false;
                    updateStorage();
                "
                @keypress.enter="
                    titleEditing = false;
                    updateStorage();
                    emitter.emit('columnActionDone');
                "
            />

            <XIcon
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
                        class="text-no-overflow mr-2"
                        @click="(event) => openModal(event, index, card)"
                    >
                        {{ card.name }}
                    </p>

                    <div class="cursor-pointer" @click="removeCard(index)">
                        <XIcon class="h-4 w-4 text-dim-4 text-accent-hover" />
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
            @click="
                cardAddMode = !cardAddMode;
                $nextTick(() => $refs.newCardInput.focus());
            "
        >
            <PlusIcon class="h-6 w-6 p-0.5" />
            <h2>Add Card</h2>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Container, Draggable } from "vue3-smooth-dnd";
import { XIcon, PlusIcon } from "@heroicons/vue/solid";
import { applyDrag } from "@/utils/drag-n-drop";
import emitter from "@/utils/emitter";

const props = defineProps<{
    id: string;
    title: string;
    cardsList: Array<Object>;
}>();

const emit = defineEmits(["updateStorage", "removeColumn", "disableDragging"]);

const titleInput = ref(null);
const newCardInput = ref(null);

const cards = ref(props.cardsList);
const newCardName = ref("");
const cardAddMode = ref(false);
const titleNew = ref(props.title);
const titleEditing = ref(false);
const modalVisible = ref(false);
const draggingEnabled = ref(true);

onMounted(() => {
    document.addEventListener("keydown", keyDownListener);

    emitter.on("enableColumnTitleEditing", (columnID) => {
        if (columnID === props.id) {
            titleEditing.value = true;
            nextTick(() => titleInput.value.focus());
        }
    });

    emitter.on("enableColumnCardAddMode", (columnID) => {
        if (columnID === props.id) {
            cardAddMode.value = true;
            nextTick(() => newCardInput.value.focus());
        }
    });

    emitter.on("resetColumnInputs", (columnID) => {
        cardAddMode.value = false;
        newCardName.value = "";
        titleEditing.value = false;
    });
});

onBeforeUnmount(() => {
    document.removeEventListener("keydown", keyDownListener);
});

const keyDownListener = (e) => {
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

const onDrop = (dropResult) => {
    cards.value = applyDrag(cards.value, dropResult);
    updateStorage();
};

const getChildPayload = (index: number) => {
    return cards.value[index];
};

const addCard = (event) => {
    if (
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
    // @ts-ignore
    cards.value[cardIndex].name = name;
};

const setCardDescription = (cardIndex: number, description: string) => {
    // @ts-ignore
    cards.value[cardIndex].description = description;
};

const openModal = (_, index, el) => {
    draggingEnabled.value = false;
    emit("disableDragging");
    emitter.emit("openKanbanModal", { index, el });
    emitter.emit("zIndexDown");
    modalVisible.value = true;
};

const closeModal = () => {
    modalVisible.value = false;
    draggingEnabled.value = true;
    emitter.emit("zIndexBack");
    // TODO: also disable dragging for columns (emit event to top page, see KE)
};

const updateStorage = () => {
    const column = {
        id: props.id,
        title: titleNew,
        cards: cards,
    };

    emit("updateStorage", column);
};

/*
logic to still be implemented:


    mounted() {
        this._keyListener = function (e) {
            if (e.key === "Escape") {
                this.cardAddMode = false;
                this.newCardName = "";
                this.titleEditing = false;
            }
        };

        document.addEventListener("keydown", this._keyListener.bind(this));
    },

    beforeDestroy() {
        document.removeEventListener("keydown", this._keyListener);
    },
};
*/
</script>

<style scoped>
.max-h-column {
    max-height: 75vh;
}
</style>

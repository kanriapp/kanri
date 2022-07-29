<template>
    <div class="bg-elevation-1 flex w-64 flex-col rounded-md p-2 shadow-lg">
        <ModalKanban v-show="modalVisible" ref="modal" @setCardTitle="setCardTitle"
            @setCardDescription="setCardDescription" @closeModal="closeModal" />

        <div class="flex flex-row items-start justify-between gap-4">
            <h1 v-if="!titleEditing" @click="titleEditing = true; $nextTick(() => $refs.titleInput.focus());"
                class="text-no-overflow ml-1 text-lg font-bold">
                {{ titleNew }}
            </h1>
            <input ref="titleInput" v-if="titleEditing" type="text" v-model="titleNew"
                class="bg-elevation-2 border-accent text-no-overflow mr-2 w-full rounded-sm border-2 border-dotted px-2 text-lg outline-none"
                @blur="titleEditing = false; updateStorage();"
                @keypress.enter="titleEditing = false; updateStorage();" />
            <svg class="text-dim-4 text-accent-hover mt-2 h-4 w-4 flex-shrink-0 flex-grow-0 cursor-pointer"
                fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                @click="$emit('removeColumn', id)">
                <path fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
            </svg>
        </div>
        <Container group-name="cards" :get-child-payload="getChildPayload"
            class="max-h-65vh custom-scrollbar mt-2 overflow-y-auto rounded-sm" @drop="onDrop"
            :drag-handle-selector="dragHandleSelector">
            <Draggable v-for="(el, index) in cards" :key="index"
                class="bg-elevation-2 mb-3 cursor-grab rounded-sm px-3 pt-3 pb-5">
                <div class="flex cursor-pointer flex-row justify-between" @click.self="openModal" :id="index">
                    <p class="text-no-overflow mr-2" @click="openModalFromChild">
                        {{ el.name }}
                    </p>
                    <div class="cursor-pointer" @click="removeCard(index)">
                        <svg class="text-dim-4 text-accent-hover h-4 w-4" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </div>
                </div>
            </Draggable>
        </Container>
        <div v-if="cardAddMode" class="mt-2 flex flex-col">
            <textarea id="newCardInput" ref="newCardInput" type="text" placeholder="Enter a card title..."
                v-model="newCardName"
                class="bg-elevation-2 border-accent-focus mb-2 h-12 overflow-hidden rounded-sm p-1 focus:border-2 focus:border-dotted focus:outline-none"
                @blur="addCard($event)" @keypress.enter="addCard($event)" v-resizable />
            <div class="flex w-full flex-row justify-start gap-2">
                <button id="submitButton" class="text-buttons bg-accent rounded-md px-2 py-1" @click="addCard($event)">
                    Add Card
                </button>
                <button @click="cardAddMode = !cardAddMode; newCardName = '';
                " class="bg-elevation-3-hover rounded-md px-2 py-1">
                    Cancel
                </button>
            </div>
        </div>

        <div v-if="!cardAddMode"
            class="text-dim-1 bg-elevation-3-hover mt-2 flex cursor-pointer flex-row gap-1 rounded-md py-1 font-medium"
            @click="cardAddMode = !cardAddMode; $nextTick(() => $refs.newCardInput.focus());">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <h2>Add Card</h2>
        </div>
    </div>
</template>

<script>
import { Container, Draggable } from "vue3-smooth-dnd";

export default {
    components: { Container, Draggable},
    props: {
        id: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        list: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            cards: [...this.list],
            newCardName: "",
            cardAddMode: false,
            titleNew: this.title,
            titleEditing: false,
            modalVisible: false,
            draggingEnabled: true,
        };
    },
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

    computed: {
        dragHandleSelector() {
            if (!this.draggingEnabled) return "joe";
            else return "";
        },
    },

    methods: {
        onDrop(dropResult) {
            this.cards = this.applyDrag(this.cards, dropResult);
            this.updateStorage();
        },

        getChildPayload(index) {
            return this.cards[index];
        },

        applyDrag(arr, dragResult) {
            const { removedIndex, addedIndex, payload } = dragResult;
            if (removedIndex === null && addedIndex === null) return arr;

            const result = [...arr];
            let itemToAdd = payload;

            if (removedIndex !== null) {
                itemToAdd = result.splice(removedIndex, 1)[0];
            }

            if (addedIndex !== null) {
                result.splice(addedIndex, 0, itemToAdd);
            }

            return result;
        },

        addCard(event) {
            if (
                (event.relatedTarget && event.relatedTarget.id === "submitButton") ||
                event instanceof KeyboardEvent
            ) {
                this.$set(
                    this.cards,
                    this.cards.length,
                    JSON.parse(JSON.stringify({ name: this.newCardName }))
                );
            }

            this.newCardName = "";
            this.cardAddMode = false;
            this.updateStorage();
        },

        removeCard(index) {
            this.$delete(this.cards, index);
            this.updateStorage();
        },

        setCardTitle(cardIndex, title) {
            this.cards[cardIndex].name = title;
            this.updateStorage();
        },

        setCardDescription(cardIndex, description) {
            this.cards[cardIndex].description = description;
            this.updateStorage();
        },

        openModal(event) {
            const cardIndex = parseInt(event.srcElement.attributes.id.nodeValue);
            const cardTitle = this.cards[cardIndex].name;
            const cardDescription = this.cards[cardIndex].description;

            this.$refs.modal.initModal(cardIndex, cardTitle, cardDescription);
            this.modalVisible = true;
            this.draggingEnabled = false;
            this.$emit("modalOpen");
        },

        openModalFromChild(event) {
            const eventNew = {
                srcElement: event.srcElement.parentElement,
            };
            this.openModal(eventNew);
        },

        closeModal() {
            this.modalVisible = false;
            this.draggingEnabled = true;
            this.$emit("modalClose");
        },

        updateStorage() {
            const column = {
                id: this.id,
                title: this.titleNew,
                cards: this.cards,
            };

            this.$emit("updateStorage", column);
        },
    },
};
</script>

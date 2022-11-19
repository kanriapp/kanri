<template>
    <Modal
        :title="title"
        ref="barebonesModal"
        @closeModal="$emit('closeModal')"
    >
        <template v-slot:content>
            <div class="div flex flex-col w-[36rem] min-h-[40rem]">
                <div class="flex flex-row justify-between items-start gap-12">
                    <h1
                        @click="enableTitleEditing()"
                        v-if="!titleEditing"
                        :v-model="title"
                        class="pointer-events-auto pr-5 text-2xl font-bold text-no-overflow"
                    >
                        {{ title }}
                    </h1>
                    <input
                        @blur="updateTitle"
                        @keypress.enter="updateTitle"
                        v-if="titleEditing"
                        ref="titleInput"
                        type="text"
                        v-model="title"
                        class="bg-elevation-2 text-normal border-accent-focus pointer-events-auto text-xl focus:border-2 focus:border-dotted focus:outline-none"
                    />

                    <XMarkIcon class="h-6 w-6 cursor-pointer text-accent-hover flex-shrink-0" @click="$emit('closeModal')" />
                </div>
                <span class="text-md text-dim-3 mb-6">
                    Edit all the things about your card!
                </span>

                <label for="cardDescription" class="text-lg font-semibold">
                    Card Description
                </label>
                <textarea
                    @blur="updateDescription"
                    @keypress.enter="updateDescription"
                    v-model="description"
                    name="cardDescription"
                    id="cardDescription"
                    cols="6"
                    rows="70"
                    placeholder="Enter a detailed description of your card here..."
                    class="bg-elevation-2 border-accent-focus pointer-events-auto mt-2 h-40 w-11/12 resize-none rounded-md p-2 shadow-lg focus:border-2 focus:border-dotted focus:outline-none"
                >
                </textarea>
            </div>
        </template>
    </Modal>
</template>

<script setup lang="ts">
import emitter from "@/utils/emitter"

import { XMarkIcon } from "@heroicons/vue/24/solid";
import { Ref } from "vue";

const emit = defineEmits(["closeModal", "setCardDescription", "setCardTitle"])

const cardID = ref(0)
const title = ref("")
const description = ref("")

const titleEditing = ref(false)
const titleInput: Ref<HTMLInputElement | null> = ref(null);

const enableTitleEditing = () => {
    titleEditing.value = true;
    nextTick(() => {
        if (titleInput.value == null) return;
        titleInput.value.focus();
    });
}

onMounted(() => {
    emitter.on("openKanbanModal", (params) => {
        initModal(params.index, params.el.name, params.el.description || "")
    })
})

const initModal = (cardIdParam: number, titleParam: string, descriptionParam?: string) => {
    cardID.value = cardIdParam;
    title.value = titleParam;
    description.value = descriptionParam || "";
}

const updateDescription = () => {
    emit("setCardDescription", cardID.value, description.value);
}

const updateTitle = () => {
    titleEditing.value = false;
    emit("setCardTitle", cardID.value, title.value);
}
</script>

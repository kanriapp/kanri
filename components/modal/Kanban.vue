<template>
    <Modal
        :title="title"
        ref="barebonesModal"
        @closeModal="$emit('closeModal')"
    >
        <template v-slot:content>
            <div class="div flex flex-col">
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
const cardID = ref(0)
const title = ref("")
const description = ref("")

const initModal = (cardIdParam: number, titleParam: string, descriptionParam?: string) => {
    cardID.value = cardIdParam;
    title.value = titleParam;
    description.value = descriptionParam || "";
}

const updateDescription = () => {
    this.$emit("setCardDescription", cardID.value, description.value);
}

const setCardTitle = (titleParam: string) => {
    title.value = titleParam;
    this.$emit("setCardTitle", cardID.value, title.value);
}
</script>

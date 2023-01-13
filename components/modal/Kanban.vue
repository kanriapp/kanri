<template>
  <Modal
    ref="barebonesModal"
    @closeModal="$emit('closeModal')"
  >
    <template #content>
      <div class="flex min-h-[40rem] w-[36rem] flex-col">
        <div class="flex flex-row items-start justify-between gap-12">
          <h1
            v-if="!titleEditing"
            :v-model="title"
            class="text-no-overflow pointer-events-auto min-w-[64px] pr-5 text-2xl font-bold"
            @click="enableTitleEditing()"
          >
            {{ title }}
          </h1>
          <input
            v-if="titleEditing"
            ref="titleInput"
            v-model="title"
            type="text"
            maxlength="1000"
            class="bg-elevation-2 text-normal border-accent-focus pointer-events-auto text-xl focus:border-2 focus:border-dotted focus:outline-none"
            @blur="updateTitle"
            @keypress.enter="updateTitle"
          >

          <XMarkIcon
            class="text-accent-hover h-6 w-6 shrink-0 cursor-pointer"
            @click="$emit('closeModal')"
          />
        </div>
        <span class="text-md text-dim-3 mb-6">
          Edit all the things about your card!
        </span>

        <label
          for="cardDescription"
          class="text-lg font-semibold"
        >
          Card Description
        </label>
        <textarea
          id="cardDescription"
          v-model="description"
          name="cardDescription"
          cols="6"
          rows="70"
          placeholder="Enter a detailed description of your card here..."
          class="bg-elevation-2 border-accent-focus pointer-events-auto mt-2 h-40 w-11/12 resize-none rounded-md p-2 shadow-lg focus:border-2 focus:border-dotted focus:outline-none"
          @focusin="emitter.emit('modalPreventClickOutsideClose')"
          @blur="updateDescription"
          @keypress.enter="updateDescription"
        />
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import emitter from "@/utils/emitter"

import { XMarkIcon } from "@heroicons/vue/24/solid";
import { Ref } from "vue";

const emit = defineEmits<{
    (e: "closeModal"): void,
    (e: "setCardDescription", columnId: string, cardIndex: number, description: string): void,
    (e: "setCardTitle", columnId: string, cardIndex: number, title: string): void,
}>();

const columnId = ref("");
const cardID = ref(0);
const title = ref("");
const description = ref("");

const titleEditing = ref(false);
const titleInput: Ref<HTMLInputElement | null> = ref(null);

const enableTitleEditing = () => {
    emitter.emit("modalPreventClickOutsideClose");

    titleEditing.value = true;
    nextTick(() => {
        if (titleInput.value == null) return;
        titleInput.value.focus();
    });
}

onMounted(() => {
    emitter.on("openKanbanModal", (params) => {
        initModal(params.columnId, params.index, params.el.name, params.el.description || "");
    })
})

const initModal = (columnIdParam: string, cardIdParam: number, titleParam: string, descriptionParam?: string) => {
    columnId.value = columnIdParam;
    cardID.value = cardIdParam;
    title.value = titleParam;
    description.value = descriptionParam || "";
}

const updateDescription = () => {
    emit("setCardDescription", columnId.value, cardID.value, description.value);
    emitter.emit("modalEnableClickOutsideClose");
}

const updateTitle = () => {
    emitter.emit("modalEnableClickOutsideClose");

    if (title.value == null || !(/\S/.test(title.value))) return;

    titleEditing.value = false;
    emit("setCardTitle", columnId.value, cardID.value, title.value);
}
</script>

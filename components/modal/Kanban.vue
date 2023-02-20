<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2023 trobonox <hello@trobo.tech> -->
<!-- -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

<template>
  <Modal
    ref="barebonesModal"
    @closeModal="$emit('closeModal', columnId)"
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

        <h2
          class="text-lg font-semibold"
        >
          Card Description
        </h2>
        <textarea
          id="cardDescription"
          v-model="description"
          name="cardDescription"
          cols="6"
          rows="70"
          maxlength="25000"
          placeholder="Enter a detailed description of your card here..."
          class="bg-elevation-2 border-accent-focus pointer-events-auto mt-2 h-40 w-11/12 resize-none rounded-md p-2 shadow-lg focus:border-2 focus:border-dotted focus:outline-none"
          @focusin="emitter.emit('modalPreventClickOutsideClose')"
          @blur="updateDescription"
          @keypress.enter="updateDescription"
        />

        <h2
          class="mb-2 mt-8 text-lg font-semibold"
        >
          Card Color
        </h2>
        <div class="flex flex-row gap-4">
          <button
            class="h-7 w-7 rounded-full bg-pink-600 p-2 hover:bg-pink-700"
            @click="$emit('setCardColor', columnId, cardID, 'bg-pink-600')"
          />
          <button
            class="h-7 w-7 rounded-full bg-red-600 p-2 hover:bg-red-700"
            @click="$emit('setCardColor', columnId, cardID, 'bg-red-600')"
          />
          <button
            class="h-7 w-7 rounded-full bg-orange-600 p-2 hover:bg-orange-700"
            @click="$emit('setCardColor', columnId, cardID, 'bg-orange-600')"
          />
          <button
            class="h-7 w-7 rounded-full bg-yellow-600 p-2 hover:bg-yellow-700"
            @click="$emit('setCardColor', columnId, cardID, 'bg-yellow-600')"
          />
          <button
            class="h-7 w-7 rounded-full bg-green-600 p-2 hover:bg-green-700"
            @click="$emit('setCardColor', columnId, cardID, 'bg-green-600')"
          />
          <button
            class="h-7 w-7 rounded-full bg-teal-600 p-2 hover:bg-teal-700"
            @click="$emit('setCardColor', columnId, cardID, 'bg-teal-600')"
          />
          <button
            class="h-7 w-7 rounded-full bg-blue-600 p-2 hover:bg-blue-700"
            @click="$emit('setCardColor', columnId, cardID, 'bg-blue-600')"
          />
          <button
            class="h-7 w-7 rounded-full bg-purple-600 p-2 hover:bg-purple-700"
            @click="$emit('setCardColor', columnId, cardID, 'bg-purple-600')"
          />
          <button
            class="bg-elevation-2 bg-elevation-3-hover h-7 w-7 rounded-full p-2"
            @click="$emit('setCardColor', columnId, cardID, 'bg-elevation-2')"
          />
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import emitter from "@/utils/emitter"
import { Ref } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/solid";

const emit = defineEmits<{
    (e: "closeModal", columnId: string): void,
    (e: "setCardDescription", columnId: string, cardIndex: number, description: string): void,
    (e: "setCardTitle", columnId: string, cardIndex: number, title: string): void,
    (e: "setCardColor", columnId: string, cardIndex: number, color: string): void
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

defineExpose({ initModal });
</script>

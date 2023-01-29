<!-- SPDX-FileCopyrightText: 2022-2023 trobonox <hello@trobo.tech> -->
<!-- -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

<template>
  <Modal
    :click-outside-to-close="false"
    @closeModal="$emit('closeModal')"
  >
    <template #content>
      <main class="min-h-[36rem] min-w-[32rem] max-w-[48rem]">
        <div class="flex flex-row items-start justify-between">
          <h1 class="pointer-events-auto pr-5 text-2xl font-bold">
            Set a custom background
          </h1>
          <XMarkIcon
            class="text-accent-hover h-6 w-6 cursor-pointer"
            @click="$emit('closeModal')"
          />
        </div>
        <div class="mt-4 flex flex-col gap-4">
          <section id="bg-selection">
            <h2 class="mb-2 text-lg font-semibold">
              Background image:
            </h2>
            <div
              v-if="background.length > 0"
              class="img-container max-w-56 relative inline-block"
              @click="getCustomBg"
            >
              <img
                alt="bg image preview"
                :src="customBg"
                class="aspect-[16/10]
                    h-auto w-56 rounded-md"
              >
              <div class="img-overlay">
                Edit background image
              </div>
            </div>
            <button
              v-else
              class="bg-elevation-2 bg-elevation-3-hover transition-button aspect-[16/10] w-56 rounded-md"
              @click="getCustomBg"
            >
              Add background image
            </button>
          </section>
          <section
            v-if="background.length > 0"
            id="bg-blur"
            class="w-full"
          >
            <h2 class="mb-2 text-lg font-semibold">
              Background blur:
            </h2>
            <div class="slider">
              <input
                v-model="bgBlur"
                class="w-full"
                type="range"
                min="0"
                max="20"
                oninput="rangeValue.innerText = this.value"
              >
              <p id="rangeValue">
                {{ bgBlurString }}
              </p>
            </div>
          </section>
          <section
            v-if="background.length > 0"
            id="bg-brightness"
            class="w-full"
          >
            <h2 class="mb-2 text-lg font-semibold">
              Background brightness:
            </h2>
            <div class="slider">
              <input
                v-model="bgBrightness"
                class="w-full"
                type="range"
                min="0"
                max="100"
                oninput="rangeValue.innerText = this.value"
              >
              <p id="rangeValue">
                {{ bgBrightnessString }}
              </p>
            </div>
          </section>
          <div class="flex flex-col gap-2">
            <button
              v-if="background.length > 0"
              class="bg-accent transition-button mt-8 w-full rounded-md px-2 py-1"
              @click="saveSettings(); $emit('closeModal')"
            >
              Save Background Settings
            </button>
            <button
              v-if="background.length > 0"
              class="bg-elevation-2-hover transition-button w-full rounded-md px-2 py-1"
              @click="resetSettings()"
            >
              Reset Background Image
            </button>
          </div>
        </div>
      </main>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { open } from '@tauri-apps/api/dialog';
import { convertFileSrc } from '@tauri-apps/api/tauri';
import { ref } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/solid";

const emit = defineEmits(["closeModal", "setBackground", "resetBackground", "setBlur", "setBrightness"]);

const props = defineProps<{
    background: string;
    bgBlurProp: string;
    bgBrightnessProp: string;
}>();

const customBg = ref(props.background);

const bgBlur = ref(props.bgBlurProp.replace(/[^0-9]/g, ''));
const bgBrightness = ref(props.bgBrightnessProp.replace(/[^0-9]/g, ''));

const bgBlurString = computed(() => {
    return `${bgBlur.value}`
})

const bgBrightnessString = computed(() => {
    return `${bgBrightness.value}`
})

const saveSettings = () => {
    emit("setBlur", `${bgBlur.value}px`);
    emit("setBrightness", `${bgBrightness.value}%`);
}

const resetSettings = () => {
    emit("resetBackground");
}

const getCustomBg = async () => {
    const selected = await open({
        multiple: false,
        filters: [{
            name: 'Image',
            extensions: ['png', 'jpeg', 'jpg']
        }]
    });
    if (selected == null) return;

    const resourcePath = convertFileSrc(selected as string);
    customBg.value = resourcePath;
    emit("setBackground", selected);
}
</script>

<style scoped>
.img-container:hover .img-overlay {
    opacity: 100%;
}

.img-overlay {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    transition: .3s ease-in-out;
    background-color: #008CBA80;
    border-radius: 8px;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
}
</style>

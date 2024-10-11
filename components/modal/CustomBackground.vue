<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2024 trobonox <hello@trobo.dev> -->
<!-- -->
<!-- SPDX-License-Identifier: GPL-3.0-or-later -->
<!--
Kanri is an offline Kanban board app made using Tauri and Nuxt.
Copyright (C) 2022-2024 trobonox <hello@trobo.dev>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>. -->

<template>
  <Modal :click-outside-to-close="true" @closeModal="$emit('closeModal')">
    <template #content>
      <main class="min-h-[36rem] min-w-[32rem] max-w-3xl">
        <div class="flex flex-row items-start justify-between">
          <h1 class="pointer-events-auto pr-5 text-2xl font-bold">
            Set a custom background
          </h1>
          <XMarkIcon
            class="text-accent-hover size-6 cursor-pointer"
            @click="$emit('closeModal')"
          />
        </div>
        <div class="mt-4 flex flex-col gap-4">
          <section id="bg-selection">
            <h2 class="mb-2 text-lg font-semibold">Background image:</h2>
            <div
              v-if="background.length > 0"
              class="img-container relative inline-block max-w-56"
              @click="getCustomBg"
            >
              <img
                :src="customBg"
                alt="bg image preview"
                class="aspect-[16/10] h-auto w-56 rounded-md"
              />
              <div class="img-overlay">Edit background image</div>
            </div>
            <button
              v-else
              class="bg-elevation-2 bg-elevation-3-hover transition-button aspect-[16/10] w-56 rounded-md"
              @click="getCustomBg"
            >
              Add background image
            </button>
          </section>
          <section v-if="background.length > 0" id="bg-blur" class="w-full">
            <h2 class="mb-2">
              <span class="text-lg font-semibold"
                >Background blur strength:</span
              >
              {{ bgBlurString }}
            </h2>
            <div class="slider">
              <input
                v-model="bgBlur"
                class="w-full"
                max="20"
                min="0"
                oninput="rangeValue.innerText = this.value"
                type="range"
              />
            </div>
          </section>
          <section
            v-if="background.length > 0"
            id="bg-brightness"
            class="w-full"
          >
            <h2 class="mb-2">
              <span class="text-lg font-semibold">Background brightness:</span>
              {{ bgBrightnessString }}%
            </h2>
            <div class="slider">
              <input
                v-model="bgBrightness"
                class="w-full"
                max="100"
                min="0"
                oninput="rangeValue.innerText = this.value"
                type="range"
              />
            </div>
          </section>
        </div>
        <button
          v-if="background.length > 0"
          class="bg-elevation-2 bg-elevation-3-hover transition-button mt-8 flex flex-row gap-2 rounded-md px-4 py-1.5"
          @click="resetSettings()"
        >
          <XMarkIcon class="size-6" />
          Reset Background Image
        </button>
      </main>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { open } from "@tauri-apps/api/dialog";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { ref } from "vue";

const emit = defineEmits([
  "closeModal",
  "setBackground",
  "resetBackground",
  "setBlur",
  "setBrightness",
]);

const props = defineProps<{
  background: string;
  bgBlurProp: string;
  bgBrightnessProp: string;
}>();

const customBg = ref(props.background);

const bgBlur = ref(props.bgBlurProp.replace(/[^0-9]/g, ""));
const bgBrightness = ref(props.bgBrightnessProp.replace(/[^0-9]/g, ""));

const bgBlurDebounced = refDebounced(bgBlur);
const bgBrightnessDebounced = refDebounced(bgBrightness);

watch(bgBlurDebounced, (newVal, oldVal) => {
  if (newVal != oldVal) {
    emit("setBlur", `${newVal}px`);
  }
});

watch(bgBrightnessDebounced, (newVal, oldVal) => {
  if (newVal != oldVal) {
    emit("setBrightness", `${newVal}%`);
  }
});

const bgBlurString = computed(() => {
  return `${bgBlur.value}`;
});

const bgBrightnessString = computed(() => {
  return `${bgBrightness.value}`;
});

const resetSettings = () => {
  bgBlur.value = "8";
  bgBrightness.value = "100";

  emit("setBlur", "8px");
  emit("setBrightness", "100%");
  emit("resetBackground");
};

const getCustomBg = async () => {
  const selected = await open({
    filters: [
      {
        extensions: ["png", "jpeg", "jpg"],
        name: "Image",
      },
    ],
    multiple: false,
  });
  if (selected == null) return;

  const resourcePath = convertFileSrc(selected as string);
  customBg.value = resourcePath;
  emit("setBackground", selected);
};
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
  transition: 0.3s ease-in-out;
  background-color: #008cba80;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
}
</style>

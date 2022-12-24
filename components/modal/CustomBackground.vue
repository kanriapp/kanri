<template>
  <Modal @closeModal="$emit('closeModal')">
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
          <div>
            <h2 class="mb-1">
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
              class="bg-elevation-2 bg-elevation-3-hover aspect-[16/10] w-56 rounded-md"
              @click="getCustomBg"
            >
              Add background image
            </button>
            <!-- TODO: Add options for bg opacity and blur -->
          </div>
        </div>
      </main>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/24/solid";

import { open } from '@tauri-apps/api/dialog';
import { convertFileSrc } from '@tauri-apps/api/tauri';

import { ref } from "vue";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits(["closeModal", "setBackground"]);

const props = defineProps<{
    background: string;
}>();

const customBg = ref(props.background);

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
    emit("setBackground", resourcePath);
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

<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2024 trobonox <hello@trobo.dev>, gitoak-->
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
  <Modal
    :blur-background="false"
    @closeModal="closeModal()"
    @enterKeyPressed="
      $emit('confirmAction', boardIndex);
      closeModal();
    "
  >
    <template #content>
      <main class="min-w-[28rem] max-w-[30rem]">
        <div class="flex flex-row items-start justify-between">
          <h1 class="pointer-events-auto pr-5 text-2xl font-bold">
            {{ title || "Are you sure?" }}
          </h1>
          <XMarkIcon
            class="text-accent-hover size-6 cursor-pointer"
            @click="closeModal()"
          />
        </div>
        <p class="ml-0.5 mt-2 text-lg">
          {{ modalDescription }}
        </p>
        <section
          id="buttons"
          class="mt-8 flex w-full flex-row items-center justify-end gap-8"
        >
          <button
            class="text-accent-hover transition-button"
            @click="closeModal()"
          >
            {{ closeButtonText || "No" }}
          </button>
          <button
            class="bg-accent text-buttons transition-button rounded-md px-4 py-2"
            @click="
              $emit('confirmAction', boardIndex);
              closeModal();
            "
          >
            {{ confirmButtonText || "Yes" }}
          </button>
        </section>
      </main>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import emitter from "@/utils/emitter";
import { XMarkIcon } from "@heroicons/vue/24/outline";

const props = defineProps<{
  closeButtonText?: string;
  confirmButtonText?: string;
  description?: string;
  title?: string;
}>();

const emit = defineEmits<{
  (e: "closeModal"): void;
  (e: "confirmAction", boardIndex?: number): void;
}>();

const boardIndex = ref(-1);
const modalDescription = ref(props.description || "");

onMounted(() => {
  emitter.on(
    "openBoardDeleteModal",
    (params: { description: string; index: number }) => {
      boardIndex.value = params.index;
      modalDescription.value = params.description;
    }
  );

  emitter.on(
    "openModalWithCustomDescription",
    (params: { description: string }) => {
      modalDescription.value = params.description;
    }
  );
});

const closeModal = () => {
  emit("closeModal");
};
</script>

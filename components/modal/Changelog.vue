<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2023 trobonox <hello@trobo.tech> -->
<!-- -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

<template>
  <Modal
    :blur-background="false"
    @closeModal="$emit('closeModal')"
  >
    <template #content>
      <main class="max-w-[48rem]">
        <div class="flex flex-row items-start justify-between">
          <h1 class="pointer-events-auto pr-5 text-2xl font-bold">
            What's new in Kanri {{ versionInfo.buildMajor }}.{{ versionInfo.buildMinor }}.{{ versionInfo.buildRevision }}
          </h1>
          <XMarkIcon
            class="text-accent-hover h-6 w-6 cursor-pointer"
            @click="$emit('closeModal')"
          />
        </div>
        <p class="mr-8 mt-6">
          Welcome to Kanri! With this new release, following new features and fixes have been released: <br> <br>
          - Use rich text in card description (using shortcuts similar to Markdown) <br>
          - Custom colors for cards <br>
          - Improved light mode <br>
          - Directly edit columns from the popup for creating a new board <br>
          - Import checklist items from Trello® <br>
          - Feature to disable all animations from settings <br>
          - Clicking on the Kanri icon in the sidebar acts as a home button <br>
          - Other miscellaneous fixes and improvements (full changelog available in the GitHub release notes)
        </p>
        <div class="mt-6 flex justify-between">
          <button
            class="bg-accent text-buttons mb-4 w-full rounded px-4 py-2"
            @click="$emit('closeModal')"
          >
            Close
          </button>
        </div>
      </main>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from "@/components/Modal.vue";
import versionInfo from "@/version_info.json"
import { XMarkIcon } from "@heroicons/vue/24/solid";

defineEmits<{
    (e: "closeModal"): void
  }> ();
</script>

<style scoped>
ul {
    list-style-type: circle;
    list-style-position: inside;
}
</style>

<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2023 trobonox -->
<!-- -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

<template>
  <Modal
    :blur-background="false"
    @closeModal="$emit('closeModal')"
  >
    <template #content>
      <main class="min-h-[38rem] max-w-[48rem]">
        <div class="flex flex-row items-start justify-between">
          <h1 class="pointer-events-auto pr-5 text-2xl font-bold">
            What's new in Kanri {{ versionInfo.buildMajor }}.{{ versionInfo.buildMinor }}.{{ versionInfo.buildRevision }}
          </h1>
          <XMarkIcon
            class="text-accent-hover h-6 w-6 cursor-pointer"
            @click="$emit('closeModal')"
          />
        </div>
        <p class="mr-8">
          Welcome (back) to Kanri! With this new release, following new features and fixes have been released:

          Seasoned user? Get back to the app ->

          First time here? Click here to read the introduction!
        </p>
      </main>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from "@/components/Modal.vue";
import { XMarkIcon } from "@heroicons/vue/24/solid";
import versionInfo from "@/version_info.json"

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

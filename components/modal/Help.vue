<template>
  <Modal @closeModal="$emit('closeModal')">
    <template #content>
      <main class="min-h-[36rem] max-w-[48rem]">
        <div class="flex flex-row items-start justify-between">
          <h1 class="pointer-events-auto pr-5 text-2xl font-bold">
            Help & Resources
          </h1>
          <XMarkIcon
            class="text-accent-hover h-6 w-6 cursor-pointer"
            @click="$emit('closeModal')"
          />
        </div>
        <h2 class="text-md text-dim-3 mb-6">
          Here are some useful resources to assist you.
        </h2>
        <h3 class="mb-2 text-xl font-bold">
          Keyboard shortcuts
        </h3>
        <ul class="ml-2 flex flex-col gap-2">
          <li>
            <b class="font-bold">Ctrl/Command + B</b> - Create new
            column in board view
          </li>
          <li>
            <b class="font-bold">Ctrl/Command + D</b> - Delete last
            column in board view
          </li>
          <li>
            <b class="font-bold">Ctrl/Command + T</b> - Edit title
            of last column in board view
          </li>
          <li>
            <b class="font-bold">Ctrl/Command + N</b> - Create new
            card inside last column in board view
          </li>
          <li>
            <b class="font-bold">Ctrl/Command + Arrow Keys Left and right </b>
            - Switch columns for title editing and card adding
          </li>
        </ul>
        <h3 class="mt-4 mb-2 text-xl font-bold">
          Support resouces:
        </h3>
        <p>
          If you encounter any bug, you can check the
          <a
            href="https://github.com/trobonox/kanri"
            target="_blank"
            class="text-accent text-accent-darker-hover"
          >issues on GitHub</a>
          to see if it is already known, and report if it isn't. For
          any further assistance or anything that is not a bug, you
          can join the
          <a
            href="https://discord.gg/AVqHrvxB9C"
            target="_blank"
            class="text-accent text-accent-darker-hover"
          >support Discord server.</a>
        </p>
        <h3 class="mt-4 mb-2 text-xl font-bold">
          Credits:
        </h3>
        <p>
          Application made by Trobonox (trobo.tech), licensed under
          the Apache 2.0 License. Icons used are from Heroicons
          (licensed unter the MIT License).
        </p>
        <p class="pt-2">
          Copyright (c) 2022-2023 Trobonox (hello@trobo.tech) <br>
          Kanri v0.3.1
        </p>
        <a
          href="/licenses"
          class="text-accent text-accent-darker-hover"
        >Third-party license notices</a>
      </main>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from "@/components/Modal.vue";
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

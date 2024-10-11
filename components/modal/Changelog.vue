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
  <Modal :blur-background="false" @closeModal="$emit('closeModal')">
    <template #content>
      <main class="max-w-3xl">
        <div class="flex flex-row items-start justify-between">
          <h1 class="pointer-events-auto pr-5 text-2xl font-bold">
            What's new in Kanri {{ versionInfo.buildMajor }}.{{
              versionInfo.buildMinor
            }}.{{ versionInfo.buildRevision }}
          </h1>
          <XMarkIcon
            class="text-accent-hover size-6 cursor-pointer"
            @click="$emit('closeModal')"
          />
        </div>
        <p class="mr-8 mt-2">
          Welcome to Kanri! After a long time, we are back with a big release
          featuring many new features and fixes. To quickly get notified about
          new releases and see the development progress, you can join
          <a
            class="text-accent text-accent-darker-hover"
            href="https://discord.gg/AVqHrvxB9C"
            target="_blank"
            >the official Discord server.</a
          >
        </p>

        <br />
        <span class="text-xl font-bold">Changes:</span>
        <ul>
          <li>Improved text contrast for card tags</li>
          <li>Import tags and due date from Trello® boards</li>
          <li>Search bar now also includes card tags in search</li>
          <li>
            Remove scrolling to the bottom of a column when adding cards at the
            top
          </li>
        </ul>

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
import versionInfo from "@/version_info.json";
import { XMarkIcon } from "@heroicons/vue/24/solid";

defineEmits<{
  (e: "closeModal"): void;
}>();
</script>

<style scoped>
ul {
  list-style-type: circle;
  list-style-position: inside;
}
</style>

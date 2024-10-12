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
  <Modal @closeModal="$emit('closeModal')">
    <template #content>
      <main class="h-38 max-w-3xl">
        <div class="flex flex-row items-start justify-between">
          <h1 class="pointer-events-auto pr-5 text-2xl font-bold">
            {{ $t("modals.help.title") }}
          </h1>
          <XMarkIcon
            class="text-accent-hover size-6 cursor-pointer"
            @click="$emit('closeModal')"
          />
        </div>
        <h2 class="text-md text-dim-3 mb-4">
          {{ $t("modals.help.resources") }}
        </h2>
        <h3 class="mb-2 text-xl font-bold">
          {{ $t("modals.help.shortcuts") }}
        </h3>
        <ul class="ml-2 flex flex-col gap-2">
          <li>
            <kbd
              v-if="osType === 'darwin'"
              class="inline-flex min-h-[30px] items-center justify-center rounded-md border border-gray-200 bg-white px-2 py-1 font-mono text-sm text-gray-800 shadow-[0px_2px_0px_0px_rgba(0,0,0,0.08)] dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)]"
            >
              <svg
                class="size-3 shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"
                />
              </svg>
            </kbd>
            <kbd
              v-else
              class="inline-flex min-h-[30px] items-center justify-center rounded-md border border-gray-200 bg-white px-1.5 py-1 font-mono text-sm text-gray-800 shadow-[0px_2px_0px_0px_rgba(0,0,0,0.08)] dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)]"
            >
              {{ $t("modals.help.ctrlKey") }}
            </kbd>
            +
            <kbd
              class="inline-flex min-h-[30px] items-center justify-center rounded-md border border-gray-200 bg-white px-1.5 py-1 font-mono text-sm text-gray-800 shadow-[0px_2px_0px_0px_rgba(0,0,0,0.08)] dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)]"
            >
              b
            </kbd>
            {{ $t("modals.help.ctrl+b") }}
          </li>
          <li>
            <kbd
              v-if="osType === 'darwin'"
              class="inline-flex min-h-[30px] items-center justify-center rounded-md border border-gray-200 bg-white px-2 py-1 font-mono text-sm text-gray-800 shadow-[0px_2px_0px_0px_rgba(0,0,0,0.08)] dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)]"
            >
              <svg
                class="size-3 shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"
                />
              </svg>
            </kbd>
            <kbd
              v-else
              class="inline-flex min-h-[30px] items-center justify-center rounded-md border border-gray-200 bg-white px-1.5 py-1 font-mono text-sm text-gray-800 shadow-[0px_2px_0px_0px_rgba(0,0,0,0.08)] dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)]"
            >
              {{ $t("modals.help.ctrlKey") }}
            </kbd>
            +
            <kbd
              class="inline-flex min-h-[30px] items-center justify-center rounded-md border border-gray-200 bg-white px-1.5 py-1 font-mono text-sm text-gray-800 shadow-[0px_2px_0px_0px_rgba(0,0,0,0.08)] dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)]"
            >
              d
            </kbd>
            {{ $t("modals.help.ctrl+d") }}
          </li>
          <li>
            <kbd
              v-if="osType === 'darwin'"
              class="inline-flex min-h-[30px] items-center justify-center rounded-md border border-gray-200 bg-white px-2 py-1 font-mono text-sm text-gray-800 shadow-[0px_2px_0px_0px_rgba(0,0,0,0.08)] dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)]"
            >
              <svg
                class="size-3 shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"
                />
              </svg>
            </kbd>
            <kbd
              v-else
              class="inline-flex min-h-[30px] items-center justify-center rounded-md border border-gray-200 bg-white px-1.5 py-1 font-mono text-sm text-gray-800 shadow-[0px_2px_0px_0px_rgba(0,0,0,0.08)] dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)]"
            >
              {{ $t("modals.help.ctrlKey") }}
            </kbd>
            +
            <kbd
              class="inline-flex min-h-[30px] items-center justify-center rounded-md border border-gray-200 bg-white px-1.5 py-1 font-mono text-sm text-gray-800 shadow-[0px_2px_0px_0px_rgba(0,0,0,0.08)] dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)]"
            >
              t
            </kbd>
            {{ $t("modals.help.ctrl+t") }}
          </li>
          <li>
            <kbd
              v-if="osType === 'darwin'"
              class="inline-flex min-h-[30px] items-center justify-center rounded-md border border-gray-200 bg-white px-2 py-1 font-mono text-sm text-gray-800 shadow-[0px_2px_0px_0px_rgba(0,0,0,0.08)] dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)]"
            >
              <svg
                class="size-3 shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"
                />
              </svg>
            </kbd>
            <kbd
              v-else
              class="inline-flex min-h-[30px] items-center justify-center rounded-md border border-gray-200 bg-white px-1.5 py-1 font-mono text-sm text-gray-800 shadow-[0px_2px_0px_0px_rgba(0,0,0,0.08)] dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)]"
            >
              {{ $t("modals.help.ctrlKey") }}
            </kbd>
            +
            <kbd
              class="inline-flex min-h-[30px] items-center justify-center rounded-md border border-gray-200 bg-white px-1.5 py-1 font-mono text-sm text-gray-800 shadow-[0px_2px_0px_0px_rgba(0,0,0,0.08)] dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)]"
            >
              n
            </kbd>
            {{ $t("modals.help.ctrl+n") }}
          </li>
          <li>
            <kbd
              v-if="osType === 'darwin'"
              class="inline-flex min-h-[30px] items-center justify-center rounded-md border border-gray-200 bg-white px-2 py-1 font-mono text-sm text-gray-800 shadow-[0px_2px_0px_0px_rgba(0,0,0,0.08)] dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)]"
            >
              <svg
                class="size-3 shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"
                />
              </svg>
            </kbd>
            <kbd
              v-else
              class="inline-flex min-h-[30px] items-center justify-center rounded-md border border-gray-200 bg-white px-1.5 py-1 font-mono text-sm text-gray-800 shadow-[0px_2px_0px_0px_rgba(0,0,0,0.08)] dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)]"
            >
              {{ $t("modals.help.ctrlKey") }}
            </kbd>
            +
            <kbd
              v-if="osType === 'darwin'"
              class="inline-flex min-h-[30px] min-w-[30px] items-center justify-center rounded-md border border-gray-200 bg-white px-1.5 py-1 font-mono text-sm text-gray-800 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
            >
              <svg
                class="size-3 shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M3 3h6l6 18h6" />
                <path d="M14 3h7" />
              </svg>
            </kbd>
            <kbd
              v-else
              class="inline-flex min-h-[30px] items-center justify-center rounded-md border border-gray-200 bg-white px-1.5 py-1 font-mono text-sm text-gray-800 shadow-[0px_2px_0px_0px_rgba(0,0,0,0.08)] dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)]"
            >
              alt
            </kbd>
            +
            <kbd
              class="inline-flex min-h-[30px] items-center justify-center rounded-md border border-gray-200 bg-white px-1.5 py-1 font-mono text-sm text-gray-800 shadow-[0px_2px_0px_0px_rgba(0,0,0,0.08)] dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)]"
            >
              &lt;
            </kbd>
            <kbd
              class="inline-flex min-h-[30px] items-center justify-center rounded-md border border-gray-200 bg-white px-1.5 py-1 font-mono text-sm text-gray-800 shadow-[0px_2px_0px_0px_rgba(0,0,0,0.08)] dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)]"
            >
              &gt;
            </kbd>
            {{ $t("modals.help.ctrl+alt+<>") }}
          </li>
          <li>
            <kbd
              v-if="osType === 'darwin'"
              class="inline-flex min-h-[30px] items-center justify-center rounded-md border border-gray-200 bg-white px-2 py-1 font-mono text-sm text-gray-800 shadow-[0px_2px_0px_0px_rgba(0,0,0,0.08)] dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)]"
            >
              <svg
                class="size-3 shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"
                />
              </svg>
            </kbd>
            <kbd
              v-else
              class="inline-flex min-h-[30px] items-center justify-center rounded-md border border-gray-200 bg-white px-1.5 py-1 font-mono text-sm text-gray-800 shadow-[0px_2px_0px_0px_rgba(0,0,0,0.08)] dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)]"
            >
              {{ $t("modals.help.ctrlKey") }}
            </kbd>
            +
            <kbd
              class="inline-flex min-h-[30px] items-center justify-center rounded-md border border-gray-200 bg-white px-1.5 py-1 font-mono text-sm text-gray-800 shadow-[0px_2px_0px_0px_rgba(0,0,0,0.08)] dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)]"
            >
              +
            </kbd>
            <kbd
              class="inline-flex min-h-[30px] items-center justify-center rounded-md border border-gray-200 bg-white px-1.5 py-1 font-mono text-sm text-gray-800 shadow-[0px_2px_0px_0px_rgba(0,0,0,0.08)] dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)]"
            >
              -
            </kbd>
            {{ $t("modals.help.ctrl++-") }}
          </li>
        </ul>
        <h3 class="mb-2 mt-4 text-xl font-bold">
          {{ $t("modals.help.support") }}
        </h3>
        <div class="flex flex-row gap-3">
          <a
            href="https://www.kanriapp.com/getting-started/faq"
            target="_blank"
            class="border-elevation-3 bg-elevation-3-hover flex flex-row items-center gap-2 rounded-md border px-4 py-1.5 transition-colors duration-300"
          >
            <BookOpenIcon class="size-6" />
            {{ $t("modals.help.docs") }}
          </a>
          <a
            href="https://github.com/trobonox/kanri/issues"
            target="_blank"
            class="border-elevation-3 bg-elevation-3-hover flex flex-row items-center gap-2 rounded-md border px-4 py-1.5 transition-colors duration-300"
          >
            <IconGithub class="size-6" />
            {{ $t("modals.help.github") }}
          </a>
          <a
            href="https://discord.gg/AVqHrvxB9C"
            target="_blank"
            class="border-elevation-3 bg-elevation-3-hover flex flex-row items-center gap-2 rounded-md border px-4 py-1.5 transition-colors duration-300"
          >
            <IconDiscord class="size-6" />
            {{ $t("modals.help.discord") }}
          </a>
        </div>
        <h3 class="mb-1 mt-4 text-xl font-bold">
          {{ $t("modals.help.creditsTitle") }}
        </h3>
        <div class="block max-w-2xl">
          <p class="text-dim-2 text-sm">
            {{ $t("modals.help.creditsText1") }}
            <br />
          </p>
          <p class="text-dim-2 text-sm">
            {{ $t("modals.help.creditsText2") }}
          </p>
        </div>
        <p class="mb-2 pt-2">
          {{ $t("modals.help.copyright", { email: "hello@trobo.dev" }) }}<br />
          <span class="text-lg font-bold">Kanri </span>
          <span class="text-accent-lighter">
            {{
              $t("modals.help.version", {
                major: versionInfo.buildMajor,
                minor: versionInfo.buildMinor,
                revision: versionInfo.buildRevision,
              })
            }}
          </span>
          -
          <nuxt-link
            class="text-accent text-accent-darker-hover"
            to="/licenses"
            @click="$emit('closeModal')"
          >
            {{ $t("modals.help.thirdPartyLicenseNotices") }}
          </nuxt-link>
        </p>
      </main>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from "@/components/Modal.vue";
import versionInfo from "@/version_info.json";
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { BookOpenIcon } from "@heroicons/vue/24/outline";
import { platform } from "@tauri-apps/api/os";

const osType = ref("");

onMounted(async () => {
  osType.value = await platform();
});

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

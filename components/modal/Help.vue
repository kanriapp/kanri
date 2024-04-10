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
                        Help & Resources
                    </h1>
                    <XMarkIcon
                        class="text-accent-hover size-6 cursor-pointer"
                        @click="$emit('closeModal')"
                    />
                </div>
                <h2 class="text-md text-dim-3 mb-4">
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
                        <b class="font-bold">Ctrl/Command + Alt + Arrow Keys Left and right </b>
                        - Switch columns for title editing and card adding
                    </li>
                    <li>
                        <b class="font-bold">Ctrl/Command + Plus or minus Keys </b>
                        Increase/decrease board column zoom (global preference)
                    </li>
                </ul>
                <h3 class="mb-2 mt-4 text-xl font-bold">
                    Support resouces:
                </h3>
                <p>
                    You can find some general help resources <a
                        class="text-accent text-accent-darker-hover"
                        href="https://www.kanriapp.com/guides/shortcuts"
                        target="_blank"
                    > in the official documentation.</a>
                    If you encounter any bug, you can check the
                    <a
                        class="text-accent text-accent-darker-hover"
                        href="https://github.com/trobonox/kanri"
                        target="_blank"
                    > issues on GitHub</a>
                    to see if it is already known, and report if it isn't. For
                    any further assistance or anything that is not a bug, you
                    can join the
                    <a
                        class="text-accent text-accent-darker-hover"
                        href="https://discord.gg/AVqHrvxB9C"
                        target="_blank"
                    > support Discord server.</a>
                </p>
                <h3 class="mb-2 mt-4 text-xl font-bold">
                    Credits:
                </h3>
                <p>
                    Application made by Trobonox (trobo.tech), licensed under
                    the GPL v3 license (except some files with different licenses designated in their appropriate license headers/files). Icons used are from Heroicons
                    (licensed unter the MIT License). <br>
                </p>
                <p>
                    We are not affiliated, associated, authorized, endorsed by or in any way officially connected to Trello, Inc. (www.trello.com).
                </p>
                <p class="pt-2">
                    Copyright (c) 2022-2024 trobonox (hello@trobo.dev) <br>
                    Kanri v{{ versionInfo.buildMajor }}.{{ versionInfo.buildMinor }}.{{ versionInfo.buildRevision }} (INSIDER BETA) - <nuxt-link
                        class="text-accent text-accent-darker-hover"
                        to="/licenses"
                        @click="$emit('closeModal')"
                    >
                        Third-party license notices
                    </nuxt-link>
                </p>
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

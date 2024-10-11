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
  <div
    class="bg-elevation-1 relative flex flex-row items-center gap-2 rounded-md px-2"
  >
    <PhMagnifyingGlass class="size-4" />
    <input
      v-model="model"
      placeholder="Search for cards..."
      class="bg-elevation-1 py-1 focus:outline-none"
      type="text"
    />
    <button
      v-if="(model?.length ?? 0) > 0"
      class="bg-elevation-1 bg-elevation-2-hover absolute right-2 rounded-md p-1"
      @click="model = ''"
    >
      <XMarkIcon class="size-4 shrink-0 grow-0" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { PhMagnifyingGlass } from "@phosphor-icons/vue";

const model = defineModel<string>();
</script>

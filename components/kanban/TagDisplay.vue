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
    class="bg-elevation-3 rounded-xl px-2 py-0.5 text-xs"
    :class="getTagTextColor"
    :style="props.tag.style"
  >
    {{ props.tag.text }}
  </div>
</template>

<script setup lang="ts">
import type { Tag } from "~/types/kanban-types";

const props = defineProps<{
  tag: Tag;
}>();

const getTagTextColor = computed(() => {
  return getContrast(props.tag.color);
});
</script>

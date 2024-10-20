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
  <div @click="(e) => handleClick(e)">
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    delay?: number;
  }>(),
  {
    delay: 250,
  }
);

const emit = defineEmits(["single-click", "double-click"]);

const clickCount = ref(0);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const clickTimer: Ref<any | null> = ref(null);

const handleClick = (e: MouseEvent) => {
  e.preventDefault();
  clickCount.value++;

  if (clickCount.value === 1) {
    clickTimer.value = setTimeout(() => {
      clickCount.value = 0;
      emit("single-click");
    }, props.delay);
  } else if (clickCount.value === 2) {
    clearTimeout(clickTimer.value);
    clickCount.value = 0;
    emit("double-click");
  }
};
</script>

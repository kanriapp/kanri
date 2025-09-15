<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2025 trobonox <hello@trobo.dev> -->
<!-- -->
<!-- SPDX-License-Identifier: GPL-3.0-or-later -->
<!--
Kanri is an offline Kanban board app made using Tauri and Nuxt.
Copyright (C) 2022-2025 trobonox <hello@trobo.dev>

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
  <input
    v-model="inputValue"
    class="bg-elevation-1 w-24 rounded-md px-2"
    type="text"
    maxlength="7"
    @input="onInput"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
}>();
const emit = defineEmits(["update:modelValue"]);

const inputValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newVal) => {
    inputValue.value = newVal;
  }
);

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  let value = target.value;

  // Always start with #
  if (!value.startsWith("#")) {
    value = "#" + value.replace(/[^0-9A-Fa-f]/g, "");
  }

  // If user deletes everything, reset to #
  if (value === "" || value === "#") {
    inputValue.value = "#";
    emit("update:modelValue", "#");
    return;
  }

  // Only allow up to 6 hex digits after #
  value = value.slice(0, 7);
  if (!/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
    value = "#" + value.slice(1).replace(/[^0-9A-Fa-f]/g, "");
    value = value.slice(0, 7);
  }

  inputValue.value = value;
  emit("update:modelValue", value);
}
</script>

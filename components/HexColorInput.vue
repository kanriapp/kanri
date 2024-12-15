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
  <input
    v-model="inputValue"
    class="bg-elevation-1 w-24 rounded-md px-2"
    type="text"
    maxlength="7"
    @input="updateInputValue($event)"
  />
</template>

<script setup lang="ts">
/**
 * Note to self: this is very messy, might want to improve by wrapping all inputs in a form and using the pattern for validation
 */

const props = defineProps<{
  modelValue: string;
}>();
const emit = defineEmits(["update:modelValue"]);

const inputValue = ref(props.modelValue);

watch(props, (_, newValue) => {
  inputValue.value = newValue.modelValue;
});

const updateInputValue = (event: Event) => {
  //@ts-expect-error don't want to deal with the specifics of event typings here
  if (event.target.value.length === 1) {
    //@ts-expect-error don't want to deal with the specifics of event typings here
    if (event.target.value !== "#") {
      inputValue.value = "";
      return;
    }
  }

  //@ts-expect-error don't want to deal with the specifics of event typings here
  if (event.target.value.length > 1) {
    const regex = /^#[0-9A-F]{1,6}$/i;

    //@ts-expect-error don't want to deal with the specifics of event typings here
    if (!regex.test(event.target.value)) {
      inputValue.value = inputValue.value.substring(
        0,
        inputValue.value.length - 1
      );
      return;
    }
  }

  //@ts-expect-error don't want to deal with the specifics of event typings here
  emit("update:modelValue", event.target.value);
};
</script>

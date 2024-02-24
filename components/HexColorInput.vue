<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2024 trobonox <hello@trobo.tech> -->
<!-- -->
<!-- SPDX-License-Identifier: Apache-2.0 -->
<template>
  <input
    v-model="inputValue"
    class="bg-elevation-1 w-24 rounded-md px-2"
    type="text"
    maxlength="7"
    @input="updateInputValue($event)"
  >
</template>

<script setup lang="ts">
/**
 * Note to self: this is very messy, might want to improve by wrapping all inputs in a form and using the pattern for validation
 */

const props = defineProps<{
    modelValue: string
}>()
const emit = defineEmits(['update:modelValue'])

const inputValue = ref(props.modelValue);

watch(props, (_, newValue) => {
    inputValue.value = newValue.modelValue;
});

const updateInputValue = (event: Event) => {
    //@ts-ignore
    if (event.target.value.length === 1) {
        //@ts-ignore
        if (event.target.value !== "#") {
            inputValue.value = "";
            return;
        }
    }

    //@ts-ignore
    if (event.target.value.length > 1) {
        const regex = /[0 - 9A - Fa - f]/
        //@ts-ignore
        if (!(regex.test(event.target.value))) {
            console.log("yeetus");
            inputValue.value = inputValue.value.substring(0, inputValue.value.length - 1);
            return;
        }
    }

    //@ts-ignore
    emit('update:modelValue', event.target.value);
}
</script>

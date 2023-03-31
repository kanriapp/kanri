<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2023 trobonox <hello@trobo.tech> -->
<!-- -->
<!-- SPDX-License-Identifier: Apache-2.0 -->
<template>
  <div @click="e => handleClick(e)">
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

const emit = defineEmits<{
    (e: "single-click"): void;
    (e: "double-click"): void;
}>();

const clickCount = ref(0);
const clickTimer: Ref<any | null> = ref(null);

const handleClick = (e: Event) => {
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
        emit('double-click');
    }
}
</script>


<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2024 trobonox <hello@trobo.tech> -->
<!-- -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

<template>
  <transition name="modal-fade">
    <div
      :class="blurBackground ? 'backdrop-blur-xl' : 'backdrop-brightness-50'"
      class="modal z-huge size-screen inset-0 flex flex-col items-center justify-center bg-zinc-800/40 bg-clip-padding"
      @click.self="clickOutsideClose ? $emit('closeModal') : () => {}"
    >
      <div
        class="bg-elevation-1 min-h-content min-w-content rounded-md py-4 pl-8 pr-6 shadow-lg"
      >
        <slot
          class="p-4"
          name="content"
        />
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import emitter from '@/utils/emitter';

const props = withDefaults(
    defineProps<{
        blurBackground?: boolean;
        clickOutsideToClose?: boolean;
    }>(),
    {
        blurBackground: true,
        clickOutsideToClose: true,
    }
);

const clickOutsideClose = ref(props.clickOutsideToClose);

const emit = defineEmits<{
    (e: "closeModal"): void,
    (e: "enterKeyPressed"): void,
}>();

onMounted(() => {
    document.addEventListener("keydown", keyDownListener);

    emitter.on("modalPreventClickOutsideClose", () => {
        clickOutsideClose.value = false;
    });

    emitter.on("modalEnableClickOutsideClose", () => {
        clickOutsideClose.value = true;
    })
});

onBeforeUnmount(() => {
    document.removeEventListener("keydown", keyDownListener);
});

watch(props, (_, newData) => {
    clickOutsideClose.value = newData.clickOutsideToClose;
});

const keyDownListener = (e: { key: string; }) => {
    if (e.key === "Escape") {
        emit("closeModal");
    } else if (e.key === "Enter") {
        emit("enterKeyPressed");
    }
};
</script>

<style>
.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.35s ease-out;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}

.modal {
    position: fixed;
    max-width: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}

.z-huge {
    z-index: 10000000;
}
</style>

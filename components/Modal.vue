<!-- SPDX-FileCopyrightText: 2022-2023 trobonox <hello@trobo.tech> -->
<!-- -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

<template>
  <transition name="modal-fade">
    <div
      class="modal z-huge inset-0 flex h-screen w-screen flex-col items-center justify-center bg-zinc-800/40 bg-clip-padding"
      :class="blurBackground ? 'backdrop-blur-xl' : 'backdrop-brightness-50'"
      @click.self="clickOutsideClose ? $emit('closeModal') : () => {}"
    >
      <div
        class="bg-elevation-1 min-h-content min-w-content rounded-md py-4 pl-8 pr-6 shadow-lg"
      >
        <slot
          name="content"
          class="p-4"
        />
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import emitter from '@/utils/emitter';

const props = withDefaults(
    defineProps<{
        clickOutsideToClose?: boolean;
        blurBackground?: boolean;
    }>(),
    {
        clickOutsideToClose: true,
        blurBackground: true,
    }
);

const clickOutsideClose = ref(props.clickOutsideToClose);

const emit = defineEmits<{
    (e: "closeModal"): void
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

const keyDownListener = (e: { key: string; }) => {
    if (e.key === "Escape") {
        emit("closeModal");
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

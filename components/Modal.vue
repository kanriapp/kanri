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
  <transition name="modal-fade">
    <div
      :class="blurBackground ? 'backdrop-blur-xl' : 'backdrop-brightness-50'"
      class="modal z-huge size-screen inset-0 flex flex-col items-center justify-center bg-zinc-800/40 bg-clip-padding"
      @click.self="clickOutsideClose ? $emit('closeModal') : () => {}"
    >
      <div
        class="bg-elevation-1 min-h-content min-w-content rounded-md py-4 pl-8 pr-6 shadow-lg"
      >
        <slot class="p-4" name="content" />
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import emitter from "@/utils/emitter";

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
  (e: "closeModal"): void;
  (e: "enterKeyPressed"): void;
}>();

onMounted(() => {
  document.addEventListener("keydown", keyDownListener);

  emitter.on("modalPreventClickOutsideClose", () => {
    clickOutsideClose.value = false;
  });

  emitter.on("modalEnableClickOutsideClose", () => {
    clickOutsideClose.value = true;
  });
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", keyDownListener);

  emitter.off("modalPreventClickOutsideClose");
  emitter.off("modalEnableClickOutsideClose");
});

watch(props, (_, newData) => {
  clickOutsideClose.value = newData.clickOutsideToClose;
});

const keyDownListener = (e: { key: string }) => {
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

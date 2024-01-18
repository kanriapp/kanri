<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2024 trobonox <hello@trobo.tech> -->
<!-- -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

<template>
  <div
    v-if="!isSimplePreviewMode"
    :style="cssVars"
    class="bg-custom flex aspect-video h-32 flex-row gap-1.5 overflow-hidden rounded-t-md"
  >
    <div class="bg-effect-overlay flex h-full w-max min-w-full flex-col rounded-t-md p-2">
      <span class="mb-0.5 text-[4px] font-bold"> {{ board.title }}</span>
      <div class="flex w-full flex-row gap-1.5">
        <div
          v-for="column in board.columns"
          :key="column.id"
          class="bg-elevation-2 flex h-min w-10 shrink-0 flex-col gap-[1px] rounded-sm p-0.5 text-[3px] font-bold"
        >
          {{ column.title }}
          <div
            v-for="card in column.cards"
            :key="card.id"
            :class="(card.color && card.color !== 'bg-elevation-2' && !card.color?.startsWith('#')) ? card.color : 'bg-elevation-3'"
            class="text-no-overflow mb-0.5 rounded-[0.05rem] p-[2px] text-[2px]"
            :style="[card.color?.startsWith('#') ? { 'background-color': card.color } : {}]"
          >
            {{ card.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-else
    class="bg-elevation-2 flex aspect-video h-32 flex-row gap-4 overflow-hidden rounded-t-md p-2"
  >
    <div
      v-for="column in board.columns"
      :key="column.id"
      class="bg-accent-no-hover flex h-min w-10 shrink-0 flex-col gap-0.5 rounded-sm p-1"
    >
      <div
        v-for="card in column.cards"
        :key="card.id"
        class="bg-elevation-2 mb-1 rounded-sm p-2"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Board } from "@/types/kanban-types";

import { convertFileSrc } from "@tauri-apps/api/tauri";

const props = defineProps<{
    board: Board;
    isSimplePreviewMode: boolean;
}>();

const bgCustom = ref("");
const bgCustomNoResolution = ref("");
const bgImageLoaded = ref(false);
const bgBlur = ref("8px");
const bgBrightness = ref("100%");

const cssVars = computed(() => {
    return {
        "--bg-brightness": bgBrightness.value,
        "--bg-custom-image": `url("${bgCustom.value}")`,
        "--blur-intensity": bgBlur.value
    }
})

onMounted(() => {
    if (props.board.background && !props.isSimplePreviewMode) {
        bgCustomNoResolution.value = props.board.background.src;
        bgCustom.value = convertFileSrc(props.board.background.src);

        bgBlur.value = props.board.background.blur;
        bgBrightness.value = props.board.background.brightness;
    }
    nextTick(() => bgImageLoaded.value = true);
})
</script>

<style scoped>
.bg-custom {
    z-index: 1;
    background-image: var(--bg-custom-image);
    background-repeat: no-repeat;
    background-size: cover;
}

.bg-effect-overlay {
    z-index: 2;
    backdrop-filter: blur(var(--blur-intensity)) brightness(var(--bg-brightness));
}
</style>

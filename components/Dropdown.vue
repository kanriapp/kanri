<template>
  <DropdownMenuRoot>
    <DropdownMenuTrigger>
        <slot name="trigger"></slot>
    </DropdownMenuTrigger>

    <DropdownMenuPortal to=".default-layout">
      <DropdownMenuContent
        class="z-[99999] min-w-[220px] outline-none bg-primary-darker border border-elevation-1 rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
        :side-offset="5"
      >
        <slot name="content"></slot>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>

<script setup lang="ts">
import {
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from 'radix-vue'
</script>

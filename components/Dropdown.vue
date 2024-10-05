<template>
    <DropdownMenuRoot>
        <DropdownMenuTrigger>
            <slot name="trigger"/>
        </DropdownMenuTrigger>

        <DropdownMenuPortal to=".default-layout">
            <DropdownMenuContent
                :align="align"
                class="bg-primary-darker border-elevation-1 z-[99999] min-w-[100px] rounded-md border p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] outline-none will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
                :side-offset="sideOffset"
            >
                <slot name="content"/>
            </DropdownMenuContent>
        </DropdownMenuPortal>
    </DropdownMenuRoot>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        align?: "start" | "center" | "end" | undefined
        sideOffset?: number
    }>(),
    {
        align: undefined,
        sideOffset: 5
    }
);
</script>

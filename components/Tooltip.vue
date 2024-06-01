<template>
    <TooltipProvider>
        <TooltipRoot :delayDuration="200">
            <TooltipTrigger>
                <slot name="trigger"></slot>
            </TooltipTrigger>
            <TooltipPortal to=".default-layout">
                <TooltipContent side="right" class="z-[900] border border-elevation-1 data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade select-none rounded-[4px] bg-primary-darker px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]">
                    <slot name="content"></slot>
                    <TooltipArrow class="fill-bg-primary-darker" :width="10" />
                </TooltipContent>
            </TooltipPortal>
        </TooltipRoot>
    </TooltipProvider>
</template>

<template>
    <div class="default-layout w-full pr-8" :style="cssVars">
        <div class="flex flex-row">
            <Sidebar class="sticky top-0" />
            <slot />
        </div>
    </div>
</template>

<script setup>
import { useTauriStore } from "@/stores/tauriStore";
import { dark } from "@/utils/themes.js";
import emitter from "@/utils/emitter.js";

const store = useTauriStore().store;
const savedColors = ref({});

onMounted(async () => {
    savedColors.value = await store.get("colors");
    emitter.on("updateColors", async () => {
        nextTick(async () => {
            savedColors.value = await store.get("colors");
        });
        savedColors.value = await store.get("colors");
    });
});

const cssVars = computed(() => {
    if (!savedColors.value) {
        store.set("activeTheme", "dark");

        return {
            "--bg-primary": dark.bgPrimary,
            "--elevation-1": dark.elevation1,
            "--elevation-2": dark.elevation2,
            "--elevation-3": dark.elevation3,
            "--accent": dark.accent,
            "--accent-darker": dark.accentDarker,
            "--text": dark.text,
            "--text-dim-1": dark.textD1,
            "--text-dim-2": dark.textD2,
            "--text-dim-3": dark.textD3,
            "--text-dim-4": dark.textD4,
            "--text-buttons": dark.textButtons,
        };
    } else {
        return {
            "--bg-primary": savedColors.value.bgPrimary,
            "--elevation-1": savedColors.value.elevation1,
            "--elevation-2": savedColors.value.elevation2,
            "--elevation-3": savedColors.value.elevation3,
            "--accent": savedColors.value.accent,
            "--accent-darker": savedColors.value.accentDarker,
            "--text": savedColors.value.text,
            "--text-dim-1": savedColors.value.textD1,
            "--text-dim-2": savedColors.value.textD2,
            "--text-dim-3": savedColors.value.textD3,
            "--text-dim-4": savedColors.value.textD4,
            "--text-buttons": savedColors.value.textButtons,
        };
    }
});
</script>

<style>
.default-layout {
    background-color: var(--bg-primary);
    color: var(--text);
    transition: color 0.5s cubic-bezier(0.17, 0.67, 0.83, 0.67);
    transition: background-color 0.5s cubic-bezier(0.17, 0.67, 0.83, 0.67);
}

.bg-elevation-1 {
    background-color: var(--elevation-1);
}

.bg-elevation-2 {
    background-color: var(--elevation-2);
}

.bg-elevation-2-hover:hover {
    background-color: var(--elevation-2);
}

.bg-elevation-3-hover:hover {
    background-color: var(--elevation-3);
}

.bg-accent {
    background-color: var(--accent);
}

.bg-accent:hover {
    background-color: var(--accent-darker);
}

.border-accent {
    border-color: var(--accent);
}

.border-accent-focus:focus {
    border-color: var(--accent);
}

.text-accent {
    color: var(--accent);
}

.text-accent-hover:hover {
    color: var(--accent);
}

.text-accent-darker-hover:hover {
    color: var(--accent-darker);
}

.text-normal {
    color: var(--text);
}

.text-dim-1 {
    color: var(--text-dim-1);
}

.text-dim-2 {
    color: var(--text-dim-2);
}

.text-dim-3 {
    color: var(--text-dim-3);
}

.text-dim-4 {
    color: var(--text-dim-4);
}

.text-buttons {
    color: var(--text-buttons);
}

.text-no-overflow {
    overflow-wrap: break-word;
    white-space: normal;
    overflow: hidden;
}
</style>

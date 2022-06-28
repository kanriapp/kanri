<template>
  <div class="default-layout min-h-screen mx-auto" :style="cssVars">

    <div class="flex flex-row">
        <slot />
    </div>
  </div>
</template>

<script setup>
import { useTauriStore } from "@/stores/tauriStore"
import { dark } from "@/utils/themes.js"

const store = useTauriStore().store
const savedColors = await store.get("colors")
const cssVars = ref({})

onMounted(async () => {
    await updateColors()
    const activeTheme = await store.get("activeTheme")
    console.log(activeTheme)
})

const updateColors = async () => {
    if (!savedColors) {
        store.set("activeTheme", "dark")

        cssVars.value = {
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
        }
    }
    else {
        cssVars.value = {
            "--bg-primary": savedColors.bgPrimary,
            "--elevation-1": savedColors.elevation1,
            "--elevation-2": savedColors.elevation2,
            "--elevation-3": savedColors.elevation3,
            "--accent": savedColors.accent,
            "--accent-darker": savedColors.accentDarker,
            "--text": savedColors.text,
            "--text-dim-1": savedColors.textD1,
            "--text-dim-2": savedColors.textD2,
            "--text-dim-3": savedColors.textD3,
            "--text-dim-4": savedColors.textD4,
            "--text-buttons": savedColors.textButtons,
        }
    }
}
</script>

<style>
  .default-layout {
    background-color: var(--bg-primary);
    color: var(--text);
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

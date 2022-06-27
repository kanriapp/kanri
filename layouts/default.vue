<template>
  <div class="text-white bg-gray-800 min-h-screen w-full px-4 py-8">
    A *default* layout
    <slot />
  </div>
</template>

<script setup>
import { useTauriStore } from "@/stores/tauriStore"
import { dark } from "@/utils/themes.js"

const store = useTauriStore().store
const savedColors = await store.get("colors")
const colorsUsed = ref({})

onMounted(async () => {
    await updateColors()
    const activeTheme = await store.get("activeTheme")
    console.log(activeTheme)
})

const updateColors = async () => {
    if (!savedColors) {
        store.set("activeTheme", "dark")

        colorsUsed.value = {
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
    else { colorsUsed.value = savedColors }
}


</script>

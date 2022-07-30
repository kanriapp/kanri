<template>
    <main id="settings" class="ml-4 mt-8">
        <h1 class="text-4xl font-bold">Settings</h1>
        <span class="text-dim-3">
            Change the behaviour of the application here.
        </span>
        <section id="theme-settings">
            <h2 class="mt-6 mb-2 text-2xl font-bold">Theme</h2>
            <div id="theme-selection" class="flex flex-row gap-4">
                <div
                    class="bg-elevation-1 bg-elevation-2-hover flex w-36 cursor-pointer flex-col items-center justify-center rounded-md p-2 text-xl font-semibold"
                    @click="setTheme('light')"
                >
                    <SunIcon class="h-8 w-8" :class="themeIconClass('light')" />
                    <label for="light-mode-icon" class="cursor-pointer">Light</label>
                </div>
                <div
                    class="bg-elevation-1 bg-elevation-2-hover flex w-36 cursor-pointer flex-col items-center justify-center rounded-md p-2 text-xl font-semibold"
                    @click="setTheme('dark')"
                >
                    <MoonIcon class="h-8 w-8" :class="themeIconClass('dark')" />
                    <label for="dark-mode-icon" class="cursor-pointer">Dark</label>
                </div>
                <div
                    class="bg-elevation-1 bg-elevation-2-hover flex w-36 cursor-pointer flex-col items-center justify-center rounded-md p-2 text-xl font-semibold"
                    @click="setTheme('catppuccin')"
                >
                    <IconCatppuccin class="h-8 w-8" :class="themeIconClass('catppuccin')" />
                    <label for="catppuccin-mode-icon" class="cursor-pointer"
                        >Catppuccin</label
                    >
                </div>
                <div
                    class="bg-elevation-1 bg-elevation-2-hover flex w-36 cursor-pointer flex-col items-center justify-center rounded-md p-2 text-xl font-semibold"
                    @click="setTheme('custom')"
                >
                    <ColorSwatchIcon class="h-8 w-8" :class="themeIconClass('custom')" />
                    <label for="custom-mode-icon" class="cursor-pointer">Custom</label>
                </div>
            </div>
            <div v-if="themeEditorDisplayed" class="mt-6 text-lg">
                <h3 class="mb-2 font-semibold">
                Select the colors for your custom theme:
                </h3>
                <CustomThemeEditor />
            </div>
        </section>
        <section id="miscellaneous-settings">
        <h2 class="mt-8 mb-2 text-2xl font-bold">Miscellaneous</h2>
        <div class="flex flex-col gap-4">
            <div class="flex w-[48rem] flex-row items-start justify-between">
            <div>
                <h3 class="text-lg">Export data to JSON</h3>
                <span class="text-dim-2">
                Backup all of your data (boards and themes) to a local JSON
                file.</span
                >
            </div>
            <button
                class="text-buttons bg-accent rounded-md px-4 py-2"
                @click="exportJSON()"
            >
                Export
            </button>
            </div>
            <div class="flex w-[48rem] flex-row items-start justify-between">
            <div>
                <h3 class="text-lg">Delete all data (themes and boards)</h3>
                <span class="text-dim-2"
                ><span class="text-red-500">Caution!</span> This will
                unreversibly delete all of your data!</span
                >
            </div>
            <button
                class="text-buttons bg-accent rounded-md px-4 py-2"
                @click="deleteAllData()"
            >
                Delete
            </button>
            </div>
        </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import { useTauriStore } from "@/stores/tauriStore"
import { light, dark, catppuccin } from "@/utils/themes.js";

import { ColorSwatchIcon, MoonIcon, SunIcon } from "@heroicons/vue/outline"

const store = useTauriStore().store;
const router = useRouter();

const activeTheme = ref("");
const themeEditorDisplayed = ref(false);

onMounted(async () => {
    activeTheme.value = await store.get("activeTheme");
    if (activeTheme.value === "custom") themeEditorDisplayed.value = true;
})

const setTheme = (themeName: string) => {
    activeTheme.value = themeName;
    themeEditorDisplayed.value = false;

    const themes = { light, dark, catppuccin };

    if (themeName === "custom") {
        themeEditorDisplayed.value = true;
        return;
    }

    store.set("activeTheme", themeName);
    store.set("colors", themes[themeName]);
    router.go(0);
}

const themeIconClass = (theme: string) => {
    if (theme === activeTheme.value) return "text-accent";
    else return "";
}

const deleteAllData = () => {
    store.delete("boards");
    store.delete("colors");
    store.set("activeTheme", "dark");

    // TODO: add toast library + toast or make custom component
}

const exportJSON = () => {
    // to be implemented using tauri fs api
}
</script>

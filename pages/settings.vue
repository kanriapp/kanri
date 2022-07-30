<template>
    <div class="px-6">
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
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            id="light-mode-icon"
                            class="h-8 w-8"
                            :class="themeIconClass('light')"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                        </svg>
                        <label for="light-mode-icon" class="cursor-pointer">Light</label>
                    </div>
                    <div
                        class="bg-elevation-1 bg-elevation-2-hover flex w-36 cursor-pointer flex-col items-center justify-center rounded-md p-2 text-xl font-semibold"
                        @click="setTheme('dark')"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            id="dark-mode-icon"
                            class="h-8 w-8"
                            :class="themeIconClass('dark')"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                            />
                        </svg>
                        <label for="dark-mode-icon" class="cursor-pointer">Dark</label>
                    </div>
                    <div
                        class="bg-elevation-1 bg-elevation-2-hover flex w-36 cursor-pointer flex-col items-center justify-center rounded-md p-2 text-xl font-semibold"
                        @click="setTheme('catppuccin')"
                    >
                        <svg
                            id="catppuccin-mode-icon"
                            class="h-8 w-8"
                            :class="themeIconClass('catppuccin')"
                            fill="none"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                            d="M15.492 3.507a1.65 1.65 0 0 0-1.499 1.643V10a.75.75 0 0 1-.75.75c-1.443 0-2.457.588-3.207 1.488-.772.928-1.275 2.206-1.59 3.557-.313 1.343-.427 2.696-.461 3.722-.013.382-.015.715-.012.983h7.02v-.75a2.25 2.25 0 0 0-2.249-2.25h-1.25a.75.75 0 0 1 0-1.5h1.25a3.749 3.749 0 0 1 3.748 3.75v.75h.75a.75.75 0 0 0 .75-.75v-10A.75.75 0 0 1 18.74 9h.506a1.25 1.25 0 0 0 1.062-1.909l-.62-1a1.25 1.25 0 0 0-1.061-.591h-2.386a.75.75 0 0 1-.75-.75V3.507ZM6.474 20.5c-.003-.284-.001-.634.012-1.033.036-1.083.157-2.542.5-4.012.34-1.462.915-2.996 1.899-4.177.872-1.047 2.055-1.801 3.61-1.985V5.15A3.15 3.15 0 0 1 15.641 2c.746 0 1.35.604 1.35 1.35V4h1.636c.95 0 1.834.492 2.335 1.3l.62 1c1.092 1.763-.084 4.02-2.093 4.19v9.26A2.25 2.25 0 0 1 17.242 22H5.795a3.797 3.797 0 0 1-2.775-6.39l1.135-1.217a3.059 3.059 0 0 0-.073-4.248L2.969 9.03a.75.75 0 0 1 1.06-1.06l1.114 1.114a4.558 4.558 0 0 1 .11 6.332l-1.136 1.217a2.3 2.3 0 0 0 1.68 3.867h.677Z"
                            fill="currentColor"
                            />
                        </svg>
                        <label for="catppuccin-mode-icon" class="cursor-pointer"
                            >Catppuccin</label
                        >
                    </div>
                    <div
                        class="bg-elevation-1 bg-elevation-2-hover flex w-36 cursor-pointer flex-col items-center justify-center rounded-md p-2 text-xl font-semibold"
                        @click="setTheme('custom')"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            id="custom-mode-icon"
                            class="h-8 w-8"
                            :class="themeIconClass('custom')"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                            />
                        </svg>
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
    </div>
</template>

<script setup lang="ts">
import { useTauriStore } from "@/stores/tauriStore"
import { light, dark, catppuccin } from "@/utils/themes.js";

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

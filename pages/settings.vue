<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2023 trobonox <hello@trobo.tech> -->
<!-- -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

<template>
  <main
    id="settings"
    class="overflow-auto pl-8 pt-8"
  >
    <ModalConfirmation
      v-show="deleteBoardModalVisible"
      close-button-text="Cancel"
      confirm-button-text="Delete Data"
      description="This action will irreversibly delete all of your boards, custom themes and revert all settings to default. Are you sure?"
      title="Delete ALL Data?"
      @closeModal="deleteBoardModalVisible = false"
      @confirmAction="deleteAllData"
    />

    <h1 class="text-4xl font-bold">
      Settings
    </h1>
    <span class="text-dim-3"> Change the behaviour of the application here. </span>

    <section id="theme-settings">
      <h2 class="mb-2 mt-6 text-2xl font-bold">
        Theme
      </h2>
      <div
        id="theme-selection"
        class="flex flex-row gap-4"
      >
        <div
          class="bg-elevation-1 bg-elevation-2-hover flex w-36 cursor-pointer flex-col items-center justify-center rounded-md p-2 text-xl font-semibold"
          @click="setTheme('light')"
        >
          <SunIcon
            :class="themeIconClass('light')"
            class="h-8 w-8"
          />
          <label
            class="cursor-pointer"
            for="light-mode-icon"
          >Light</label>
        </div>

        <div
          class="bg-elevation-1 bg-elevation-2-hover flex w-36 cursor-pointer flex-col items-center justify-center rounded-md p-2 text-xl font-semibold"
          @click="setTheme('dark')"
        >
          <MoonIcon
            :class="themeIconClass('dark')"
            class="h-8 w-8"
          />
          <label
            class="cursor-pointer"
            for="dark-mode-icon"
          >Dark</label>
        </div>

        <div
          class="bg-elevation-1 bg-elevation-2-hover flex w-36 cursor-pointer flex-col items-center justify-center rounded-md p-2 text-xl font-semibold"
          @click="setTheme('catppuccin')"
        >
          <IconCatppuccin
            :class="themeIconClass('catppuccin')"
            class="h-8 w-8"
          />
          <label
            class="cursor-pointer"
            for="catppuccin-mode-icon"
          >Catppuccin</label>
        </div>

        <div
          class="bg-elevation-1 bg-elevation-2-hover flex w-36 cursor-pointer flex-col items-center justify-center rounded-md p-2 text-xl font-semibold"
          @click="setTheme('custom')"
        >
          <SwatchIcon
            :class="themeIconClass('custom')"
            class="h-8 w-8"
          />
          <label
            class="cursor-pointer"
            for="custom-mode-icon"
          >Custom</label>
        </div>
      </div>

      <div
        v-if="themeEditorDisplayed"
        class="mt-6 text-lg"
      >
        <h3 class="mb-2 font-semibold">
          Select the colors for your custom theme:
        </h3>
        <CustomThemeEditor />
        <h3 class="font-semibold">
          Or import/export a custom theme:
        </h3>
        <span class="text-dim-2 text-base">Note: imports override your current theme so export any custom theme which you don't want to lose in advance!</span>
        <div class="my-2 flex flex-row gap-2">
          <button
            class="bg-elevation-1 bg-elevation-2-hover border-accent cursor-pointer rounded-md border border-dotted px-4 py-1"
            @click="importThemeFromJson"
          >
            Import
          </button>
          <button
            class="bg-elevation-1 bg-elevation-2-hover border-accent cursor-pointer rounded-md border border-dotted px-4 py-1"
            @click="exportThemeToJson"
          >
            Export
          </button>
        </div>
      </div>

      <button
        class="text-dim-3 transition-button mt-2"
        @click="$router.go(0)"
      >
        If the colors do not update, please click <span class="underline">here</span>.
      </button>
    </section>



    <section id="miscellaneous-settings">
      <h2 class="mb-2 mt-8 text-2xl font-bold">
        Miscellaneous
      </h2>

      <div class="flex flex-col gap-4">
        <div class="flex w-[48rem] flex-row items-start justify-between">
          <div>
            <h3 class="text-lg">
              Autostart on startup
            </h3>
            <span class="text-dim-2">
              Automatically starts Kanri at startup.
            </span>
          </div>
          <SwitchRoot
            v-model:checked="autostartCheckbox"
            class="bg-elevation-1 bg-accent-checked relative flex h-[24px] w-[42px] cursor-default rounded-full shadow-sm focus-within:outline focus-within:outline-black"
            @update:checked="toggleAutostart"
          >
            <SwitchThumb
              class="bg-text my-auto block h-[18px] w-[18px] translate-x-0.5 rounded-full shadow-sm transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]"
            />
          </SwitchRoot>
        </div>

        <div class="flex w-[48rem] flex-row items-start justify-between">
          <div class="mb-8 flex w-[48rem] flex-row items-start justify-between">
            <div>
              <h3 class="text-lg">
                Delete all data (themes and boards)
              </h3>
              <span class="text-dim-2"><span class="text-red-500">Caution!</span> This will irreversibly
                delete all of your data!
              </span>
            </div>
            <button
              class="text-buttons bg-accent transition-button rounded-md px-4 py-2"
              @click="deleteBoardModalVisible = true"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import type { ThemeIdentifiers } from "@/types/kanban-types";
import type { Ref } from "vue";

import { useTauriStore } from "@/stores/tauriStore";
import { kanriThemeSchema } from "@/types/json-schemas"
import emitter from "@/utils/emitter";
import { catppuccin, dark, light } from "@/utils/themes.js";
import { MoonIcon, SunIcon, SwatchIcon } from "@heroicons/vue/24/outline";
import { message, open, save } from "@tauri-apps/api/dialog";
import { readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import { disable, enable, isEnabled } from 'tauri-plugin-autostart-api';

const router = useRouter();

const store = useTauriStore().store;

const activeTheme: Ref<null | string> = ref("");
const themeEditorDisplayed = ref(false);

const autostartCheckbox = ref(false);

const deleteBoardModalVisible = ref(false);

onMounted(async () => {
    emitter.emit("showSidebarBackArrow");

    activeTheme.value = await store.get("activeTheme");
    if (activeTheme.value === "custom") themeEditorDisplayed.value = true;

    const autostartStatus = await isEnabled();
    switch (autostartStatus) {
    case true:
        autostartCheckbox.value = true;
        break;

    case false:
        break;

    default:
        console.error("Error when fetching autostart status:", autostartStatus);
        break;
    }
});

const setTheme = (themeName: ThemeIdentifiers) => {
    activeTheme.value = themeName;
    themeEditorDisplayed.value = false;

    const themes = { catppuccin, dark, light };

    if (themeName === "custom") {
        themeEditorDisplayed.value = true;
        return;
    }

    store.set("activeTheme", themeName);
    store.set("colors", themes[themeName]);
    emitter.emit("updateColors");
};

const themeIconClass = (theme: string) => {
    if (theme === activeTheme.value) return "text-accent";
    else return "";
};

const deleteAllData = async () => {
    await store.reset();

    activeTheme.value = "dark";
    themeEditorDisplayed.value = false;

    router.go(0);

    await message("Successfully deleted data.", { title: "Kanri", type: "info" });
};

const toggleAutostart = async (autostartToggled: boolean) => {
    if (autostartToggled) {
        await enable();
    }
    else {
        await disable();
    }
}

const exportThemeToJson = async () => {
    const filePath = await save({
        defaultPath: "./kanri_theme_export.json",
        filters: [
            {
                extensions: ["json"],
                name: "JSON File",
            },
        ],
        title: "Select file to export data to",
    });

    const colors = await store.get("colors");

    const fileContents = JSON.stringify(
        colors,
        null,
        2
    );

    if (filePath == null) return;
    await writeTextFile(filePath, fileContents);
}

const importThemeFromJson = async () => {
    const selected = await open({
        filters: [{
            extensions: ['json'],
            name: 'JSON File'
        }],
        multiple: false
    });

    if (selected === null) return;

    const textFile = await readTextFile(selected as string);
    if (!textFile) return;

    let parsedJson = null;
    try {
        parsedJson = JSON.parse(textFile);
    }
    catch (error) {
        console.error("Could not parse imported JSON;", error);
        await message('Could not load JSON file! Please check the file is correct.', { title: 'Kanri', type: 'error' });
    }
    if (parsedJson === null) return;

    let zodParsed = null;
    try {
        zodParsed = kanriThemeSchema.parse(parsedJson);
    }
    catch (error) {
        console.error(error);
        await message('Could not load JSON file! Please check the file is formatted correctly and not from an old version of Kanri.', { title: 'Kanri', type: 'error' });
    }
    if (zodParsed === null) return;

    await store.set("colors", zodParsed);
    await store.set("activeTheme", "custom");
    await store.set("savedCustomTheme", zodParsed);
    emitter.emit("updateColors");

    // Manual refresh
    router.go(0);
}
</script>

<style>
.bg-accent-checked[data-state=checked] {
    background-color: var(--accent);
}

.bg-text {
    background-color: var(--text);
}
</style>

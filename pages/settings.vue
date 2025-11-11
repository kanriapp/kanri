<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2025 trobonox <hello@trobo.dev>, gitoak -->
<!-- -->
<!-- SPDX-License-Identifier: GPL-3.0-or-later -->
<!--
Kanri is an offline Kanban board app made using Tauri and Nuxt.
Copyright (C) 2022-2025 trobonox <hello@trobo.dev>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>. -->

<template>
  <main id="settings" class="overflow-auto pl-8 pt-6">
    <ModalConfirmation
      v-show="deleteBoardModalVisible"
      :close-button-text="$t('general.cancelAction')"
      :confirm-button-text="
        $t('pages.settings.deleteAllDataConfirmationAction')
      "
      :description="$t('pages.settings.deleteAllDataConfirmationDescription')"
      :title="$t('pages.settings.deleteAllDataConfirmationHeading')"
      @closeModal="deleteBoardModalVisible = false"
      @confirmAction="deleteAllData"
    />

    <h1 class="text-4xl font-bold">
      {{ $t("pages.settings.settingsHeading") }}
    </h1>
    <span class="text-dim-3">{{
      $t("pages.settings.settingsHeadingSubtext")
    }}</span>

    <section id="theme-settings">
      <h2 class="mb-2 mt-6 text-2xl font-bold">
        {{ $t("pages.settings.sectionThemeHeading") }}
      </h2>
      <div id="theme-selection" class="flex flex-row gap-4" v-if="!theme.autoThemeEnabled">
        <div
          class="bg-elevation-1 bg-elevation-2-hover flex min-w-36 cursor-pointer flex-col items-center justify-center rounded-md p-2 text-xl font-semibold"
          @click="setTheme('light')"
        >
          <SunIcon :class="themeIconClass('light')" class="size-8" />
          <label class="cursor-pointer" for="light-mode-icon">{{
            $t("pages.settings.lightThemeOption")
          }}</label>
        </div>

        <div
          class="bg-elevation-1 bg-elevation-2-hover flex min-w-36 cursor-pointer flex-col items-center justify-center rounded-md p-2 text-xl font-semibold"
          @click="setTheme('dark')"
        >
          <MoonIcon :class="themeIconClass('dark')" class="size-8" />
          <label class="cursor-pointer" for="dark-mode-icon">{{
            $t("pages.settings.darkThemeOption")
          }}</label>
        </div>

        <div
          class="bg-elevation-1 bg-elevation-2-hover flex min-w-36 cursor-pointer flex-col items-center justify-center rounded-md p-2 text-xl font-semibold"
          @click="setTheme('catppuccin')"
        >
          <IconCatppuccin
            :class="themeIconClass('catppuccin')"
            class="size-8"
          />
          <label class="cursor-pointer" for="catppuccin-mode-icon">{{
            $t("pages.settings.catppuccinThemeOption")
          }}</label>
        </div>

        <div
          class="bg-elevation-1 bg-elevation-2-hover flex min-w-36 cursor-pointer flex-col items-center justify-center rounded-md p-2 text-xl font-semibold"
          @click="setTheme('custom')"
        >
          <SwatchIcon :class="themeIconClass('custom')" class="size-8" />
          <label class="cursor-pointer" for="custom-mode-icon">{{
            $t("pages.settings.customThemeOption")
          }}</label>
        </div>
      </div>

      <button class="text-dim-3 transition-button mt-2" @click="$router.go(0)" v-if="!theme.autoThemeEnabled">
        {{ $t("pages.settings.colorResetText")
        }}<span class="underline">{{
          $t("pages.settings.colorResetLink")
        }}</span
        >.
      </button>

      <div class="mt-3">
        <div class="mt-4 flex w-[48rem] flex-row items-start justify-between">
          <span
            class="text-lg"
          >
            {{ $t("pages.settings.setThemeAuto") }}
          </span>
          <SwitchRoot
            v-model:checked="theme.autoThemeEnabled"
            class="bg-elevation-2 bg-accent-checked relative flex h-[24px] w-[42px] cursor-pointer rounded-full shadow-sm focus-within:outline focus-within:outline-black"
            @update:checked="setTheme('auto')"
          >
            <SwitchThumb
              class="bg-button-text my-auto block size-[18px] translate-x-0.5 rounded-full shadow-sm transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]"
            />
          </SwitchRoot>
        </div>
      </div>

      <div v-if="themeEditorDisplayed" class="mt-6 text-lg">
        <h3 class="mb-2 font-semibold">
          {{ $t("pages.settings.customThemeEditorHeading") }}
        </h3>
        <CustomThemeEditor />
        <h3 class="font-semibold">
          {{ $t("pages.settings.customThemeImportHeading") }}
        </h3>
        <span class="text-dim-2 text-base">{{
          $t("pages.settings.customThemeImportHeadingSubtext")
        }}</span>
        <div class="my-2 flex flex-row gap-2">
          <button
            class="bg-elevation-1 bg-elevation-2-hover border-accent flex cursor-pointer flex-row items-center gap-2 rounded-md border border-dotted px-4 py-1"
            @click="importThemeFromJson"
          >
            <ArrowDownTrayIcon class="size-4" />
            {{ $t("general.importAction") }}
          </button>
          <button
            class="bg-elevation-1 bg-elevation-2-hover border-accent flex cursor-pointer flex-row items-center gap-2 rounded-md border border-dotted px-4 py-1"
            @click="exportThemeToJson"
          >
            <ArrowUpTrayIcon class="size-4" />
            {{ $t("general.exportAction") }}
          </button>
        </div>
      </div>
    </section>

    <section id="kanban-settings">
      <h2 class="mt-8 text-2xl font-bold">
        {{ $t("pages.settings.preferencesHeading") }}
      </h2>
      <span class="text-dim-3 mb-2">{{
        $t("pages.settings.preferencesSubtext")
      }}</span>

      <div class="mt-4 flex w-[48rem] flex-row items-start justify-between">
        <div>
          <h3 class="text-lg">
            {{ $t("pages.settings.preferencesZoomHeading") }}
          </h3>
          <span class="text-dim-2">
            {{ $t("pages.settings.preferencesZoomSubtext") }}
          </span>
        </div>
        <KanbanZoomAdjustment />
      </div>

      <div class="mt-4 flex w-[48rem] flex-row items-start justify-between">
        <div>
          <h3 class="text-lg">
            {{ $t("pages.settings.preferencesAddToTopButtonHeading") }}
          </h3>
          <span class="text-dim-2">
            {{ $t("pages.settings.preferencesAddToTopButtonSubtext") }}
          </span>
        </div>
        <SwitchRoot
          v-model:checked="globalSettingsStore.addToTopOfColumnButtonEnabled"
          class="bg-elevation-2 bg-accent-checked relative flex h-[24px] w-[42px] cursor-pointer rounded-full shadow-sm focus-within:outline focus-within:outline-black"
          @update:checked="(val) => globalSettingsStore.setAddToTopOfColumnButtonEnabled(val)"
        >
          <SwitchThumb
            class="bg-button-text my-auto block size-[18px] translate-x-0.5 rounded-full shadow-sm transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]"
          />
        </SwitchRoot>
      </div>

      <div class="mt-4 flex w-[48rem] flex-row items-start justify-between">
        <div>
          <h3 class="text-lg">
            {{ $t("pages.settings.preferencesDisplayNumberOfCardsHeading") }}
          </h3>
          <span class="text-dim-2">
            {{ $t("pages.settings.preferencesDisplayNumberOfCardsSubtext") }}
          </span>
        </div>
        <SwitchRoot
          v-model:checked="globalSettingsStore.displayColumnCardCountEnabled"
          class="bg-elevation-2 bg-accent-checked relative flex h-[24px] w-[42px] cursor-pointer rounded-full shadow-sm focus-within:outline focus-within:outline-black"
          @update:checked="(val) => globalSettingsStore.setDisplayColumnCardCountEnabled(val)"
        >
          <SwitchThumb
            class="bg-button-text my-auto block size-[18px] translate-x-0.5 rounded-full shadow-sm transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]"
          />
        </SwitchRoot>
      </div>

      <div class="mt-4 flex w-[48rem] flex-row items-start justify-between">
        <div>
          <h3 class="text-lg">
            {{ $t("pages.settings.preferencesDefaultRelativeDueDatesHeading") }}
          </h3>
          <span class="text-dim-2">
            {{ $t("pages.settings.preferencesDefaultRelativeDueDatesSubtext") }}
          </span>
        </div>
        <SwitchRoot
          v-model:checked="globalSettingsStore.defaultRelativeDueDatesEnabled"
          class="bg-elevation-2 bg-accent-checked relative flex h-[24px] w-[42px] cursor-pointer rounded-full shadow-sm focus-within:outline focus-within:outline-black"
          @update:checked="(val) => globalSettingsStore.setDefaultRelativeDueDatesEnabled(val)"
        >
          <SwitchThumb
            class="bg-button-text my-auto block size-[18px] translate-x-0.5 rounded-full shadow-sm transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]"
          />
        </SwitchRoot>
      </div>
    </section>

    <section id="miscellaneous-settings">
      <h2 class="mb-2 mt-8 text-2xl font-bold">
        {{ $t("pages.settings.miscellaneousHeading") }}
      </h2>

      <div class="flex flex-col gap-4">
        <div class="flex w-[48rem] flex-row items-start justify-between">
          <div>
            <h3 class="text-lg">
              {{ $t("pages.settings.languageSelectorHeading") }}
              <span class="text-dim-3 text-sm">{{
                locale != "en" ? "(Language)" : ""
              }}</span>
            </h3>
            <span class="text-dim-2">
              {{ $t("pages.settings.languageSelectorSubtext") }}
            </span>
          </div>
          <LanguageSelector />
        </div>

        <div class="flex w-[48rem] flex-row items-start justify-between">
          <div>
            <h3 class="text-lg">
              {{ $t("pages.settings.miscellaneousAnimationsHeading") }}
            </h3>
            <span class="text-dim-2">
              {{ $t("pages.settings.miscellaneousAnimationsSubtext") }}
            </span>
          </div>
          <SwitchRoot
            v-model:checked="globalSettingsStore.animationsEnabled"
            class="bg-elevation-2 bg-accent-checked relative flex h-[24px] w-[42px] cursor-pointer rounded-full shadow-sm focus-within:outline focus-within:outline-black"
            @update:checked="(val) => globalSettingsStore.setAnimationsEnabled(val)"
          >
            <SwitchThumb
              class="bg-button-text my-auto block size-[18px] translate-x-0.5 rounded-full shadow-sm transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]"
            />
          </SwitchRoot>
        </div>

        <div class="flex w-[48rem] flex-row items-start justify-between">
          <div>
            <h3 class="text-lg">
              {{ $t("pages.settings.miscellaneousDisableSpellcheckHeading") }}
            </h3>
            <span class="text-dim-2">
              {{ $t("pages.settings.miscellaneousDisableSpellcheckSubtext") }}
            </span>
          </div>
          <SwitchRoot
            v-model:checked="globalSettingsStore.disableSpellcheck"
            class="bg-elevation-2 bg-accent-checked relative flex h-[24px] w-[42px] cursor-pointer rounded-full shadow-sm focus-within:outline focus-within:outline-black"
            @update:checked="(val) => globalSettingsStore.setDisableSpellcheck(val)"
          >
            <SwitchThumb
              class="bg-button-text my-auto block size-[18px] translate-x-0.5 rounded-full shadow-sm transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]"
            />
          </SwitchRoot>
        </div>

        <div class="flex w-[48rem] flex-row items-start justify-between">
          <div>
            <h3 class="text-lg">
              {{ $t("pages.settings.miscellaneousAutostartHeading") }}
            </h3>
            <span class="text-dim-2">
              {{ $t("pages.settings.miscellaneousAutostartSubtext") }}
            </span>
          </div>
          <SwitchRoot
            v-model:checked="globalSettingsStore.autostartEnabled"
            class="bg-elevation-2 bg-accent-checked relative flex h-[24px] w-[42px] cursor-pointer rounded-full shadow-sm focus-within:outline focus-within:outline-black"
            @update:checked="(val) => globalSettingsStore.setAutostartEnabled(val)"
          >
            <SwitchThumb
              class="bg-button-text my-auto block size-[18px] translate-x-0.5 rounded-full shadow-sm transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]"
            />
          </SwitchRoot>
        </div>

        <div class="flex w-[48rem] flex-row items-start justify-between">
          <div class="mb-8 flex w-[48rem] flex-row items-start justify-between">
            <div>
              <h3 class="text-lg">
                {{ $t("pages.settings.miscellaneousDeleteAllDataHeading") }}
              </h3>
              <span class="text-dim-2"
                ><span class="text-red-500">{{
                  $t("pages.settings.miscellaneousDeleteAllDataSubtextRed")
                }}</span>
                {{
                  $t("pages.settings.miscellaneousDeleteAllDataSubtext")
                }}</span
              >
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

import { useTauriStore } from "@/stores/tauriStore";
import { kanriThemeSchema } from "@/types/json-schemas";
import emitter from "@/utils/emitter";
import { catppuccin, dark, light } from "@/utils/themes";
import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  MoonIcon,
  SunIcon,
  SwatchIcon,
} from "@heroicons/vue/24/outline";

import { message, open, save } from "@tauri-apps/plugin-dialog";
import { readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";

import { useI18n } from "vue-i18n";

const router = useRouter();

const store = useTauriStore().store;
const globalSettingsStore = useSettingsStore();
const theme = useThemeStore();

const { t, locale } = useI18n();

const { activeTheme } = toRefs(theme)
const themeEditorDisplayed = computed(() => activeTheme.value === "custom");
const systemTheme = useDark();

const deleteBoardModalVisible = ref(false);

onMounted(async () => {
  emitter.emit("showSidebarBackArrow");
});

const setTheme = async (themeName: ThemeIdentifiers) => {
  activeTheme.value = themeName;

  const themes = { catppuccin, dark, light };

  if (themeName === "custom") {
    // handling is done through watcher in CustomThemeEditor
    return;
  }

  if (themeName === "auto") {
    const resolvedThemeName = systemTheme.value ? "dark" : "light";
    await theme.toggleAutoTheme(resolvedThemeName);

    return;
  }

  await theme.setTheme(themeName, themes[themeName]);
};

const themeIconClass = (theme: string) => {
  if (theme === activeTheme.value) return "text-accent";
  else return "";
};

const deleteAllData = async () => {
  if (!deleteBoardModalVisible.value) return;

  await globalSettingsStore.deleteAllData();
  activeTheme.value = "dark";

  router.go(0);

  await message("Successfully deleted data.", { title: "Kanri", kind: "info" });
};

const exportThemeToJson = async () => {
  const filePath = await save({
    defaultPath: "./kanri_theme_export.json",
    filters: [
      {
        extensions: ["json"],
        name: "JSON File",
      },
    ],
    title: t("pages.settings.exportThemeDialogTitle"),
  });

  const colors = await store.get("colors");

  const fileContents = JSON.stringify(colors, null, 2);

  if (filePath == null) return;
  await writeTextFile(filePath, fileContents);
};

const importThemeFromJson = async () => {
  const selected = await open({
    filters: [
      {
        extensions: ["json"],
        name: "JSON File",
      },
    ],
    multiple: false,
  });

  if (selected === null) return;

  const textFile = await readTextFile(selected as string);
  if (!textFile) return;

  let parsedJson = null;
  try {
    parsedJson = JSON.parse(textFile);
  } catch (error) {
    console.error("Could not parse imported JSON;", error);
    await message(t("pages.settings.loadJsonErrorMessage"), {
      title: "Kanri",
      kind: "error",
    });
  }
  if (parsedJson === null) return;

  let zodParsed = null;
  try {
    zodParsed = kanriThemeSchema.parse(parsedJson);
  } catch (error) {
    console.error(error);
    await message(t("pages.settings.parseJsonErrorMessage"), {
      title: "Kanri",
      kind: "error",
    });
  }
  if (zodParsed === null) return;

  await theme.setTheme("custom", zodParsed);

  // Manual refresh
  router.go(0);
};
</script>

<style>
.bg-accent-checked[data-state="checked"] {
  background-color: var(--accent);
}

.bg-text {
  background-color: var(--text);
}
</style>

<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev> -->
<!-- -->
<!-- SPDX-License-Identifier: GPL-3.0-or-later -->
<!--
Kanri is an offline Kanban board app made using Tauri and Nuxt.
Copyright (C) 2022-2026 trobonox <hello@trobo.dev>

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

<!-- eslint-disable vue/no-template-shadow -->
<template>
  <ComboboxRoot v-model="selectedLocale" class="relative">
    <ComboboxAnchor
      class="bg-elevation-1 border-elevation-1 hover:bg-elevation-2 data-[placeholder]:text-primary-light inline-flex h-[35px] min-w-[240px] cursor-pointer items-center justify-between gap-[5px] rounded px-[15px]"
    >
      <ComboboxTrigger
        class="flex w-full flex-row items-center justify-between"
      >
        <span>{{ currentLocale?.name ?? "Unknown" }}</span>

        <PhCaretDown class="text-primary-light size-3" />
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxContent :class="tooltipClass">
      <ComboboxViewport class="p-[5px]">
        <ComboboxEmpty
          class="text-elevation-3 py-2 text-center text-xs font-medium"
        />

        <ComboboxGroup>
          <ComboboxItem
            v-for="locale in locales"
            :key="locale.code"
            class="text-primary-light data-[disabled]:text-elevation-3 data-[highlighted]:bg-primary-dark data-[highlighted]:text-primary-light bg-elevation-2-hover relative flex h-[25px] cursor-pointer select-none items-center rounded-[3px] pl-[25px] pr-[35px] leading-none data-[disabled]:pointer-events-none data-[highlighted]:outline-none"
            :value="locale.code"
          >
            <ComboboxItemIndicator
              class="absolute left-0 inline-flex w-[25px] items-center justify-center"
            >
              <PhCheck class="text-primary-light size-4" />
            </ComboboxItemIndicator>
            <span>{{ locale.name }}</span>
          </ComboboxItem>
        </ComboboxGroup>
      </ComboboxViewport>
    </ComboboxContent>
  </ComboboxRoot>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { PhCaretDown, PhCheck } from "@phosphor-icons/vue";

const { locale, locales, setLocale, setLocaleCookie } = useI18n();
const selectedLocale = ref(locale);

const currentLocale = computed(() => {
  return locales.value.filter((i) => i.code === locale.value)[0];
});

const settings = useSettingsStore();

const setLang = (newLocale: typeof locale.value) => {
  setLocale(newLocale);
  setLocaleCookie(newLocale);
  settings.setLocale(newLocale);
};

const tooltipClass = computed(() => {
  let tooltipClasses =
    "bg-elevation-1 absolute z-10 mt-2 w-full min-w-[160px] overflow-hidden rounded shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform]";

  if (settings.animationsEnabled) {
    tooltipClasses +=
      " data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade";
  }

  return tooltipClasses;
});

watch(selectedLocale, (newLocale) => {
  setLang(newLocale ?? "en");
});
</script>
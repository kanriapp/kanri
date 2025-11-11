/* SPDX-FileCopyrightText: Copyright (c) 2022-2025 trobonox <hello@trobo.dev>

SPDX-License-Identifier: GPL-3.0-or-later

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
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { disable, enable, isEnabled } from "@tauri-apps/plugin-autostart";
import type { set } from "zod/v4";

export const useSettingsStore = defineStore("settings", {
  state: () => {
    /* Start page settings */
    const boardSortingOption = ref("manual");
    const reverseSorting = ref(false);
    // TODO: implement logic/migrate to store

    /* Overall app settings */
    const locale = ref("en");
    const animationsEnabled = ref(true);
    const autostartEnabled = ref(false);
    const disableSpellcheck = ref(false);

    /* Global board settings */
    const columnZoomLevel = ref(0);
    const addToTopOfColumnButtonEnabled = ref(false);
    const displayColumnCardCountEnabled = ref(false);
    const defaultRelativeDueDatesEnabled = ref(false);

    return {
      locale,
      animationsEnabled,
      autostartEnabled,
      disableSpellcheck,

      columnZoomLevel,
      addToTopOfColumnButtonEnabled,
      displayColumnCardCountEnabled,
      defaultRelativeDueDatesEnabled,
    }
  },

  actions: {
    async loadSettings() {
      const store = useTauriStore().store;

      const localeSaved: string = await store.get("locale") ?? "en";
      const animationsEnabledSaved: boolean = await store.get("animationsEnabled") ?? true;
      const autostartEnabledSaved: boolean = await isEnabled() ?? false;

      const columnZoomLevelSaved: number = await store.get("columnZoomLevel") ?? 0;
      const addToTopOfColumnButtonEnabledSaved: boolean = await store.get("addToTopOfColumnButtonEnabled") ?? false;
      const displayColumnCardCountEnabledSaved: boolean = await store.get("displayColumnCardCountEnabled") ?? false;
      const defaultRelativeDueDatesEnabledSaved: boolean = await store.get("defaultRelativeDueDatesEnabled") ?? false;

      this.locale = localeSaved;
      this.animationsEnabled = animationsEnabledSaved;
      this.autostartEnabled = autostartEnabledSaved;
      this.columnZoomLevel = columnZoomLevelSaved;
      this.addToTopOfColumnButtonEnabled = addToTopOfColumnButtonEnabledSaved;
      this.displayColumnCardCountEnabled = displayColumnCardCountEnabledSaved;
      this.defaultRelativeDueDatesEnabled = defaultRelativeDueDatesEnabledSaved;
    },

    async deleteAllData() {
      const store = useTauriStore().store;
      await store.reset();
      await this.loadSettings(); // load defaults
    },

    async setLocale(locale: string) {
      this.locale = locale;
      await useTauriStore().store.set("locale", locale);
    },

    async setAnimationsEnabled(value: boolean) {
      this.animationsEnabled = value;
      await useTauriStore().store.set("animationsEnabled", value);
    },

    async setAutostartEnabled(value: boolean) {
      this.autostartEnabled = value;

      // set using tauri plugin, not saving in store
      if (value) await enable();
      else await disable();
    },

    async setDisableSpellcheck(value: boolean) {
      this.disableSpellcheck = value;
      await useTauriStore().store.set("disableSpellcheck", value);
    },

    async setColumnZoomLevel(value: number) {
      this.columnZoomLevel = value;
      await useTauriStore().store.set("columnZoomLevel", value);
    },

    async setAddToTopOfColumnButtonEnabled(value: boolean) {
      this.addToTopOfColumnButtonEnabled = value;
      await useTauriStore().store.set("addToTopOfColumnButtonEnabled", value);
    },
    
    async setDisplayColumnCardCountEnabled(value: boolean) {
      this.displayColumnCardCountEnabled = value;
      await useTauriStore().store.set("displayColumnCardCountEnabled", value);
    },

    async setDefaultRelativeDueDatesEnabled(value: boolean) {
      this.defaultRelativeDueDatesEnabled = value;
      await useTauriStore().store.set("defaultRelativeDueDatesEnabled", value);
    }
  }
});

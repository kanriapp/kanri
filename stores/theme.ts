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

import { defineStore } from "pinia";
import { dark } from "@/utils/themes";
import type { Theme } from "@/types/kanban-types";

export const useThemeStore = defineStore("theme", {
  state: () => {
    const activeTheme = ref("dark");
    const colors: Ref<Theme | null> = ref(null);
    const savedCustomTheme: Ref<Theme | null> = ref(null);
    const autoThemeEnabled = ref(false);

    return { activeTheme, colors, savedCustomTheme, autoThemeEnabled };
  },
  actions: {
    async loadThemeSettings() {
      const store = useTauriStore().store;

      const activeThemeSaved: string =
        (await store.get("activeTheme")) ?? "dark";
      const colorsSaved: Theme | null = (await store.get("colors")) ?? dark;
      const savedCustomThemeSaved: Theme | null =
        (await store.get("savedCustomTheme")) ?? null;
      const autoThemeEnabledSaved: boolean =
        (await store.get("activeTheme")) === "auto" ? true : false;

      this.activeTheme = activeThemeSaved;
      this.colors = colorsSaved;
      this.savedCustomTheme = savedCustomThemeSaved;
      this.autoThemeEnabled = autoThemeEnabledSaved;
    },

    async setTheme(theme: string, colors: Theme | null = null) {
      const store = useTauriStore().store;

      this.activeTheme = theme;
      await store.set("activeTheme", theme);

      if (colors) {
        this.colors = colors;
        await store.set("colors", colors);

        if (theme === "custom") {
          this.savedCustomTheme = colors;
          await store.set("savedCustomTheme", colors);
        }
      }
    },

    async toggleAutoTheme(resolvedSystemTheme: "light" | "dark" = "dark") {
      const store = useTauriStore().store;

      if (this.autoThemeEnabled) {
        this.activeTheme = "auto";
        await store.set("activeTheme", "auto");
      } else {
        this.activeTheme = resolvedSystemTheme;
        await store.set("activeTheme", resolvedSystemTheme);
      }

      this.colors = themes[resolvedSystemTheme];
      await store.set("colors", themes[resolvedSystemTheme]);
    },
  },
});

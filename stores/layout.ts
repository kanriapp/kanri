/* SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>

SPDX-License-Identifier: GPL-3.0-or-later

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
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { defineStore } from 'pinia'
import versionInfo from "@/version_info.json";

export const useLayoutStore = defineStore("layout", {
  state: () => {
    /* Sidebar settings */
    const showSidebarHelpModal = ref(false);
    const showSidebarBackArrow = ref(false);
    const showSidebarAddButton = ref(true);
    // TODO: implement logic/migrate to store

    // TODO: add logic for drag and drop disable (do this at some later point)

    /* Changelog settings */
    const lastInstalledVersion: Ref<string | null> = ref(null);

    return {
      showSidebarHelpModal,
      showSidebarBackArrow,
      showSidebarAddButton,

      lastInstalledVersion
    }
  },
  actions: {
    async loadLayoutSettings() {
      const store = useTauriStore().store;
      const currentVersionIdentifier = `${versionInfo.buildMajor}.${versionInfo.buildMinor}.${versionInfo.buildRevision}`;

      const lastInstalledVersionSaved: string = await store.get("lastInstalledVersion") ?? currentVersionIdentifier;
      console.log("Loaded lastInstalledVersion from store:", lastInstalledVersionSaved);
      this.lastInstalledVersion = lastInstalledVersionSaved;
    },

    onHomePageLeave() {
      this.showSidebarAddButton = false;
      this.showSidebarBackArrow = true;
    },

    onHomePageEnter() {
      this.showSidebarAddButton = true;
      this.showSidebarBackArrow = false;
    },

    async shouldDisplayChangelog() {
      if (this.lastInstalledVersion === null) {
        await this.loadLayoutSettings();

        if (this.lastInstalledVersion === null) {
          // still null, something went wrong or no value is saved
          return false;
        }
      }

      const currentVersionIdentifier = `${versionInfo.buildMajor}.${versionInfo.buildMinor}.${versionInfo.buildRevision}`;
      if (this.lastInstalledVersion !== currentVersionIdentifier) {
        this.lastInstalledVersion = currentVersionIdentifier;
        const store = useTauriStore().store;
        await store.set("lastInstalledVersion", currentVersionIdentifier);
        return true;
      }

      return false;
    }
  }
})

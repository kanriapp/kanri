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

// Browser-compatible store implementation
function createStore() {
  if (process.client && typeof window !== 'undefined') {
    // In browser, use localStorage-based mock
    if (window.MockLazyStore) {
      return new window.MockLazyStore(".kanri.dat");
    }
  }
  
  // Fallback for SSR or if Tauri is available
  try {
    const { LazyStore } = require("@tauri-apps/plugin-store");
    return new LazyStore(".kanri.dat");
  } catch (e) {
    // Return a basic mock for SSR
    return {
      get: () => Promise.resolve(null),
      set: () => Promise.resolve(),
      has: () => Promise.resolve(false),
      delete: () => Promise.resolve(),
      clear: () => Promise.resolve(),
      save: () => Promise.resolve(),
      load: () => Promise.resolve(),
    };
  }
}

export const useTauriStore = defineStore("tauriStore", {
  state: () => {
    return { store: createStore() };
  },
});

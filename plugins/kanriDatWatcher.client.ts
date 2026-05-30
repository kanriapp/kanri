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

import { listen } from "@tauri-apps/api/event";
import { useTauriStore } from "@/stores/tauriStore";
import { useBoardsStore } from "@/stores/boards";

// Reload the board when an external writer (the kanri-bridge daemon) changes
// .kanri.dat on disk. The Tauri backend watches the file and emits
// `kanri-dat-changed`; here we refresh the LazyStore's cache from disk, then
// reload via the existing forceReloadBoards action (no new loader).
export default defineNuxtPlugin(() => {
  listen("kanri-dat-changed", async () => {
    const tauri = useTauriStore().store;
    await tauri.reload();
    await useBoardsStore().forceReloadBoards();
    console.log("[kanri-bridge] .kanri.dat changed externally — reloaded boards");
  });
});

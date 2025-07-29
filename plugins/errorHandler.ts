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

// Browser-compatible logging
function getLogger() {
  if (process.client && typeof window !== 'undefined' && window.mockLog) {
    return window.mockLog;
  }
  
  try {
    const { error } = require("@tauri-apps/plugin-log");
    return { error };
  } catch (e) {
    // Fallback to console
    return { error: console.error };
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const logger = getLogger();
  
  nuxtApp.hook("vue:error", (err, instance, info) => {
    logger.error("Vue error: " + err + " ; " + info);
  });
});

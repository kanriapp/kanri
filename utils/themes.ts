/* SPDX-FileCopyrightText: Copyright (c) 2022-2024 trobonox <hello@trobo.dev>

SPDX-License-Identifier: GPL-3.0-or-later

Kanri is an offline Kanban board app made using Tauri and Nuxt.
Copyright (C) 2022-2024 trobonox <hello@trobo.dev>

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

import type { Theme } from "@/types/kanban-types";

export const light: Theme = {
  accent: "#1d4ed8",
  accentDarker: "#1e40af",
  bgPrimary: "#ffffff",
  elevation1: "#ededed",
  elevation2: "#dadbdc",
  elevation3: "#c7c7c7",
  text: "#1e293b",
  textButtons: "#f1f5f9",
  textD1: "#334155",
  textD2: "#475569",
  textD3: "#64748b",
  textD4: "#94a3b8",
} as const;

export const dark: Theme = {
  accent: "#2150c0",
  accentDarker: "#17367d",
  bgPrimary: "#111112",
  elevation1: "#1b1b1d",
  elevation2: "#27272a",
  elevation3: "#333338",
  text: "#f4f4f5",
  textButtons: "#f1f5f9",
  textD1: "#e4e4e7",
  textD2: "#d4d4d8",
  textD3: "#a1a1aa",
  textD4: "#71717a",
} as const;

export const catppuccin: Theme = {
  accent: "#f28fad",
  accentDarker: "#c97790",
  bgPrimary: "#1e1e2e",
  elevation1: "#302d41",
  elevation2: "#575268",
  elevation3: "#6e6c7e",
  text: "#f4f4f5",
  textButtons: "#1a1826",
  textD1: "#e4e4e7",
  textD2: "#d4d4d8",
  textD3: "#a1a1aa",
  textD4: "#71717a",
} as const;

export default {
  catppuccin,
  dark,
  light,
};

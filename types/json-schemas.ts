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

import { z } from "zod";

export const kanriThemeSchema = z.object({
  accent: z.string(),
  accentDarker: z.string(),
  bgPrimary: z.string(),
  elevation1: z.string(),
  elevation2: z.string(),
  elevation3: z.string(),
  text: z.string(),
  textButtons: z.string(),
  textD1: z.string(),
  textD2: z.string(),
  textD3: z.string(),
  textD4: z.string(),
});

const kanriTagSchema = z.object({
  id: z.string(),
  text: z.string(),
  color: z.string().optional(),
  style: z.string().optional(),
});

const kanriCardSchema = z.object({
  color: z.string().optional(),
  description: z.string().optional(),
  id: z.string().optional(),
  name: z.string(),
  tasks: z
    .array(
      z.object({
        id: z.string().optional(),
        finished: z.boolean(),
        name: z.string(),
      })
    )
    .optional(),
  dueDate: z.string().optional().nullable(),
  tags: z.array(kanriTagSchema).optional().nullable(),
});

const kanriColumnSchema = z.object({
  cards: z.array(kanriCardSchema),
  id: z.string(),
  title: z.string(),
});

const kanriBoardBackgroundSchema = z
  .object({
    blur: z.string(),
    brightness: z.string(),
    src: z.string(),
  })
  .optional()
  .nullable();

export const kanriBoardSchema = z.object({
  globalTags: z.array(kanriTagSchema).optional().nullable(),
  background: kanriBoardBackgroundSchema,
  columns: z.array(kanriColumnSchema),
  id: z.string(),
  lastEdited: z.string().optional(),
  title: z.string(),
});

export const kanbanElectronBoardSchema = z.object({
  id: z.string(),
  lists: z.array(kanriColumnSchema),
  title: z.string(),
});

export const kanriJsonSchema = z.object({
  activeTheme: z.string(),
  animationsEnabled: z.boolean().optional().nullable(),
  boardSortingOption: z.string().optional().nullable(),
  boards: z.array(kanriBoardSchema),
  colors: kanriThemeSchema,
  columnZoomLevel: z.number().optional().nullable(),
  lastInstalledVersion: z.string().optional().nullable(),
  savedCustomTheme: kanriThemeSchema.optional().nullable(),
  reverseSorting: z.boolean().optional().nullable(),
  addToTopOfColumnButtonEnabled: z.boolean().optional().nullable(),
  displayColumnCardCountEnabled: z.boolean().optional().nullable(),
});

export const kanbanElectronJsonSchema = z.object({
  activeTheme: z.string(),
  boards: z.array(kanbanElectronBoardSchema),
  colors: kanriThemeSchema,
  columnZoomLevel: z.string().optional(),
});

export const trelloJsonSchema = z.object({
  cards: z.array(
    z.object({
      labels: z.array(
        z.object({
          id: z.string(),
          idBoard: z.string(),
          name: z.string(),
          color: z.string(),
          uses: z.number(),
        })
      ),
      due: z.string().nullable(),
      closed: z.boolean(),
      desc: z.string(),
      id: z.string(),
      idChecklists: z.array(z.string()),
      idList: z.string(),
      name: z.string(),
    })
  ),
  checklists: z.array(
    z.object({
      checkItems: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          state: z.string(),
        })
      ),
      id: z.string(),
      idBoard: z.string(),
      idCard: z.string(),
    })
  ),
  labels: z.array(
    z.object({
      id: z.string(),
      idBoard: z.string(),
      name: z.string(),
      color: z.string(),
      uses: z.number(),
    })
  ),
  lists: z.array(
    z.object({
      closed: z.boolean(),
      id: z.string(),
      name: z.string(),
    })
  ),
  name: z.string(),
});

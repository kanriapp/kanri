// SPDX-FileCopyrightText: Copyright (c) 2022-2023 trobonox <hello@trobo.tech>
//
// SPDX-License-Identifier: Apache-2.0

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
    textD4: z.string()
});

const kanriCardSchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    description: z.string().optional(),
    tasks: z.array(z.object({
        name: z.string(),
        finished: z.boolean()
    })).optional(),
    color: z.string().optional()
});

const kanriColumnSchema = z.object({
    id: z.string(),
    title: z.string(),
    cards: z.array(kanriCardSchema)
});

const kanriBoardBackgroundSchema = z.object({
    blur: z.string(),
    brightness: z.string(),
    src: z.string()
}).optional();

export const kanriBoardSchema = z.object({
    id: z.string(),
    title: z.string(),
    lastEdited: z.string().optional(),
    columns: z.array(kanriColumnSchema),
    background: kanriBoardBackgroundSchema
});

export const kanbanElectronBoardSchema = z.object({
    id: z.string(),
    title: z.string(),
    lists: z.array(kanriColumnSchema)
});

export const kanriJsonSchema = z.object({
    boards: z.array(kanriBoardSchema),
    boardSortingOption: z.string().optional(),
    activeTheme: z.string(),
    colors: kanriThemeSchema,
    savedCustomTheme: kanriThemeSchema.optional(),
    columnZoomLevel: z.number().optional(),
    lastInstalledVersion: z.string().optional()
});

export const kanbanElectronJsonSchema = z.object({
    boards: z.array(kanbanElectronBoardSchema),
    activeTheme: z.string(),
    colors: kanriThemeSchema,
    columnZoomLevel: z.string().optional()
});

export const trelloJsonSchema = z.object({
    name: z.string(),
    lists: z.array(z.object({
        id: z.string(),
        name: z.string(),
        closed: z.boolean()
    })),
    cards: z.array(z.object({
        id: z.string(),
        idList: z.string(),
        name: z.string(),
        desc: z.string(),
        closed: z.boolean(),
        idChecklists: z.array(z.string())
    })),
    checklists: z.array(z.object({
        id: z.string(),
        idBoard: z.string(),
        idCard: z.string(),
        checkItems: z.array(z.object({
            id: z.string(),
            name: z.string(),
            state: z.string()
        }))
    }))
});

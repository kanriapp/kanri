// SPDX-FileCopyrightText: Copyright (c) 2022-2023 trobonox <hello@trobo.tech>
//
// SPDX-License-Identifier: Apache-2.0

import { z } from "zod";

const kanriThemeSchema = z.object({
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
}).optional()

const kanriBoardSchema =z.object({
    id: z.string(),
    title: z.string(),
    lastEdited: z.string(),
    columns: z.array(kanriColumnSchema),
    background: kanriBoardBackgroundSchema
})

export const kanriJsonSchema = z.object({
    boards: z.array(kanriBoardSchema),
    activeTheme: z.string(),
    colors: kanriThemeSchema,
    columnZoomLevel: z.string().optional()
});

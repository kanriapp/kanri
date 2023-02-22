// SPDX-FileCopyrightText: Copyright (c) 2022-2023 trobonox <hello@trobo.tech>
//
// SPDX-License-Identifier: Apache-2.0

import { z } from "zod";

export const kanriJsonSchema = z.object({
    boards: z.array(z.object({
        id: z.string(),
        title: z.string(),
        lastEdited: z.string(),
        columns: z.array(z.object({
            id: z.string(),
            title: z.string(),
            cards: z.array(z.object({
                name: z.string(),
                description: z.string(),
                color: z.string().optional()
            }))
        })),
        background: z.object({
            blur: z.string(),
            brightness: z.string(),
            src: z.string()
        }).optional()
    })),
    activeTheme: z.string(),
    colors: z.object({
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
    }),
    columnZoomLevel: z.string().optional()
});

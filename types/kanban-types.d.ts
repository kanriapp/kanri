// SPDX-FileCopyrightText: Copyright (c) 2022-2024 trobonox <hello@trobo.tech>
//
// SPDX-License-Identifier: Apache-2.0

export declare interface Board {
    background?: BackgroundSettings,
    columns: Array<Column>,
    id: string,
    lastEdited?: Date
    title: string,
}

export declare interface BackgroundSettings {
    blur: string,
    brightness: string
    src: string,
}

export declare interface Column {
    cards: Array<Card>
    id: string,
    title: string,
}

export declare interface Card {
    color?: string
    description?: string,
    dueDate?: Date | null,
    id?: string,
    isDueDateCounterRelative?: boolean
    name: string,
    tasks?: Array<{
        finished: boolean,
        id?: string,
        name: string,
    }>,
}

export declare interface Theme {
    accent: string,
    accentDarker: string,
    bgPrimary: string,
    elevation1: string,
    elevation2: string,
    elevation3: string,
    text: string,
    textButtons: string,
    textD1: string,
    textD2: string,
    textD3: string,
    textD4: string,
}


export declare type ThemeIdentifiers = "catppuccin" | "custom" | "dark" | "light";

export default {
    Board,
    Card,
    Column,
    ThemeIdentifiers
}

// SPDX-FileCopyrightText: Copyright (c) 2022-2023 trobonox <hello@trobo.tech>
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
    id?: string,
    name: string,
    tasks?: Array<{
        finished: boolean
        name: string,
    }>,
}

export declare type ThemeIdentifiers = "catppuccin" | "custom" | "dark" | "light";

export default {
    Board,
    Card,
    Column,
    ThemeIdentifiers
}

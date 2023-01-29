// SPDX-FileCopyrightText: 2022-2023 trobonox <hello@trobo.tech>
//
// SPDX-License-Identifier: Apache-2.0

export declare interface Board {
    id: string,
    title: string,
    columns: Array<Column>,
    background?: BackgroundSettings,
    lastEdited?: Date
}

export declare interface BackgroundSettings {
    src: string,
    blur: string,
    brightness: string
}

export declare interface Column {
    id: string,
    title: string,
    cards: Array<Card>
}

export declare interface Card {
    id?: string,
    name: string,
    description?: string
}

export declare type ThemeIdentifiers = "dark" | "light" | "catppuccin" | "custom";

export default {
    Board,
    Column,
    Card,
    ThemeIdentifiers
}

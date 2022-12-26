export declare interface Board {
    id: string,
    title: string,
    columns: Array<Column>,
    background?: BackgroundSettings
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

export declare interface Board {
    id: string,
    title: string,
    columns: Array<any>
}

export declare interface Column {
    id: string,
    cards: Array<any>
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

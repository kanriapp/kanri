import type { Column } from "~/types/kanban-types";

export const exampleColumns: Array<Column> = [
    {
        cards: [
        {
            description: "",
            name: "Eat something tasty",
        },
        {
            description: "This is an extended description for an example task",
            name: "Do some important task",
        },
        ],
        id: generateUniqueID(),
        title: "Todo",
    },
    {
        cards: [{ description: "", name: "Doing something cool" }],
        id: generateUniqueID(),
        title: "Doing",
    },
    {
        cards: [],
        id: generateUniqueID(),
        title: "Done",
    },
];
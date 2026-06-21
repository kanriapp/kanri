// SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { beforeEach, describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useBoardsStore } from "./boards";

describe("boards store task progression", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("moves a card one column to the right and updates Unified To-Do", () => {
    const store = useBoardsStore();
    store.boards = [
      {
        id: "work",
        title: "Work",
        columns: [
          {
            id: "todo",
            title: "To Do",
            cards: [{ id: "task", name: "Ship feature" }],
          },
          { id: "doing", title: "Doing", cards: [] },
          { id: "done", title: "Done", cards: [] },
        ],
      },
    ];

    expect(store.unifiedTodoItems.map(item => item.card.id)).toEqual(["task"]);

    store.moveCardToNextColumn("work", "todo", "task");

    expect(store.boards[0]?.columns[0]?.cards).toHaveLength(0);
    expect(store.boards[0]?.columns[1]?.cards[0]?.id).toBe("task");
    expect(store.unifiedTodoItems).toHaveLength(0);
  });

  it("leaves cards in the final column in place", () => {
    const store = useBoardsStore();
    store.boards = [
      {
        id: "work",
        title: "Work",
        columns: [
          {
            id: "done",
            title: "Done",
            cards: [{ id: "finished", name: "Finished" }],
          },
        ],
      },
    ];

    store.moveCardToNextColumn("work", "done", "finished");

    expect(store.boards[0]?.columns[0]?.cards[0]?.id).toBe("finished");
  });

  it("updates subtask completion without moving the card", () => {
    const store = useBoardsStore();
    store.boards = [
      {
        id: "work",
        title: "Work",
        columns: [
          {
            id: "todo",
            title: "To Do",
            cards: [
              {
                id: "task",
                name: "Ship feature",
                tasks: [{ id: "subtask", name: "Write tests", finished: false }],
              },
            ],
          },
          { id: "done", title: "Done", cards: [] },
        ],
      },
    ];

    store.mutateCard("work", "todo", "task", (card) => {
      card.tasks = [{ id: "subtask", name: "Write tests", finished: true }];
    });

    expect(store.boards[0]?.columns[0]?.cards[0]?.id).toBe("task");
    expect(store.boards[0]?.columns[0]?.cards[0]?.tasks?.[0]?.finished).toBe(true);
    expect(store.boards[0]?.columns[1]?.cards).toHaveLength(0);
  });

  it("adds IDs to legacy cards so Unified To-Do interactions stay connected", () => {
    const store = useBoardsStore();

    store.upsertBoard({
      id: "legacy",
      title: "Legacy",
      columns: [
        {
          id: "todo",
          title: "To Do",
          cards: [{ name: "Card without an ID" }],
        },
      ],
    });

    expect(store.boards[0]?.columns[0]?.cards[0]?.id).toBeTypeOf("string");
    expect(store.unifiedTodoItems[0]?.card).toBe(
      store.boards[0]?.columns[0]?.cards[0]
    );
  });
});

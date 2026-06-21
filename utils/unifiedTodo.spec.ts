// SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { describe, expect, it } from "vitest";
import type { Board, Column } from "@/types/kanban-types";
import {
  aggregateUnifiedTodoItems,
  isColumnIncludedInUnifiedTodo,
  normalizeColumnTitle,
} from "./unifiedTodo";

const column = (values: Partial<Column> = {}): Column => ({
  cards: [],
  id: "column-id",
  title: "To Do",
  ...values,
});

describe("Unified To-Do", () => {
  it("normalizes supported default column names", () => {
    expect(normalizeColumnTitle("  TO-DO  ")).toBe("to-do");

    for (const title of ["To Do", "todo", "TO-DO", "Yapılacak", "YAPILACAK"]) {
      expect(isColumnIncludedInUnifiedTodo(column({ title }))).toBe(true);
    }

    for (const title of ["Backlog", "This Week", "Doing", "Done", "Completed"]) {
      expect(isColumnIncludedInUnifiedTodo(column({ title }))).toBe(false);
    }
  });

  it("honors explicit inclusion and exclusion overrides", () => {
    expect(
      isColumnIncludedInUnifiedTodo(
        column({ title: "Ready", includeInUnifiedTodo: true })
      )
    ).toBe(true);
    expect(
      isColumnIncludedInUnifiedTodo(
        column({ title: "To Do", includeInUnifiedTodo: false })
      )
    ).toBe(false);
  });

  it("aggregates original cards across boards and sorts dated cards first", () => {
    const boards: Board[] = [
      {
        id: "work",
        title: "Work",
        columns: [
          column({
            id: "work-todo",
            cards: [
              { id: "later", name: "Later", dueDate: "2026-06-22" },
              { id: "sooner", name: "Sooner", dueDate: "2026-06-21" },
              { id: "undated", name: "Undated" },
            ],
          }),
        ],
      },
      {
        id: "living",
        title: "Living",
        columns: [
          column({
            id: "living-ready",
            title: "Ready",
            includeInUnifiedTodo: true,
            cards: [{ id: "groceries", name: "Buy groceries" }],
          }),
        ],
      },
    ];

    const items = aggregateUnifiedTodoItems(boards);

    expect(items.map((item) => item.card.id)).toEqual([
      "sooner",
      "later",
      "undated",
      "groceries",
    ]);
    expect(items[0]?.card).toBe(boards[0]?.columns[0]?.cards[1]);
  });

  it("drops a card as soon as it moves out of an included column", () => {
    const task = { id: "task", name: "Move me" };
    const board: Board = {
      id: "board",
      title: "Board",
      columns: [
        column({ id: "todo", cards: [task] }),
        column({ id: "doing", title: "Doing", cards: [] }),
      ],
    };

    expect(aggregateUnifiedTodoItems([board])).toHaveLength(1);
    board.columns[0]?.cards.splice(0, 1);
    board.columns[1]?.cards.push(task);
    expect(aggregateUnifiedTodoItems([board])).toHaveLength(0);
  });
});

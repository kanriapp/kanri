// SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import type { Board, Card, Column } from "@/types/kanban-types";

const DEFAULT_UNIFIED_TODO_COLUMN_NAMES = new Set([
  "to do",
  "todo",
  "to-do",
  "yapılacak",
  "yapilacak",
]);

export interface UnifiedTodoItem {
  boardId: string;
  boardTitle: string;
  card: Card;
  cardOrder: number;
  columnId: string;
  columnOrder: number;
  columnTitle: string;
}

export const normalizeColumnTitle = (title: string) =>
  title.trim().toLowerCase();

export const isColumnIncludedInUnifiedTodo = (column: Column) => {
  if (column.includeInUnifiedTodo !== undefined) {
    return column.includeInUnifiedTodo;
  }

  return DEFAULT_UNIFIED_TODO_COLUMN_NAMES.has(
    normalizeColumnTitle(column.title)
  );
};

const dueDateTimestamp = (card: Card) => {
  if (!card.dueDate) return Number.POSITIVE_INFINITY;

  const timestamp = new Date(card.dueDate).getTime();
  return Number.isNaN(timestamp) ? Number.POSITIVE_INFINITY : timestamp;
};

export const aggregateUnifiedTodoItems = (
  boards: Board[]
): UnifiedTodoItem[] => {
  return boards.flatMap((board) => {
    const items = board.columns.flatMap((column, columnOrder) => {
      if (!isColumnIncludedInUnifiedTodo(column)) return [];

      return column.cards.map((card, cardOrder) => ({
        boardId: board.id,
        boardTitle: board.title,
        card,
        cardOrder,
        columnId: column.id,
        columnOrder,
        columnTitle: column.title,
      }));
    });

    return items.sort((a, b) => {
      const firstDueDate = dueDateTimestamp(a.card);
      const secondDueDate = dueDateTimestamp(b.card);

      if (firstDueDate !== secondDueDate) return firstDueDate - secondDueDate;
      if (a.columnOrder !== b.columnOrder) {
        return a.columnOrder - b.columnOrder;
      }

      return a.cardOrder - b.cardOrder;
    });
  });
};

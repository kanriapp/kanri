// SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import type { Board } from "@/types/kanban-types";

type ProgressColumn = "backlog" | "planned" | "inProgress" | "blocked" | "done";

export type BoardProgress = {
  done: number;
  total: number;
  percentage: number;
};

const normalizeColumnTitle = (title: string) =>
  title.trim().toLowerCase().replace(/[\s_-]+/g, " ");

export const getProgressColumn = (
  title: string
): ProgressColumn | null => {
  switch (normalizeColumnTitle(title)) {
    case "backlog":
      return "backlog";
    case "planned":
      return "planned";
    case "in progress":
    case "inprogress":
      return "inProgress";
    case "blocked":
      return "blocked";
    case "done":
      return "done";
    default:
      return null;
  }
};

export const calculateBoardProgress = (
  board: Pick<Board, "columns"> | null | undefined
): BoardProgress => {
  if (!board) return { done: 0, total: 0, percentage: 0 };

  let done = 0;
  let total = 0;

  for (const column of board.columns) {
    const progressColumn = getProgressColumn(column.title);
    if (!progressColumn) continue;

    const cardCount = column.cards.length;
    total += cardCount;

    if (progressColumn === "done") {
      done += cardCount;
    }
  }

  return {
    done,
    total,
    percentage: total > 0 ? Math.round((done / total) * 100) : 0,
  };
};

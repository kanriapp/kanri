// SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import type { Board, Card, Column } from "@/types/kanban-types";
import { generateUniqueID } from "@/utils/idGenerator";

const normalizeColumnTitle = (title: string) => title.trim().toLowerCase();

export const isIdeaColumn = (column: Column) =>
  normalizeColumnTitle(column.title) === "idea";

export const findQuickAddTargetColumn = (
  board: Pick<Board, "columns">
) => {
  return board.columns.find(isIdeaColumn) ?? board.columns[0] ?? null;
};

export const isSupportedSourceUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url.trim());
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
};

export const createQuickAddCard = ({
  title,
  url,
}: {
  title: string;
  url: string;
}): Card => {
  const cleanUrl = url.trim();
  const cleanTitle = title.trim() || cleanUrl;

  return {
    id: generateUniqueID(),
    name: cleanTitle,
    description: "",
    color: "",
    dueDate: null,
    isDueDateCounterRelative: false,
    isDueDateCompleted: false,
    scheduledWeekday: null,
    sourceTitle: cleanTitle,
    sourceUrl: cleanUrl,
    tags: [],
    tasks: [],
  };
};

// SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import type { Board, Card } from "@/types/kanban-types";

export const GLOBAL_WORKFLOW_COLUMNS = [
  "Idea",
  "Backlog",
  "Planned",
  "In Progress",
  "Done",
  "Blocked",
] as const;

export type GlobalWorkflowColumn = (typeof GLOBAL_WORKFLOW_COLUMNS)[number];

export interface GlobalWorkflowItem {
  boardId: string;
  boardTitle: string;
  card: Card;
  cardOrder: number;
  columnId: string;
  columnOrder: number;
  columnTitle: string;
  workflowColumn: GlobalWorkflowColumn;
}

export type GlobalWorkflowGroups = Record<
  GlobalWorkflowColumn,
  GlobalWorkflowItem[]
>;

const NORMALIZED_GLOBAL_WORKFLOW_COLUMNS: Record<string, GlobalWorkflowColumn> = {
  idea: "Idea",
  backlog: "Backlog",
  planned: "Planned",
  "in progress": "In Progress",
  inprogress: "In Progress",
  "in-progress": "In Progress",
  "in_progress": "In Progress",
  done: "Done",
  blocked: "Blocked",
};

export const normalizeGlobalWorkflowColumnTitle = (title: string) =>
  title.trim().replace(/\s+/g, " ").toLowerCase();

export const getGlobalWorkflowColumn = (
  title: string
): GlobalWorkflowColumn | null => {
  const normalizedTitle = normalizeGlobalWorkflowColumnTitle(title);
  return NORMALIZED_GLOBAL_WORKFLOW_COLUMNS[normalizedTitle] ?? null;
};

export const isGlobalWorkflowBoard = (board: Pick<Board, "columns">) => {
  if (board.columns.length !== GLOBAL_WORKFLOW_COLUMNS.length) return false;

  const workflowColumns = board.columns.map(column =>
    getGlobalWorkflowColumn(column.title)
  );

  if (workflowColumns.some(column => column === null)) return false;

  const columnSet = new Set(workflowColumns);
  return GLOBAL_WORKFLOW_COLUMNS.every(column => columnSet.has(column));
};

export const findGlobalWorkflowColumnId = (
  board: Pick<Board, "columns">,
  workflowColumn: GlobalWorkflowColumn
) => {
  return (
    board.columns.find(
      column => getGlobalWorkflowColumn(column.title) === workflowColumn
    )?.id ?? null
  );
};

const createEmptyGlobalWorkflowGroups = (): GlobalWorkflowGroups => {
  return GLOBAL_WORKFLOW_COLUMNS.reduce((groups, column) => {
    groups[column] = [];
    return groups;
  }, {} as GlobalWorkflowGroups);
};

export const aggregateGlobalWorkflowItems = (
  boards: Board[]
): GlobalWorkflowGroups => {
  const groups = createEmptyGlobalWorkflowGroups();

  for (const board of boards) {
    if (!isGlobalWorkflowBoard(board)) continue;

    board.columns.forEach((column, columnOrder) => {
      const workflowColumn = getGlobalWorkflowColumn(column.title);
      if (!workflowColumn) return;

      column.cards.forEach((card, cardOrder) => {
        groups[workflowColumn].push({
          boardId: board.id,
          boardTitle: board.title,
          card,
          cardOrder,
          columnId: column.id,
          columnOrder,
          columnTitle: column.title,
          workflowColumn,
        });
      });
    });
  }

  return groups;
};

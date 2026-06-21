// SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { describe, expect, it } from "vitest";
import type { Board, Column } from "@/types/kanban-types";
import {
  aggregateGlobalWorkflowItems,
  findGlobalWorkflowColumnId,
  getGlobalWorkflowColumn,
  isGlobalWorkflowBoard,
} from "./globalWorkflow";

const standardColumns = (overrides: Partial<Column>[] = []): Column[] => {
  const columns: Column[] = [
    { id: "idea", title: "Idea", cards: [] },
    { id: "backlog", title: "Backlog", cards: [] },
    { id: "planned", title: "Planned", cards: [] },
    { id: "progress", title: "In Progress", cards: [] },
    { id: "done", title: "Done", cards: [] },
    { id: "blocked", title: "Blocked", cards: [] },
  ];

  return columns.map((column, index) => ({
    ...column,
    ...overrides[index],
  }));
};

describe("global workflow helper", () => {
  it("matches the six supported workflow columns", () => {
    expect(getGlobalWorkflowColumn(" in progress ")).toBe("In Progress");
    expect(getGlobalWorkflowColumn("IN_PROGRESS")).toBe("In Progress");
    expect(getGlobalWorkflowColumn("Done")).toBe("Done");
    expect(getGlobalWorkflowColumn("Review")).toBeNull();
  });

  it("only includes boards with exactly the standard workflow columns", () => {
    const standardBoard: Board = {
      id: "standard",
      title: "Standard",
      columns: standardColumns(),
    };
    const missingColumnBoard: Board = {
      id: "missing",
      title: "Missing",
      columns: standardColumns().slice(0, 5),
    };
    const extraColumnBoard: Board = {
      id: "extra",
      title: "Extra",
      columns: [
        ...standardColumns(),
        { id: "review", title: "Review", cards: [] },
      ],
    };

    expect(isGlobalWorkflowBoard(standardBoard)).toBe(true);
    expect(isGlobalWorkflowBoard(missingColumnBoard)).toBe(false);
    expect(isGlobalWorkflowBoard(extraColumnBoard)).toBe(false);
  });

  it("aggregates cards into matching global columns and keeps origins", () => {
    const boards: Board[] = [
      {
        id: "work",
        title: "Work",
        columns: standardColumns([
          { cards: [{ id: "idea-task", name: "Idea task" }] },
          { cards: [{ id: "backlog-task", name: "Backlog task" }] },
          { cards: [{ id: "planned-task", name: "Planned task" }] },
        ]),
      },
      {
        id: "ignored",
        title: "Ignored",
        columns: [{ id: "todo", title: "To Do", cards: [{ id: "x", name: "X" }] }],
      },
    ];

    const groups = aggregateGlobalWorkflowItems(boards);

    expect(groups.Idea.map(item => item.card.id)).toEqual(["idea-task"]);
    expect(groups.Backlog.map(item => item.card.id)).toEqual(["backlog-task"]);
    expect(groups.Planned[0]?.boardId).toBe("work");
    expect(groups.Done).toHaveLength(0);
  });

  it("finds the board column id for a global workflow target", () => {
    const board: Board = {
      id: "work",
      title: "Work",
      columns: standardColumns([{ title: "Idea" }, {}, {}, { title: "In progress" }]),
    };

    expect(findGlobalWorkflowColumnId(board, "In Progress")).toBe("progress");
    expect(findGlobalWorkflowColumnId(board, "Blocked")).toBe("blocked");
  });
});

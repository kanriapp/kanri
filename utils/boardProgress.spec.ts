// SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { describe, expect, it } from "vitest";
import { calculateBoardProgress, getProgressColumn } from "./boardProgress";

describe("board progress helper", () => {
  it("counts done cards over workflow cards including planned and ignores idea columns", () => {
    const progress = calculateBoardProgress({
      columns: [
        { id: "idea", title: "Idea", cards: [{ name: "Idea 1" }, { name: "Idea 2" }] },
        { id: "backlog", title: "Backlog", cards: [{ name: "Backlog task" }] },
        { id: "planned", title: "Planned", cards: [{ name: "Planned task" }] },
        {
          id: "in-progress",
          title: "In progress",
          cards: [{ name: "Current task" }, { name: "Second current task" }],
        },
        { id: "blocked", title: "Blocked", cards: [{ name: "Blocked task" }] },
        {
          id: "done",
          title: "Done",
          cards: [{ name: "Done task 1" }, { name: "Done task 2" }],
        },
      ],
    });

    expect(progress).toEqual({ done: 2, total: 7, percentage: 29 });
  });

  it("returns zero progress when no workflow columns have cards", () => {
    expect(
      calculateBoardProgress({
        columns: [
          { id: "idea", title: "Idea", cards: [{ name: "Idea" }] },
          { id: "planned", title: "Planned", cards: [] },
        ],
      })
    ).toEqual({ done: 0, total: 0, percentage: 0 });
  });

  it("normalizes common progress column title variants", () => {
    expect(getProgressColumn(" in_progress ")).toBe("inProgress");
    expect(getProgressColumn("In-Progress")).toBe("inProgress");
    expect(getProgressColumn("Planned")).toBe("planned");
    expect(getProgressColumn("Done")).toBe("done");
    expect(getProgressColumn("Idea")).toBeNull();
  });
});

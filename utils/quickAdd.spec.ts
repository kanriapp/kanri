// SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { describe, expect, it } from "vitest";
import {
  createQuickAddCard,
  findQuickAddTargetColumn,
  isSupportedSourceUrl,
} from "./quickAdd";

describe("quick add helper", () => {
  it("targets the Idea column when it exists", () => {
    const target = findQuickAddTargetColumn({
      columns: [
        { id: "backlog", title: "Backlog", cards: [] },
        { id: "idea", title: "Idea", cards: [] },
      ],
    });

    expect(target?.id).toBe("idea");
  });

  it("falls back to the leftmost column when Idea does not exist", () => {
    const target = findQuickAddTargetColumn({
      columns: [
        { id: "left", title: "Backlog", cards: [] },
        { id: "done", title: "Done", cards: [] },
      ],
    });

    expect(target?.id).toBe("left");
  });

  it("stores tab title and URL on the created card", () => {
    const card = createQuickAddCard({
      title: "Example page",
      url: " https://example.com/article ",
    });

    expect(card.name).toBe("Example page");
    expect(card.sourceTitle).toBe("Example page");
    expect(card.sourceUrl).toBe("https://example.com/article");
  });

  it("accepts web URLs only", () => {
    expect(isSupportedSourceUrl("https://example.com")).toBe(true);
    expect(isSupportedSourceUrl("http://localhost:3000")).toBe(true);
    expect(isSupportedSourceUrl(" https://example.com ")).toBe(true);
    expect(isSupportedSourceUrl("chrome://settings")).toBe(false);
  });
});

// SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { describe, expect, it } from "vitest";
import {
  getQuickAddPathFromDeepLink,
  getQuickAddRouteTarget,
} from "./sourceLinks";

describe("source link helpers", () => {
  it("converts kanri quick-add deep links into route targets", () => {
    expect(
      getQuickAddPathFromDeepLink(
        "kanri://quick-add?title=Example&url=https%3A%2F%2Fexample.com"
      )
    ).toEqual({
      path: "/quick-add",
      query: {
        title: "Example",
        url: "https://example.com",
      },
    });
  });

  it("ignores unrelated schemes", () => {
    expect(getQuickAddPathFromDeepLink("https://example.com")).toBeNull();
  });

  it("converts quick-add payloads into route targets", () => {
    expect(
      getQuickAddRouteTarget({
        title: "Docs",
        url: "https://example.com/docs",
      })
    ).toEqual({
      path: "/quick-add",
      query: {
        title: "Docs",
        url: "https://example.com/docs",
      },
    });
  });
});

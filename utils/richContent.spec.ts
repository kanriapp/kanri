/* SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>

SPDX-License-Identifier: GPL-3.0-or-later */

import { describe, expect, it } from "vitest";
import { richHtmlToPlainEditorHtml } from "./richContent";

describe("richHtmlToPlainEditorHtml", () => {
  it("drops rich text formatting while preserving readable text", () => {
    const html = "<h1>Title</h1><p>Hello <strong>bold</strong> <a href=\"https://example.com\">link</a></p><ul><li>One</li><li>Two</li></ul>";

    const result = richHtmlToPlainEditorHtml(html);

    expect(result).toContain("<p>Title</p>");
    expect(result).toContain("Hello bold link");
    expect(result).toContain("One");
    expect(result).toContain("Two");
    expect(result).not.toContain("<strong>");
    expect(result).not.toContain("<a ");
    expect(result).not.toContain("<ul>");
  });

  it("keeps inline image and file attachment references", () => {
    const html = [
      "<p>Before</p>",
      "<img src=\"asset://image\" data-asset-id=\"asset-1\" data-attachment-id=\"att-1\" alt=\"Image\">",
      "<div data-asset-id=\"asset-2\" data-attachment-id=\"att-2\" data-attachment-kind=\"pdf\" data-attachment-type-label=\"PDF\" title=\"Doc.pdf\">Doc.pdf</div>",
      "<p>After</p>",
    ].join("");

    const result = richHtmlToPlainEditorHtml(html);

    expect(result).toContain("data-asset-id=\"asset-1\"");
    expect(result).toContain("data-attachment-id=\"att-1\"");
    expect(result).toContain("data-asset-id=\"asset-2\"");
    expect(result).toContain("data-attachment-id=\"att-2\"");
    expect(result).toContain("data-attachment-type-label=\"PDF\"");
    expect(result).toContain("title=\"Doc.pdf\"");
  });

  it("keeps pasted table structure with plain cell text", () => {
    const html = "<table style=\"color:red\"><tr><th>A</th><th>B</th></tr><tr><td><strong>1</strong></td><td>2</td></tr></table>";

    const result = richHtmlToPlainEditorHtml(html);

    expect(result).toBe("<table><tbody><tr><th>A</th><th>B</th></tr><tr><td>1</td><td>2</td></tr></tbody></table>");
  });
});

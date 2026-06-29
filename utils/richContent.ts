/* SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>

SPDX-License-Identifier: GPL-3.0-or-later */

import DOMPurify from "dompurify";
import TurndownService from "turndown";

const allowedTags = [
  "a",
  "blockquote",
  "br",
  "code",
  "col",
  "colgroup",
  "div",
  "em",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "hr",
  "img",
  "li",
  "ol",
  "p",
  "pre",
  "s",
  "span",
  "strong",
  "table",
  "tbody",
  "td",
  "th",
  "thead",
  "tr",
  "u",
  "ul",
];

const allowedAttributes = [
  "alt",
  "class",
  "colspan",
  "data-asset-id",
  "data-attachment-id",
  "data-attachment-kind",
  "href",
  "rel",
  "rowspan",
  "src",
  "style",
  "target",
  "title",
];

export const sanitizeRichHtml = (html: string | null | undefined) => {
  if (!html) return "";
  if (typeof window === "undefined") return html;

  return DOMPurify.sanitize(html, {
    ALLOWED_ATTR: allowedAttributes,
    ALLOWED_TAGS: allowedTags,
    ALLOW_DATA_ATTR: false,
    ALLOWED_URI_REGEXP: /^(?:(?:https?|asset|data|blob):|[^a-z]|[a-z+.-]+(?:[^a-z+.-:]|$))/i,
  });
};

export const richHtmlToText = (html: string | null | undefined) => {
  if (!html) return "";
  if (typeof window === "undefined") {
    return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(sanitizeRichHtml(html), "text/html");
  return (doc.body.textContent || "").replace(/\s+/g, " ").trim();
};

export const richHtmlToMarkdown = (html: string | null | undefined) => {
  if (!html) return "";

  const turndown = new TurndownService({
    bulletListMarker: "-",
    codeBlockStyle: "fenced",
    headingStyle: "atx",
  });

  turndown.addRule("tables", {
    filter: ["table"],
    replacement: (_content, node) => {
      const table = node as HTMLTableElement;
      const rows = Array.from(table.querySelectorAll("tr")).map(row =>
        Array.from(row.querySelectorAll("th,td")).map(cell =>
          (cell.textContent || "").replace(/\s+/g, " ").trim().replace(/\|/g, "\\|")
        )
      );
      if (rows.length === 0) return "";
      const width = Math.max(...rows.map(row => row.length));
      const normalized = rows.map(row => [...row, ...Array(Math.max(0, width - row.length)).fill("")]);
      const header = normalized[0];
      const separator = Array(width).fill("---");
      const body = normalized.slice(1);
      return `\n\n| ${header.join(" | ")} |\n| ${separator.join(" | ")} |\n${body.map(row => `| ${row.join(" | ")} |`).join("\n")}\n\n`;
    },
  });

  return turndown.turndown(sanitizeRichHtml(html)).trim();
};

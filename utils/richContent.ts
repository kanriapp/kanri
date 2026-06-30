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
  "data-attachment-type-label",
  "draggable",
  "href",
  "rel",
  "role",
  "rowspan",
  "src",
  "style",
  "tabindex",
  "target",
  "title",
];

const escapeHtml = (part: string) => part
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

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

export const plainTextToRichHtml = (text: string | null | undefined) => {
  const value = text || "";
  if (!value) return "";

  return value
    .split(/\n{2,}/)
    .map(paragraph => paragraph.split("\n").map(escapeHtml).join("<br>"))
    .map(paragraph => `<p>${paragraph || "<br>"}</p>`)
    .join("");
};

const assetAttributeNames = [
  "alt",
  "data-asset-id",
  "data-attachment-id",
  "data-attachment-kind",
  "data-attachment-type-label",
  "src",
  "title",
];

const blockTags = new Set([
  "address",
  "article",
  "aside",
  "blockquote",
  "dd",
  "div",
  "dl",
  "dt",
  "figcaption",
  "figure",
  "footer",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hr",
  "li",
  "main",
  "nav",
  "ol",
  "p",
  "pre",
  "section",
  "ul",
]);

const serializeAttributes = (element: Element, names: string[]) => names
  .map((name) => {
    const value = element.getAttribute(name);
    return value == null || value === "" ? "" : ` ${name}="${escapeHtml(value)}"`;
  })
  .join("");

const serializeAssetNode = (element: Element) => {
  if (element.tagName.toLowerCase() === "img") {
    return `<img${serializeAttributes(element, assetAttributeNames)}>`;
  }

  const title = element.getAttribute("title") || element.textContent?.trim() || "Attachment";
  const typeLabel = element.getAttribute("data-attachment-type-label") || "File";
  const attrs = serializeAttributes(
    element,
    assetAttributeNames.filter(name => name !== "title" && name !== "data-attachment-type-label")
  );

  return `<div${attrs} title="${escapeHtml(title)}" data-attachment-type-label="${escapeHtml(typeLabel)}"></div>`;
};

const serializePlainTable = (table: HTMLTableElement) => {
  const rows = Array.from(table.rows);
  if (rows.length === 0) return "";

  const body = rows.map((row) => {
    const cells = Array.from(row.cells).map((cell) => {
      const tag = cell.tagName.toLowerCase() === "th" ? "th" : "td";
      const attrs = serializeAttributes(cell, ["colspan", "rowspan"]);
      const text = (cell.textContent || "").replace(/\s+/g, " ").trim();
      return `<${tag}${attrs}>${escapeHtml(text)}</${tag}>`;
    }).join("");

    return `<tr>${cells}</tr>`;
  }).join("");

  return `<table><tbody>${body}</tbody></table>`;
};

export const richHtmlToPlainEditorHtml = (html: string | null | undefined) => {
  if (!html) return "";
  if (typeof window === "undefined") return plainTextToRichHtml(richHtmlToText(html));

  const parser = new DOMParser();
  const doc = parser.parseFromString(sanitizeRichHtml(html), "text/html");
  const chunks: string[] = [];
  let textBuffer = "";

  const flushText = () => {
    const text = textBuffer.replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
    textBuffer = "";
    if (text) chunks.push(plainTextToRichHtml(text));
  };

  const appendBreak = (count = 1) => {
    if (!textBuffer.endsWith("\n".repeat(count))) {
      textBuffer += "\n".repeat(count);
    }
  };

  const walk = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      textBuffer += node.textContent || "";
      return;
    }

    if (!(node instanceof Element)) return;

    const tag = node.tagName.toLowerCase();
    if (node.hasAttribute("data-asset-id")) {
      flushText();
      chunks.push(serializeAssetNode(node));
      return;
    }
    if (tag === "table") {
      flushText();
      chunks.push(serializePlainTable(node as HTMLTableElement));
      return;
    }
    if (tag === "br") {
      appendBreak();
      return;
    }

    Array.from(node.childNodes).forEach(walk);
    if (blockTags.has(tag)) appendBreak(2);
  };

  Array.from(doc.body.childNodes).forEach(walk);
  flushText();

  return chunks.join("");
};

export const extractRichAssetIds = (html: string | null | undefined) => {
  if (!html) return [];
  return Array.from(html.matchAll(/data-asset-id=["']([^"']+)["']/g)).map(match => match[1]);
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

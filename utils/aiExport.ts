/* SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>

SPDX-License-Identifier: GPL-3.0-or-later */

import type { Board, BoardAsset, Card, Task } from "@/types/kanban-types";
import { mkdir, remove, writeTextFile } from "@tauri-apps/plugin-fs";
import { join } from "@tauri-apps/api/path";
import { KANRI_SCHEMA_VERSION } from "@/stores/boards";
import { assetExists, copyBlobTo, formatFileSize } from "@/utils/attachments";
import { findBoardAssetReferences } from "@/utils/assetReferences";
import { richHtmlToMarkdown, richHtmlToText } from "@/utils/richContent";

export interface KanriAiExportData {
  activeTheme?: unknown;
  addToTopOfColumnButtonEnabled?: unknown;
  animationsEnabled?: unknown;
  boards: Board[];
  boardSortingOption?: unknown;
  colors?: unknown;
  columnZoomLevel?: unknown;
  displayColumnCardCountEnabled?: unknown;
  lastInstalledVersion?: unknown;
  pins?: unknown;
  reverseSorting?: unknown;
  savedCustomTheme?: unknown;
  schemaVersion?: number;
}

export interface AiExportProgress {
  completed: number;
  currentItem?: string;
  errors: number;
  stage: string;
  total: number;
}

export type MissingAssetAction = "cancel" | "retry" | "skip";

export interface KanriAiExportOptions {
  isCancelled?: () => boolean;
  onMissingAsset?: (asset: BoardAsset) => Promise<MissingAssetAction>;
  onProgress?: (progress: AiExportProgress) => void;
}

export class AiExportCancelled extends Error {
  constructor() {
    super("AI export cancelled");
    this.name = "AiExportCancelled";
  }
}

const sanitizeFileSegment = (value: string | null | undefined, fallback: string) => {
  const invalidChars = new Set(["<", ">", ":", "\"", "/", "\\", "|", "?", "*"]);
  const safeValue = Array.from(value || fallback)
    .map(char => invalidChars.has(char) || char.charCodeAt(0) < 32 ? "-" : char)
    .join("");
  const cleaned = safeValue
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
  return cleaned || fallback;
};

const markdownEscape = (value: string | null | undefined) => {
  return (value || "").replace(/\|/g, "\\|").replace(/\n/g, " ");
};

const formatDate = (value: Date | string | null | undefined) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return `${date.toISOString()} (${date.toLocaleString()})`;
};

const relativeLink = (from: "ai_context" | "board" | "card" | "task", target: string) => {
  switch (from) {
    case "board":
      return `../../${target}`;
    case "card":
    case "task":
      return `../../../${target}`;
    default:
      return target;
  }
};

const fenced = (language: string, body: string | null | undefined) => {
  return `\`\`\`${language}\n${body || ""}\n\`\`\``;
};

const attachmentFileName = (asset: BoardAsset) => {
  return `${sanitizeFileSegment(asset.id, "asset")}-${sanitizeFileSegment(asset.name, "file")}`;
};

const cardSlug = (columnIndex: number, cardIndex: number, card: Card) => {
  return `${columnIndex + 1}-${cardIndex + 1}-${sanitizeFileSegment(card.name, card.id || "card")}.md`;
};

const taskSlug = (
  columnIndex: number,
  cardIndex: number,
  taskIndex: number,
  task: Task
) => {
  return `${columnIndex + 1}-${cardIndex + 1}-${taskIndex + 1}-${sanitizeFileSegment(task.name, task.id || "task")}.md`;
};

const getAssetMap = (boards: Board[]) => {
  const map = new Map<string, BoardAsset>();
  for (const board of boards) {
    for (const asset of board.assets || []) {
      if (!map.has(asset.id)) map.set(asset.id, asset);
    }
  }
  return map;
};

const getBoardAssets = (board: Board) => {
  const usedIds = new Set(findBoardAssetReferences(board).map(reference => reference.assetId));
  return (board.assets || []).filter(asset => usedIds.has(asset.id));
};

const attachmentLines = (
  board: Board,
  attachments: Card["attachments"],
  copiedAssets: Map<string, string>,
  from: "ai_context" | "board" | "card" | "task"
) => {
  if (!attachments || attachments.length === 0) return "- None";

  return attachments.map((attachment) => {
    const asset = (board.assets || []).find(item => item.id === attachment.assetId);
    if (!asset) return `- Missing metadata: ${attachment.assetId}`;

    const copiedPath = copiedAssets.get(asset.id);
    const label = `${asset.name} (${asset.kind}, ${formatFileSize(asset.size)})`;
    if (!copiedPath) return `- ${label} - skipped or unavailable`;
    return `- [${label}](${relativeLink(from, copiedPath)})`;
  }).join("\n");
};

const cardMarkdown = (
  board: Board,
  columnTitle: string,
  card: Card,
  copiedAssets: Map<string, string>
) => {
  const descriptionMarkdown = richHtmlToMarkdown(card.description);
  const taskRows = (card.tasks || []).map((task, index) => (
    `| ${index + 1} | ${task.finished ? "done" : "open"} | ${markdownEscape(task.name)} | ${formatDate(task.dueDate)} | ${(task.attachments || []).length} |`
  ));

  return [
    `# ${card.name}`,
    "",
    "## Metadata",
    `- Board: ${board.title}`,
    `- Column: ${columnTitle}`,
    `- Card ID: ${card.id || ""}`,
    `- Created: ${formatDate(card.createdAt)}`,
    `- Due: ${formatDate(card.dueDate)}`,
    `- Due completed: ${card.isDueDateCompleted ? "true" : "false"}`,
    `- Tags: ${(card.tags || []).map(tag => tag.text).join(", ") || "None"}`,
    "",
    "## Description Markdown",
    descriptionMarkdown || "_No description_",
    "",
    "## Description HTML",
    fenced("html", card.description || ""),
    "",
    "## Attachments",
    attachmentLines(board, card.attachments, copiedAssets, "card"),
    "",
    "## Tasks",
    taskRows.length > 0
      ? ["| # | Status | Title | Due | Attachments |", "|---|---|---|---|---|", ...taskRows].join("\n")
      : "- None",
  ].join("\n");
};

const taskMarkdown = (
  board: Board,
  columnTitle: string,
  card: Card,
  task: Task,
  copiedAssets: Map<string, string>
) => {
  return [
    `# ${task.name}`,
    "",
    "## Metadata",
    `- Board: ${board.title}`,
    `- Column: ${columnTitle}`,
    `- Card: ${card.name}`,
    `- Task ID: ${task.id || ""}`,
    `- Status: ${task.finished ? "done" : "open"}`,
    `- Created: ${formatDate(task.createdAt)}`,
    `- Completed: ${formatDate(task.completedAt)}`,
    `- Due: ${formatDate(task.dueDate)}`,
    "",
    "## Details Markdown",
    richHtmlToMarkdown(task.description) || "_No details_",
    "",
    "## Details HTML",
    fenced("html", task.description || ""),
    "",
    "## Attachments",
    attachmentLines(board, task.attachments || [], copiedAssets, "task"),
    "",
    "## Subtasks",
    (task.subtasks || []).length > 0
      ? (task.subtasks || []).map(subtask => `- [${subtask.finished ? "x" : " "}] ${subtask.name}`).join("\n")
      : "- None",
  ].join("\n");
};

const boardMarkdown = (
  board: Board,
  copiedAssets: Map<string, string>,
  cardFiles: Map<string, string>,
  taskFiles: Map<string, string>
) => {
  const lines = [
    `# ${board.title}`,
    "",
    "## Metadata",
    `- Board ID: ${board.id}`,
    `- Schema version: ${board.schemaVersion || KANRI_SCHEMA_VERSION}`,
    `- Created: ${formatDate(board.createdAt)}`,
    `- Last edited: ${formatDate(board.lastEdited)}`,
    `- Columns: ${(board.columns || []).length}`,
    `- Assets: ${(board.assets || []).length}`,
    "",
    "## Attachments",
  ];

  const usedAssets = getBoardAssets(board);
  lines.push(usedAssets.length > 0
    ? usedAssets.map(asset => {
      const copiedPath = copiedAssets.get(asset.id);
      const label = `${asset.name} (${asset.kind}, ${formatFileSize(asset.size)})`;
      return copiedPath
        ? `- [${label}](${relativeLink("board", copiedPath)})`
        : `- ${label} - skipped or unavailable`;
    }).join("\n")
    : "- None");

  lines.push("", "## Columns");
  for (const [columnIndex, column] of (board.columns || []).entries()) {
    lines.push("", `### ${columnIndex + 1}. ${column.title}`);
    for (const [cardIndex, card] of (column.cards || []).entries()) {
      const cardFile = card.id ? cardFiles.get(card.id) : undefined;
      lines.push(
        cardFile
          ? `- [${card.name}](cards/${cardFile.split("/").pop()})`
          : `- ${card.name}`
      );
      for (const [taskIndex, task] of (card.tasks || []).entries()) {
        const taskFile = task.id ? taskFiles.get(task.id) : undefined;
        lines.push(
          taskFile
            ? `  - [${task.finished ? "x" : " "}] [${task.name}](tasks/${taskFile.split("/").pop()})`
            : `  - [${task.finished ? "x" : " "}] ${task.name || `Task ${taskIndex + 1}`}`
        );
      }
      void cardIndex;
    }
  }

  return lines.join("\n");
};

const aiContextMarkdown = (
  data: KanriAiExportData,
  copiedAssets: Map<string, string>,
  skippedAssets: unknown[]
) => {
  const lines = [
    "# Kanri AI Context",
    "",
    "## Export Metadata",
    `- Created: ${formatDate(new Date().toISOString())}`,
    `- Schema version: ${data.schemaVersion || KANRI_SCHEMA_VERSION}`,
    `- Boards: ${data.boards.length}`,
    `- Skipped attachments: ${skippedAssets.length}`,
    "",
    "## Data Model",
    "- Board: title, columns, global tags, assets.",
    "- Card: name, description HTML, attachments, tasks, tags, due date.",
    "- Task: title, details HTML, attachments, status, optional one-level subtasks.",
    "- Attachments: stored in attachments/ with relative Markdown links.",
  ];

  for (const board of data.boards) {
    lines.push("", `## Board: ${board.title}`, "");
    lines.push(`- Board ID: ${board.id}`);
    lines.push(`- Columns: ${(board.columns || []).length}`);
    lines.push(`- Assets: ${(board.assets || []).length}`);

    for (const [columnIndex, column] of (board.columns || []).entries()) {
      lines.push("", `### Column ${columnIndex + 1}: ${column.title}`);
      for (const [cardIndex, card] of (column.cards || []).entries()) {
        lines.push("", `#### Card ${columnIndex + 1}.${cardIndex + 1}: ${card.name}`);
        lines.push(`- Card ID: ${card.id || ""}`);
        lines.push(`- Created: ${formatDate(card.createdAt)}`);
        lines.push(`- Due: ${formatDate(card.dueDate)}`);
        lines.push(`- Tags: ${(card.tags || []).map(tag => tag.text).join(", ") || "None"}`);
        lines.push("");
        lines.push("Description Markdown:");
        lines.push(richHtmlToMarkdown(card.description) || "_No description_");
        if (card.description) {
          lines.push("", "Description HTML:", fenced("html", card.description));
        }
        lines.push("", "Attachments:");
        lines.push(attachmentLines(board, card.attachments, copiedAssets, "ai_context"));

        for (const [taskIndex, task] of (card.tasks || []).entries()) {
          lines.push("", `##### Task ${taskIndex + 1}: ${task.name}`);
          lines.push(`- Status: ${task.finished ? "done" : "open"}`);
          lines.push(`- Created: ${formatDate(task.createdAt)}`);
          lines.push(`- Completed: ${formatDate(task.completedAt)}`);
          lines.push(`- Due: ${formatDate(task.dueDate)}`);
          lines.push("");
          lines.push(richHtmlToMarkdown(task.description) || "_No details_");
          if (task.description) {
            lines.push("", "Details HTML:", fenced("html", task.description));
          }
          if ((task.subtasks || []).length > 0) {
            lines.push("", "Subtasks:");
            lines.push((task.subtasks || []).map(subtask => `- [${subtask.finished ? "x" : " "}] ${subtask.name}`).join("\n"));
          }
          lines.push("", "Task Attachments:");
          lines.push(attachmentLines(board, task.attachments || [], copiedAssets, "ai_context"));
        }
      }
    }
  }

  return lines.join("\n");
};

const ensureDir = async (path: string) => {
  await mkdir(path, { recursive: true });
};

const writeJson = async (path: string, value: unknown) => {
  await writeTextFile(path, `${JSON.stringify(value, null, 2)}\n`);
};

export const exportKanriAiArchive = async (
  parentDir: string,
  data: KanriAiExportData,
  options: KanriAiExportOptions = {}
) => {
  const timestamp = new Date().toISOString().replace(/[-:]/g, "").slice(0, 15);
  const exportName = `kanri-export-${timestamp.replace("T", "-")}`;
  const exportDir = await join(parentDir, exportName);
  const attachmentsDir = await join(exportDir, "attachments");
  const boardsDir = await join(exportDir, "boards");
  const copiedAssets = new Map<string, string>();
  const skippedAssets: Array<Record<string, unknown>> = [];
  const errors: Array<Record<string, unknown>> = [];

  const progress = (stage: string, currentItem: string, completed: number, total: number) => {
    options.onProgress?.({
      completed,
      currentItem,
      errors: errors.length + skippedAssets.length,
      stage,
      total,
    });
  };

  const checkCancelled = () => {
    if (options.isCancelled?.()) throw new AiExportCancelled();
  };

  try {
    await ensureDir(exportDir);
    await ensureDir(attachmentsDir);
    await ensureDir(boardsDir);

    const assets = Array.from(getAssetMap(data.boards).values());
    for (const [index, asset] of assets.entries()) {
      checkCancelled();
      progress("Copying attachments", asset.name, index, assets.length);

      let exists = await assetExists(asset.blobPath);
      while (!exists) {
        const action = await options.onMissingAsset?.(asset);
        if (action === "retry") {
          exists = await assetExists(asset.blobPath);
          continue;
        }
        if (action === "cancel") throw new AiExportCancelled();
        skippedAssets.push({
          assetId: asset.id,
          blobPath: asset.blobPath,
          name: asset.name,
          reason: "missing_or_unreadable",
        });
        break;
      }

      if (!exists) continue;

      const relativePath = `attachments/${attachmentFileName(asset)}`;
      const targetPath = await join(exportDir, relativePath);
      try {
        await copyBlobTo(asset.blobPath, targetPath);
        copiedAssets.set(asset.id, relativePath);
      } catch (error) {
        skippedAssets.push({
          assetId: asset.id,
          blobPath: asset.blobPath,
          name: asset.name,
          reason: String(error),
        });
      }
    }

    const cardFiles = new Map<string, string>();
    const taskFiles = new Map<string, string>();
    const manifestBoards = [];
    let writeCount = 0;
    const totalWrites = data.boards.reduce((total, board) => {
      const cards = (board.columns || []).reduce((cardTotal, column) => cardTotal + (column.cards || []).length, 0);
      const tasks = (board.columns || []).reduce((taskTotal, column) =>
        taskTotal + (column.cards || []).reduce((cardTotal, card) => cardTotal + (card.tasks || []).length, 0), 0);
      return total + 1 + cards + tasks;
    }, 4);

    for (const [boardIndex, board] of data.boards.entries()) {
      checkCancelled();
      const boardDirName = `${boardIndex + 1}-${sanitizeFileSegment(board.title, board.id)}`;
      const boardDir = await join(boardsDir, boardDirName);
      const cardsDir = await join(boardDir, "cards");
      const tasksDir = await join(boardDir, "tasks");
      await ensureDir(boardDir);
      await ensureDir(cardsDir);
      await ensureDir(tasksDir);

      const boardEntry = {
        boardId: board.id,
        title: board.title,
        path: `boards/${boardDirName}/board.md`,
        cards: [] as unknown[],
      };

      for (const [columnIndex, column] of (board.columns || []).entries()) {
        for (const [cardIndex, card] of (column.cards || []).entries()) {
          checkCancelled();
          const fileName = cardSlug(columnIndex, cardIndex, card);
          const relativePath = `boards/${boardDirName}/cards/${fileName}`;
          await writeTextFile(
            await join(exportDir, relativePath),
            cardMarkdown(board, column.title, card, copiedAssets)
          );
          if (card.id) cardFiles.set(card.id, relativePath);
          writeCount++;
          progress("Writing card Markdown", card.name, writeCount, totalWrites);

          const taskEntries = [];
          for (const [taskIndex, task] of (card.tasks || []).entries()) {
            checkCancelled();
            const taskFileName = taskSlug(columnIndex, cardIndex, taskIndex, task);
            const taskRelativePath = `boards/${boardDirName}/tasks/${taskFileName}`;
            await writeTextFile(
              await join(exportDir, taskRelativePath),
              taskMarkdown(board, column.title, card, task, copiedAssets)
            );
            if (task.id) taskFiles.set(task.id, taskRelativePath);
            taskEntries.push({
              path: taskRelativePath,
              status: task.finished ? "done" : "open",
              taskId: task.id || null,
              title: task.name,
            });
            writeCount++;
            progress("Writing task Markdown", task.name, writeCount, totalWrites);
          }

          boardEntry.cards.push({
            cardId: card.id || null,
            columnId: column.id,
            columnTitle: column.title,
            descriptionText: richHtmlToText(card.description),
            path: relativePath,
            tasks: taskEntries,
            title: card.name,
          });
        }
      }

      await writeTextFile(
        await join(boardDir, "board.md"),
        boardMarkdown(board, copiedAssets, cardFiles, taskFiles)
      );
      manifestBoards.push(boardEntry);
      writeCount++;
      progress("Writing board Markdown", board.title, writeCount, totalWrites);
    }

    const manifest = {
      createdAt: new Date().toISOString(),
      schemaVersion: data.schemaVersion || KANRI_SCHEMA_VERSION,
      exportName,
      counts: {
        boards: data.boards.length,
        assets: assets.length,
        copiedAssets: copiedAssets.size,
        skippedAssets: skippedAssets.length,
      },
      boards: manifestBoards,
      assets: assets.map(asset => ({
        assetId: asset.id,
        blobPath: asset.blobPath,
        kind: asset.kind,
        mimeType: asset.mimeType || null,
        name: asset.name,
        originalUrl: asset.originalUrl || null,
        references: data.boards.flatMap(board => findBoardAssetReferences(board, asset.id)),
        relativePath: copiedAssets.get(asset.id) || null,
        sha256: asset.sha256,
        size: asset.size,
        status: copiedAssets.has(asset.id) ? "copied" : "skipped",
      })),
      skippedAssets,
      errors,
    };

    progress("Writing index files", "kanri-data.json", writeCount, totalWrites);
    await writeJson(await join(exportDir, "kanri-data.json"), {
      ...data,
      schemaVersion: data.schemaVersion || KANRI_SCHEMA_VERSION,
    });
    writeCount++;

    progress("Writing index files", "manifest.json", writeCount, totalWrites);
    await writeJson(await join(exportDir, "manifest.json"), manifest);
    writeCount++;

    progress("Writing index files", "ai_context.md", writeCount, totalWrites);
    await writeTextFile(
      await join(exportDir, "ai_context.md"),
      aiContextMarkdown(data, copiedAssets, skippedAssets)
    );
    writeCount++;

    progress("Complete", exportName, totalWrites, totalWrites);
    return {
      exportDir,
      exportName,
      manifest,
    };
  } catch (error) {
    try {
      await remove(exportDir, { recursive: true });
    } catch {
      // Keep the original export error.
    }
    throw error;
  }
};

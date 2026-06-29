/* SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>

SPDX-License-Identifier: GPL-3.0-or-later */

import type { Board } from "@/types/kanban-types";

export interface AssetReferenceLocation {
  attachmentRefId: string;
  assetId: string;
  boardId: string;
  boardTitle: string;
  cardId?: string;
  cardName?: string;
  columnId?: string;
  columnTitle?: string;
  location: "card" | "task";
  taskId?: string;
  taskName?: string;
}

const extractAssetIdsFromHtml = (html: string | null | undefined) => {
  if (!html) return [];
  const matches = Array.from(html.matchAll(/data-asset-id=["']([^"']+)["']/g));
  return matches.map(match => ({
    assetId: match[1],
    attachmentRefId: `inline-${match[1]}`,
  }));
};

export const findBoardAssetReferences = (
  board: Board | null | undefined,
  assetId?: string
) => {
  const references: AssetReferenceLocation[] = [];
  if (!board) return references;

  for (const column of board.columns || []) {
    for (const card of column.cards || []) {
      for (const attachment of card.attachments || []) {
        if (assetId && attachment.assetId !== assetId) continue;
        references.push({
          attachmentRefId: attachment.id,
          assetId: attachment.assetId,
          boardId: board.id,
          boardTitle: board.title,
          cardId: card.id,
          cardName: card.name,
          columnId: column.id,
          columnTitle: column.title,
          location: "card",
        });
      }

      const existingCardAttachmentIds = new Set((card.attachments || []).map(attachment => attachment.assetId));
      for (const inlineAttachment of extractAssetIdsFromHtml(card.description)) {
        if (existingCardAttachmentIds.has(inlineAttachment.assetId)) continue;
        if (assetId && inlineAttachment.assetId !== assetId) continue;
        references.push({
          attachmentRefId: inlineAttachment.attachmentRefId,
          assetId: inlineAttachment.assetId,
          boardId: board.id,
          boardTitle: board.title,
          cardId: card.id,
          cardName: card.name,
          columnId: column.id,
          columnTitle: column.title,
          location: "card",
        });
      }

      for (const task of card.tasks || []) {
        for (const attachment of task.attachments || []) {
          if (assetId && attachment.assetId !== assetId) continue;
          references.push({
            attachmentRefId: attachment.id,
            assetId: attachment.assetId,
            boardId: board.id,
            boardTitle: board.title,
            cardId: card.id,
            cardName: card.name,
            columnId: column.id,
            columnTitle: column.title,
            location: "task",
            taskId: task.id,
            taskName: task.name,
          });
        }
      }
    }
  }

  return references;
};

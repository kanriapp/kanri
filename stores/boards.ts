/* SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>, qunm00

SPDX-License-Identifier: GPL-3.0-or-later

Kanri is an offline Kanban board app made using Tauri and Nuxt.
Copyright (C) 2022-2026 trobonox <hello@trobo.dev>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { defineStore } from "pinia";
import type { Board, Column, Card, Tag, BoardAsset, AttachmentRef, Task } from "@/types/kanban-types";
import { getCurrentTimestamp } from "@/utils/dateTime";
import { useTauriStore } from "@/stores/tauriStore";
import { generateUniqueID } from "@/utils/idGenerator";
import { BaseDirectory, mkdir, writeTextFile } from "@tauri-apps/plugin-fs";

type Pin = { id: string; title: string; pinIcon?: string; pinIconText?: string };

export const KANRI_SCHEMA_VERSION = 2;

const normalizeAttachments = (attachments: AttachmentRef[] | undefined | null) => {
  return (attachments || []).filter(attachment => attachment && attachment.assetId && attachment.id);
};

const normalizeTasks = (tasks: Task[] | undefined | null) => {
  return (tasks || []).map(task => ({
    ...task,
    attachments: normalizeAttachments(task.attachments),
    description: task.description || "",
    subtasks: task.subtasks || [],
  }));
};

const normalizeCard = (card: Card) => ({
  ...card,
  attachments: normalizeAttachments(card.attachments),
  description: card.description || "",
  tasks: normalizeTasks(card.tasks),
});

const normalizeBoard = (board: Board) => ({
  ...board,
  assets: board.assets || [],
  columns: (board.columns || []).map(column => ({
    ...column,
    cards: (column.cards || []).map(normalizeCard),
  })),
  globalTags: board.globalTags || [],
  schemaVersion: KANRI_SCHEMA_VERSION,
});

const boardNeedsNormalization = (board: Board) => {
  if (board.schemaVersion !== KANRI_SCHEMA_VERSION) return true;
  if (!Array.isArray(board.assets)) return true;

  return (board.columns || []).some(column =>
    (column.cards || []).some(card => (
      !Array.isArray(card.attachments) ||
      !Array.isArray(card.tasks) ||
      (card.tasks || []).some(task => !Array.isArray(task.attachments) || task.description == null)
    ))
  );
};

const countAssetReferences = (board: Board, assetId: string) => {
  let count = 0;

  for (const column of board.columns || []) {
    for (const card of column.cards || []) {
      count += (card.attachments || []).filter(attachment => attachment.assetId === assetId).length;
      for (const task of card.tasks || []) {
        count += (task.attachments || []).filter(attachment => attachment.assetId === assetId).length;
      }
    }
  }

  return count;
};

const backupLegacyBoardsOnce = async (tauri: ReturnType<typeof useTauriStore>["store"], boards: Board[], pins: Pin[]) => {
  try {
    const backupCreated = await tauri.get("attachmentsMigrationBackupCreated");
    if (backupCreated) return;

    await mkdir("kanri-backups", {
      baseDir: BaseDirectory.AppLocalData,
      recursive: true,
    });

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backup = JSON.stringify({
      createdAt: new Date().toISOString(),
      reason: "Pre-attachments schema backup",
      boards,
      pins,
    }, null, 2);

    await writeTextFile(`kanri-backups/pre-attachments-${timestamp}.json`, backup, {
      baseDir: BaseDirectory.AppLocalData,
    });
    await tauri.set("attachmentsMigrationBackupCreated", true);
    await tauri.save();
  } catch (error) {
    console.error("Failed to create pre-attachments backup; continuing with migration:", error);
  }
};

export const useBoardsStore = defineStore("boards", {
  state: () => ({
    boards: [] as Board[],
    pins: [] as Pin[],
    initialized: false,
  }),
  getters: {
    boardById: (state) => (id: string) => state.boards.find(b => b.id === id) ?? null,
    isPinned: (state) => (id: string) => !!state.pins.find(p => p.id === id),
    assetById: (state) => (boardId: string, assetId: string) => {
      const board = state.boards.find(b => b.id === boardId);
      return board?.assets?.find(asset => asset.id === assetId) ?? null;
    },
    assetReferenceCount: (state) => (boardId: string, assetId: string) => {
      const board = state.boards.find(b => b.id === boardId);
      if (!board) return 0;
      return countAssetReferences(board, assetId);
    },
  },
  actions: {
    async init() {
      if (this.initialized) return;
      const tauri = useTauriStore().store;

      const savedBoards = ((await tauri.get("boards")) || []) as Board[];
      const savedPins = ((await tauri.get("pins")) || []) as Pin[];
      if (savedBoards.some(boardNeedsNormalization)) {
        await backupLegacyBoardsOnce(tauri, savedBoards, savedPins);
      }

      this.boards = savedBoards.map(normalizeBoard);
      this.pins = savedPins;
      this.initialized = true;

      this._setupAutoSave();
    },
    async forceReloadBoards() {
      const tauri = useTauriStore().store;
      const savedBoards = ((await tauri.get("boards")) || []) as Board[];
      this.boards = savedBoards.map(normalizeBoard);
    },
    async save() {
      const tauri = useTauriStore().store;
      try {
        await tauri.set("schemaVersion", KANRI_SCHEMA_VERSION);
        await tauri.set("boards", this.boards);
        await tauri.set("pins", this.pins);
        await tauri.save();
      } catch (error) {
        console.error("Failed to save boards/pins:", error);
        // Consider user notification or rollback strategy
        throw error;
      }
    },

    // Board CRUD
    upsertBoard(board: Board) {
      const normalizedBoard = normalizeBoard(board);
      const i = this.boards.findIndex(b => b.id === normalizedBoard.id);
      normalizedBoard.lastEdited = new Date();

      if (i === -1) {
        if (!normalizedBoard.id) {
          normalizedBoard.id = generateUniqueID();
        }
        if (!normalizedBoard.createdAt) {
          normalizedBoard.createdAt = new Date();
        }
        this.boards.push(normalizedBoard);
        return;
      }

      this.boards[i] = normalizedBoard;
    },
    removeBoard(id: string) {
      this.boards = this.boards.filter(b => b.id !== id);
      this.pins = this.pins.filter(p => p.id !== id);
    },
    duplicateBoard(id: string) {
      const b = this.boardById(id);
      if (!b) return;
      
      const copy: Board = JSON.parse(JSON.stringify(b));
      copy.id = generateUniqueID();
      copy.title = `${copy.title} (duplicate)`;
      copy.lastEdited = new Date();
      copy.createdAt = new Date();
      this.boards.push(copy);
    },
    renameBoard(id: string, title: string) {
      const b = this.boardById(id);
      if (!b) return;

      b.title = title;
      // also update pin title
      const pin = this.pins.find(p => p.id === id);
      if (pin) {
        pin.title = title;
      }

      b.lastEdited = new Date();
    },
    togglePin(id: string) {
      const b = this.boardById(id);
      if (!b) return;
      const i = this.pins.findIndex(p => p.id === id);

      if (i === -1) {
        // TODO: see what order this creates
        this.pins.push({ id, title: b.title });
      } else {
        // Remove the pin
        this.pins = this.pins.filter(p => p.id !== id);
      }
    },
    updateBoardPin(id: string) {
      // simple update: board title only
      const b = this.boardById(id);
      if (!b) return;

      this.mutateBoardPin(id, (pin) => {
        pin.title = b.title;
      });
    },
    async mutateBoardPin(id: string, mut: (pin: Pin) => void) {
      const pin = this.pins.find(p => p.id === id);
      if (pin) {
        mut(pin);
      }
    },

    // Global Tags ops
    addGlobalTag(boardId: string, tag: Tag) {
      const b = this.boardById(boardId);
      if (!b) return;
      if (!b.globalTags) b.globalTags = [];

      // only add if it doesn't exist already
      if (b.globalTags.find(t => t.id === tag.id)) return;

      b.globalTags.push(tag);
      b.lastEdited = new Date();
    },
    removeGlobalTag(boardId: string, tagId: string) {
      const b = this.boardById(boardId);
      if (!b) return;

      // Remove from globalTags list
      if (b.globalTags) {
        b.globalTags = b.globalTags.filter(t => t.id !== tagId);
      }

      // Remove references from all cards on this board
      for (const col of b.columns) {
        for (const card of col.cards) {
          if (!card.tags || card.tags.length === 0) continue;
          card.tags = card.tags.filter(t => t && t.id !== tagId);
        }
      }

      b.lastEdited = new Date();
    },
    setGlobalTagColor(boardId: string, tagId: string, color: string) {
      const b = this.boardById(boardId);
      if (!b || !b.globalTags) return;
      const tag = b.globalTags.find(t => t.id === tagId);
      if (!tag) return;

      const textColor = getContrast(color) === "text-gray-50" ? "#f4f4f5" : "#1e293b";
      tag.style = `background-color: ${color}; color: ${textColor}`;
      tag.color = color;

      // Propagate changes to all cards using this tag
      this._propagateGlobalTag(boardId, tag);
      b.lastEdited = new Date();
    },
    updateGlobalTagName(boardId: string, tagId: string, newName: string) {
      const b = this.boardById(boardId);
      if (!b || !b.globalTags) return;
      const tag = b.globalTags.find(t => t.id === tagId);
      if (!tag) return;

      tag.text = newName;

      // Propagate changes to all cards using this tag
      this._propagateGlobalTag(boardId, tag);
      b.lastEdited = new Date();
    },

     // Update all cards that reference the global tag (mutate in place)
    _propagateGlobalTag(boardId: string, updated: Tag) {
      const b = this.boardById(boardId);
      if (!b) return;

      for (const col of b.columns) {
        for (const card of col.cards) {
          if (!card.tags?.length) continue;

          for (let i = 0; i < card.tags.length; i++) {
            const match = card.tags[i];
            if (!match) continue;
            if (match.id !== updated.id) continue;

            // Update element, modify all properties except id
            card.tags[i] = {
              ...match,
              text: updated.text,
              color: updated.color,
              style: updated.style,
            };
          }
        }
      }
    },

    // Column ops
    addColumn(boardId: string, title = "New Column") {
      const b = this.boardById(boardId);
      if (!b) return;
      b.columns.push({ id: generateUniqueID(), title, cards: [] });
      b.lastEdited = new Date();
    },
    removeColumn(boardId: string, columnId: string) {
      const b = this.boardById(boardId);
      if (!b) return;
      b.columns = b.columns.filter(c => c.id !== columnId);
      b.lastEdited = new Date();
    },
    reorderColumns(boardId: string, nextColumns: Column[]) {
      const b = this.boardById(boardId);
      if (!b) return;
      b.columns = nextColumns;
      b.lastEdited = new Date();
    },
    setColumnTitle(boardId: string, columnId: string, title: string) {
      const b = this.boardById(boardId);
      if (!b) return;
      const col = b.columns.find(c => c.id === columnId);
      if (!col) return;
      
      col.title = title;
      b.lastEdited = new Date();
    },
    updateColumn(boardId: string, column: Column) {
      const b = this.boardById(boardId);
      if (!b) return;
      const i = b.columns.findIndex(c => c.id === column.id);
      if (i !== -1) b.columns[i] = column;
      b.lastEdited = new Date();
    },

    // Board asset ops
    upsertBoardAsset(boardId: string, asset: BoardAsset) {
      const b = this.boardById(boardId);
      if (!b) return;
      if (!b.assets) b.assets = [];

      const index = b.assets.findIndex(existing => existing.id === asset.id);
      if (index === -1) {
        b.assets.push(asset);
      } else {
        b.assets[index] = asset;
      }

      b.lastEdited = new Date();
    },
    removeBoardAsset(boardId: string, assetId: string) {
      const b = this.boardById(boardId);
      if (!b || !b.assets) return false;
      if (countAssetReferences(b, assetId) > 0) return false;

      b.assets = b.assets.filter(asset => asset.id !== assetId);
      b.lastEdited = new Date();
      return true;
    },

    // Card ops
    createCard(boardId: string, columnId: string, card: Card, addToTop?: boolean) {
      const b = this.boardById(boardId);
      if (!b) return;
      const col = b.columns.find(c => c.id === columnId);
      if (!col) return;
      if (!card.createdAt) {
        card.createdAt = getCurrentTimestamp();
      }
      const normalizedCard = normalizeCard(card);

      if (addToTop) {
        col.cards.unshift(normalizedCard);
      } else {
        col.cards.push(normalizedCard);
      }
      b.lastEdited = new Date();
    },
    duplicateCard(boardId: string, columnId: string, cardId: string) {
      const b = this.boardById(boardId);
      if (!b) return;
      const col = b.columns.find(c => c.id === columnId);
      if (!col) return;
      const card = col.cards.find(c => c.id === cardId);
      if (!card) return;

      // Clone card while preserving Date objects and creating new array instances
      let copy: Card;
      if (typeof structuredClone === "function") {
        // structuredClone preserves Date instances and performs a deep clone
        copy = structuredClone(card);
      } else {
        // Fallback: shallow-copy primitives and explicitly copy arrays and Date-like fields
        copy = {
          ...card,
          // Normalize dueDate to a Date if it was a string; keep null/undefined as is
          dueDate: card.dueDate ? new Date(card.dueDate) : null,
          tasks: card.tasks
            ? card.tasks.map(t => ({
                ...t,
                subtasks: t.subtasks ? t.subtasks.map(st => ({ ...st })) : undefined,
              }))
            : undefined,
          tags: card.tags ? card.tags.map(t => ({ ...t })) : undefined,
        } as Card;
      }

      copy.id = generateUniqueID();
      copy.name = `${copy.name} (copy)`;
      copy.createdAt = getCurrentTimestamp();
      col.cards.push(copy);
      b.lastEdited = new Date();
    },
    deleteCard(boardId: string, columnId: string, cardId: string) {
      const b = this.boardById(boardId);
      if (!b) return;
      const col = b.columns.find(c => c.id === columnId);
      if (!col) return;

      col.cards = col.cards.filter(c => c.id !== cardId);
      b.lastEdited = new Date();
    },
    deleteAllColumnCards(boardId: string, columnId: string) {
      const b = this.boardById(boardId);
      if (!b) return;
      const col = b.columns.find(c => c.id === columnId);
      if (!col) return;

      col.cards = [];
      b.lastEdited = new Date();
    },
    mutateCard(boardId: string, columnId: string, cardId: string, mut: (c: Card) => void) {
      const b = this.boardById(boardId);
      if (!b) return;
      const col = b.columns.find(c => c.id === columnId);
      if (!col) return;
      const card = col.cards.find(c => c.id === cardId);
      if (!card) return;
      mut(card);
      b.lastEdited = new Date();
    },
    setCardAttachments(boardId: string, columnId: string, cardId: string, attachments: AttachmentRef[]) {
      this.mutateCard(boardId, columnId, cardId, (card) => {
        card.attachments = normalizeAttachments(attachments);
      });
    },
    reorderCards(boardId: string, columnId: string, nextCards: Card[]) {
      const b = this.boardById(boardId);
      if (!b) return;
      const col = b.columns.find(c => c.id === columnId);
      if (!col) return;
      col.cards = nextCards;
      b.lastEdited = new Date();
    },
    moveCard(sourceBoardId: string, targetBoardId: string, sourceColumnId: string, targetColumnId: string, cardId: string) {
      if (sourceColumnId === targetColumnId) return;

      const sourceBoard = this.boardById(sourceBoardId);
      const targetBoard = this.boardById(targetBoardId);
      if (!sourceBoard || !targetBoard) return;

      const sourceCol = sourceBoard.columns.find(c => c.id === sourceColumnId);
      const targetCol = targetBoard.columns.find(c => c.id === targetColumnId);
      if (!sourceCol || !targetCol) return;

      const cardIndex = sourceCol.cards.findIndex(c => c.id === cardId);

      const [card] = sourceCol.cards.splice(cardIndex, 1);
      if (card === undefined) return;
      const referencedAssetIds = new Set([
        ...(card.attachments || []).map(attachment => attachment.assetId),
        ...(card.tasks || []).flatMap(task => (task.attachments || []).map(attachment => attachment.assetId)),
      ]);
      if (referencedAssetIds.size > 0) {
        if (!targetBoard.assets) targetBoard.assets = [];
        for (const assetId of referencedAssetIds) {
          const sourceAsset = (sourceBoard.assets || []).find(asset => asset.id === assetId);
          if (!sourceAsset) continue;
          if (targetBoard.assets.some(asset => asset.id === sourceAsset.id)) continue;
          targetBoard.assets.push({ ...sourceAsset });
        }
      }
      targetCol.cards.push(card);
      targetBoard.lastEdited = new Date();
      sourceBoard.lastEdited = new Date();
    },

    // Debounced auto-save of board properties
    // When testing in the future, we should check if Tauri store is in sync with state
    _setupAutoSave() {
      const AUTO_SAVE_DEBOUNCE_MS = 700;
      let timeout: ReturnType<typeof setTimeout> | null = null;
      let isSaving = false;
      let hasDirtyChanges = false;

      const flushSave = async () => {
        if (isSaving) {
          hasDirtyChanges = true;
          return;
        }

        isSaving = true;
        try {
          await this.save();
        } catch (err) {
          console.error("Auto-save failed:", err);
        } finally {
          isSaving = false;
          if (hasDirtyChanges) {
            hasDirtyChanges = false;
            schedule();
          }
        }
      };

      const schedule = () => {
        hasDirtyChanges = true;
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          timeout = null;
          if (!hasDirtyChanges) return;
          hasDirtyChanges = false;
          void flushSave();
        }, AUTO_SAVE_DEBOUNCE_MS);
      };

      this.$subscribe(schedule, { detached: true, deep: true });
    },
  },
});

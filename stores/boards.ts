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
import type { Board, Column, Card, Tag } from "@/types/kanban-types";
import { useTauriStore } from "@/stores/tauriStore";
import { generateUniqueID } from "@/utils/idGenerator";

type Pin = { id: string; title: string; pinIcon?: string; pinIconText?: string };

export const useBoardsStore = defineStore("boards", {
  state: () => ({
    boards: [] as Board[],
    pins: [] as Pin[],
    initialized: false,
  }),
  getters: {
    boardById: (state) => (id: string) => state.boards.find(b => b.id === id) ?? null,
    isPinned: (state) => (id: string) => !!state.pins.find(p => p.id === id),
  },
  actions: {
    async init() {
      if (this.initialized) return;
      const tauri = useTauriStore().store;

      this.boards = (await tauri.get("boards")) || [];
      this.pins = (await tauri.get("pins")) || [];
      this.initialized = true;

      this._setupAutoSave();
    },
    async forceReloadBoards() {
      const tauri = useTauriStore().store;
      this.boards = (await tauri.get("boards")) || [];
    },
    async save() {
      const tauri = useTauriStore().store;
      try {
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
      const i = this.boards.findIndex(b => b.id === board.id);
      board.lastEdited = new Date();
      if (i === -1) this.boards.push(board);
      else this.boards[i] = board;
    },
    removeBoard(id: string) {
      this.boards = this.boards.filter(b => b.id !== id);
      this.pins = this.pins.filter(p => p.id !== id);
    },
    duplicateBoard(id: string) {
      const b = this.boardById(id);
      if (!b) return;
      const copy: Board = typeof structuredClone === "function" 
        ? structuredClone(b) 
        : JSON.parse(JSON.stringify(b));
      copy.id = generateUniqueID();
      copy.title = `${copy.title} (duplicate)`;
      copy.lastEdited = new Date();
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

    // Card ops
    createCard(boardId: string, columnId: string, card: Card, addToTop?: boolean) {
      const b = this.boardById(boardId);
      if (!b) return;
      const col = b.columns.find(c => c.id === columnId);
      if (!col) return;

      if (addToTop) {
        col.cards.unshift(card);
      } else {
        col.cards.push(card);
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
          tasks: card.tasks ? card.tasks.map(t => ({ ...t })) : undefined,
          tags: card.tags ? card.tags.map(t => ({ ...t })) : undefined,
        } as Card;
      }

      copy.id = generateUniqueID();
      copy.name = `${copy.name} (copy)`;
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
      targetCol.cards.push(card);
      targetBoard.lastEdited = new Date();
      sourceBoard.lastEdited = new Date();
    },

    // Debounced auto-save of board properties
    // When testing in the future, we should check if Tauri store is in sync with state
    _setupAutoSave() {
      let timeout: ReturnType<typeof setTimeout> | null = null;
      const schedule = () => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          console.log("Auto-saving boards...");
          this.save().catch((err) => {
            console.error("Auto-save failed:", err);
          });
          timeout = null;
        }, 100);
      };

      this.$subscribe(schedule, { detached: true, deep: true});
    },
  },
});
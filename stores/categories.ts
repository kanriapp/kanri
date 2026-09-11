/* SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>

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
import type { BoardCategory } from "@/types/kanban-types";
import { useTauriStore } from "@/stores/tauriStore";
import { generateUniqueID } from "@/utils/idGenerator";

// Stored under its own key in the same .kanri.dat file that "boards" and
// "pins" already live in (see stores/tauriStore.js / stores/boards.ts).
const STORE_KEY = "boardCategories";

export const useCategoriesStore = defineStore("categories", {
  state: () => ({
    categories: [] as BoardCategory[],
    initialized: false,
  }),
  getters: {
    categoryById: (state) => (id: string) => state.categories.find(c => c.id === id) ?? null,
    // Which category (if any) a given board currently belongs to.
    categoryForBoard: (state) => (boardId: string) =>
      state.categories.find(c => c.boardIds.includes(boardId)) ?? null,
  },
  actions: {
    async init() {
      if (this.initialized) return;
      const tauri = useTauriStore().store;

      this.categories = (await tauri.get(STORE_KEY)) || [];
      this.initialized = true;

      this._setupAutoSave();
    },
    async save() {
      const tauri = useTauriStore().store;
      try {
        await tauri.set(STORE_KEY, this.categories);
        await tauri.save();
      } catch (error) {
        console.error("Failed to save board categories:", error);
        throw error;
      }
    },

    // Category CRUD
    addCategory(title: string): BoardCategory {
      const category: BoardCategory = {
        id: generateUniqueID(),
        title,
        boardIds: [],
      };
      this.categories.push(category);
      return category;
    },
    renameCategory(id: string, title: string) {
      const c = this.categoryById(id);
      if (!c) return;
      c.title = title;
    },
    removeCategory(id: string) {
      // Boards that were inside simply fall back to "Uncategorized";
      // we never touch the boards themselves here.
      this.categories = this.categories.filter(c => c.id !== id);
    },
    reorderCategories(nextCategories: BoardCategory[]) {
      this.categories = nextCategories;
    },

    // Board <-> category membership (single category per board)
    assignBoardToCategory(boardId: string, categoryId: string | null) {
      for (const c of this.categories) {
        c.boardIds = c.boardIds.filter(id => id !== boardId);
      }
      if (categoryId) {
        const target = this.categoryById(categoryId);
        if (target && !target.boardIds.includes(boardId)) {
          target.boardIds.push(boardId);
        }
      }
    },
    // Call when a board is deleted, so no category keeps a dangling reference.
    removeBoardReferences(boardId: string) {
      for (const c of this.categories) {
        c.boardIds = c.boardIds.filter(id => id !== boardId);
      }
    },
    reorderBoardsInCategory(categoryId: string, nextBoardIds: string[]) {
      const c = this.categoryById(categoryId);
      if (!c) return;
      c.boardIds = nextBoardIds;
    },

    // Debounced auto-save, mirroring stores/boards.ts
    _setupAutoSave() {
      let timeout: ReturnType<typeof setTimeout> | null = null;
      const schedule = () => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          this.save().catch((err) => {
            console.error("Auto-save failed:", err);
          });
          timeout = null;
        }, 100);
      };

      this.$subscribe(schedule, { detached: true, deep: true });
    },
  },
});

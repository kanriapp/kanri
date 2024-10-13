/* SPDX-FileCopyrightText: Copyright (c) 2022-2024 trobonox <hello@trobo.dev>, PwshLab

SPDX-License-Identifier: GPL-3.0-or-later

Kanri is an offline Kanban board app made using Tauri and Nuxt.
Copyright (C) 2022-2024 trobonox <hello@trobo.dev>

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

import type { Board, Column, Tag } from "@/types/kanban-types";

import mitt from "mitt";

type Events = {
  closeKanbanPage: void;

  columnActionDone: void;
  columnDraggingOff: void;
  columnDraggingOn: void;

  createBoard: { columns?: Array<Column>; title: string };

  enableColumnCardAddMode: string;
  enableColumnTitleEditing: string;

  hideSidebarBackArrow: void;

  globalTagsUpdated: { tags: Array<Tag> | null | undefined };

  modalEnableClickOutsideClose: void;
  modalPreventClickOutsideClose: void;

  openBoardDeleteModal: { description: string; index: number };
  openBoardRenameModal: { board: Board; index: number };
  openChangelogModal: void;
  openKanbanPage: void;
  openModalWithCustomDescription: { description: string };
  boardDeletion: Board;

  toggleBoardPin: Board;

  resetColumnInputs: void;

  setAnimationsOff: void;
  setAnimationsOn: void;

  showSidebarBackArrow: void;
  updateColors: void;

  zIndexBack: void;
  zIndexDown: void;
};

const emitter = mitt<Events>();

export default emitter;

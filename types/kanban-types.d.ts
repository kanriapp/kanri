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

export declare interface Board {
  background?: BackgroundSettings | null;
  columns: Array<Column>;
  id: string;
  lastEdited?: Date | string;
  createdAt?: Date | string;
  schemaVersion?: number;
  title: string;
  globalTags?: Array<Tag> | null;
  assets?: Array<BoardAsset>;
}

export declare interface BackgroundSettings {
  blur: string;
  brightness: string;
  src: string;
}

export declare interface Column {
  cards: Array<Card>;
  id: string;
  title: string;
}

export declare interface Task {
  attachments?: Array<AttachmentRef>;
  completedAt?: Date | string | null;
  createdAt?: Date | string;
  description?: string;
  finished: boolean;
  id?: string;
  dueDate?: Date | string | null;
  name: string;
  subtasks?: Array<Subtask>;
}

export declare interface Subtask {
  completedAt?: Date | string | null;
  createdAt?: Date | string;
  finished: boolean;
  id?: string;
  name: string;
}

export declare interface Tag {
  id?: string;
  text: string;
  style?: string;
  color?: string | null;
}

export declare interface Card {
  attachments?: Array<AttachmentRef>;
  color?: string;
  createdAt?: Date | string;
  description?: string;
  dueDate?: Date | string | null;
  id?: string;
  isDueDateCounterRelative?: boolean;
  isDueDateCompleted?: boolean;
  name: string;
  tasks?: Array<Task>;
  tags?: Array<Tag> | null;
}

export declare type AttachmentKind =
  | "document"
  | "image"
  | "other"
  | "pdf"
  | "spreadsheet";

export declare type AttachmentStatus =
  | "available"
  | "error"
  | "missing"
  | "remote";

export declare interface BoardAsset {
  blobPath: string;
  createdAt?: Date | string;
  id: string;
  kind: AttachmentKind;
  mimeType?: string | null;
  name: string;
  originalUrl?: string | null;
  sha256: string;
  size: number;
  status?: AttachmentStatus;
}

export declare interface AttachmentRef {
  assetId: string;
  caption?: string;
  createdAt?: Date | string;
  id: string;
  role?: "attachment" | "inline-image";
}

export declare interface Theme {
  accent: string;
  accentDarker: string;
  bgPrimary: string;
  elevation1: string;
  elevation2: string;
  elevation3: string;
  text: string;
  textButtons: string;
  textD1: string;
  textD2: string;
  textD3: string;
  textD4: string;
}

export declare type ThemeIdentifiers =
  | "catppuccin"
  | "custom"
  | "dark"
  | "light"
  | "auto";

export default {
  Board,
  BoardAsset,
  Card,
  Column,
  AttachmentRef,
  ThemeIdentifiers,
};

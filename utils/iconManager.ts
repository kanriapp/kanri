/* SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>, gruen132

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

import {
  PhArticle,
  PhNotepad,
  PhListChecks,
  PhBookmark,
  PhFlag,
  PhStar,
  PhPushPin,
  // Add more icons here
  PhNote,
  PhBookmarks,
  PhFiles,
  PhFolder,
  PhFolderOpen,
  PhClipboard,
  PhClipboardText,
  PhKanban,
  PhChartBar,
  PhGraph,
  PhBriefcase,
  PhTarget,
  PhLightbulb,
  PhRocket,
} from "@phosphor-icons/vue";
import type { Component } from "vue";

export interface IconDefinition {
  name: string;
  component: Component;
  category: string;
  tags?: string[];
}

const iconCategories = [
  "Common",
  "Documents",
  "Organization",
  "Project Management",
  "Misc",
] as const;

export type IconCategory = (typeof iconCategories)[number];

export const availableIcons: IconDefinition[] = [
  // Common icons
  {
    name: "article",
    component: PhArticle,
    category: "Common",
    tags: ["document", "paper", "file"],
  },
  {
    name: "star",
    component: PhStar,
    category: "Common",
    tags: ["favorite", "important"],
  },
  {
    name: "pin",
    component: PhPushPin,
    category: "Common",
    tags: ["pinned", "save"],
  },

  // Documents
  {
    name: "notepad",
    component: PhNotepad,
    category: "Documents",
    tags: ["notes", "write"],
  },
  {
    name: "note",
    component: PhNote,
    category: "Documents",
    tags: ["memo", "write"],
  },
  {
    name: "clipboard",
    component: PhClipboard,
    category: "Documents",
    tags: ["tasks", "list"],
  },
  {
    name: "clipboard-text",
    component: PhClipboardText,
    category: "Documents",
    tags: ["tasks", "list", "notes"],
  },

  // Organization
  {
    name: "folder",
    component: PhFolder,
    category: "Organization",
    tags: ["directory", "storage"],
  },
  {
    name: "folder-open",
    component: PhFolderOpen,
    category: "Organization",
    tags: ["directory", "storage"],
  },
  {
    name: "files",
    component: PhFiles,
    category: "Organization",
    tags: ["documents", "multiple"],
  },

  // Project Management
  {
    name: "kanban",
    component: PhKanban,
    category: "Project Management",
    tags: ["board", "tasks"],
  },
  {
    name: "list",
    component: PhListChecks,
    category: "Project Management",
    tags: ["tasks", "todo"],
  },
  {
    name: "chart",
    component: PhChartBar,
    category: "Project Management",
    tags: ["stats", "progress"],
  },
  {
    name: "graph",
    component: PhGraph,
    category: "Project Management",
    tags: ["analytics", "progress"],
  },
  {
    name: "target",
    component: PhTarget,
    category: "Project Management",
    tags: ["goal", "aim"],
  },

  // Misc
  {
    name: "bookmark",
    component: PhBookmark,
    category: "Misc",
    tags: ["save", "mark"],
  },
  {
    name: "bookmarks",
    component: PhBookmarks,
    category: "Misc",
    tags: ["save", "multiple"],
  },
  {
    name: "flag",
    component: PhFlag,
    category: "Misc",
    tags: ["mark", "important"],
  },
  {
    name: "briefcase",
    component: PhBriefcase,
    category: "Misc",
    tags: ["work", "business"],
  },
  {
    name: "lightbulb",
    component: PhLightbulb,
    category: "Misc",
    tags: ["idea", "creative"],
  },
  {
    name: "rocket",
    component: PhRocket,
    category: "Misc",
    tags: ["launch", "start"],
  },
];

export const getIconsByCategory = (
  category: IconCategory
): IconDefinition[] => {
  return availableIcons.filter((icon) => icon.category === category);
};

export const searchIcons = (query: string): IconDefinition[] => {
  const searchTerm = query.toLowerCase();
  return availableIcons.filter(
    (icon) =>
      icon.name.toLowerCase().includes(searchTerm) ||
      icon.tags?.some((tag) => tag.toLowerCase().includes(searchTerm))
  );
};

export const categories = iconCategories;

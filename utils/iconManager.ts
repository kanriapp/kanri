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

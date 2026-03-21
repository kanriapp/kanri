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

/* 
    Utility func to sort items alphabetically by their title property.
    Most notably, it sorts immutably, returning a sorted copy without side effects.
*/
export function sortItemsAlphabetically<Type extends Partial<{ title: string }>>(items: Array<Type>) {
  return items.toSorted((a, b) => {
    const titleA = a.title ? a.title.toLowerCase() : "";
    const titleB = b.title ? b.title.toLowerCase() : "";
    if (titleA < titleB) return -1;
    if (titleA > titleB) return 1;
    return 0;
  });
}

/*
    Utility func to sort items by their lastEdited property, with most recently edited first.
    Most notably, it sorts immutably, returning a sorted copy without side effects.
*/
export function sortItemsByLastEdited<Type extends Partial<{ lastEdited: Date | string }>>(items: Array<Type>) {
  return items.toSorted((a, b) => {
    const dateA = a.lastEdited ? new Date(a.lastEdited) : new Date(0);
    const dateB = b.lastEdited ? new Date(b.lastEdited) : new Date(0);
    return dateB.getTime() - dateA.getTime();
  });
}

/*
    Utility func to sort items by their createdAt property, with most recently created first.
    Most notably, it sorts immutably, returning a sorted copy without side effects.
    Fallback behavior uses the original order of items if createdAt is missing, treating them as equal.
*/
export function sortItemsByCreatedAt<Type extends Partial<{ createdAt: Date | string }>>(items: Array<Type>) {
  return items.toSorted((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : null;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : null;
    if (dateA === null && dateB === null) return 0;
    if (dateA === null) return 1;
    if (dateB === null) return -1;
    return dateB - dateA;
  });
}

export function getSortingFunctionFromString<Type extends Partial<{ title: string; lastEdited: Date | string; createdAt: Date | string }>>(sortingPreference: string) {
  switch (sortingPreference) {
    case "alphabetical":
      return sortItemsAlphabetically<Type>;
    case "lastEdited":
      return sortItemsByLastEdited<Type>;
    case "createdAt":
      return sortItemsByCreatedAt<Type>;
    default:
      return sortItemsByCreatedAt<Type>;
  }
}
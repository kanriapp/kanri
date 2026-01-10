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

export const useContextMenuClasses = () => {
  const globalSettingsStore = useSettingsStore();

  const contextMenuClass = computed(() => {
    let contextMenuClass =
      "bg-primary-darker border-elevation-1 z-[99999] min-w-[100px] rounded-md border p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] outline-none will-change-[opacity,transform]";

    if (globalSettingsStore.animationsEnabled) {
      contextMenuClass +=
        " data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade";
    }

    return contextMenuClass;
  });

  const contextMenuItemClass = computed(() => {
    let itemClass =
      "bg-elevation-2-hover flex w-full cursor-pointer flex-row items-center justify-between rounded-md  py-1.5 px-4";

    return itemClass;
  });

  return {
    contextMenuClass,
    contextMenuItemClass,
  };
};

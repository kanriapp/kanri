// SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { listen } from "@tauri-apps/api/event";
import { invoke } from "@tauri-apps/api/core";
import { getCurrent, onOpenUrl } from "@tauri-apps/plugin-deep-link";
import { watch } from "vue";
import type { Board } from "@/types/kanban-types";
import {
  createQuickAddCard,
  findQuickAddTargetColumn,
  isSupportedSourceUrl,
} from "@/utils/quickAdd";
import {
  getQuickAddPathFromDeepLink,
  getQuickAddRouteTarget,
} from "@/utils/sourceLinks";

type QuickAddPayload = {
  boardId?: string;
  title?: string;
  url?: string;
};

type QuickAddBoardSummary = {
  id: string;
  targetColumn: string;
  title: string;
};

export default defineNuxtPlugin(() => {
  if (!("__TAURI_INTERNALS__" in window)) return;

  const router = useRouter();
  const boardsStore = useBoardsStore();

  const openQuickAddRoute = (payload: QuickAddPayload) => {
    void router.push(getQuickAddRouteTarget(payload));
  };

  const ensureQuickAddTargetColumnId = (board: Board) => {
    let targetColumn = findQuickAddTargetColumn(board);
    if (targetColumn) return targetColumn.id;

    boardsStore.addColumn(board.id, "Idea");
    targetColumn = findQuickAddTargetColumn(board);
    return targetColumn?.id ?? null;
  };

  const saveQuickAddToBoard = async (payload: QuickAddPayload) => {
    const boardId = payload.boardId?.trim();
    const url = payload.url?.trim() ?? "";
    if (!boardId || !isSupportedSourceUrl(url)) return false;

    await boardsStore.init();
    const board = boardsStore.boardById(boardId);
    if (!board) return false;

    const targetColumnId = ensureQuickAddTargetColumnId(board);
    if (!targetColumnId) return false;

    boardsStore.createCard(
      board.id,
      targetColumnId,
      createQuickAddCard({
        title: payload.title ?? "",
        url,
      }),
      true
    );
    await boardsStore.save();
    void router.push(`/kanban/${board.id}`);
    return true;
  };

  const quickAddBoardSummaries = (): QuickAddBoardSummary[] =>
    boardsStore.boards.map((board) => {
      const targetColumn = findQuickAddTargetColumn(board);

      return {
        id: board.id,
        targetColumn: targetColumn?.title ?? "Idea",
        title: board.title,
      };
    });

  const syncQuickAddBoards = async () => {
    await invoke("set_quick_add_boards", {
      boards: quickAddBoardSummaries(),
    });
  };

  let syncTimer: ReturnType<typeof setTimeout> | null = null;
  const scheduleQuickAddBoardSync = () => {
    if (syncTimer) clearTimeout(syncTimer);

    syncTimer = setTimeout(() => {
      void syncQuickAddBoards().catch((error) => {
        console.warn("Quick-add board sync is unavailable:", error);
      });
      syncTimer = null;
    }, 150);
  };

  const handleDeepLinks = (urls: string[] | null) => {
    const routeTarget = urls
      ?.map(getQuickAddPathFromDeepLink)
      .find(target => target !== null);

    if (!routeTarget) return;

    void router.push(routeTarget);
  };

  void boardsStore
    .init()
    .then(syncQuickAddBoards)
    .then(() => {
      watch(
        () => boardsStore.boards,
        () => scheduleQuickAddBoardSync(),
        { deep: true }
      );
    })
    .catch((error) => {
      console.warn("Quick-add board sync is unavailable:", error);
    });

  void listen<QuickAddPayload>("quick-add-request", async (event) => {
    const saved = await saveQuickAddToBoard(event.payload);
    if (!saved) openQuickAddRoute(event.payload);
  }).catch((error) => {
    console.warn("Quick-add bridge handling is unavailable:", error);
  });

  void getCurrent()
    .then(handleDeepLinks)
    .then(() => onOpenUrl(handleDeepLinks))
    .catch((error) => {
      console.warn("Deep link handling is unavailable:", error);
    });
});

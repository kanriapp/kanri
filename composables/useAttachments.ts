/* SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>

SPDX-License-Identifier: GPL-3.0-or-later */

import type { BoardAsset } from "@/types/kanban-types";
import {
  getAssetAbsolutePath,
  getAssetUrl,
  ingestLocalFile,
  makeBoardAsset,
} from "@/utils/attachments";
import { confirm, open } from "@tauri-apps/plugin-dialog";
import { stat } from "@tauri-apps/plugin-fs";
import { openPath } from "@tauri-apps/plugin-opener";

const LARGE_FILE_BYTES = 100 * 1024 * 1024;

export const useAttachments = () => {
  const urlCache = new Map<string, string>();

  const resolveAssetUrl = async (asset: BoardAsset) => {
    if (urlCache.has(asset.blobPath)) return urlCache.get(asset.blobPath) || "";
    const url = await getAssetUrl(asset);
    urlCache.set(asset.blobPath, url);
    return url;
  };

  const openAsset = async (asset: BoardAsset) => {
    await openPath(await getAssetAbsolutePath(asset));
  };

  const pickFiles = async () => {
    const selected = await open({
      multiple: true,
      title: "Select files to attach",
    });
    if (!selected) return [];
    return Array.isArray(selected) ? selected : [selected];
  };

  const ingestFiles = async (
    boardAssets: BoardAsset[],
    paths: string[],
    upsertAsset: (asset: BoardAsset) => void
  ) => {
    const assets: BoardAsset[] = [];
    const errors: Array<{ path: string; reason: string }> = [];

    for (const path of paths) {
      try {
        const info = await stat(path);
        if (info.size > LARGE_FILE_BYTES) {
          const shouldContinue = await confirm(
            `The file "${path.split(/[/\\]/).pop() || path}" is larger than 100 MB. Add it anyway?`,
            { title: "Kanri", kind: "warning" }
          );
          if (!shouldContinue) continue;
        }

        const blob = await ingestLocalFile(path);
        const existing = boardAssets.find(asset => asset.sha256 === blob.sha256);
        const asset = existing || makeBoardAsset(blob);
        if (!existing) upsertAsset(asset);
        assets.push(asset);
      } catch (error) {
        errors.push({
          path,
          reason: error instanceof Error ? error.message : String(error),
        });
      }
    }

    return { assets, errors };
  };

  return {
    ingestFiles,
    openAsset,
    pickFiles,
    resolveAssetUrl,
  };
};

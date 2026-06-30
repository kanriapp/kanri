/* SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>

SPDX-License-Identifier: GPL-3.0-or-later */

import type { BoardAsset } from "@/types/kanban-types";
import {
  getAssetAbsolutePath,
  getAssetUrl,
  ingestBytes,
  ingestLocalFile,
  makeBoardAsset,
} from "@/utils/attachments";
import { confirm, open } from "@tauri-apps/plugin-dialog";
import { stat } from "@tauri-apps/plugin-fs";
import { openPath } from "@tauri-apps/plugin-opener";
import { useI18n } from "vue-i18n";

const LARGE_FILE_BYTES = 100 * 1024 * 1024;

export interface AttachmentInputFile {
  file: File;
  name?: string;
  path?: string;
}

export const useAttachments = () => {
  const { t } = useI18n();
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
      title: t("components.kanban.attachments.selectFiles"),
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
            t("components.kanban.attachments.largeFileConfirmation", {
              fileName: path.split(/[/\\]/).pop() || path,
            }),
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

  const ingestInputFiles = async (
    boardAssets: BoardAsset[],
    files: AttachmentInputFile[],
    upsertAsset: (asset: BoardAsset) => void
  ) => {
    const assets: BoardAsset[] = [];
    const errors: Array<{ path: string; reason: string }> = [];

    for (const input of files) {
      const filePath = input.path || ("path" in input.file ? String((input.file as File & { path?: string }).path || "") : "");
      const fileName = input.name || input.file.name || "attachment";
      try {
        if (input.file.size > LARGE_FILE_BYTES) {
          const shouldContinue = await confirm(
            t("components.kanban.attachments.largeFileConfirmation", { fileName }),
            { title: "Kanri", kind: "warning" }
          );
          if (!shouldContinue) continue;
        }

        const blob = filePath
          ? await ingestLocalFile(filePath)
          : await ingestBytes(
            fileName,
            input.file.type || null,
            Array.from(new Uint8Array(await input.file.arrayBuffer()))
          );
        const existing = boardAssets.find(asset => asset.sha256 === blob.sha256);
        const asset = existing || makeBoardAsset(blob);
        if (!existing) upsertAsset(asset);
        assets.push(asset);
      } catch (error) {
        errors.push({
          path: filePath || fileName,
          reason: error instanceof Error ? error.message : String(error),
        });
      }
    }

    return { assets, errors };
  };

  return {
    ingestFiles,
    ingestInputFiles,
    openAsset,
    pickFiles,
    resolveAssetUrl,
  };
};

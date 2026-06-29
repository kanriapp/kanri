/* SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>

SPDX-License-Identifier: GPL-3.0-or-later */

import type {
  AttachmentKind,
  AttachmentRef,
  BoardAsset,
} from "@/types/kanban-types";
import { convertFileSrc, invoke } from "@tauri-apps/api/core";
import { appDataDir, join } from "@tauri-apps/api/path";
import { generateUniqueID } from "@/utils/idGenerator";

export interface AssetBlobInfo {
  absolutePath: string;
  blobPath: string;
  kind: AttachmentKind;
  mimeType?: string | null;
  name: string;
  sha256: string;
  size: number;
}

export const ingestLocalFile = async (sourcePath: string) => {
  return await invoke<AssetBlobInfo>("kanri_ingest_file", { sourcePath });
};

export const ingestBytes = async (
  name: string,
  mimeType: string | null,
  bytes: number[]
) => {
  return await invoke<AssetBlobInfo>("kanri_ingest_bytes", { bytes, mimeType, name });
};

export const downloadRemoteImage = async (url: string) => {
  return await invoke<AssetBlobInfo>("kanri_download_remote_image", { url });
};

export const assetExists = async (blobPath: string) => {
  return await invoke<boolean>("kanri_asset_exists", { blobPath });
};

export const deleteBlob = async (blobPath: string) => {
  await invoke("kanri_delete_blob", { blobPath });
};

export const copyBlobTo = async (blobPath: string, targetPath: string) => {
  await invoke("kanri_copy_blob_to", { blobPath, targetPath });
};

export const makeBoardAsset = (
  blob: AssetBlobInfo,
  overrides: Partial<BoardAsset> = {}
): BoardAsset => ({
  blobPath: blob.blobPath,
  createdAt: new Date().toISOString(),
  id: generateUniqueID(),
  kind: blob.kind,
  mimeType: blob.mimeType || null,
  name: blob.name,
  sha256: blob.sha256,
  size: blob.size,
  status: "available",
  ...overrides,
});

export const makeAttachmentRef = (
  assetId: string,
  role: AttachmentRef["role"] = "attachment"
): AttachmentRef => ({
  assetId,
  createdAt: new Date().toISOString(),
  id: generateUniqueID(),
  role,
});

export const getAssetAbsolutePath = async (asset: BoardAsset) => {
  return await join(await appDataDir(), asset.blobPath);
};

export const getAssetUrl = async (asset: BoardAsset) => {
  return convertFileSrc(await getAssetAbsolutePath(asset));
};

export const formatFileSize = (size: number | null | undefined) => {
  if (size == null || Number.isNaN(size)) return "-";
  if (size < 1024) return `${size} B`;
  const units = ["KB", "MB", "GB", "TB"];
  let value = size / 1024;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex++;
  }
  return `${value >= 10 ? value.toFixed(0) : value.toFixed(1)} ${units[unitIndex]}`;
};

export const fileTypeLabel = (kind: AttachmentKind) => {
  switch (kind) {
    case "document":
      return "Document";
    case "image":
      return "Image";
    case "pdf":
      return "PDF";
    case "spreadsheet":
      return "Spreadsheet";
    default:
      return "File";
  }
};

export const assetTypeClass = (asset: BoardAsset) => {
  if (asset.status === "missing" || asset.status === "error") {
    return "border-red-500/50 bg-red-500/10 text-red-300";
  }
  if (asset.status === "remote") {
    return "border-amber-500/50 bg-amber-500/10 text-amber-300";
  }

  switch (asset.kind) {
    case "image":
      return "border-sky-500/40 bg-sky-500/10 text-sky-300";
    case "pdf":
      return "border-rose-500/40 bg-rose-500/10 text-rose-300";
    case "document":
      return "border-indigo-500/40 bg-indigo-500/10 text-indigo-300";
    case "spreadsheet":
      return "border-emerald-500/40 bg-emerald-500/10 text-emerald-300";
    default:
      return "border-zinc-500/40 bg-zinc-500/10 text-zinc-300";
  }
};

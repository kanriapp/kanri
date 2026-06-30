/* SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>

SPDX-License-Identifier: GPL-3.0-or-later */

export type FileTransferSource = "drop" | "paste";

export interface TransferInputFile {
  file: File;
  name?: string;
  path?: string;
}

const extensionFromType = (type: string | null | undefined) => {
  switch (type) {
    case "image/jpeg":
      return "jpg";
    case "image/gif":
      return "gif";
    case "image/webp":
      return "webp";
    case "image/svg+xml":
      return "svg";
    case "image/png":
    default:
      return "png";
  }
};

const pastedImageName = (date: Date, index: number, extension: string) => {
  const value = date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace("T", "-")
    .slice(0, 15);
  const suffix = index === 0 ? "" : `-${index + 1}`;
  return `pasted-image-${value}${suffix}.${extension}`;
};

const pathName = (path: string) => {
  return path.split(/[/\\]/).filter(Boolean).pop() || "attachment";
};

const normalizeFileUrlPath = (value: string) => {
  try {
    const url = new URL(value);
    if (url.protocol !== "file:") return "";

    const decoded = decodeURIComponent(url.pathname);
    if (/^\/[a-zA-Z]:\//.test(decoded)) {
      return decoded.slice(1).replace(/\//g, "\\");
    }
    if (url.hostname) {
      return `\\\\${url.hostname}${decoded.replace(/\//g, "\\")}`;
    }
    return decoded;
  } catch {
    return "";
  }
};

const cleanPastedPath = (value: string) => {
  const trimmed = value.trim().replace(/^["']|["']$/g, "");
  if (trimmed.toLowerCase().startsWith("file:")) {
    return normalizeFileUrlPath(trimmed);
  }
  return trimmed;
};

const isLikelyLocalPath = (value: string) => {
  return /^[a-zA-Z]:[\\/]/.test(value) ||
    /^\\\\[^\\]+\\[^\\]+/.test(value) ||
    /^\/[^/]/.test(value);
};

export const filesFromTextPaths = (text: string | null | undefined) => {
  const lines = (text || "")
    .split(/\r?\n/)
    .map(cleanPastedPath)
    .filter(Boolean);

  if (lines.length === 0 || lines.some(line => !isLikelyLocalPath(line))) return [];

  return lines.map(path => ({
    file: new File([], pathName(path)),
    name: pathName(path),
    path,
  }));
};

export const filePath = (file: File | null | undefined) => {
  if (!file || !("path" in file)) return "";
  const path = (file as File & { path?: unknown }).path;
  return path == null ? "" : String(path);
};

export const filesFromTransfer = (
  dataTransfer: DataTransfer | null | undefined,
  source: FileTransferSource = "drop",
  now: () => Date = () => new Date()
) => {
  const seen = new Set<string>();
  const files: TransferInputFile[] = [];
  let pastedImageCount = 0;

  const addFile = (file: File | null) => {
    if (!file) return;
    const path = filePath(file);
    const key = `${file.name}-${file.size}-${file.type}-${path}-${file.lastModified || 0}`;
    if (seen.has(key)) return;
    seen.add(key);

    const isPathlessPastedImage = source === "paste" && file.type?.startsWith("image/") && !path;
    const name = isPathlessPastedImage
      ? pastedImageName(now(), pastedImageCount++, extensionFromType(file.type))
      : file.name || "attachment";

    files.push({ file, name, path });
  };

  Array.from(dataTransfer?.items || []).forEach((item) => {
    if (item.kind === "file") addFile(item.getAsFile());
  });
  Array.from(dataTransfer?.files || []).forEach(addFile);

  const getData = dataTransfer?.getData?.bind(dataTransfer);
  if (files.length === 0 && getData) {
    const uriList = getData("text/uri-list")
      .split(/\r?\n/)
      .filter(line => line.trim() && !line.startsWith("#"))
      .join("\n");
    files.push(...filesFromTextPaths(uriList || getData("text/plain")));
  }

  return files;
};

export const lineIndexFromTextOffset = (
  value: string | null | undefined,
  offset: number | null | undefined
) => {
  const text = value || "";
  const safeOffset = Math.min(Math.max(offset || 0, 0), text.length);
  if (safeOffset === 0) return 0;
  return text.slice(0, safeOffset).split("\n").length - 1;
};

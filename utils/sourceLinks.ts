// SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>
//
// SPDX-License-Identifier: GPL-3.0-or-later

export const openSourceLink = async (sourceUrl?: string | null) => {
  if (!sourceUrl) return;

  try {
    const { openUrl } = await import("@tauri-apps/plugin-opener");
    await openUrl(sourceUrl);
  } catch {
    window.open(sourceUrl, "_blank", "noopener,noreferrer");
  }
};

export const getQuickAddRouteTarget = ({
  title,
  url,
}: {
  title?: string | null;
  url?: string | null;
}) => ({
  path: "/quick-add",
  query: { title: title ?? "", url: url ?? "" },
});

export const getQuickAddPathFromDeepLink = (rawUrl: string) => {
  let deepLinkUrl: URL;

  try {
    deepLinkUrl = new URL(rawUrl);
  } catch {
    return null;
  }

  if (deepLinkUrl.protocol !== "kanri:") return null;

  const isQuickAdd =
    deepLinkUrl.hostname === "quick-add" ||
    deepLinkUrl.pathname.replace(/^\/+/, "") === "quick-add";

  if (!isQuickAdd) return null;

  const title = deepLinkUrl.searchParams.get("title") ?? "";
  const url = deepLinkUrl.searchParams.get("url") ?? "";

  return getQuickAddRouteTarget({ title, url });
};

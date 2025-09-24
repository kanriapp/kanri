/* SPDX-FileCopyrightText: Copyright (c) 2022-2025 trobonox <hello@trobo.dev>
SPDX-License-Identifier: GPL-3.0-or-later */

export const ZOOM_MIN = 10;
export const ZOOM_MAX = 500;
export const ZOOM_STEP = 10;

export const clampZoom = (value: number): number => {
  const rounded = Math.round(value);
  if (Number.isNaN(rounded)) return ZOOM_MIN;
  return Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, rounded));
};

export const migrateLegacyZoomValue = (value: unknown): number => {
  if (typeof value === "number" && !Number.isNaN(value)) {
    if (value <= 2 && value >= -10) {
      // legacy zoom stored as offsets (-1..2) representing 50% steps
      return clampZoom(100 + value * 50);
    }

    return clampZoom(value);
  }

  if (typeof value === "string") {
    const parsed = Number.parseInt(value, 10);
    if (!Number.isNaN(parsed)) {
      return clampZoom(parsed);
    }
  }

  return 100;
};

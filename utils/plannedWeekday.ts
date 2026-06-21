// SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import type { ScheduledWeekday } from "@/types/kanban-types";

export const PLANNED_WEEKDAYS = [
  "Pzt",
  "Sl",
  "Çrş",
  "Prş",
  "Cum",
  "Cmt",
  "Paz",
] as const;

const PLANNED_COLUMN_TITLE = "planned";

const PLANNED_WEEKDAY_STYLES: Record<
  ScheduledWeekday,
  { backgroundColor: string; borderColor: string; color: string }
> = {
  Pzt: { backgroundColor: "#2563eb", borderColor: "#60a5fa", color: "#ffffff" },
  Sl: { backgroundColor: "#7c3aed", borderColor: "#a78bfa", color: "#ffffff" },
  Çrş: { backgroundColor: "#0891b2", borderColor: "#67e8f9", color: "#ffffff" },
  Prş: { backgroundColor: "#16a34a", borderColor: "#86efac", color: "#ffffff" },
  Cum: { backgroundColor: "#ca8a04", borderColor: "#fde047", color: "#111827" },
  Cmt: { backgroundColor: "#ea580c", borderColor: "#fdba74", color: "#ffffff" },
  Paz: { backgroundColor: "#dc2626", borderColor: "#fca5a5", color: "#ffffff" },
};

export const isPlannedColumnTitle = (title: string) =>
  title.trim().toLowerCase() === PLANNED_COLUMN_TITLE;

export const isScheduledWeekday = (
  value: string | null | undefined
): value is ScheduledWeekday =>
  Boolean(value && PLANNED_WEEKDAYS.includes(value as ScheduledWeekday));

export const getNextPlannedWeekday = (
  current: ScheduledWeekday | null | undefined
) => {
  const currentIndex = current == null ? -1 : PLANNED_WEEKDAYS.indexOf(current);
  const nextIndex = (currentIndex + 1) % PLANNED_WEEKDAYS.length;

  return PLANNED_WEEKDAYS[nextIndex];
};

export const plannedWeekdayStyleFor = (
  weekday: ScheduledWeekday | null | undefined
) => {
  if (!weekday || !isScheduledWeekday(weekday)) return undefined;

  return PLANNED_WEEKDAY_STYLES[weekday];
};

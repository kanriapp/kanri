// SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import type { Board, Card, ScheduledWeekday } from "@/types/kanban-types";
import {
  PLANNED_WEEKDAYS,
  isPlannedColumnTitle,
  isScheduledWeekday,
} from "@/utils/plannedWeekday";

export interface WeeklyCalendarItem {
  boardId: string;
  boardTitle: string;
  card: Card;
  cardOrder: number;
  columnId: string;
  columnOrder: number;
  columnTitle: string;
}

export type WeeklyCalendarGroups = Record<
  ScheduledWeekday,
  WeeklyCalendarItem[]
>;

const createEmptyWeekdayGroups = (): WeeklyCalendarGroups => {
  return PLANNED_WEEKDAYS.reduce((groups, weekday) => {
    groups[weekday] = [];
    return groups;
  }, {} as WeeklyCalendarGroups);
};

export const aggregateWeeklyCalendarItems = (
  boards: Board[]
): { scheduled: WeeklyCalendarGroups; unscheduled: WeeklyCalendarItem[] } => {
  const scheduled = createEmptyWeekdayGroups();
  const unscheduled: WeeklyCalendarItem[] = [];

  for (const board of boards) {
    board.columns.forEach((column, columnOrder) => {
      if (!isPlannedColumnTitle(column.title)) return;

      column.cards.forEach((card, cardOrder) => {
        const item = {
          boardId: board.id,
          boardTitle: board.title,
          card,
          cardOrder,
          columnId: column.id,
          columnOrder,
          columnTitle: column.title,
        };

        if (isScheduledWeekday(card.scheduledWeekday)) {
          scheduled[card.scheduledWeekday].push(item);
          return;
        }

        unscheduled.push(item);
      });
    });
  }

  return { scheduled, unscheduled };
};

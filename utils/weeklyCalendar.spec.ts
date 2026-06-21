// SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { describe, expect, it } from "vitest";
import { aggregateWeeklyCalendarItems } from "./weeklyCalendar";

describe("weekly calendar helper", () => {
  it("groups only Planned-column cards by selected weekday", () => {
    const result = aggregateWeeklyCalendarItems([
      {
        id: "work",
        title: "Work",
        columns: [
          { id: "idea", title: "Idea", cards: [{ id: "idea-card", name: "Idea" }] },
          {
            id: "planned",
            title: "Planned",
            cards: [
              { id: "monday", name: "Monday task", scheduledWeekday: "Pzt" },
              { id: "unset", name: "Unscheduled task" },
            ],
          },
          {
            id: "other-planned",
            title: "Planning",
            cards: [{ id: "ignored", name: "Ignored", scheduledWeekday: "Pzt" }],
          },
        ],
      },
    ]);

    expect(result.scheduled.Pzt.map(item => item.card.id)).toEqual(["monday"]);
    expect(result.unscheduled.map(item => item.card.id)).toEqual(["unset"]);
  });

  it("keeps separate scheduled buckets for all weekdays", () => {
    const result = aggregateWeeklyCalendarItems([
      {
        id: "week",
        title: "Week",
        columns: [
          {
            id: "planned",
            title: "planned",
            cards: [
              { id: "wed", name: "Wednesday task", scheduledWeekday: "Çrş" },
              { id: "sun", name: "Sunday task", scheduledWeekday: "Paz" },
            ],
          },
        ],
      },
    ]);

    expect(result.scheduled.Çrş[0]?.card.id).toBe("wed");
    expect(result.scheduled.Paz[0]?.card.id).toBe("sun");
    expect(result.scheduled.Pzt).toHaveLength(0);
  });
});

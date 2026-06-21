// SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>
//
// SPDX-License-Identifier: GPL-3.0-or-later

import { describe, expect, it } from "vitest";
import {
  PLANNED_WEEKDAYS,
  getNextPlannedWeekday,
  isPlannedColumnTitle,
  isScheduledWeekday,
} from "./plannedWeekday";

describe("planned weekday helper", () => {
  it("activates only for Planned columns", () => {
    expect(isPlannedColumnTitle("Planned")).toBe(true);
    expect(isPlannedColumnTitle(" planned ")).toBe(true);
    expect(isPlannedColumnTitle("Planning")).toBe(false);
    expect(isPlannedColumnTitle("To Do")).toBe(false);
  });

  it("cycles through the seven planned weekdays", () => {
    let weekday = getNextPlannedWeekday(null);
    expect(weekday).toBe("Pzt");

    for (let index = 1; index < PLANNED_WEEKDAYS.length; index++) {
      weekday = getNextPlannedWeekday(weekday);
      expect(weekday).toBe(PLANNED_WEEKDAYS[index]);
    }

    expect(getNextPlannedWeekday(weekday)).toBe("Pzt");
  });

  it("recognizes valid saved weekday values", () => {
    expect(isScheduledWeekday("Çrş")).toBe(true);
    expect(isScheduledWeekday("Tomorrow")).toBe(false);
    expect(isScheduledWeekday(null)).toBe(false);
  });
});

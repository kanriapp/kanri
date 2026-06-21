<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev> -->
<!-- -->
<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

<template>
  <div class="flex h-screen min-w-0 flex-col overflow-hidden px-6 py-5">
    <header class="mb-4 flex shrink-0 items-center justify-between gap-4">
      <div>
        <div class="text-dim-2 mb-1 flex items-center gap-1.5">
          <PhCalendarBlank class="size-4" />
          <span class="text-xs font-medium">
            {{ $t("weeklyCalendar.eyebrow") }}
          </span>
        </div>
        <h1 class="text-2xl font-semibold">
          {{ $t("weeklyCalendar.title") }}
        </h1>
      </div>

      <div class="text-dim-2 text-xs tabular-nums">
        {{ plannedItemCount }} {{ $t("weeklyCalendar.plannedTasks") }}
      </div>
    </header>

    <main class="flex min-h-0 flex-1 flex-col gap-4">
      <section class="grid min-h-0 flex-1 grid-cols-7 gap-2">
        <article
          v-for="weekday in weekdays"
          :key="weekday"
          class="calendar-column bg-elevation-1 border-elevation-2 flex min-w-0 flex-col rounded-lg border p-2"
        >
          <header class="mb-2 flex items-center justify-between gap-2">
            <div
              class="rounded-md border px-2 py-1 text-sm font-bold"
              :style="plannedWeekdayStyleFor(weekday)"
            >
              {{ weekday }}
            </div>
            <span class="bg-elevation-2 text-dim-2 rounded-full px-2 py-0.5 text-xs">
              {{ calendar.scheduled[weekday].length }}
            </span>
          </header>

          <Container
            class="custom-scrollbar min-h-0 flex-1 overflow-y-auto"
            drag-class="cursor-grabbing"
            drop-class="weekly-calendar-drop-target"
            group-name="weekly-calendar-cards"
            orientation="vertical"
            :get-child-payload="(index: number) => calendar.scheduled[weekday][index]"
            @drop="dropOnWeekday($event, weekday)"
          >
            <div
              v-if="calendar.scheduled[weekday].length === 0"
              class="text-dim-2 border-elevation-3 flex min-h-24 items-center justify-center rounded-md border border-dashed px-2 text-center text-xs"
            >
              {{ $t("weeklyCalendar.dropHere") }}
            </div>

            <Draggable
              v-for="item in calendar.scheduled[weekday]"
              :key="itemKey(item)"
              class="mb-2"
            >
              <article
                class="weekly-calendar-card bg-elevation-2 border-elevation-3 bg-elevation-3-hover cursor-grab rounded-md border p-2 shadow-sm active:cursor-grabbing"
              >
                <p class="line-clamp-3 break-words text-sm font-semibold">
                  {{ item.card.name }}
                </p>
                <p class="text-dim-2 mt-1 truncate text-[11px]">
                  {{ item.boardTitle }}
                </p>
                <button
                  v-if="item.card.sourceUrl"
                  type="button"
                  class="text-dim-2 bg-elevation-3-hover mt-2 flex max-w-full items-center gap-1 rounded-sm px-1 text-[11px]"
                  :title="item.card.sourceUrl"
                  @click.stop="openSourceUrl(item.card.sourceUrl)"
                  @pointerdown.stop
                >
                  <PhLinkSimple class="size-3" />
                  <span class="truncate">
                    {{ item.card.sourceTitle || item.card.sourceUrl }}
                  </span>
                </button>
              </article>
            </Draggable>
          </Container>
        </article>
      </section>

      <section
        class="calendar-column bg-elevation-1 border-elevation-2 flex h-44 shrink-0 flex-col rounded-lg border p-3"
      >
        <header class="mb-2 flex shrink-0 items-center justify-between">
          <div>
            <h2 class="text-lg font-semibold">
              {{ $t("weeklyCalendar.unscheduledTitle") }}
            </h2>
            <p class="text-dim-2 text-xs">
              {{ $t("weeklyCalendar.unscheduledHint") }}
            </p>
          </div>
          <span class="bg-elevation-2 text-dim-2 rounded-full px-3 py-1 text-sm">
            {{ calendar.unscheduled.length }}
          </span>
        </header>

        <Container
          class="custom-scrollbar min-h-0 flex-1 overflow-y-auto"
          drag-class="cursor-grabbing"
          drop-class="weekly-calendar-drop-target"
          group-name="weekly-calendar-cards"
          orientation="horizontal"
          :get-child-payload="(index: number) => calendar.unscheduled[index]"
          @drop="dropOnUnscheduled"
        >
          <div
            v-if="calendar.unscheduled.length === 0"
            class="text-dim-2 border-elevation-3 flex size-full items-center justify-center rounded-md border border-dashed text-sm"
          >
            {{ $t("weeklyCalendar.noUnscheduledTasks") }}
          </div>

          <Draggable
            v-for="item in calendar.unscheduled"
            :key="itemKey(item)"
            class="mb-2 mr-2 inline-block w-56 align-top"
          >
            <article
              class="weekly-calendar-card bg-elevation-2 border-elevation-3 bg-elevation-3-hover cursor-grab rounded-md border p-2 shadow-sm active:cursor-grabbing"
            >
              <p class="line-clamp-2 break-words text-sm font-semibold">
                {{ item.card.name }}
              </p>
              <p class="text-dim-2 mt-1 truncate text-[11px]">
                {{ item.boardTitle }}
              </p>
              <button
                v-if="item.card.sourceUrl"
                type="button"
                class="text-dim-2 bg-elevation-3-hover mt-2 flex max-w-full items-center gap-1 rounded-sm px-1 text-[11px]"
                :title="item.card.sourceUrl"
                @click.stop="openSourceUrl(item.card.sourceUrl)"
                @pointerdown.stop
              >
                <PhLinkSimple class="size-3" />
                <span class="truncate">
                  {{ item.card.sourceTitle || item.card.sourceUrl }}
                </span>
              </button>
            </article>
          </Draggable>
        </Container>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { ScheduledWeekday } from "@/types/kanban-types";
import type { WeeklyCalendarItem } from "@/utils/weeklyCalendar";
import { PhCalendarBlank, PhLinkSimple } from "@phosphor-icons/vue";
import {
  PLANNED_WEEKDAYS,
  plannedWeekdayStyleFor,
} from "@/utils/plannedWeekday";
import { openSourceLink } from "@/utils/sourceLinks";
import { aggregateWeeklyCalendarItems } from "@/utils/weeklyCalendar";
//@ts-expect-error, sadly this library does not have ts typings
import { Container, Draggable } from "vue3-smooth-dnd";

const boardsStore = useBoardsStore();
const layoutStore = useLayoutStore();
const { boards } = storeToRefs(boardsStore);

const weekdays = PLANNED_WEEKDAYS;

const calendar = computed(() => aggregateWeeklyCalendarItems(boards.value));
const plannedItemCount = computed(
  () =>
    calendar.value.unscheduled.length +
    weekdays.reduce(
      (total, weekday) => total + calendar.value.scheduled[weekday].length,
      0
    )
);

onMounted(async () => {
  layoutStore.onHomePageLeave();
  await boardsStore.init();
});

const itemKey = (item: WeeklyCalendarItem) =>
  `${item.boardId}-${item.columnId}-${item.card.id ?? item.cardOrder}`;

const setCardWeekday = (
  item: WeeklyCalendarItem,
  weekday: ScheduledWeekday | null
) => {
  if (!item.card.id) return;

  boardsStore.mutateCard(item.boardId, item.columnId, item.card.id, (card) => {
    card.scheduledWeekday = weekday;
  });
};

const openSourceUrl = async (sourceUrl: string) => {
  await openSourceLink(sourceUrl);
};

type CalendarDropResult = {
  addedIndex: number | null;
  payload?: WeeklyCalendarItem;
  removedIndex: number | null;
};

const dropOnWeekday = (
  dropResult: CalendarDropResult,
  weekday: ScheduledWeekday
) => {
  if (dropResult.addedIndex === null || !dropResult.payload) return;

  setCardWeekday(dropResult.payload, weekday);
};

const dropOnUnscheduled = (dropResult: CalendarDropResult) => {
  if (dropResult.addedIndex === null || !dropResult.payload) return;

  setCardWeekday(dropResult.payload, null);
};
</script>

<style scoped>
.weekly-calendar-card {
  transform: translateZ(0);
  transition:
    opacity var(--motion-fast) var(--motion-ease-interaction),
    transform var(--motion-fast) var(--motion-ease-interaction),
    border-color var(--motion-fast) var(--motion-ease-interaction),
    box-shadow var(--motion-fast) var(--motion-ease-interaction);
}

.calendar-column {
  background-color: var(--elevation-1);
  transition:
    border-color var(--motion-fast) var(--motion-ease-interaction),
    box-shadow var(--motion-fast) var(--motion-ease-interaction);
}

.calendar-column:hover {
  border-color: var(--elevation-3);
}

.weekly-calendar-card:hover {
  border-color: color-mix(in srgb, var(--elevation-3) 84%, var(--accent));
  box-shadow: 0 8px 20px -20px rgba(0, 0, 0, 0.6);
  transform: translateY(-1px);
}

:deep(.weekly-calendar-drop-target) {
  border-color: var(--accent);
}
</style>

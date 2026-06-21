<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev> -->
<!-- -->
<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

<template>
  <div class="flex h-screen min-w-0 flex-col overflow-hidden px-6 py-5">
    <header class="mb-4 flex shrink-0 items-center justify-between gap-4">
      <div>
        <div class="text-dim-2 mb-1 flex items-center gap-1.5">
          <PhKanban class="size-4" />
          <span class="text-xs font-medium">
            {{ $t("globalWorkflow.eyebrow") }}
          </span>
        </div>
        <h1 class="text-2xl font-semibold">
          {{ $t("globalWorkflow.title") }}
        </h1>
      </div>

      <div class="text-dim-2 flex shrink-0 items-center gap-2 text-xs tabular-nums">
        <span>
          {{ eligibleBoardCount }} {{ $t("globalWorkflow.boards") }}
        </span>
        <span class="opacity-50">·</span>
        <span>
          {{ totalItemCount }} {{ $t("globalWorkflow.tasks") }}
        </span>
      </div>
    </header>

    <main class="grid min-h-0 flex-1 grid-cols-6 gap-2">
      <article
        v-for="column in columns"
        :key="column"
        class="workflow-column bg-elevation-1 border-elevation-2 flex min-w-0 flex-col rounded-lg border p-2"
      >
        <header class="mb-2 flex items-center justify-between gap-2">
          <h2 class="truncate text-sm font-bold">
            {{ column }}
          </h2>
          <span class="bg-elevation-2 text-dim-2 rounded-full px-2 py-0.5 text-xs">
            {{ workflow[column].length }}
          </span>
        </header>

        <Container
          class="custom-scrollbar min-h-0 flex-1 overflow-y-auto"
          drag-class="cursor-grabbing"
          drop-class="global-workflow-drop-target"
          group-name="global-workflow-cards"
          orientation="vertical"
          :get-child-payload="(index: number) => workflow[column][index]"
          @drop="dropOnColumn($event, column)"
        >
          <div
            v-if="workflow[column].length === 0"
            class="text-dim-2 border-elevation-3 flex min-h-24 items-center justify-center rounded-md border border-dashed px-2 text-center text-xs"
          >
            {{ $t("globalWorkflow.dropHere") }}
          </div>

          <Draggable
            v-for="item in workflow[column]"
            :key="itemKey(item)"
            class="mb-2"
          >
            <article
              class="global-workflow-card bg-elevation-2 border-elevation-3 bg-elevation-3-hover cursor-grab rounded-md border p-2 shadow-sm active:cursor-grabbing"
            >
              <div class="flex items-start justify-between gap-2">
                <p class="line-clamp-3 min-w-0 break-words text-sm font-semibold">
                  {{ item.card.name }}
                </p>
                <button
                  v-if="item.workflowColumn === 'Planned'"
                  type="button"
                  class="shrink-0 rounded-md border px-1.5 py-0.5 text-[11px] font-bold"
                  :style="plannedWeekdayStyleFor(item.card.scheduledWeekday)"
                  :title="$t('globalWorkflow.cycleWeekday')"
                  @click.stop="cyclePlannedWeekday(item)"
                  @pointerdown.stop
                >
                  {{ item.card.scheduledWeekday || $t("globalWorkflow.chooseDay") }}
                </button>
              </div>

              <p class="text-dim-2 mt-1 truncate text-[11px]">
                {{ item.boardTitle }}
              </p>

              <div
                v-if="item.card.tags?.length"
                class="mt-2 flex flex-wrap gap-1"
              >
                <span
                  v-for="tag in item.card.tags"
                  :key="`${itemKey(item)}-${tag.id ?? tag.text}`"
                  class="max-w-full truncate rounded-sm px-1.5 py-0.5 text-[10px] font-semibold"
                  :style="tag.style"
                >
                  {{ tag.text }}
                </span>
              </div>

              <div
                v-if="item.card.tasks?.length"
                class="mt-2 flex flex-col gap-1"
              >
                <label
                  v-for="(task, taskIndex) in item.card.tasks.slice(0, 3)"
                  :key="task.id ?? `${itemKey(item)}-task-${taskIndex}`"
                  class="text-dim-2 flex min-w-0 items-center gap-1 text-[11px]"
                  @pointerdown.stop
                >
                  <input
                    class="size-3 accent-current"
                    type="checkbox"
                    :checked="task.finished"
                    @change.stop="setSubtaskFinishedFromEvent(item, taskIndex, $event)"
                  >
                  <span
                    class="truncate"
                    :class="{ 'line-through opacity-70': task.finished }"
                  >
                    {{ task.name }}
                  </span>
                </label>
              </div>

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
    </main>
  </div>
</template>

<script setup lang="ts">
import type {
  GlobalWorkflowColumn,
  GlobalWorkflowItem,
} from "@/utils/globalWorkflow";
import { PhKanban, PhLinkSimple } from "@phosphor-icons/vue";
import {
  GLOBAL_WORKFLOW_COLUMNS,
  aggregateGlobalWorkflowItems,
  findGlobalWorkflowColumnId,
  isGlobalWorkflowBoard,
} from "@/utils/globalWorkflow";
import {
  getNextPlannedWeekday,
  plannedWeekdayStyleFor,
} from "@/utils/plannedWeekday";
import { openSourceLink } from "@/utils/sourceLinks";
//@ts-expect-error, sadly this library does not have ts typings
import { Container, Draggable } from "vue3-smooth-dnd";

const boardsStore = useBoardsStore();
const layoutStore = useLayoutStore();
const { boards } = storeToRefs(boardsStore);

const columns = GLOBAL_WORKFLOW_COLUMNS;
const workflow = computed(() => aggregateGlobalWorkflowItems(boards.value));
const eligibleBoardCount = computed(
  () => boards.value.filter(isGlobalWorkflowBoard).length
);
const totalItemCount = computed(() =>
  columns.reduce((total, column) => total + workflow.value[column].length, 0)
);

onMounted(async () => {
  layoutStore.onHomePageLeave();
  await boardsStore.init();
});

const itemKey = (item: GlobalWorkflowItem) =>
  `${item.boardId}-${item.columnId}-${item.card.id ?? item.cardOrder}`;

const openSourceUrl = async (sourceUrl: string) => {
  await openSourceLink(sourceUrl);
};

const moveItemToColumn = (
  item: GlobalWorkflowItem,
  targetColumn: GlobalWorkflowColumn
) => {
  if (!item.card.id || item.workflowColumn === targetColumn) return;

  const board = boardsStore.boardById(item.boardId);
  if (!board) return;

  const targetColumnId = findGlobalWorkflowColumnId(board, targetColumn);
  if (!targetColumnId) return;

  boardsStore.moveCard(
    item.boardId,
    item.boardId,
    item.columnId,
    targetColumnId,
    item.card.id
  );
};

const cyclePlannedWeekday = (item: GlobalWorkflowItem) => {
  if (!item.card.id || item.workflowColumn !== "Planned") return;

  boardsStore.mutateCard(item.boardId, item.columnId, item.card.id, (card) => {
    card.scheduledWeekday = getNextPlannedWeekday(card.scheduledWeekday);
  });
};

const setSubtaskFinished = (
  item: GlobalWorkflowItem,
  taskIndex: number,
  finished: boolean
) => {
  if (!item.card.id) return;

  boardsStore.mutateCard(item.boardId, item.columnId, item.card.id, (card) => {
    card.tasks = card.tasks?.map((task, index) =>
      index === taskIndex ? { ...task, finished } : task
    );
  });
};

const setSubtaskFinishedFromEvent = (
  item: GlobalWorkflowItem,
  taskIndex: number,
  event: Event
) => {
  setSubtaskFinished(
    item,
    taskIndex,
    Boolean((event.target as HTMLInputElement | null)?.checked)
  );
};

type GlobalWorkflowDropResult = {
  addedIndex: number | null;
  payload?: GlobalWorkflowItem;
  removedIndex: number | null;
};

const dropOnColumn = (
  dropResult: GlobalWorkflowDropResult,
  targetColumn: GlobalWorkflowColumn
) => {
  if (dropResult.addedIndex === null || !dropResult.payload) return;

  moveItemToColumn(dropResult.payload, targetColumn);
};
</script>

<style scoped>
.global-workflow-card {
  transform: translateZ(0);
  transition:
    opacity var(--motion-fast) var(--motion-ease-interaction),
    transform var(--motion-fast) var(--motion-ease-interaction),
    border-color var(--motion-fast) var(--motion-ease-interaction),
    box-shadow var(--motion-fast) var(--motion-ease-interaction);
}

.workflow-column {
  background-color: var(--elevation-1);
  transition:
    border-color var(--motion-fast) var(--motion-ease-interaction),
    box-shadow var(--motion-fast) var(--motion-ease-interaction);
}

.workflow-column:hover {
  border-color: var(--elevation-3);
}

.global-workflow-card:hover {
  border-color: color-mix(in srgb, var(--elevation-3) 84%, var(--accent));
  box-shadow: 0 8px 20px -20px rgba(0, 0, 0, 0.6);
  transform: translateY(-1px);
}

:deep(.global-workflow-drop-target) {
  border-color: var(--accent);
}
</style>

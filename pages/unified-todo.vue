<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev> -->
<!-- -->
<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

<template>
  <div class="min-h-screen p-6 lg:px-10">
    <ModalCardTags
      v-if="activeBoard"
      v-show="editTagModalVisible"
      :tags="activeBoard.globalTags ?? []"
      @closeModal="editTagModalVisible = false"
      @removeTag="removeGlobalTag"
      @setTagColor="setGlobalTagColor"
      @updateTagName="updateGlobalTagName"
    />
    <ModalEditCard
      v-show="editCardModalVisible"
      :card="activeItem?.card ?? null"
      :column-id="activeItem?.columnId ?? ''"
      :global-tags="activeBoard?.globalTags ?? []"
      @addGlobalTag="addGlobalTag"
      @closeModal="closeEditCardModal"
      @openTagEdit="editTagModalVisible = true"
      @setCardColor="setCardColor"
      @setCardDescription="setCardDescription"
      @setCardDueDate="setCardDueDate"
      @setCardTags="setCardTags"
      @setCardTasks="setCardTasks"
      @setCardTitle="setCardTitle"
    />

    <header class="mx-auto mb-6 flex max-w-6xl flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <div class="text-dim-2 mb-1 flex items-center gap-1.5">
          <PhListChecks class="size-4" />
          <span class="text-xs font-medium">
            {{ $t("unifiedTodo.eyebrow") }}
          </span>
        </div>
        <h1 class="text-2xl font-semibold">
          {{ $t("unifiedTodo.title") }}
        </h1>
        <p class="text-dim-2 mt-1 max-w-2xl text-sm">
          {{ $t("unifiedTodo.description") }}
        </p>
      </div>

      <label class="flex min-w-52 flex-col gap-1 text-sm">
        <span class="text-dim-2 flex items-center gap-1.5">
          <PhFunnel class="size-4" />
          {{ $t("unifiedTodo.boardFilter") }}
        </span>
        <select
          v-model="selectedBoardId"
          class="bg-elevation-1 border-elevation-2 focus:border-accent h-9 rounded-md border px-3 text-sm outline-none"
        >
          <option value="all">
            {{ $t("unifiedTodo.allBoards") }}
          </option>
          <option v-for="board in boards" :key="board.id" :value="board.id">
            {{ board.title }}
          </option>
        </select>
      </label>
    </header>

    <main class="mx-auto max-w-6xl">
      <div
        v-if="!loading && visibleGroups.length === 0"
        class="bg-elevation-1 border-elevation-2 flex min-h-48 flex-col items-center justify-center rounded-lg border p-8 text-center"
      >
        <PhCheckCircle class="text-accent mb-4 size-12" />
        <h2 class="text-xl font-semibold">
          {{ emptyStateText }}
        </h2>
      </div>

      <div v-else class="flex flex-col gap-6">
        <section v-for="group in visibleGroups" :key="group.boardId">
          <div class="mb-3 flex items-center justify-between">
            <h2 class="text-lg font-semibold">{{ group.boardTitle }}</h2>
            <span class="text-dim-2 text-xs tabular-nums">
              {{ group.items.length }}
            </span>
          </div>

          <div class="flex flex-col gap-2">
            <article
              v-for="item in group.items"
              :key="`${item.boardId}-${item.columnId}-${item.card.id}`"
              class="unified-task-card bg-elevation-1 border-elevation-3 bg-elevation-2-hover group relative flex overflow-hidden rounded-lg border shadow-sm"
            >
              <div
                :class="cardColorClass(item.card.color)"
                :style="cardColorStyle(item.card.color)"
                class="w-1.5 shrink-0"
              />

              <CheckboxRoot
                :checked="false"
                :disabled="!canMoveRight(item)"
                :aria-label="canMoveRight(item)
                  ? $t('unifiedTodo.markDone')
                  : $t('unifiedTodo.noNextColumn')"
                :title="canMoveRight(item)
                  ? $t('unifiedTodo.markDone')
                  : $t('unifiedTodo.noNextColumn')"
                class="bg-elevation-4 bg-elevation-2-hover border-elevation-5 ml-4 mt-5 flex size-5 shrink-0 appearance-none items-center justify-center rounded-[4px] border outline-none disabled:cursor-not-allowed disabled:opacity-40"
                @click.stop
                @update:checked="(checked) => markDone(item, checked)"
              >
                <CheckboxIndicator class="flex size-full items-center justify-center rounded">
                  <PhCheck weight="bold" class="text-accent-lighter size-4" />
                </CheckboxIndicator>
              </CheckboxRoot>

              <button
                class="flex min-w-0 flex-1 flex-col items-start gap-3 p-4 text-left"
                type="button"
                @click="openEditCardModal(item)"
              >
                <div class="flex w-full flex-col justify-between gap-2 sm:flex-row sm:items-start">
                  <h3 class="break-words text-lg font-medium">
                    {{ item.card.name }}
                  </h3>
                  <div class="text-dim-2 flex shrink-0 items-center gap-1 text-sm">
                    <span>{{ item.columnTitle }}</span>
                    <PhCaretRight class="size-4" />
                    <span>{{ nextColumnTitle(item) }}</span>
                  </div>
                </div>

                <div class="flex flex-wrap items-center gap-2">
                  <span class="bg-elevation-2 rounded px-2 py-0.5 text-xs">
                    {{ item.boardTitle }} · {{ item.columnTitle }}
                  </span>
                  <span
                    v-if="isPlannedColumnTitle(item.columnTitle) && item.card.scheduledWeekday"
                    class="rounded border px-2 py-0.5 text-xs font-semibold"
                    :style="plannedWeekdayStyleFor(item.card.scheduledWeekday)"
                  >
                    {{ item.card.scheduledWeekday }}
                  </span>
                  <KanbanTagDisplay
                    v-for="tag in item.card.tags ?? []"
                    :key="tag.id ?? tag.text"
                    :tag="tag"
                    :zoom-level="0"
                  />
                  <span
                    v-if="item.card.dueDate"
                    class="text-dim-2 flex items-center gap-1 text-sm"
                  >
                    <PhClock class="size-4" />
                    {{ formatDueDate(item.card.dueDate) }}
                  </span>
                </div>
              </button>

              <button
                v-if="item.card.sourceUrl"
                type="button"
                class="text-dim-2 bg-elevation-2-hover mr-4 mt-5 flex max-w-48 shrink-0 items-center gap-1 self-start rounded-sm px-2 py-1 text-sm"
                :title="item.card.sourceUrl"
                @click.stop="openSourceUrl(item.card.sourceUrl)"
              >
                <PhLinkSimple class="size-4" />
                <span class="truncate">
                  {{ item.card.sourceTitle || item.card.sourceUrl }}
                </span>
              </button>
            </article>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { Card, Tag, Task } from "@/types/kanban-types";
import type { UnifiedTodoItem } from "@/utils/unifiedTodo";
import {
  isPlannedColumnTitle,
  plannedWeekdayStyleFor,
} from "@/utils/plannedWeekday";
import {
  PhCaretRight,
  PhCheck,
  PhCheckCircle,
  PhClock,
  PhFunnel,
  PhLinkSimple,
  PhListChecks,
} from "@phosphor-icons/vue";
import { openSourceLink } from "@/utils/sourceLinks";

const boardsStore = useBoardsStore();
const layoutStore = useLayoutStore();
const { boards, unifiedTodoItems } = storeToRefs(boardsStore);
const { locale, t } = useI18n();

const loading = ref(true);
const selectedBoardId = ref("all");
const editCardModalVisible = ref(false);
const editTagModalVisible = ref(false);
const activeItem = ref<UnifiedTodoItem | null>(null);

const activeBoard = computed(() => {
  if (!activeItem.value) return null;
  return boardsStore.boardById(activeItem.value.boardId);
});

const filteredItems = computed(() => {
  if (selectedBoardId.value === "all") return unifiedTodoItems.value;
  return unifiedTodoItems.value.filter(
    item => item.boardId === selectedBoardId.value
  );
});

const visibleGroups = computed(() => {
  const groups = new Map<
    string,
    { boardId: string; boardTitle: string; items: UnifiedTodoItem[] }
  >();

  for (const item of filteredItems.value) {
    const group = groups.get(item.boardId);
    if (group) {
      group.items.push(item);
    } else {
      groups.set(item.boardId, {
        boardId: item.boardId,
        boardTitle: item.boardTitle,
        items: [item],
      });
    }
  }

  return [...groups.values()];
});

const emptyStateText = computed(() => {
  if (selectedBoardId.value !== "all") {
    return t("unifiedTodo.noFilterMatches");
  }

  return t("unifiedTodo.noTasks");
});

onMounted(async () => {
  layoutStore.onHomePageLeave();
  await boardsStore.init();
  loading.value = false;
});

const boardAndColumnIndex = (item: UnifiedTodoItem) => {
  const board = boardsStore.boardById(item.boardId);
  const columnIndex = board?.columns.findIndex(
    column => column.id === item.columnId
  ) ?? -1;

  return { board, columnIndex };
};

const canMoveRight = (item: UnifiedTodoItem) => {
  const { board, columnIndex } = boardAndColumnIndex(item);
  return Boolean(board && columnIndex >= 0 && columnIndex < board.columns.length - 1);
};

const nextColumnTitle = (item: UnifiedTodoItem) => {
  const { board, columnIndex } = boardAndColumnIndex(item);
  return board?.columns[columnIndex + 1]?.title ?? t("unifiedTodo.lastColumn");
};

const markDone = (
  item: UnifiedTodoItem,
  checked: boolean | "indeterminate"
) => {
  if (checked !== true || !item.card.id) return;
  boardsStore.moveCardToNextColumn(item.boardId, item.columnId, item.card.id);
};

const openEditCardModal = (item: UnifiedTodoItem) => {
  activeItem.value = item;
  editCardModalVisible.value = true;
};

const openSourceUrl = async (sourceUrl: string) => {
  await openSourceLink(sourceUrl);
};

const closeEditCardModal = () => {
  editCardModalVisible.value = false;
};

const mutateActiveCard = (
  columnId: string,
  cardId: string | undefined,
  mutation: (card: Card) => void
) => {
  if (!activeItem.value || !cardId) return;
  boardsStore.mutateCard(activeItem.value.boardId, columnId, cardId, mutation);
};

const setCardColor = (
  columnId: string,
  cardId: string | undefined,
  color: string
) => mutateActiveCard(columnId, cardId, card => { card.color = color; });

const setCardDescription = (
  columnId: string,
  cardId: string | undefined,
  description: string
) => mutateActiveCard(columnId, cardId, card => { card.description = description; });

const setCardDueDate = (
  columnId: string,
  cardId: string | undefined,
  dueDate: Date | null,
  isCounterRelative: boolean,
  isCompleted: boolean
) => mutateActiveCard(columnId, cardId, card => {
  card.dueDate = dueDate;
  card.isDueDateCounterRelative = isCounterRelative;
  card.isDueDateCompleted = isCompleted;
});

const setCardTags = (
  columnId: string,
  cardId: string | undefined,
  tags: Tag[]
) => mutateActiveCard(columnId, cardId, card => { card.tags = tags; });

const setCardTasks = (
  columnId: string,
  cardId: string | undefined,
  tasks: Task[]
) => mutateActiveCard(columnId, cardId, card => { card.tasks = tasks; });

const setCardTitle = (
  columnId: string,
  cardId: string | undefined,
  title: string
) => mutateActiveCard(columnId, cardId, card => { card.name = title; });

const addGlobalTag = (tag: Tag) => {
  if (!activeItem.value) return;
  boardsStore.addGlobalTag(activeItem.value.boardId, tag);
};

const removeGlobalTag = (tagId: string) => {
  if (!activeItem.value) return;
  boardsStore.removeGlobalTag(activeItem.value.boardId, tagId);
};

const setGlobalTagColor = (tagId: string, color: string) => {
  if (!activeItem.value) return;
  boardsStore.setGlobalTagColor(activeItem.value.boardId, tagId, color);
};

const updateGlobalTagName = (tagId: string, name: string) => {
  if (!activeItem.value) return;
  boardsStore.updateGlobalTagName(activeItem.value.boardId, tagId, name);
};

const formatDueDate = (dueDate: Date | string) =>
  new Date(dueDate).toLocaleDateString(locale.value.replace("_", "-"));

const cardColorClass = (color?: string) => {
  if (!color || color.startsWith("#")) return "bg-accent";
  return color;
};

const cardColorStyle = (color?: string) =>
  color?.startsWith("#") ? { backgroundColor: color } : undefined;
</script>

<style scoped>
.unified-task-card {
  transform: translateZ(0);
  transition:
    background-color var(--motion-fast) var(--motion-ease-interaction),
    border-color var(--motion-fast) var(--motion-ease-interaction),
    box-shadow var(--motion-fast) var(--motion-ease-interaction),
    transform var(--motion-fast) var(--motion-ease-interaction);
}

.unified-task-card:hover {
  border-color: color-mix(in srgb, var(--elevation-3) 70%, var(--accent));
  box-shadow: 0 14px 30px -24px rgba(0, 0, 0, 0.65);
  transform: translateY(-1px);
}
</style>

<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev> -->
<!-- -->
<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

<template>
  <div class="min-h-screen overflow-auto p-6 lg:px-10">
    <main class="mx-auto flex max-w-5xl flex-col gap-6">
      <header>
        <div class="text-dim-2 mb-1 flex items-center gap-1.5">
          <PhPlusCircle class="size-4" />
          <span class="text-xs font-medium">
            {{ $t("quickAdd.eyebrow") }}
          </span>
        </div>
        <h1 class="text-2xl font-semibold">
          {{ $t("quickAdd.title") }}
        </h1>
      </header>

      <section class="bg-elevation-1 border-elevation-3 rounded-lg border p-4">
        <p class="text-dim-2 mb-1 text-sm">
          {{ $t("quickAdd.currentTab") }}
        </p>
        <h2 class="break-words text-xl font-semibold">
          {{ sourceTitle }}
        </h2>
        <p class="text-dim-2 mt-1 break-all text-sm">
          {{ sourceUrl || $t("quickAdd.missingUrl") }}
        </p>
        <p v-if="!urlSupported" class="mt-3 rounded-md bg-red-600 px-3 py-2 text-sm text-white">
          {{ $t("quickAdd.unsupportedUrl") }}
        </p>
      </section>

      <section>
        <div class="mb-3 flex items-center justify-between gap-4">
          <h2 class="text-lg font-semibold">
            {{ $t("quickAdd.chooseBoard") }}
          </h2>
          <span class="text-dim-2 text-xs tabular-nums">
            {{ boards.length }}
          </span>
        </div>

        <div
          v-if="boards.length === 0 && !loading"
          class="bg-elevation-1 border-elevation-3 rounded-lg border p-6 text-center"
        >
          {{ $t("quickAdd.noBoards") }}
        </div>

        <div v-else class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <button
            v-for="board in boards"
            :key="board.id"
            type="button"
            :disabled="!urlSupported || savingBoardId === board.id"
            class="quick-add-board-card bg-elevation-1 border-elevation-3 bg-elevation-2-hover flex min-h-28 flex-col items-start justify-between rounded-lg border p-4 text-left disabled:cursor-not-allowed disabled:opacity-50"
            @click="saveToBoard(board.id)"
          >
            <span class="break-words text-lg font-semibold">
              {{ board.title }}
            </span>
            <span class="text-dim-2 text-sm">
              {{ targetColumnLabel(board) }}
            </span>
          </button>
        </div>
      </section>

      <div
        v-if="statusMessage"
        class="bg-elevation-1 border-elevation-3 flex items-center justify-between gap-3 rounded-lg border p-4"
      >
        <span>{{ statusMessage }}</span>
        <nuxt-link
          v-if="savedBoardId"
          class="bg-accent text-buttons rounded-md px-4 py-2 text-sm font-semibold"
          :to="`/kanban/${savedBoardId}`"
        >
          {{ $t("quickAdd.openBoard") }}
        </nuxt-link>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { Board } from "@/types/kanban-types";
import { PhPlusCircle } from "@phosphor-icons/vue";
import {
  createQuickAddCard,
  findQuickAddTargetColumn,
  isSupportedSourceUrl,
} from "@/utils/quickAdd";

const route = useRoute();
const { t } = useI18n();
const boardsStore = useBoardsStore();
const layoutStore = useLayoutStore();
const { boards } = storeToRefs(boardsStore);

const loading = ref(true);
const savingBoardId = ref<string | null>(null);
const savedBoardId = ref<string | null>(null);
const statusMessage = ref("");

const queryString = (value: unknown) =>
  Array.isArray(value) ? String(value[0] ?? "") : String(value ?? "");

const sourceTitle = computed(() => {
  const title = queryString(route.query.title).trim();
  return title || t("quickAdd.untitledPage");
});
const sourceUrl = computed(() => queryString(route.query.url).trim());
const urlSupported = computed(() => isSupportedSourceUrl(sourceUrl.value));

onMounted(async () => {
  layoutStore.onHomePageLeave();
  await boardsStore.init();
  loading.value = false;
});

const ensureTargetColumnId = (board: Board) => {
  let targetColumn = findQuickAddTargetColumn(board);
  if (targetColumn) return targetColumn.id;

  boardsStore.addColumn(board.id, "Idea");
  targetColumn = findQuickAddTargetColumn(board);
  return targetColumn?.id ?? null;
};

const targetColumnLabel = (board: Board) => {
  const targetColumn = findQuickAddTargetColumn(board);
  return targetColumn
    ? t("quickAdd.targetColumn", { column: targetColumn.title })
    : t("quickAdd.newIdeaColumn");
};

const saveToBoard = async (boardId: string) => {
  if (!urlSupported.value) return;

  const board = boardsStore.boardById(boardId);
  if (!board) return;

  savingBoardId.value = boardId;
  statusMessage.value = "";

  const columnId = ensureTargetColumnId(board);
  if (!columnId) {
    savingBoardId.value = null;
    statusMessage.value = t("quickAdd.saveFailed");
    return;
  }

  boardsStore.createCard(
    board.id,
    columnId,
    createQuickAddCard({
      title: sourceTitle.value,
      url: sourceUrl.value,
    }),
    true
  );
  await boardsStore.save();

  savedBoardId.value = board.id;
  savingBoardId.value = null;
  statusMessage.value = t("quickAdd.saved", { board: board.title });
};
</script>

<style scoped>
.quick-add-board-card {
  transition:
    background-color var(--motion-fast) var(--motion-ease-interaction),
    border-color var(--motion-fast) var(--motion-ease-interaction),
    box-shadow var(--motion-fast) var(--motion-ease-interaction),
    transform var(--motion-fast) var(--motion-ease-interaction);
}

.quick-add-board-card:hover:not(:disabled) {
  border-color: color-mix(in srgb, var(--elevation-3) 70%, var(--accent));
  box-shadow: 0 14px 30px -24px rgba(0, 0, 0, 0.65);
  transform: translateY(-1px);
}
</style>

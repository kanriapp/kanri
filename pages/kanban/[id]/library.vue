<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev> -->
<!-- -->
<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

<template>
  <KanbanBoardAssetLibrary
    :board-id="boardId"
    standalone
    @close="goBackToBoard"
    @open-reference="openReference"
  />
</template>

<script setup lang="ts">
import type { AssetReferenceLocation } from "@/utils/assetReferences";

const route = useRoute();
const router = useRouter();

const boardId = computed(() => route.params.id as string);

const goBackToBoard = async () => {
  await router.push(`/kanban/${boardId.value}`);
};

const openReference = async (reference: AssetReferenceLocation) => {
  await router.push({
    path: `/kanban/${reference.boardId}`,
    query: {
      cardId: reference.cardId,
      columnId: reference.columnId,
    },
  });
};
</script>

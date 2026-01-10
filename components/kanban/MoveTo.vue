<template>
<ContextMenuSub>
  <ContextMenuSubTrigger
    :class="contextMenuItemClass + ' pr-0'"
    value="Move to"
  >
    <div>
        {{ $t('general.moveTo') }}
    </div>
    <ChevronRightIcon class="size-4" />
  </ContextMenuSubTrigger>
  <ContextMenuSubContent
    :class="contextMenuClass"
    :side-offset="6"
    :align-offset="-5"
  >
    <ContextMenuSub v-for="board in mappedBoards" :key="board.id">
      <ContextMenuSubTrigger
        :class="contextMenuItemClass + ' pr-0'"
      >
        <div>
          {{ board.title }}
          {{ board.isCurrent ? ' (current)' : '' }}
        </div>
        <ChevronRightIcon class="size-4" />
      </ContextMenuSubTrigger>
      <ContextMenuPortal to=".default-layout">
        <ContextMenuSubContent
          :class="contextMenuClass"
          :side-offset="6"
          :align-offset="-5"
        >
          <ContextMenuItem
            v-for="column in mappedColumns[board.id]"
            :key="column.id"
            :disabled="column.isCurrent"
            :class="contextMenuItemClass + ` ${column.isCurrent ? 'opacity-50 cursor-not-allowed' : ''}`"
            @click="handleMoveCard(board.id, column.id)"
          >
            <div>
                {{ column.title }}
                {{ column.isCurrent ? ' (current)' : '' }}
            </div>
          </ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuPortal>
    </ContextMenuSub>
  </ContextMenuSubContent>
</ContextMenuSub>
</template>

<script setup lang="ts">
import type { Card } from "@/types/kanban-types";
import { ChevronRightIcon } from "@heroicons/vue/24/solid";

import {
  ContextMenuItem,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "radix-vue";

import {
    useContextMenuClasses
} from "@/composables/useContextMenuClasses";

const props = defineProps<{
  card: Card;
}>();

const { contextMenuClass, contextMenuItemClass } = useContextMenuClasses();

const route = useRoute();
const currentBoardId = route.params.id as string;

const columnId = inject<string>('columnId')!;

const boardsStore = useBoardsStore();
const { boards } = storeToRefs(boardsStore);

const handleMoveCard = (targetBoardId: string, targetColumnId: string) => {
    if (props.card.id === undefined) return;
    boardsStore.moveCard(currentBoardId, targetBoardId, columnId, targetColumnId, props.card.id);
}

const mappedBoards = computed(() => {
  return boards.value.map((board) => ({
    id: board.id,
    title: board.title,
    isCurrent: board.id === currentBoardId,
  }));
});

const mappedColumns = computed(() => {
  const result = {} as Record<
    string,
    Array<{ id: string; title: string; isCurrent?: boolean }>
  >;
  for (const board of boards.value) {
    result[board.id] = board.columns.map((col) => ({
      id: col.id,
      title: col.title,
      isCurrent: col.id === columnId && board.id === currentBoardId,
    }));
  }
  return result;
});
</script>

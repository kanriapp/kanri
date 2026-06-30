<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev> -->
<!-- -->
<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

<template>
  <main
    v-if="boardContent"
    :class="standalone
      ? 'bg-primary h-screen overflow-hidden p-6'
      : 'flex h-[80vh] w-[76rem] max-w-[92vw] flex-col overflow-hidden pl-2 pr-2'"
  >
    <div class="mb-5 flex items-center justify-between gap-4">
      <div class="flex min-w-0 items-center gap-3">
        <button
          v-if="showClose"
          class="bg-elevation-2-hover rounded-md p-2"
          :title="standalone ? $t('components.kanban.assetLibrary.backToBoard') : $t('components.kanban.assetLibrary.closeFiles')"
          @click="$emit('close')"
        >
          <ArrowLeftIcon v-if="standalone" class="size-5" />
          <XMarkIcon v-else class="size-5" />
        </button>
        <div class="min-w-0">
          <h1 class="text-no-overflow text-3xl font-bold">{{ boardContent.title }}</h1>
          <p class="text-dim-2 text-sm">{{ $t("components.kanban.assetLibrary.title") }}</p>
        </div>
      </div>
      <span class="text-dim-2 shrink-0 text-sm">
        {{ $t("components.kanban.assetLibrary.fileCount", { shown: filteredAssets.length, total: assets.length }) }}
      </span>
    </div>

    <div
      :class="standalone
        ? 'grid h-[calc(100vh-7.5rem)] grid-cols-[minmax(22rem,0.9fr)_minmax(24rem,1.1fr)] gap-4 max-lg:grid-cols-1'
        : 'grid min-h-0 flex-1 grid-cols-[minmax(18rem,0.9fr)_minmax(22rem,1.1fr)] gap-4 max-lg:grid-cols-1'"
    >
      <section class="flex min-h-0 flex-col">
        <div class="mb-3 grid grid-cols-[1fr_auto_auto] gap-2 max-sm:grid-cols-1">
          <label class="bg-elevation-1 border-elevation-3 flex items-center gap-2 rounded-md border px-3 py-2">
            <MagnifyingGlassIcon class="text-dim-2 size-4" />
            <input
              v-model="search"
              class="min-w-0 flex-1 bg-transparent outline-none"
              :placeholder="$t('components.kanban.assetLibrary.searchPlaceholder')"
              type="search"
            >
          </label>
          <select v-model="typeFilter" class="bg-elevation-1 border-elevation-3 rounded-md border px-3 py-2 outline-none">
            <option value="all">{{ $t("components.kanban.assetLibrary.allTypes") }}</option>
            <option value="image">{{ $t("components.kanban.attachments.fileTypes.image") }}</option>
            <option value="pdf">{{ $t("components.kanban.attachments.fileTypes.pdf") }}</option>
            <option value="document">{{ $t("components.kanban.attachments.fileTypes.document") }}</option>
            <option value="spreadsheet">{{ $t("components.kanban.attachments.fileTypes.spreadsheet") }}</option>
            <option value="other">{{ $t("components.kanban.attachments.fileTypes.other") }}</option>
          </select>
          <select v-model="referenceFilter" class="bg-elevation-1 border-elevation-3 rounded-md border px-3 py-2 outline-none">
            <option value="all">{{ $t("components.kanban.assetLibrary.allReferences") }}</option>
            <option value="referenced">{{ $t("components.kanban.assetLibrary.referenced") }}</option>
            <option value="unreferenced">{{ $t("components.kanban.assetLibrary.unreferenced") }}</option>
          </select>
        </div>

        <div class="mb-3 flex flex-wrap items-center justify-between gap-2">
          <label class="bg-elevation-1 border-elevation-3 flex items-center gap-2 rounded-md border px-3 py-2 text-sm">
            <input
              ref="selectAllInput"
              class="accent-accent size-4"
              type="checkbox"
              :checked="allFilteredSelected"
              :disabled="filteredAssets.length === 0"
              @change="toggleAllFiltered"
            >
            <span>{{ $t("components.kanban.assetLibrary.selectAll") }}</span>
          </label>
          <div class="flex flex-wrap items-center justify-end gap-2">
            <span class="text-dim-2 text-sm">
              {{ $t("components.kanban.assetLibrary.selectedCount", { count: selectedAssets.length }) }}
            </span>
            <button
              class="rounded-md px-3 py-2 text-sm text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
              :class="selectedAssets.length > 0 ? 'bg-elevation-2-hover' : 'bg-elevation-2'"
              :disabled="selectedAssets.length === 0"
              @click="deleteSelectedAssets"
            >
              <TrashIcon class="mr-1 inline size-4" />
              {{ $t("components.kanban.assetLibrary.deleteSelected") }}
            </button>
          </div>
        </div>

        <div class="custom-scrollbar min-h-0 flex-1 overflow-y-auto">
          <div
            v-for="asset in filteredAssets"
            :key="asset.id"
            class="bg-elevation-1-hover border-elevation-3 mb-2 grid w-full grid-cols-[auto_3rem_1fr_auto] items-center gap-3 rounded-md border p-2 text-left transition-colors duration-150"
            :class="{ 'border-accent': selectedAsset?.id === asset.id, 'ring-accent/40 ring-1': isAssetSelected(asset.id) }"
            role="button"
            tabindex="0"
            @click="selectedAssetId = asset.id"
            @keydown.enter.prevent="selectedAssetId = asset.id"
            @keydown.space.prevent="selectedAssetId = asset.id"
          >
            <input
              class="accent-accent size-4"
              type="checkbox"
              :checked="isAssetSelected(asset.id)"
              :aria-label="$t('components.kanban.assetLibrary.selectFileNamed', { name: asset.name })"
              @click.stop
              @change="toggleAssetSelection(asset.id)"
            >
            <div class="bg-elevation-2 flex size-12 items-center justify-center overflow-hidden rounded">
              <img
                v-if="asset.kind === 'image' && previewUrls[asset.id]"
                :src="previewUrls[asset.id]"
                class="size-full object-cover"
                alt=""
              >
              <DocumentIcon v-else class="text-dim-2 size-6" />
            </div>
            <div class="min-w-0">
              <p class="text-no-overflow font-medium">{{ asset.name }}</p>
              <p class="text-dim-2 text-xs">
                {{ fileKindLabel(asset.kind) }} - {{ formatFileSize(asset.size) }}
              </p>
            </div>
            <div class="flex flex-col items-end gap-1">
              <span
                class="rounded-sm border px-1.5 py-0.5 text-xs"
                :class="assetTypeClass(asset)"
              >
                {{ statusLabel(asset.status || "available") }}
              </span>
              <span class="text-dim-2 text-xs">
                {{ $t("components.kanban.assetLibrary.referencesShort", { count: referenceCount(asset.id) }) }}
              </span>
            </div>
          </div>
          <div
            v-if="filteredAssets.length === 0"
            class="text-dim-2 bg-elevation-1 rounded-md p-5 text-center"
          >
            {{ $t("components.kanban.assetLibrary.noMatches") }}
          </div>
        </div>
      </section>

      <section class="bg-elevation-1 flex min-h-0 flex-col rounded-md p-4">
        <template v-if="selectedAsset">
          <div class="mb-4 flex items-start justify-between gap-3">
            <div class="min-w-0">
              <h2 class="text-no-overflow text-xl font-bold">{{ selectedAsset.name }}</h2>
              <p class="text-dim-2 text-sm">{{ selectedAsset.sha256 }}</p>
            </div>
            <span class="rounded-sm border px-2 py-1 text-xs" :class="assetTypeClass(selectedAsset)">
              {{ fileKindLabel(selectedAsset.kind) }}
            </span>
          </div>

          <div class="bg-elevation-2 mb-4 flex min-h-56 items-center justify-center overflow-hidden rounded-md">
            <img
              v-if="selectedAsset.kind === 'image' && selectedPreviewUrl"
              :src="selectedPreviewUrl"
              class="max-h-[22rem] max-w-full object-contain"
              alt=""
            >
            <div v-else class="text-dim-2 flex flex-col items-center gap-2">
              <DocumentIcon class="size-10" />
              <span>{{ $t("components.kanban.assetLibrary.previewLabel", { type: fileKindLabel(selectedAsset.kind) }) }}</span>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 text-sm max-sm:grid-cols-1">
            <p><span class="text-dim-2">{{ $t("components.kanban.assetLibrary.size") }}:</span> {{ formatFileSize(selectedAsset.size) }}</p>
            <p><span class="text-dim-2">{{ $t("components.kanban.assetLibrary.mime") }}:</span> {{ selectedAsset.mimeType || "-" }}</p>
            <p><span class="text-dim-2">{{ $t("components.kanban.assetLibrary.created") }}:</span> {{ formatDate(selectedAsset.createdAt) }}</p>
            <p><span class="text-dim-2">{{ $t("components.kanban.assetLibrary.references") }}:</span> {{ selectedReferences.length }}</p>
          </div>

          <div class="mt-4 flex flex-wrap gap-2">
            <button class="text-buttons bg-accent rounded-md px-4 py-2" @click="openSelectedAsset">
              <FolderOpenIcon class="mr-1 inline size-4" />
              {{ $t("general.openAction") }}
            </button>
            <button class="bg-elevation-2-hover rounded-md px-4 py-2" @click="copySelectedAssetPath">
              <ClipboardDocumentIcon class="mr-1 inline size-4" />
              {{ $t("components.kanban.assetLibrary.copyPath") }}
            </button>
            <button
              class="rounded-md px-4 py-2 text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
              :class="selectedReferences.length === 0 ? 'bg-elevation-2-hover' : 'bg-elevation-2'"
              :disabled="selectedReferences.length > 0"
              @click="deleteSelectedAsset"
            >
              <TrashIcon class="mr-1 inline size-4" />
              {{ $t("general.deleteAction") }}
            </button>
          </div>

          <div class="border-elevation-3 mt-5 min-h-0 flex-1 overflow-y-auto border-t pt-4">
            <h3 class="mb-2 font-semibold">{{ $t("components.kanban.assetLibrary.references") }}</h3>
            <div v-if="selectedReferences.length === 0" class="text-dim-2 text-sm">
              {{ $t("components.kanban.assetLibrary.noReferences") }}
            </div>
            <button
              v-for="reference in selectedReferences"
              :key="reference.attachmentRefId"
              class="bg-elevation-2-hover mb-2 block w-full rounded-md p-3 text-left"
              @click="openReference(reference)"
            >
              <p class="font-medium">{{ reference.cardName }}</p>
              <p class="text-dim-2 text-sm">
                {{ reference.columnTitle }} - {{ referenceLocationLabel(reference.location) }}{{ reference.taskName ? ` - ${reference.taskName}` : "" }}
              </p>
            </button>
          </div>
        </template>
        <div v-else class="text-dim-2 flex h-full items-center justify-center">
          {{ $t("components.kanban.assetLibrary.selectFile") }}
        </div>
      </section>
    </div>
  </main>
  <div v-else class="flex h-screen w-screen items-center justify-center" />
</template>

<script setup lang="ts">
import type { BoardAsset } from "@/types/kanban-types";
import type { AssetReferenceLocation } from "@/utils/assetReferences";

import { useAttachments } from "@/composables/useAttachments";
import { useBoard } from "@/composables/useBoard";
import { useBoardsStore } from "@/stores/boards";
import { findBoardAssetReferences } from "@/utils/assetReferences";
import {
  assetTypeClass,
  deleteBlob,
  formatFileSize,
  getAssetAbsolutePath,
} from "@/utils/attachments";
import {
  ArrowLeftIcon,
  ClipboardDocumentIcon,
  DocumentIcon,
  FolderOpenIcon,
  MagnifyingGlassIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import { ask, message } from "@tauri-apps/plugin-dialog";
import { useDebounce } from "@vueuse/core";
import { useI18n } from "vue-i18n";

const props = withDefaults(
  defineProps<{
    boardId: string;
    showClose?: boolean;
    standalone?: boolean;
  }>(),
  {
    showClose: true,
    standalone: false,
  }
);

const emit = defineEmits<{
  (e: "close"): void;
  (e: "openReference", reference: AssetReferenceLocation): void;
}>();

const boardsStore = useBoardsStore();
const board = useBoard(computed(() => props.boardId));
const { board: boardContent } = board;
const { openAsset, resolveAssetUrl } = useAttachments();
const { locale, t } = useI18n();

const search = ref("");
const debouncedSearch = useDebounce(search, 200);
const referenceFilter = ref("all");
const selectedAssetId = ref("");
const selectedAssetIds = ref<string[]>([]);
const selectedPreviewUrl = ref("");
const selectAllInput = ref<HTMLInputElement | null>(null);
const previewUrls = reactive<Record<string, string>>({});
const typeFilter = ref("all");

const assets = computed(() => boardContent.value?.assets || []);

const referenceCount = (assetId: string) => {
  return findBoardAssetReferences(boardContent.value, assetId).length;
};

const filteredAssets = computed(() => {
  const query = debouncedSearch.value.trim().toLowerCase();
  return assets.value.filter((asset) => {
    if (typeFilter.value !== "all" && asset.kind !== typeFilter.value) return false;

    const refs = referenceCount(asset.id);
    if (referenceFilter.value === "referenced" && refs === 0) return false;
    if (referenceFilter.value === "unreferenced" && refs > 0) return false;

    if (!query) return true;
    return [
      asset.name,
      asset.kind,
      asset.mimeType || "",
      asset.sha256,
      asset.status || "",
    ].join(" ").toLowerCase().includes(query);
  });
});

const selectedAsset = computed(() => {
  return filteredAssets.value.find(asset => asset.id === selectedAssetId.value) || filteredAssets.value[0] || null;
});

const selectedReferences = computed(() => {
  if (!selectedAsset.value) return [];
  return findBoardAssetReferences(boardContent.value, selectedAsset.value.id);
});

const filteredAssetIds = computed(() => filteredAssets.value.map(asset => asset.id));

const selectedAssets = computed(() => {
  const selectedIds = new Set(selectedAssetIds.value);
  return assets.value.filter(asset => selectedIds.has(asset.id));
});

const selectedDeletableAssets = computed(() => {
  return selectedAssets.value.filter(asset => referenceCount(asset.id) === 0);
});

const selectedReferencedCount = computed(() => {
  return selectedAssets.value.length - selectedDeletableAssets.value.length;
});

const allFilteredSelected = computed(() => {
  return filteredAssetIds.value.length > 0 &&
    filteredAssetIds.value.every(assetId => selectedAssetIds.value.includes(assetId));
});

const someFilteredSelected = computed(() => {
  return filteredAssetIds.value.some(assetId => selectedAssetIds.value.includes(assetId));
});

const formatDate = (value: Date | string | null | undefined) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString(locale.value.replace("_", "-"));
};

const showLibraryError = async (action: string, error: unknown) => {
  await message(t("components.kanban.assetLibrary.actionFailed", {
    action,
    error: error instanceof Error ? error.message : String(error),
  }), {
    kind: "warning",
    title: "Kanri",
  });
};

const fileKindLabel = (kind: BoardAsset["kind"]) => {
  return t(`components.kanban.attachments.fileTypes.${kind}`);
};

const statusLabel = (status: NonNullable<BoardAsset["status"]>) => {
  return t(`components.kanban.attachments.status.${status}`);
};

const referenceLocationLabel = (location: AssetReferenceLocation["location"]) => {
  return t(`components.kanban.assetLibrary.locations.${location}`);
};

const isAssetSelected = (assetId: string) => {
  return selectedAssetIds.value.includes(assetId);
};

const toggleAssetSelection = (assetId: string) => {
  selectedAssetIds.value = isAssetSelected(assetId)
    ? selectedAssetIds.value.filter(id => id !== assetId)
    : [...selectedAssetIds.value, assetId];
};

const toggleAllFiltered = () => {
  const visibleIds = filteredAssetIds.value;
  if (visibleIds.length === 0) return;

  if (allFilteredSelected.value) {
    selectedAssetIds.value = selectedAssetIds.value.filter(id => !visibleIds.includes(id));
    return;
  }

  selectedAssetIds.value = Array.from(new Set([...selectedAssetIds.value, ...visibleIds]));
};

const loadPreview = async (asset: BoardAsset) => {
  if (asset.kind !== "image") return;
  if (!previewUrls[asset.id]) {
    previewUrls[asset.id] = await resolveAssetUrl(asset);
  }
};

watch(
  filteredAssets,
  (nextAssets) => {
    const currentAssetIds = new Set(assets.value.map(asset => asset.id));
    selectedAssetIds.value = selectedAssetIds.value.filter(assetId => currentAssetIds.has(assetId));

    if (!nextAssets.some(asset => asset.id === selectedAssetId.value)) {
      selectedAssetId.value = nextAssets[0]?.id || "";
    }
    nextAssets.filter(asset => asset.kind === "image").slice(0, 12).forEach(asset => {
      void loadPreview(asset);
    });
  },
  { immediate: true }
);

watch(
  [allFilteredSelected, someFilteredSelected],
  () => {
    if (!selectAllInput.value) return;
    selectAllInput.value.indeterminate = someFilteredSelected.value && !allFilteredSelected.value;
  },
  { immediate: true }
);

watch(
  selectedAsset,
  async (asset) => {
    selectedPreviewUrl.value = "";
    if (!asset) return;
    await loadPreview(asset);
    selectedPreviewUrl.value = previewUrls[asset.id] || "";
  },
  { immediate: true }
);

watch(
  () => props.boardId,
  async () => {
    selectedAssetId.value = "";
    selectedAssetIds.value = [];
    selectedPreviewUrl.value = "";
    await board.init();
  }
);

onMounted(async () => {
  await board.init();
});

const openSelectedAsset = async () => {
  if (!selectedAsset.value) return;
  try {
    await openAsset(selectedAsset.value);
  } catch (error) {
    await showLibraryError(t("components.kanban.assetLibrary.openingFile"), error);
  }
};

const copySelectedAssetPath = async () => {
  if (!selectedAsset.value) return;
  try {
    await navigator.clipboard.writeText(await getAssetAbsolutePath(selectedAsset.value));
    await message(t("components.kanban.assetLibrary.pathCopied"), {
      kind: "info",
      title: "Kanri",
    });
  } catch (error) {
    await showLibraryError(t("components.kanban.assetLibrary.copyingPath"), error);
  }
};

const remainingAssetMetadataForBlob = (asset: BoardAsset) => {
  return boardsStore.boards.reduce((total, currentBoard) => {
    return total + (currentBoard.assets || []).filter(item =>
      item.blobPath === asset.blobPath && item.id !== asset.id
    ).length;
  }, 0);
};

const removeAssetAndCleanupBlob = async (asset: BoardAsset) => {
  const removed = board.removeBoardAsset(asset.id);
  if (!removed) return false;

  if (remainingAssetMetadataForBlob(asset) === 0) {
    try {
      await deleteBlob(asset.blobPath);
    } catch (error) {
      await message(t("components.kanban.assetLibrary.blobCleanupFailed", {
        error: String(error),
      }), {
        kind: "warning",
      });
    }
  }

  return true;
};

const deleteSelectedAsset = async () => {
  const asset = selectedAsset.value;
  if (!asset) return;
  try {
    if (selectedReferences.value.length > 0) {
      await message(t("components.kanban.assetLibrary.deleteReferencedWarning"), {
        kind: "warning",
      });
      return;
    }

    const confirmed = await ask(t("components.kanban.assetLibrary.deleteConfirmation", { name: asset.name }), {
      kind: "warning",
      title: "Kanri",
    });
    if (!confirmed) return;

    const removed = await removeAssetAndCleanupBlob(asset);
    if (!removed) {
      await message(t("components.kanban.assetLibrary.removeReferencedWarning"), {
        kind: "warning",
      });
      return;
    }

    selectedAssetIds.value = selectedAssetIds.value.filter(assetId => assetId !== asset.id);
    selectedAssetId.value = filteredAssets.value[0]?.id || "";
    await message(t("components.kanban.assetLibrary.fileRemoved"), {
      kind: "info",
      title: "Kanri",
    });
  } catch (error) {
    await showLibraryError(t("components.kanban.assetLibrary.deletingFile"), error);
  }
};

const deleteSelectedAssets = async () => {
  if (selectedAssets.value.length === 0) return;

  try {
    const deletableAssets = selectedDeletableAssets.value;
    const skippedCount = selectedReferencedCount.value;

    if (deletableAssets.length === 0) {
      await message(t("components.kanban.assetLibrary.batchDeleteAllReferenced"), {
        kind: "warning",
        title: "Kanri",
      });
      return;
    }

    const confirmed = await ask(t("components.kanban.assetLibrary.batchDeleteConfirmation", {
      count: deletableAssets.length,
      skipped: skippedCount,
    }), {
      kind: "warning",
      title: "Kanri",
    });
    if (!confirmed) return;

    let removedCount = 0;
    const removedIds = new Set<string>();
    for (const asset of deletableAssets) {
      if (await removeAssetAndCleanupBlob(asset)) {
        removedCount++;
        removedIds.add(asset.id);
      }
    }

    selectedAssetIds.value = selectedAssetIds.value.filter(assetId => !removedIds.has(assetId));
    selectedAssetId.value = filteredAssets.value[0]?.id || "";

    await message(t("components.kanban.assetLibrary.batchDeleteCompleted", {
      count: removedCount,
      skipped: skippedCount,
    }), {
      kind: "info",
      title: "Kanri",
    });
  } catch (error) {
    await showLibraryError(t("components.kanban.assetLibrary.deletingFiles"), error);
  }
};

const openReference = async (reference: AssetReferenceLocation) => {
  if (!reference.cardId || !reference.columnId) {
    await message(t("components.kanban.assetLibrary.referenceMissingMetadata"), {
      kind: "warning",
      title: "Kanri",
    });
    return;
  }

  emit("openReference", reference);
};
</script>

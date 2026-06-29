<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev> -->
<!-- -->
<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

<template>
  <main v-if="boardContent" class="bg-primary h-screen overflow-hidden p-6">
    <div class="mb-5 flex items-center justify-between gap-4">
      <div class="flex min-w-0 items-center gap-3">
        <button
          class="bg-elevation-2-hover rounded-md p-2"
          title="Back to board"
          @click="router.push(`/kanban/${boardContent.id}`)"
        >
          <ArrowLeftIcon class="size-5" />
        </button>
        <div class="min-w-0">
          <h1 class="text-no-overflow text-3xl font-bold">{{ boardContent.title }}</h1>
          <p class="text-dim-2 text-sm">Board library</p>
        </div>
      </div>
      <span class="text-dim-2 text-sm">{{ filteredAssets.length }} / {{ assets.length }} files</span>
    </div>

    <div class="grid h-[calc(100vh-7.5rem)] grid-cols-[minmax(22rem,0.9fr)_minmax(24rem,1.1fr)] gap-4 max-lg:grid-cols-1">
      <section class="flex min-h-0 flex-col">
        <div class="mb-3 grid grid-cols-[1fr_auto_auto] gap-2 max-sm:grid-cols-1">
          <label class="bg-elevation-1 border-elevation-3 flex items-center gap-2 rounded-md border px-3 py-2">
            <MagnifyingGlassIcon class="text-dim-2 size-4" />
            <input
              v-model="search"
              class="min-w-0 flex-1 bg-transparent outline-none"
              placeholder="Search name, type, sha256"
              type="search"
            >
          </label>
          <select v-model="typeFilter" class="bg-elevation-1 border-elevation-3 rounded-md border px-3 py-2 outline-none">
            <option value="all">All types</option>
            <option value="image">Images</option>
            <option value="pdf">PDF</option>
            <option value="document">Documents</option>
            <option value="spreadsheet">Spreadsheets</option>
            <option value="other">Other</option>
          </select>
          <select v-model="referenceFilter" class="bg-elevation-1 border-elevation-3 rounded-md border px-3 py-2 outline-none">
            <option value="all">All refs</option>
            <option value="referenced">Referenced</option>
            <option value="unreferenced">Unreferenced</option>
          </select>
        </div>

        <div class="custom-scrollbar min-h-0 flex-1 overflow-y-auto">
          <button
            v-for="asset in filteredAssets"
            :key="asset.id"
            class="bg-elevation-1-hover border-elevation-3 mb-2 grid w-full grid-cols-[3rem_1fr_auto] items-center gap-3 rounded-md border p-2 text-left transition-colors duration-150"
            :class="{ 'border-accent': selectedAsset?.id === asset.id }"
            @click="selectedAssetId = asset.id"
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
                {{ fileTypeLabel(asset.kind) }} - {{ formatFileSize(asset.size) }}
              </p>
            </div>
            <div class="flex flex-col items-end gap-1">
              <span
                class="rounded-sm border px-1.5 py-0.5 text-xs"
                :class="assetTypeClass(asset)"
              >
                {{ asset.status || "available" }}
              </span>
              <span class="text-dim-2 text-xs">{{ referenceCount(asset.id) }} refs</span>
            </div>
          </button>
          <div
            v-if="filteredAssets.length === 0"
            class="text-dim-2 bg-elevation-1 rounded-md p-5 text-center"
          >
            No files match the current filters.
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
              {{ fileTypeLabel(selectedAsset.kind) }}
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
              <span>{{ fileTypeLabel(selectedAsset.kind) }} preview</span>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 text-sm max-sm:grid-cols-1">
            <p><span class="text-dim-2">Size:</span> {{ formatFileSize(selectedAsset.size) }}</p>
            <p><span class="text-dim-2">MIME:</span> {{ selectedAsset.mimeType || "-" }}</p>
            <p><span class="text-dim-2">Created:</span> {{ formatDate(selectedAsset.createdAt) }}</p>
            <p><span class="text-dim-2">References:</span> {{ selectedReferences.length }}</p>
          </div>

          <div class="mt-4 flex flex-wrap gap-2">
            <button class="text-buttons bg-accent rounded-md px-4 py-2" @click="openSelectedAsset">
              <FolderOpenIcon class="mr-1 inline size-4" />
              Open
            </button>
            <button class="bg-elevation-2-hover rounded-md px-4 py-2" @click="copySelectedAssetPath">
              <ClipboardDocumentIcon class="mr-1 inline size-4" />
              Copy path
            </button>
            <button
              class="rounded-md px-4 py-2 text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
              :class="selectedReferences.length === 0 ? 'bg-elevation-2-hover' : 'bg-elevation-2'"
              :disabled="selectedReferences.length > 0"
              @click="deleteSelectedAsset"
            >
              <TrashIcon class="mr-1 inline size-4" />
              Delete
            </button>
          </div>

          <div class="border-elevation-3 mt-5 min-h-0 flex-1 overflow-y-auto border-t pt-4">
            <h3 class="mb-2 font-semibold">References</h3>
            <div v-if="selectedReferences.length === 0" class="text-dim-2 text-sm">
              This file is not attached to any card or task on this board.
            </div>
            <button
              v-for="reference in selectedReferences"
              :key="reference.attachmentRefId"
              class="bg-elevation-2-hover mb-2 block w-full rounded-md p-3 text-left"
              @click="openReference(reference)"
            >
              <p class="font-medium">{{ reference.cardName }}</p>
              <p class="text-dim-2 text-sm">
                {{ reference.columnTitle }} - {{ reference.location }}{{ reference.taskName ? ` - ${reference.taskName}` : "" }}
              </p>
            </button>
          </div>
        </template>
        <div v-else class="text-dim-2 flex h-full items-center justify-center">
          Select a file to preview.
        </div>
      </section>
    </div>
  </main>
  <div v-else class="flex h-screen w-screen items-center justify-center"/>
</template>

<script setup lang="ts">
import type { AssetReferenceLocation } from "@/utils/assetReferences";
import type { BoardAsset } from "@/types/kanban-types";
import { useBoard } from "@/composables/useBoard";
import { useAttachments } from "@/composables/useAttachments";
import { useBoardsStore } from "@/stores/boards";
import { findBoardAssetReferences } from "@/utils/assetReferences";
import {
  assetTypeClass,
  deleteBlob,
  fileTypeLabel,
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
} from "@heroicons/vue/24/outline";
import { ask, message } from "@tauri-apps/plugin-dialog";
import { useDebounce } from "@vueuse/core";

const route = useRoute();
const router = useRouter();
const boardsStore = useBoardsStore();
const board = useBoard(computed(() => route.params.id as string));
const { board: boardContent } = board;
const { openAsset, resolveAssetUrl } = useAttachments();

const search = ref("");
const debouncedSearch = useDebounce(search, 200);
const referenceFilter = ref("all");
const selectedAssetId = ref("");
const selectedPreviewUrl = ref("");
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

const formatDate = (value: Date | string | null | undefined) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString();
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
  selectedAsset,
  async (asset) => {
    selectedPreviewUrl.value = "";
    if (!asset) return;
    await loadPreview(asset);
    selectedPreviewUrl.value = previewUrls[asset.id] || "";
  },
  { immediate: true }
);

onMounted(async () => {
  await board.init();
  if (!boardContent.value) {
    await router.push("/");
  }
});

const openSelectedAsset = async () => {
  if (!selectedAsset.value) return;
  await openAsset(selectedAsset.value);
};

const copySelectedAssetPath = async () => {
  if (!selectedAsset.value) return;
  await navigator.clipboard.writeText(await getAssetAbsolutePath(selectedAsset.value));
};

const remainingAssetMetadataForBlob = (asset: BoardAsset) => {
  return boardsStore.boards.reduce((total, currentBoard) => {
    return total + (currentBoard.assets || []).filter(item =>
      item.blobPath === asset.blobPath && item.id !== asset.id
    ).length;
  }, 0);
};

const deleteSelectedAsset = async () => {
  const asset = selectedAsset.value;
  if (!asset) return;
  if (selectedReferences.value.length > 0) {
    await message("This file is still referenced by cards or tasks and cannot be deleted.", {
      kind: "warning",
    });
    return;
  }

  const confirmed = await ask(`Delete "${asset.name}" from this board library?`, {
    kind: "warning",
    title: "Kanri",
  });
  if (!confirmed) return;

  const removed = board.removeBoardAsset(asset.id);
  if (!removed) {
    await message("The file could not be removed because it is still referenced.", {
      kind: "warning",
    });
    return;
  }

  if (remainingAssetMetadataForBlob(asset) === 0) {
    try {
      await deleteBlob(asset.blobPath);
    } catch (error) {
      await message(`Library entry removed, but blob cleanup failed: ${String(error)}`, {
        kind: "warning",
      });
    }
  }

  selectedAssetId.value = filteredAssets.value[0]?.id || "";
};

const openReference = async (reference: AssetReferenceLocation) => {
  if (!reference.cardId || !reference.columnId) return;
  await router.push({
    path: `/kanban/${reference.boardId}`,
    query: {
      cardId: reference.cardId,
      columnId: reference.columnId,
    },
  });
};
</script>

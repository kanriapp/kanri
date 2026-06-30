<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev> -->
<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

<template>
  <section
    class="border-elevation-2 bg-elevation-1/50 rounded-md border p-2"
    :class="{ 'border-accent bg-elevation-2/60': isDragging }"
    @dragenter.prevent="isDragging = true"
    @dragover.prevent="isDragging = true"
    @dragleave.prevent="isDragging = false"
    @drop.prevent="handleDrop"
  >
    <div class="mb-2 flex items-center justify-between gap-3">
      <div class="flex min-w-0 items-center gap-2">
        <PaperClipIcon class="text-dim-2 size-4 shrink-0" />
        <h3 class="text-sm font-semibold">{{ title || $t("components.kanban.attachments.title") }}</h3>
        <span v-if="attachments.length" class="text-dim-2 text-xs">{{ attachments.length }}</span>
      </div>
      <button
        v-if="editable"
        class="bg-elevation-2 bg-elevation-3-hover rounded-md px-2 py-0.5 text-xs"
        @click="selectFiles"
      >
        {{ $t("general.addAction") }}
      </button>
    </div>

    <div
      v-if="attachments.length === 0"
      class="border-current/30 text-dim-2 flex min-h-16 items-center justify-center rounded border border-dashed px-2 py-4 text-center text-sm"
    >
      {{ $t("components.kanban.attachments.dropFiles") }}
    </div>

    <div v-else class="flex flex-col gap-1.5">
      <div
        v-for="attachment in attachments"
        :key="attachment.id"
        class="bg-elevation-2 flex min-h-12 items-center gap-2 rounded-md p-1.5"
      >
        <div
          class="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded border"
          :class="assetClass(assetFor(attachment))"
        >
          <img
            v-if="assetFor(attachment)?.kind === 'image' && assetUrls[attachment.assetId]"
            :src="assetUrls[attachment.assetId]"
            alt=""
            class="size-full object-cover"
          >
          <PhotoIcon
            v-else-if="assetFor(attachment)?.kind === 'image'"
            class="size-5"
          />
          <DocumentIcon v-else class="size-5" />
        </div>

        <button
          class="min-w-0 flex-1 text-left"
          @click="openAttachment(assetFor(attachment))"
        >
          <span class="block truncate text-sm font-medium">
            {{ assetFor(attachment)?.name || $t("components.kanban.attachments.missingAttachment") }}
          </span>
          <span class="text-dim-2 block truncate text-xs">
            {{ fileKindLabel(assetFor(attachment)?.kind || "other") }}
            <span v-if="assetFor(attachment)"> - {{ formatFileSize(assetFor(attachment)?.size) }}</span>
          </span>
        </button>

        <button
          v-if="allowInlineImages && assetFor(attachment)?.kind === 'image'"
          class="bg-elevation-3-hover rounded-md px-2 py-1 text-xs"
          :title="$t('components.kanban.attachments.insertImage')"
          @click="$emit('insertImage', attachment)"
        >
          {{ $t("components.kanban.attachments.insert") }}
        </button>
        <button
          v-if="editable"
          class="text-dim-2 text-accent-hover rounded-md p-1"
          :title="$t('components.kanban.attachments.removeAttachment')"
          @click="$emit('remove', attachment)"
        >
          <XMarkIcon class="size-4" />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { AttachmentRef, BoardAsset } from "@/types/kanban-types";
import { assetTypeClass, formatFileSize } from "@/utils/attachments";
import { DocumentIcon, PaperClipIcon, PhotoIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { useI18n } from "vue-i18n";

const props = withDefaults(defineProps<{
  allowInlineImages?: boolean;
  assets: BoardAsset[];
  attachments: AttachmentRef[];
  editable?: boolean;
  title?: string;
}>(), {
  allowInlineImages: false,
  editable: true,
  title: "",
});

const emit = defineEmits<{
  (e: "addFiles", paths: string[]): void;
  (e: "insertImage", attachment: AttachmentRef): void;
  (e: "remove", attachment: AttachmentRef): void;
}>();

const { openAsset, pickFiles, resolveAssetUrl } = useAttachments();
const { t } = useI18n();
const isDragging = ref(false);
const assetUrls = reactive<Record<string, string>>({});

const assetFor = (attachment: AttachmentRef) => {
  return props.assets.find(asset => asset.id === attachment.assetId) || null;
};

const assetClass = (asset: BoardAsset | null) => {
  if (!asset) return "border-red-500/50 bg-red-500/10 text-red-300";
  return assetTypeClass(asset);
};

const fileKindLabel = (kind: BoardAsset["kind"]) => {
  return t(`components.kanban.attachments.fileTypes.${kind}`);
};

const refreshImageUrls = async () => {
  for (const attachment of props.attachments) {
    const asset = assetFor(attachment);
    if (!asset || asset.kind !== "image" || assetUrls[asset.id]) continue;
    assetUrls[asset.id] = await resolveAssetUrl(asset);
  }
};

watch(
  () => [props.attachments, props.assets],
  () => {
    void refreshImageUrls();
  },
  { deep: true, immediate: true }
);

const selectFiles = async () => {
  const paths = await pickFiles();
  if (paths.length > 0) emit("addFiles", paths);
};

const handleDrop = (event: DragEvent) => {
  isDragging.value = false;
  const files = Array.from(event.dataTransfer?.files || []);
  const paths = files
    .map(file => ("path" in file ? String((file as File & { path?: string }).path || "") : ""))
    .filter(Boolean);
  if (paths.length > 0) emit("addFiles", paths);
};

const openAttachment = async (asset: BoardAsset | null) => {
  if (!asset) return;
  await openAsset(asset);
};
</script>

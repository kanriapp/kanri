<template>
  <main
    id="tags"
    class="overflow-auto pl-8 pt-8"
  >
    <h1 class="text-4xl font-bold">
      Tags
    </h1>
    <span class="text-dim-3">Create or modify your tags here.</span>

    <section id="tag-list">
      <div class="grid auto-cols-max grid-flow-col">
        <h2 class="mb-2 mr-8 mt-8 text-2xl font-bold">
          Your Tags
        </h2>
        <button
          class="bg-elevation-1 bg-elevation-2-hover border-accent mt-8 cursor-pointer rounded-md border border-dotted p-2"
          @click="createNewTag()"
        >
          <IconPhPlusCircleDuotone class="text-accent size-7" />
        </button>
      </div>
      <div
        v-if="tags" 
        id="current-tags"
      >
        <div
          v-for="tag in tags"
          :key="tag.id"
        >
          <p>{{ tag.tag }}</p>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import type { Tag } from "@/types/kanban-types";

import { useTauriStore } from "@/stores/tauriStore";
import { ref } from "vue";

const tags = ref<Tag[]>([]);
const store = useTauriStore().store;

function createNewTag() {

}

onMounted(async () => {
    emitter.emit("showSidebarBackArrow");

    tags.value = await store.get("tags") || [];
});
</script>
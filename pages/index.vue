<template>
    <div>
        <h1 class="text-red-500">Kanri v0.1.0-alpha</h1>

    </div>
</template>

<script setup>
import { useTauriStore } from "@/stores/tauriStore"
const store = useTauriStore().store

await store.set('some-key', { value: 5 });
const val = await store.get('some-key');
console.log(val)
</script>

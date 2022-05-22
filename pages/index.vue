<template>
    <div>
        <h1 class="text-red-500">Base app with nuxt 3, tauri store and tailwind</h1>
    </div>
</template>

<script setup>
import { useTauriStore } from '@/stores/tauriStore'
const store = useTauriStore().store

await store.set('some-key', { value: 5 });
const val = await store.get('some-key');
console.log(val)
</script>

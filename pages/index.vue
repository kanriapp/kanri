<template>
    <div class="mt-8">
        <h1 class="font-bold text-4xl">Welcome back to Kanri!</h1>
        <h2 class="ml-1 text-dim-3">Your boards are ready and waiting for you.</h2>
    </div>
</template>

<script setup>
import { useTauriStore } from "@/stores/tauriStore"
const store = useTauriStore().store

await store.set('some-key', { value: 5 });
const val = await store.get('some-key');
console.log(val)
</script>

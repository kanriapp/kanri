<template>
    <div>
        <h1 class="text-red-500">Base app with nuxt 3, tauri store and tailwind</h1>
        <h2>{{ count }}</h2>
    </div>
</template>

<script setup>
const count = ref(0);
const increment = () => count.value++;

import { Store } from 'tauri-plugin-store-api';
const store = new Store('.settings.dat');
await store.set('some-key', { value: 5 });
const val = await store.get('some-key');
console.log(val)
</script>

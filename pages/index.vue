<template>
  <div class="flex bg-stone-950 h-screen">
    <h1 class="text-white">Index</h1>
  </div>
</template>

<script setup>
  definePageMeta({
    middleware: ["auth"], // run whatever is in auth.js BEFORE we open index.vue
  });
</script>

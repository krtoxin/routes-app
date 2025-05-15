<template>
  <div class="bg-slate-900 min-h-screen flex flex-col items-center justify-center p-8">
    <div class="text-center text-slate-100 mb-8">
      <h1 class="text-4xl font-bold mb-4">Система маршрутизації документів</h1>
      <p class="text-lg font-normal text-slate-300 mb-6">
        Створюйте та керуйте маршрутами ваших документів
      </p>

      <UButton icon="i-lucide-file-route" size="lg" color="primary" @click="showCreateRouteModal = true">
        Створити маршрут
      </UButton>
    </div>

    <CreateRoute v-if="showCreateRouteModal" @close="showCreateRouteModal = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CreateRoute from '~/components/CreateRoute.vue'
const showCreateRouteModal = ref(false)
</script>

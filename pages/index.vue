<template>
  <div class="bg-slate-900 min-h-screen flex flex-col items-center justify-center p-8">
    <div class="text-center text-slate-100 mb-8">
      <h1 class="text-4xl font-bold mb-4">Система маршрутизації документів</h1>
      <p class="text-lg font-normal text-slate-300 mb-6">
        Створюйте та керуйте маршрутами ваших документів
      </p>

      <button
          class="create-route-button"
          title="Створити новий маршрут документа"
          @click="showCreateRouteModal = true"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
          <polyline points="14 2 14 8 20 8"/>
          <circle cx="10" cy="13" r="2"/>
          <path d="M7 18h.01"/>
          <path d="m14.25 13.15 2.5 2"/>
          <path d="M16.5 17.5a2 2 0 1 0 4 0 2 2 0 1 0-4 0z"/>
        </svg>
        Створити маршрут
      </button>
    </div>

    <CreateRoute v-if="showCreateRouteModal" @close="showCreateRouteModal = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CreateRoute from '~/components/CreateRoute.vue'
const showCreateRouteModal = ref(false)
</script>

<style scoped>
.create-route-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #3b82f6;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.create-route-button:hover {
  background-color: #2563eb;
}

.create-route-button:focus {
  outline: 2px solid #60a5fa;
  outline-offset: 2px;
}
</style>
<template>
  <div class="layout">
    <div class="hero">
      <h1 class="title">Система маршрутизації документів</h1>
      <p class="subtitle">Створюйте та керуйте маршрутами ваших документів</p>

      <button class="create-button" @click="showCreateRouteModal = true">
        <span class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               class="lucide lucide-file-route">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
            <polyline points="14 2 14 8 20 8"/>
            <circle cx="10" cy="13" r="2"/>
            <path d="M7 18h.01"/>
            <path d="m14.25 13.15 2.5 2"/>
            <path d="M16.5 17.5a2 2 0 1 0 4 0 2 2 0 1 0-4 0z"/>
          </svg>
        </span>
        Створити маршрут
      </button>
    </div>

    <CreateRoute
        v-if="showCreateRouteModal"
        @close="showCreateRouteModal = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CreateRoute from '~/components/CreateRoute.vue'

const showCreateRouteModal = ref(false)
</script>

<style scoped>
.layout {
  background-color: #0f172a; /* dark navy */
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.hero {
  text-align: center;
  margin-bottom: 2rem;
  color: #f8fafc;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.2rem;
  font-weight: 400;
  color: #cbd5e1;
  margin-bottom: 2rem;
}

.create-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #3b82f6;
  color: white;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}

.create-button:hover {
  background-color: #2563eb;
}

.icon {
  display: flex;
  align-items: center;
}
</style>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click.self="$emit('close')">
    <div class="bg-white rounded-lg w-full max-w-3xl shadow-lg overflow-hidden text-gray-900">
      <div class="flex justify-between items-center p-6 border-b">
        <h2 class="text-xl font-semibold">Персональний маршрут документа</h2>
        <UButton icon="i-heroicons-x-mark" color="neutral" variant="ghost" @click="$emit('close')" />
      </div>

      <div class="p-6 space-y-6">
        <p class="text-gray-800">Це ваш персональний маршрут документа, який бачите тільки ви</p>

        <div class="overflow-x-auto pb-2">
          <div class="flex items-center gap-3">
            <template v-for="(step, index) in steps" :key="step.id">
              <div class="relative flex-shrink-0 w-24 h-12">
                <div
                    class="w-full h-full bg-blue-500 text-white flex items-center justify-center rounded font-semibold text-sm"
                    :class="{ 'bg-blue-700': currentStepIndex === index }"
                >
                  ‹ Крок {{ index + 1 }} ›
                </div>
                <UButton
                    v-if="index !== 0"
                    icon="i-heroicons-x-mark-20-solid"
                    size="xs"
                    variant="solid"
                    color="error"
                    class="absolute top-0.5 right-0.5 rounded-full !p-0.5 text-xs shadow"
                    @click="removeStep(index)"
                />
              </div>

              <div
                  v-if="index < steps.length - 1"
                  class="flex-shrink-0 flex items-center h-12 text-xl text-gray-400"
              >
                →
              </div>
            </template>

            <UButton
                class="ml-2 flex-shrink-0"
                variant="outline"
                color="primary"
                icon="i-heroicons-plus-20-solid"
                @click="addStep"
            >
              Додати
            </UButton>
          </div>
        </div>

        <p class="text-gray-700">Буде відправлено документів: {{ steps.length }}</p>

        <div>
          <div v-if="currentRecipients.length" class="overflow-auto max-h-56 border rounded mt-2">
            <table class="w-full text-left text-sm">
              <thead class="bg-gray-100 text-gray-800">
              <tr><th class="p-2">Одержувач</th><th>Тип</th><th>Посада</th><th></th></tr>
              </thead>
              <tbody>
              <tr v-for="(r, idx) in currentRecipients" :key="idx" class="border-t">
                <td class="p-2">{{ r.email }}</td>
                <td>{{ r.action }}</td>
                <td>{{ r.position }}</td>
                <td class="flex items-center gap-1">
                  <UButton icon="i-heroicons-pencil-square" size="xs" color="primary" variant="ghost" @click="editRecipient(idx)" />
                  <UButton icon="i-heroicons-trash" size="xs" color="error" variant="ghost" @click="removeRecipient(idx)" />
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <p v-else class="text-gray-600">Немає одержувачів</p>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Від</label>
          <select v-model="sender" class="w-full border border-gray-300 rounded px-4 py-2 text-gray-800 disabled:bg-gray-100 disabled:text-gray-500">
            <option disabled value="">Виберіть відправника</option>
            <option>Користувач 1</option>
            <option>Користувач 2</option>
          </select>
        </div>

        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <label class="block mb-1 font-medium">Email одержувача</label>
            <input v-model="recipientEmail" type="email" placeholder="email@example.com" class="w-full border border-gray-300 rounded px-4 py-2 text-gray-800 disabled:bg-gray-100 disabled:text-gray-500" />
          </div>
          <div class="w-full md:w-1/3">
            <label class="block mb-1 font-medium">Призначення</label>
            <select v-model="purpose" class="w-full border border-gray-300 rounded px-4 py-2 text-gray-800 disabled:bg-gray-100 disabled:text-gray-500">
              <option v-for="a in actions" :key="a">{{ a }}</option>
            </select>
          </div>
        </div>

        <div class="flex flex-col gap-2 mt-4">
          <label class="inline-flex items-center gap-2">
            <input type="checkbox" v-model="notifyImmediately" class="disabled:opacity-50" />
            <span class="text-gray-800">Надіслати сповіщення одержувачу негайно</span>
          </label>
          <label class="inline-flex items-center gap-2">
            <input type="checkbox" v-model="addAttachments" class="disabled:opacity-50" />
            <span class="text-gray-800">Додати документи як вкладення до листа</span>
          </label>
        </div>

        <div class="flex justify-end items-center gap-2">
          <label class="font-medium">Посада</label>
          <select v-model="position" class="w-52 border border-gray-300 rounded px-4 py-2 text-gray-800 disabled:bg-gray-100 disabled:text-gray-500">
            <option v-for="p in positions" :key="p" :value="p">{{ p }}</option>
          </select>
        </div>

        <div v-if="showDevModal" class="mt-4 p-4 bg-gray-100 text-center rounded border text-gray-800">
          <p>🔧 Модуль "Зберегти як шаблон" у розробці</p>
          <UButton color="primary" @click="showDevModal = false">Закрити</UButton>
        </div>
        <div v-if="showTemplateDropdown">
          <label class="block font-medium mb-2">Завантажити шаблон маршруту</label>
          <select class="w-full border border-gray-300 rounded px-4 py-2 text-gray-800">
            <option disabled selected>Виберіть шаблон</option>
            <option>Шаблон 1</option>
            <option>Шаблон 2</option>
          </select>
        </div>
      </div>

      <div class="flex justify-between items-center p-6 border-t">
        <div class="flex gap-2">
          <UButton icon="i-heroicons-arrow-down-tray" color="primary" variant="solid" @click="saveAsTemplate">Зберегти як шаблон</UButton>
          <UButton icon="i-heroicons-folder-open" color="primary" variant="ghost" @click="toggleTemplateDropdown" />
        </div>
        <div class="flex gap-2">
          <UButton icon="i-heroicons-user-plus" color="primary" variant="solid" :disabled="!recipientEmail" @click="addRecipient">Додати одержувача</UButton>
          <UButton icon="i-heroicons-paper-airplane" color="primary" variant="solid" @click="sendRoute">Відправити</UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Recipient, RouteStep } from '~/types/RouteStep'

const steps = ref<RouteStep[]>([{ id: 1, recipients: [] }])
const currentStepIndex = 0
let nextStepId = 2

const editingIndex = ref<number | null>(null)
const recipientEmail = ref('')
const purpose = ref('На підпис')
const position = ref('Не вказано')
const sender = ref('')
const notifyImmediately = ref(false)
const addAttachments = ref(false)

const showDevModal = ref(false)
const showTemplateDropdown = ref(false)

const actions = [
  'На підпис',
  'На узгодження',
  'Відправити на пошту',
  'Для перегляду',
  'Редагування (необов’язкове)',
  'Редагування і узгодження',
  'Підпис і печатка',
  'На печатку'
]

const positions = ['Не вказано', 'Бухгалтер', 'Водій', 'Експедитор', 'Директор']

const currentRecipients = computed(() => steps.value[currentStepIndex].recipients)

const addStep = () => {
  steps.value.push({ id: nextStepId++, recipients: [] })
}

const removeStep = (index: number) => {
  steps.value.splice(index, 1)
}

const removeRecipient = (idx: number) => {
  steps.value[currentStepIndex].recipients.splice(idx, 1)
}

const addRecipient = () => {
  if (!recipientEmail.value) return

  const recipient: Recipient = {
    email: recipientEmail.value,
    action: purpose.value,
    position: position.value,
    notify: notifyImmediately.value,
    attachAsLetter: addAttachments.value
  }

  if (editingIndex.value !== null) {
    steps.value[currentStepIndex].recipients[editingIndex.value] = recipient
    editingIndex.value = null
  } else {
    steps.value[currentStepIndex].recipients.push(recipient)
  }

  recipientEmail.value = ''
  purpose.value = 'На підпис'
  position.value = 'Не вказано'
  notifyImmediately.value = false
  addAttachments.value = false
}

const sendRoute = () => {
  alert('📤 Маршрут відправлено!')
  console.log(JSON.stringify(steps.value, null, 2))
}

const saveAsTemplate = () => {
  showDevModal.value = true
}

const toggleTemplateDropdown = () => {
  showTemplateDropdown.value = !showTemplateDropdown.value
}

const editRecipient = (index: number) => {
  const r = steps.value[currentStepIndex].recipients[index]
  recipientEmail.value = r.email
  purpose.value = r.action
  position.value = r.position
  notifyImmediately.value = r.notify
  addAttachments.value = r.attachAsLetter
  editingIndex.value = index
}
</script>

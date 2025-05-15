<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-container">
      <!-- Header -->
      <div class="modal-header">
        <h2>Персональний маршрут документа</h2>
        <button class="close-button" @click="$emit('close')">
          <UIcon name="i-heroicons-x-mark" class="w-5 h-5" />
        </button>
      </div>

      <!-- Body -->
      <div class="modal-body">
        <p class="description">Це ваш персональний маршрут документа, який бачите тільки ви</p>

        <!-- Steps + Arrows -->
        <div class="step-scroll">
          <div class="step-container">
            <template v-for="(step, index) in steps" :key="step.id">
              <div :class="['step-box', { active: currentStepIndex === index }]" class="relative">
                <div class="step">
                  <span v-if="index > 0" class="arrow-left">‹</span>
                  Крок {{ index + 1 }}
                  <span v-if="index < steps.length - 1" class="arrow-right">›</span>
                </div>
                <button v-if="index !== 0" class="remove-step" @click="removeStep(index)">
                  <UIcon name="i-heroicons-x-mark" class="w-3 h-3" />
                </button>
              </div>
              <div v-if="index < steps.length - 1" class="arrow-wrapper">
                <div class="line">
                  <div class="chevron"></div>
                </div>
              </div>
            </template>
            <button class="add-button" @click="addStep">
              <UIcon name="i-heroicons-plus" class="w-5 h-5" /> Додати
            </button>
          </div>
        </div>

        <!-- Document count -->
        <div class="info-row">
          <span>Буде відправлено документів: {{ steps.length }}</span>
        </div>

        <!-- Recipients list -->
        <div class="recipients-row">
          <template v-if="currentRecipients.length">
            <div class="recipients-scroll-wrapper">
              <table class="recipient-table">
                <thead><tr><th>Одержувач</th><th>Тип</th><th>Посада</th><th></th></tr></thead>
                <tbody>
                <tr v-for="(r, idx) in currentRecipients" :key="idx">
                  <td>{{ r.email }}</td>
                  <td>{{ r.action }}</td>
                  <td>{{ r.position }}</td>
                  <td>
                    <button class="icon-button" title="Редагувати" @click="editRecipient(idx)">
                      <UIcon name="i-heroicons-pencil-square" class="w-4 h-4" />
                    </button>
                    <button class="icon-button" title="Видалити" @click="removeRecipient(idx)">
                      <UIcon name="i-heroicons-trash" class="w-4 h-4" />
                    </button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </template>
          <span v-else>Немає одержувачів</span>
        </div>

        <!-- Sender -->
        <div class="form-group from-group">
          <label>Від</label>
          <div class="select-wrapper">
            <select v-model="sender" class="form-select">
              <option disabled value="">Виберіть відправника</option>
              <option>Користувач 1</option>
              <option>Користувач 2</option>
            </select>
          </div>
        </div>

        <!-- Recipient form -->
        <div class="form-row">
          <div class="form-group email-group">
            <label>Email одержувача</label>
            <input v-model="recipientEmail" type="email" placeholder="email@example.com" class="form-select" />
          </div>
          <div class="form-group purpose-group">
            <label>Призначення</label>
            <div class="select-wrapper">
              <select v-model="purpose" class="form-select">
                <option v-for="a in actions" :key="a">{{ a }}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="checkbox-group">
          <input type="checkbox" id="notify" v-model="notifyImmediately" />
          <label for="notify">Надіслати сповіщення одержувачу негайно</label>
        </div>

        <div class="checkbox-group">
          <input type="checkbox" id="attachments" v-model="addAttachments" />
          <label for="attachments">Додати документи як вкладення до листа</label>
        </div>

        <!-- Position -->
        <div class="form-group position-group">
          <label>Посада</label>
          <div class="select-wrapper">
            <select v-model="position" class="form-select">
              <option v-for="p in positions" :key="p" :value="p">{{ p }}</option>
            </select>
          </div>
        </div>


        <!-- Save Template modal -->
        <div v-if="showDevModal" class="mt-4 p-4 bg-gray-100 text-center rounded border">
          <p>
            <UIcon name="i-heroicons-wrench" class="w-5 h-5 inline-block mr-1" />
            Модуль "Зберегти як шаблон" у розробці
          </p>
          <button @click="showDevModal = false" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
            Закрити
          </button>
        </div>
        <div v-if="showTemplateDropdown" class="template-dropdown">
          <label for="template">Завантажити шаблон маршруту</label>
          <select id="template" class="form-select">
            <option disabled selected>Виберіть шаблон</option>
            <option>Шаблон 1</option>
            <option>Шаблон 2</option>
          </select>
        </div>
      </div>


      <!-- Footer buttons -->
      <div class="modal-footer">
        <div class="left-buttons">
          <button class="save-template-button" @click="saveAsTemplate">
            <UIcon name="i-heroicons-document-arrow-down" class="w-5 h-5" /> Зберегти як шаблон
          </button>
          <button class="template-button" @click="toggleTemplateDropdown">
            <UIcon name="i-heroicons-folder" class="w-5 h-5" />
          </button>
        </div>
        <div class="right-buttons">
          <button class="add-recipient-button" :disabled="!recipientEmail" @click="addRecipient">
            <UIcon name="i-heroicons-user-plus" class="w-5 h-5" /> Додати одержувача
          </button>
          <button
              class="send-button"
              :class="{ 'send-button-disabled': !hasRecipients }"
              :disabled="!hasRecipients"
              @click="sendRoute"
          >
            <UIcon name="i-heroicons-paper-airplane" class="w-5 h-5" /> Відправити
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

import type { Recipient, RouteStep } from '~/models/RouteModels'

const steps = ref<RouteStep[]>([{ id: 1, recipients: [] }])
const currentStepIndex = 0
let nextStepId = 2

const hasRecipients = computed(() => {
  return steps.value.some(step => step.recipients.length > 0)
})
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
  'Редагування (необов\'язкове)',
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
  if (!hasRecipients.value) return
  alert('Маршрут відправлено!')
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

<style scoped>
.recipients-scroll-wrapper {
  max-height: 200px;
  overflow-y: auto;
  margin-top: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.recipient-table {
  width: 100%;
  table-layout: auto;
}

.recipient-table td, .recipient-table th {
  padding: 8px 12px;
  text-align: left;
  vertical-align: middle;
  color: #000;
}

.template-dropdown {
  width: 100%;
  max-width: 1000px;
  margin: 1rem auto 2rem 0;
  padding-right: 1rem;
}


.template-dropdown label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #000;
}

label {
  color: #000 !important;
}

.checkbox-group label {
  color: #000 !important;
}

.form-select,
input[type="email"],
select {
  color: #000 !important;
}

.arrow-left, .arrow-right {
  font-weight: bold;
  margin: 0 4px;
}

.remove-step {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ccc;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 14px;
  text-align: center;
  line-height: 20px;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-container {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  overflow-x: auto;
  padding-bottom: 8px;
  gap: 12px;
}

.step-box {
  position: relative;
  flex: 0 0 auto;
  width: 100px;
  height: 48px;
}

.step {
  width: 100%;
  height: 100%;
  background-color: #22a7f0;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-weight: 600;
  white-space: nowrap;
}

.step-box.active .step {
  background-color: #1a86c7;
}

.add-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: white;
  color: #22a7f0;
  border: 1px solid #22a7f0;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: 500;
  margin-left: 16px;
  flex-shrink: 0;
}

.plus-icon {
  font-size: 1.25rem;
}

.icon-button {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 8px;
  color: #000;
  vertical-align: middle;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.info-row, .recipients-row {
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
  color: #000;
}

.form-group {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #000;
}

.select-wrapper {
  position: relative;
}

.form-select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1.5rem;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.email-group {
  width: 65%;
}

.purpose-group {
  width: 35%;
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
}

.position-group {
  margin-top: 1rem;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.position-group label {
  margin-right: 1rem;
  margin-bottom: 0;
}

.position-group .select-wrapper {
  width: 200px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal-container {
  background-color: white;
  border-radius: 8px;
  width: 100%;
  max-width: 800px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #eee;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.25rem;
  color: #000;
}

.close-button {
  background: none;
  border: none;
  cursor: pointer;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-body {
  padding: 1.5rem 1.5rem 0 1.5rem;
}

.description {
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #000;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-top: 1px solid #eee;
}

.left-buttons, .right-buttons {
  display: flex;
  gap: 0.5rem;
}

.save-template-button,
.template-button,
.add-recipient-button,
.send-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  background-color: #22a7f0;
  color: white;
  border: none;
}
.send-button-disabled {
  background-color: #a0d4f5;
  cursor: not-allowed;
  opacity: 0.7;
}

.template-button {
  padding: 0.75rem;
}

.step-scroll {
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.arrow-wrapper {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  height: 48px;
}

.line {
  position: relative;
  width: 32px;
  height: 2px;
  background-color: #22a7f0;
  margin: 0 6px;
}

.chevron {
  position: absolute;
  top: 50%;
  right: -8px;
  transform: translateY(-50%) rotate(-45deg);
  width: 8px;
  height: 8px;
  border-right: 2px solid #22a7f0;
  border-bottom: 2px solid #22a7f0;
  background: transparent;
}
</style>
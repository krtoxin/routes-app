<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-container">
      <div class="modal-header">
        <h2>Персональний маршрут документа</h2>
        <button class="close-button" @click="$emit('close')">×</button>
      </div>

      <div class="modal-body">
        <p class="description">
          Це ваш персональний маршрут документа, який бачите тільки ви
        </p>

        <div class="step-container">
          <div class="step">
            <div class="step-number">Крок 1</div>
          </div>
          <div class="step-line"></div>
          <button class="add-button">
            <span class="plus-icon">+</span>
            <span>Додати</span>
          </button>
        </div>

        <div class="info-row">
          <span>Буде відправлено документів: 1</span>
        </div>

        <div class="recipients-row">
          <span>Немає одержувачів</span>
        </div>

        <div class="form-group from-group">
          <label>Від</label>
          <div class="select-wrapper">
            <select v-model="sender" class="form-select">
              <option value="">Виберіть відправника</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group email-group">
            <label>Кому</label>
            <div class="select-wrapper">
              <select v-model="contactMethod" class="form-select">
                <option value="email">Один або декілька e-mail</option>
              </select>
            </div>
          </div>

          <div class="form-group purpose-group">
            <div class="select-wrapper">
              <select v-model="purpose" class="form-select">
                <option value="signature">На підпис</option>
              </select>
            </div>
          </div>
        </div>

        <div class="checkbox-group">
          <input type="checkbox" id="notify" v-model="notifyImmediately">
          <label for="notify">Надіслати сповіщення одержувачу негайно</label>
        </div>

        <div class="checkbox-group">
          <input type="checkbox" id="attachments" v-model="addAttachments">
          <label for="attachments">Додати документи як вкладення до листа</label>
        </div>

        <div class="form-group position-group">
          <label>Посада</label>
          <div class="select-wrapper">
            <select v-model="position" class="form-select">
              <option value="">Не вказано</option>
            </select>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <div class="left-buttons">
          <button class="save-template-button">
            <span class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
            </span>
            Зберегти як шаблон
          </button>
          <button class="template-button">
            <span class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="7" x="3" y="3" rx="1"/><rect width="9" height="7" x="3" y="14" rx="1"/><rect width="5" height="7" x="16" y="14" rx="1"/></svg>
            </span>
          </button>
        </div>

        <div class="right-buttons">
          <button class="add-recipient-button">
            <span class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
            </span>
            Додати одержувача
          </button>
          <button class="send-button">
            <span class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
            </span>
            Відправити
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sender: '',
      contactMethod: 'email',
      purpose: 'signature',
      position: '',
      notifyImmediately: false,
      addAttachments: false
    }
  }
}
</script>

<style scoped>
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
  color: #333;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #999;
}

.modal-body {
  padding: 1.5rem;
}

.description {
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #666;
}

.step-container {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.step {
  background-color: #22a7f0;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
}

.step-line {
  flex-grow: 1;
  height: 2px;
  background-color: #22a7f0;
  margin: 0 1rem;
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
}

.plus-icon {
  font-size: 1.25rem;
}

.info-row, .recipients-row {
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
  color: #666;
}

.form-group {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
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

.save-template-button, .template-button, .add-recipient-button, .send-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.save-template-button {
  background-color: #22a7f0;
  color: white;
  border: none;
}

.template-button {
  background-color: #22a7f0;
  color: white;
  border: none;
  padding: 0.75rem;
}

.add-recipient-button {
  background-color: #22a7f0;
  color: white;
  border: none;
}

.send-button {
  background-color: #22a7f0;
  color: white;
  border: none;
}

.icon {
  display: flex;
  align-items: center;
}
</style>
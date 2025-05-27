<script setup>
import { ref } from 'vue'
import {loginUser} from "@/mooapi.js";

const props = defineProps({
  chatPartner: {
    type: String,
    default: ''
  },
  currentUser: {
    type: String,
    required: false,
    default: 'none'
  }
})

const emit = defineEmits(['toggleContacts', 'toggleLang'])

const toggleContacts = () => {
  emit('toggleContacts')
}

const toggleLang = () => {
  emit('toggleLang')
}
async function handleLogin() {
  const email = 'matt@liahonacontracting.com';
  const pw = 'dotien';

  const result = await loginUser(email, pw);
  console.log('API result:', result);
}
</script>

<template>
  <div class="header">
    <div class="header-content">
      <div class="button-container">
        <button @click="toggleContacts" class="contacts-button">
          <font-awesome-icon :icon="['fas', 'user']" /> Contacts
        </button>
      </div>
      <button @click="handleLogin">Login</button>
      <div class="title-container">
        <h1 class="title">{{ chatPartner || currentUser }}</h1>
      </div>
      <div>
        <button @click="toggleLang" class="lang-button">
          <font-awesome-icon :icon="['fas', 'globe']" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.button-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.contacts-button, .lang-button {
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.contacts-button {
  padding: 0.5rem 1rem;
}

.lang-button {
  padding: 0.75rem 1rem;
}

.contacts-button:hover, .lang-button:hover {
  background-color: #2563eb;
}

.title-container {
  flex-grow: 1;
  text-align: center;
}

.title {
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0;
}
</style>
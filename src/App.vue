<script setup>
import { ref, onMounted } from 'vue'
import { authService } from './services/authServices'
import { messageService } from './services/messageService'
import TopBar from './components/TopBar.vue'
import ChatComponent from './components/ChatComponent.vue'
import ContactsColumn from './components/ContactsColumn.vue'

const currentUser = ref(null)
const chatPartner = ref('')
const showContacts = ref(false)
const lang = ref('')
const contacts = ref([])

onMounted(async () => {
  const sessionData = await authService.getSessionData()
  if (sessionData && sessionData.status === 'authenticated') {
    currentUser.value = sessionData.user.username
    lang.value = sessionData.user.lang
  }
})

const toggleContacts = async () => {
  if (!showContacts.value) {
    try {
      contacts.value = await messageService.getContacts()
    } catch (error) {
      console.error('Failed to load contacts:', error)
      // You might want to add error handling UI here
      return
    }
  }
  showContacts.value = !showContacts.value
}

const toggleLang = () => {
  // Implement language toggle functionality
}

const handleContactSelect = (contact) => {
  chatPartner.value = contact
  if (window.innerWidth < 768) {
    showContacts.value = false
  }
}
</script>

<template>
  <div v-if="currentUser" class="min-h-screen bg-gray-100">
    <TopBar 
      :currentUser="currentUser"
      :lang="lang"
      @toggle-contacts="toggleContacts"
      @toggle-lang="toggleLang"
    />
    
    <main class="pt-16">
      <div class="container mx-auto px-4 flex">
        <div class="flex-1 transition-all duration-300" 
             :class="{ 'mr-[300px]': showContacts }">
          <div v-if="chatPartner">
            <ChatComponent
                :current-user="currentUser"
                :chat-partner="chatPartner"
            />
          </div>
          <h1 class="welcome" v-else>Choose a yap buddy</h1>


        </div>

        <transition name="slide">
          <div v-if="showContacts" 
               class="contacts-panel">
            <ContactsColumn
              :is-visible="true"
              :current-user="currentUser"
              :contacts="contacts"
              @select-contact="handleContactSelect"
            />
          </div>
        </transition>
      </div>
    </main>
  </div>
</template>

<style>
.welcome {
  font-size: 2rem;
  text-align: center;
  margin-top: 100px;
}
</style>
<script setup>
defineProps({
  contacts: {
    type: Array,
    required: true
  },
  selectedContact: {
    type: String,
    default: ''
  },
  isVisible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['selectContact'])

const handleContactClick = (contact) => {
  emit('selectContact', contact)
}
</script>

<template>
  <div :class="['contacts-column', { 'visible': isVisible }]">
    <h2 class="contacts-header">Contacts</h2>
    <ul class="contacts-list">
      <li 
        v-for="contact in contacts" 
        :key="contact"
        :class="['contact-item', { 'selected': contact === selectedContact }]"
        @click="handleContactClick(contact)"
      >
        {{ contact }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.contacts-column {
  position: fixed;
  top: 4rem; /* Space for TopBar */
  left: 0;
  width: 16rem;
  height: calc(100vh - 4rem);
  background-color: #f9fafb;
  border-right: 1px solid #e5e7eb;
  overflow-y: auto;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.contacts-column.visible {
  transform: translateX(0);
}

.contacts-header {
  font-size: 1.125rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
}

.contacts-list {
  padding: 0 1rem;
}

.contact-item {
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  cursor: pointer;
  color: #3b82f6;
}

.contact-item:hover {
  text-decoration: underline;
}

.contact-item.selected {
  background-color: #e5e7eb;
}

@media (min-width: 1024px) {
  .contacts-column {
    transform: none;
  }
  
  .contacts-column:not(.visible) {
    transform: translateX(-100%);
  }
}
</style>
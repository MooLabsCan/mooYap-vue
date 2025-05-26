<script>
import {messageService} from '../services/messageService'

export default {
  name: 'ChatComponent',
  props: {
    chatPartner: {
      type: String,
      required: true
    },
    currentUser: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      messages: [],
      newMessage: '',
      pollInterval: null
    }
  },
  methods: {
    async sendMessage() {
      if (!this.newMessage.trim()) return

      try {
        await messageService.sendMessage(this.chatPartner, this.newMessage)
        this.newMessage = ''
        await this.loadMessages()
      } catch (error) {
        console.error('Failed to send message:', error)
      }
    },
    async loadMessages() {
      try {
        const messages = await messageService.getMessages(this.chatPartner)
        this.messages = messages
      } catch (error) {
        console.error('Failed to load messages:', error)
      }
    },
    async checkNewMessages() {
      try {
        const newMessages = await messageService.checkNewMessages()
        if (newMessages.includes(this.chatPartner)) {
          await this.loadMessages()
        }
      } catch (error) {
        console.error('Failed to check messages:', error)
      }
    }
  },
  created() {
    this.loadMessages()
    // Set up polling every 5 seconds
    this.pollInterval = setInterval(() => {
      this.checkNewMessages()
    }, 5000)
  },
  beforeUnmount() {
    // Clean up interval when component is destroyed
    if (this.pollInterval) {
      clearInterval(this.pollInterval)
    }
  }
}
</script>
<template>
  <div class="chat-container">
    <div class="messages" v-if="messages.length">
      <div v-for="message in messages"
           :key="message.msg_id"
           :class="['message', message.usr_from === currentUser ? 'sent' : 'received']">
        <div class="message-content">
          {{ message.message }}
        </div>
        <div class="message-time">
          {{ new Date(message.created_at).toLocaleTimeString() }}
        </div>
      </div>
    </div>
    <div v-else class="no-messages">
      No messages yet
    </div>
    <div class="message-input">
      <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          placeholder="Type a message..."
          class="message-input-field"
      />
      <button @click="sendMessage" class="send-button">Send</button>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1rem;
}

.messages {
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 1rem;
}

.message {
  margin: 0.5rem 0;
  padding: 0.5rem;
  border-radius: 8px;
  max-width: 70%;
}

.message.sent {
  margin-left: auto;
  background-color: #dcf8c6;
}

.message.received {
  margin-right: auto;
  background-color: #fff;
}

.message-time {
  font-size: 0.75rem;
  color: #666;
  text-align: right;
}

.message-input {
  display: flex;
  gap: 0.5rem;
}

.message-input-field {
  flex-grow: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.send-button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.send-button:hover {
  background-color: #0056b3;
}

.no-messages {
  text-align: center;
  color: #666;
  padding: 2rem;
}
</style>
import axios from 'axios'

const API_BASE = 'http://localhost/mapmoo/'

// Create axios instance with default config
const apiClient = axios.create({
    baseURL: API_BASE,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
})

export const messageService = {
    async getContacts() {
        try {
            const response = await apiClient.get('/messages.php', {
                params: { action: 'contacts' }
            })
            
            if (response.data.success && Array.isArray(response.data.contacts)) {
                return response.data.contacts
            }
            throw new Error(response.data.error || 'Failed to fetch contacts')
        } catch (error) {
            console.error('Failed to fetch contacts:', error)
            throw error
        }
    },

    async getMessages(chatPartner) {
        try {
            const response = await apiClient.get('/messages.php', {
                params: { 
                    action: 'messages',
                    chat_with: chatPartner 
                }
            })
        
            if (Array.isArray(response.data.messages)) {
                return response.data.messages
            }
            throw new Error('Failed to fetch messages')
        } catch (error) {
            console.error('Failed to fetch messages:', error)
            throw error
        }
    },

    async sendMessage(to, message) {
        try {
            const response = await apiClient.post('/messages.php', {
                usr_to: to,
                message: message
            })

            if (!response.data.success) {
                throw new Error(response.data.error || 'Failed to send message')
            }
            return response.data
        } catch (error) {
            console.error('Failed to send message:', error)
            throw error
        }
    }
}
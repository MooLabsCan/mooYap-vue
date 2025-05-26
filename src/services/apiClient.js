import axios from 'axios'

export const apiClient = axios.create({
    baseURL: '',  // This will use the Vite proxy
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})
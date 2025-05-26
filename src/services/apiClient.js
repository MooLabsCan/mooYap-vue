import axios from 'axios'

const isDev = import.meta.env.DEV
//isDev ? '' :
export const apiClient = axios.create({
    baseURL: 'https://liap.ca', // Uses Vite proxy in dev, real backend in prod
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

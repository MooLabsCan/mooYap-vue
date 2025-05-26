import axios from 'axios'

const isDev = import.meta.env.DEV
//isDev ? '' :
export const apiClient = axios.create({
    baseURL: 'https://liap.ca/api', // Uses Vite proxy in dev, real backend in prod
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

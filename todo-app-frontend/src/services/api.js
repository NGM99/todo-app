import axios from 'axios'
import { showToast } from '../utils/toast.js'

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Global interceptor to handle error API messages
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.data?.errors) {
      error.response.data.errors.forEach(err => {
        showToast(err.message, 'error')
      })
    } 
    else {
      showToast('Error del servidor', 'error')
    }

    return Promise.reject(error)
  }
)

export default api

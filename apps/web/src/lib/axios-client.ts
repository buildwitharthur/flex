import axios from 'axios'

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
)

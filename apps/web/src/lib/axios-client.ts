import axios from 'axios'

export type ApiErrorResponse = {
  message?: string
}

export class ApiError extends Error {
  status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

axiosClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    const fallbackMessage = 'Não foi possível concluir a requisição. Tente novamente.'

    if (axios.isAxiosError<ApiErrorResponse>(error)) {
      const message =
        typeof error.response?.data?.message === 'string' &&
        error.response.data.message.length > 0
          ? error.response.data.message
          : fallbackMessage

      return Promise.reject(
        new ApiError(message, error.response?.status),
      )
    }

    if (error instanceof Error) {
      return Promise.reject(error)
    }

    return Promise.reject(new ApiError(fallbackMessage))
  },
)

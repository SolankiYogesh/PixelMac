/* eslint-disable no-console */

import axios, {AxiosRequestConfig} from 'axios'

import AppConfig from './AppConfig'

type Methodtype = 'post' | 'get' | 'put' | 'delete'
interface RetryQueueItem {
  resolve: (value?: any) => void
  reject: (error?: any) => void
  config: AxiosRequestConfig
}

export const getHeaders = (isFormData = false) => {
  return {
    accept: 'application/json',
    'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
    'X-CSRFTOKEN': 'X-CSRFTOKEN: BFQcYOCNH7nZCRRbhEg8MzRWpLg6O1ThL0fiW6mbzSfs78qQExca0UrnBoXRyl1M'
  }
}

// Create a list to hold the request queue
const refreshAndRetryQueue: RetryQueueItem[] = []

// Flag to prevent multiple token refresh requests

const axiosInstance = axios.create({
  baseURL: AppConfig.API_URL
})

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config

    if (error.response && error.response.status === 401) {
      // Add the original request to the queue
      return new Promise((resolve, reject) => {
        refreshAndRetryQueue.push({config: originalRequest, resolve, reject})
      })
    }

    // Return a Promise rejection if the status code is not 401
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.request.use(
  (config) => {
    const tempConfig = config
    // const {token} = Constant

    // if (token) {
    //   config.headers = {
    //     ...config?.headers,
    //     Authorization: `Bearer ${token}`
    //   } as unknown as AxiosRequestHeaders
    // }

    return tempConfig
  },
  async (error) => Promise.reject(error)
)

const getFormData = (object: Record<string, unknown>): FormData => {
  const formData = new FormData()
  Object.keys(object).forEach((key) => formData.append(key, String(object[key])))
  return formData
}

const APICall = async <T>(
  method: Methodtype,
  body: any,
  url: string | null = null,
  headers: any = {},
  formData = false
) => {
  const config: AxiosRequestConfig = {
    method
  }
  if (url) {
    config.url = url
  }
  if (body && method === 'get') {
    config.params = body
  } else if (body && (method === 'post' || method === 'put') && formData) {
    config.data = getFormData(body)
    config.headers = {'Content-Type': 'multipart/form-data'}
  } else {
    config.data = body
  }

  if (headers) {
    config.headers = headers
  }

  return new Promise<ResponseTypeAXIOS<T>>((resolve, reject) => {
    axiosInstance(config)
      .then((res) => {
        console.log('success', '<=======API Response======>', {status: res.status, data: res.data})
        return resolve({status: res.status, data: res.data})
      })
      .catch((error) => {
        if (
          error?.response?.status === 500 ||
          error?.status === 500 ||
          error?.response?.status === 400 ||
          error?.status === 400 ||
          error?.code === 'ERR_NETWORK' ||
          error?.code === 'ECONNABORTED'
        ) {
          return reject(error)
        }
        console.log('warning', '<=======API Bad Request======>', error)
        return resolve(error?.response)
      })
  })
}

export default APICall

import { ref, unref, watch } from 'vue'
import { API } from '@serv/axios'

export function useGET(options) {
  const response = ref(null)
  const status = ref('idle')
  const error = ref(null)

  async function get() {
    const url = unref(options.url)
    let getOptions = {}
    if (options.params) {
      getOptions = { 
        ...getOptions, 
        params: unref(options.params) 
      }
    }
    status.value = 'loading'
    try {
      const _response = await API.get(url, getOptions)
      status.value = 'idle'
      error.value = null
      response.value = _response
      return _response
    } catch (err) {
      status.value = 'error'
      error.value = err
      if (options.errorHandler) {
        await options.errorHandler(err)
      } else {
        console.log(err)
      }
    }
  }

  if (options.watchParams) {
    watch(options.params, get)
  }

  return {
    response,
    status,
    error,
    get
  }
}

export function usePOST(options) {
  const response = ref(null)
  const status = ref('idle')
  const error = ref(null)

  async function post() {
    status.value = 'loading'
    const url = unref(options.url)
    const payload = unref(options.payload)
    try {
      const _response = await API.post(url, payload)
      response.value = _response
      status.value = 'success'
      error.value = null
      return _response
    } catch (err) {
      response.value = null
      error.value = err
      status.value = 'error'
      if (options.errorHandler) {
        await options.errorHandler(err)
      } else{
        console.log(err)
      }
    }
  }

  return {
    response,
    status,
    error,
    post
  }
}
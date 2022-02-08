import axios from 'axios'

const result = (success: boolean, data: any, response: any) => {
  return {
    success: success,
    data,
    response
  }
}

// axios.defaults.baseURL = process.env.NODE_ENV !== 'production' ? '/api' : ''
axios.defaults.baseURL = '/api'
axios.defaults.withCredentials = true

axios.interceptors.request.use((opt: any): any => {
  const headers = opt.headers || {}
  const data = opt.data || {}
  const options = {
    timeout: 30000,
    withCredentials: true,
    ...opt,
    headers: {
      ...headers,
    },
    data
  }
  return options
})

axios.interceptors.response.use(
  (res: any) => {
    return result(res.data.code, res.data.code ? res.data.data : res.data.message, res)
  },
  (err) => {
    if (err.response && err.response.status === 404) {
      return result(true, {}, err)
    }
    const errMsg = err.message || '请求失败'
    return result(false, errMsg, err)
  }
)

export default axios

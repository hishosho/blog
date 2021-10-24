import axios from 'axios'

const result = (success: boolean, data: any, response: any) => {
  success as any,
  data as any,
  response
}

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
    return result(true, res.data.code === '0' ? res.data.body : res.data.message, res)
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

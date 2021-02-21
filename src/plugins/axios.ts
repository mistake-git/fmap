import axios from 'axios'
const env = process.env

const myHttpClient = axios.create({
  baseURL: env.REACT_APP_BASEURL,
})

myHttpClient.interceptors.request.use (
  function (config) {
    const token = localStorage.getItem('id-token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  function (error) {
    return Promise.reject (error)
  }
);

export { myHttpClient }

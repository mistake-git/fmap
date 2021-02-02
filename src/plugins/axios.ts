import axios from 'axios'
const env = process.env

export const myHttpClient = axios.create({
  baseURL: env.REACT_APP_BASEURL,
})

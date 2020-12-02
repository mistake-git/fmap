import axios from 'axios'

export const myHttpClient = axios.create({
  baseURL: "http://localhost:3000/api/v1",
})

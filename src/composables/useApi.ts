import axios from "axios"

const api = axios.create({
  baseURL: "https://mockapi.io/api/v1",
})

export function useApi() {
  return {
    api
  }
}
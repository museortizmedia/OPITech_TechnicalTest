import { ref } from "vue"

export function useDebounce(fn: Function, delay = 300) {
  let timeout: any

  return (...args: any[]) => {
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
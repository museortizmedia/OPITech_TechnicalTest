import { defineStore } from "pinia"
import { ref } from "vue"

export const usePaginationStore = defineStore("pagination", () => {
  const page = ref(1)
  const limit = ref(8)
  const total = ref(0)

  const next = () => page.value++
  const prev = () => {
    if (page.value > 1) page.value--
  }

  const setTotal = (value: number) => {
    total.value = value
  }

  return {
    page,
    limit,
    total,
    next,
    prev,
    setTotal,
  }
})
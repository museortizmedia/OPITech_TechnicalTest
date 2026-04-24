import { ref } from "vue"

export function usePagination() {
  const page = ref(1)
  const limit = ref(10)

  const next = () => page.value++
  const prev = () => {
    if (page.value > 1) page.value--
  }

  return {
    page,
    limit,
    next,
    prev
  }
}
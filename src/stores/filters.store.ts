import { defineStore } from "pinia"
import { ref } from "vue"

export const useFiltersStore = defineStore("filters", () => {
  const search = ref("")
  const category = ref("")

  const reset = () => {
    search.value = ""
    category.value = ""
  }

  return {
    search,
    category,
    reset,
  }
})
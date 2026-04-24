import { defineStore } from "pinia"
import { ref } from "vue"

export const useUIStore = defineStore("ui", () => {
  const globalLoading = ref(false)
  const sidebarOpen = ref(false)

  const setLoading = (value: boolean) => {
    globalLoading.value = value
  }

  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
  }

  return {
    globalLoading,
    sidebarOpen,
    setLoading,
    toggleSidebar,
  }
})
import { useProductsStore } from "@/stores/products.store"
import { onMounted, watch } from "vue"

export function useProducts() {
  const store = useProductsStore()

  onMounted(store.fetchProducts)

  watch(
    () => [store.page, store.search, store.category],
    store.fetchProducts
  )

  return {
    store
  }
}
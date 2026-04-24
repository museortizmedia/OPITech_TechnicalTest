import { defineStore } from "pinia"
import { ref } from "vue"
import { getProduct, getProducts } from "@/api/products.api"
import type { Product } from "@/types/product"

export const useProductsStore = defineStore("products", () => {
  const products = ref<Product[]>([])
  const product = ref<Product | null>(null)

  const loading = ref(false)

  const page = ref(1)
  const limit = ref(8)

  const search = ref("")
  const category = ref("")

  const fetchProducts = async () => {
    loading.value = true
    try {
      products.value = await getProducts({
        page: page.value,
        limit: limit.value,
        search: search.value,
        category: category.value,
      })
    } finally {
      loading.value = false
    }
  }

  const fetchProduct = async (id: string) => {
    loading.value = true
    try {
      product.value = await getProduct(id)
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    product,
    loading,
    page,
    limit,
    search,
    category,
    fetchProducts,
    fetchProduct,
  }
})
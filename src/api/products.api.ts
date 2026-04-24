import axios from "axios"
import type { Product } from "@/types/product"

/**
 * Instancia central de Axios
 */
const api = axios.create({
  baseURL: "https://<tu-mockapi>.mockapi.io/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
})

/**
 * Query params para listado de productos
 */
export interface ProductQuery {
  page?: number
  limit?: number
  search?: string
  category?: string
}

/**
 * Obtener listado de productos
 */
export const getProducts = async (
  params: ProductQuery
): Promise<Product[]> => {
  try {
    const { data } = await api.get<Product[]>("/products", {
      params,
    })

    return data
  } catch (error) {
    console.error("[getProducts] error:", error)
    return []
  }
}

/**
 * Obtener un producto por ID
 */
export const getProduct = async (
  id: string
): Promise<Product | null> => {
  try {
    const { data } = await api.get<Product>(`/products/${id}`)
    return data
  } catch (error) {
    console.error(`[getProduct] error id=${id}`, error)
    return null
  }
}
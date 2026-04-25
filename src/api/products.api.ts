import axios from "axios"
import type { Product } from "@/types/product"

/**
 * Axios API Instance
 * ---------------------------------------------------
 * Instancia centralizada de Axios para el módulo Products.
 *
 * Se define una baseURL única para evitar repetir rutas
 * en cada request y facilitar mantenimiento. (podria protegerse en .env)
 *
 * NOTA:
 * Se utiliza MockAPI como backend simulado.
 */
const api = axios.create({
    baseURL: "https://69ebb2ae97482ad5c5280110.mockapi.io/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
})

/**
 * ProductQuery
 * ---------------------------------------------------
 * Parámetros soportados por el endpoint de listado.
 *
 * page      -> página actual
 * limit     -> cantidad por página
 * search    -> búsqueda
 * category  -> filtro categoría
 */
export interface ProductQuery {
    page?: number
    limit?: number
    search?: string
    category?: string
}

/**
 * getProducts
 * ---------------------------------------------------
 * Obtiene listado paginado de productos.
 *
 * @param params ProductQuery
 * @returns Promise<Product[]>
 */
export const getProducts = async (
    params: ProductQuery
): Promise<Product[]> => {
    try {

        const query: any = {
            page: params.page,
            limit: params.limit,
        }

        if (params.search) {
            query.search = params.search
        }

        if (params.category) {
            query.category = params.category
        }

        const { data } = await api.get<Product[]>("/products", {
            params: query,
        })

        return data
    } catch (error) {
        console.error("[getProducts] error:", error)
        return []
    }
}

/**
 * getProducts
 * ---------------------------------------------------
 * Obtiene un producto por su ID.
 *
 * @param id string
 * @returns Promise<Product | null>
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
/**
 * Products Store
 * =========================================================
 * Store principal encargado de:
 *
 * - Obtener productos desde API
 * - Obtener producto individual
 * - Manejo de filtros (fallback frontend si no son soportados por backend)
 * - Integración con store de paginación
 * - Control de loading y errores
 * - Cancelación de requests concurrentes
 *
 * Arquitectura:
 *
 * UI
 *  ↓
 * ProductsStore
 *  ↓
 * PaginationStore
 *  ↓
 * API
 *
 * NOTA:
 * MockAPI no devuelve total de registros,
 * por lo tanto el total de paginación se
 * establece manualmente (40) para simular
 * comportamiento real de backend.
 */
import { defineStore } from "pinia"
import { computed, ref, watch } from "vue"
import { getProduct, getProducts } from "@/api/products.api"
import type { Product } from "@/types/product"
import { usePaginationStore } from "./pagination.store"

export const useProductsStore = defineStore("products", () => {
    /**
     * Store de paginación desacoplado
     * Maneja page, limit, totalPages, next, prev
     */
    const pagination = usePaginationStore();

    /**
     * Lista de productos actual
     */
    const products = ref<Product[]>([])

    /**
     * Producto individual (detalle)
     */
    const product = ref<Product | null>(null)

    /**
     * Estado de loading global
     */
    const loading = ref(false)

    /**
     * Manejo de errores UI
     */
    const error = ref<string | null>(null)

    /**
     * Filtro búsqueda por nombre
     */
    const search = ref("")

    /**
     * Filtro por categoría
     */
    const category = ref("")

    /**
     * AbortController para cancelar requests
     * Evita race conditions al escribir rápido
     */
    let controller: AbortController | null = null

    /**
     * Obtener listado de productos
     *
     * Integra:
     * - paginación
     * - búsqueda
     * - categoría
     * - cancelación de requests
     */
    const fetchProducts = async () => {
        // cancelar request anterior si existe
        controller?.abort()
        controller = new AbortController()

        loading.value = true
        error.value = null

        try {
            const data = await getProducts({
                page: Number(pagination.page),
                limit: Number(pagination.limit),
                search: search.value,
                category: category.value,
            })

            products.value = data

            pagination.setTotal(40)

        } catch (err: any) {
            // si fue cancelación, no tratamos como error real
            if (err?.name === "AbortError") return

            error.value = "Error al cargar productos"
            products.value = []
        } finally {
            loading.value = false
        }
    }

    /**
     * Obtener producto individual
     */
    const fetchProduct = async (id: string) => {
        loading.value = true
        error.value = null

        try {
            const data = await getProduct(id)
            product.value = data
        } catch {
            error.value = "Error al cargar el producto"
            product.value = null
        } finally {
            loading.value = false
        }
    }

    /**
     * Setear filtros
     * Reinicia la paginación
     */
    const setFilters = (payload: {
        search?: string
        category?: string
    }) => {
        if (payload.search !== undefined) search.value = payload.search
        if (payload.category !== undefined) category.value = payload.category

        setPage(1)
    }

    /**
     * Cambiar página
     * Delegado al pagination store
     */
    const setPage = (newPage: number) => {
        pagination.setPage(newPage)
    }

    /**
     * Reset completo de filtros
     */
    const resetFilters = () => {
        search.value = ""
        category.value = ""
        setPage(1)
    }

    /**
     * Reload manual
     */
    const reload = async () => {
        await fetchProducts()
    }

    /**
     * Categorías dinámicas derivadas
     * desde productos cargados
     *
     * NOTA:
     * En backend real vendrían desde endpoint
     */
    const categories = computed(() => {
        const set = new Set<string>()

        products.value.forEach((p) => {
            if (p.category) set.add(p.category)
        })

        return Array.from(set)
    })

    /**
     * Filtro frontend fallback
     *
     * Se usa cuando el backend no soporta:
     * - search
     * - category
     */
    const filteredProducts = computed(() => {
        let result = products.value

        // SEARCH (frontend fallback)
        if (search.value.trim()) {
            const q = search.value.toLowerCase()

            result = result.filter((p) =>
                p.name.toLowerCase().includes(q)
            )
        }

        // CATEGORY FILTER (frontend fallback)
        if (category.value) {
            result = result.filter(
                (p) => p.category === category.value
            )
        }

        return result
    })

    /**
     * Re-fetch automático cuando:
     * - cambia página
     * - cambia límite
     * - cambia search
     * - cambia categoría
     */
    watch(
        () => [
            pagination.page,
            pagination.limit,
            search.value,
            category.value
        ],
        () => {
            reload()
        }
    )

    return {
        // state
        products,
        product,
        filteredProducts,
        loading,
        error,

        search,
        category,
        categories,

        // actions
        fetchProducts,
        fetchProduct,
        reload,
        setFilters,
        setPage,
        resetFilters,
    }
})
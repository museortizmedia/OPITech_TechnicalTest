/**
 * Pagination Store
 * ======================================================
 * Store genérico reutilizable para manejar paginación.
 *
 * Responsabilidades:
 * - Manejar página actual
 * - Manejar límite por página
 * - Manejar total de registros
 * - Calcular total de páginas
 * - Controlar navegación (next / prev)
 * - Resetear paginación
 *
 * Este store es independiente del dominio (products),
 * por lo que puede reutilizarse
 *
 * Arquitectura:
 *
 * UI
 *  ↓
 * Pagination Store
 *  ↓
 * Products Store
 *  ↓
 * API
 */
import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const usePaginationStore = defineStore("pagination", () => {

  /**
   * Página actual
   */
  const page = ref(1)

  /**
   * Cantidad de items por página
   * Tipado estricto para evitar valores inválidos
   */
  const limit = ref<8 | 12 | 24 | 50>(8)

  /**
   * Total de registros disponibles
   * Viene desde backend o se simula (MockAPI)
   */
  const total = ref(0)

  /**
   * Total de páginas
   *
   * fórmula:
   * total / limit
   */
  const totalPages = computed(() => {
    if (!total.value) return 1
    return Math.ceil(total.value / limit.value)
  })

  /**
   * Indica si existe página siguiente
   */
  const hasNext = computed(() => page.value < totalPages.value)

  /**
   * Indica si existe página previa
   */
  const hasPrev = computed(() => page.value > 1)

  /**
   * Ir a página siguiente
   */
  const next = () => {
    if (hasNext.value) page.value++
  }

  /**
   * Ir a página anterior
   */
  const prev = () => {
    if (hasPrev.value) page.value--
  }

  /**
   * Setear página manualmente
   * con protección de rango
   */
  const setPage = (value: number) => {
    page.value = Math.max(1, Math.min(value, totalPages.value))
  }

  /**
   * Cambiar límite de resultados
   *
   * IMPORTANTE: resetea a página 1 para evitar inconsistencias
   */
  const setLimit = (value: number) => {
    limit.value = value as any
    page.value = 1
  }

  /**
   * Setear total de registros
   *
   * Este valor normalmente
   * viene desde el backend
   */
  const setTotal = (value: number) => {
    total.value = value
  }

  /**
   * Reset completo de paginación
   */
  const reset = () => {
    page.value = 1
    total.value = 0
  }

  return {
    // state
    page,
    limit,
    total,

    // computed
    totalPages,
    hasNext,
    hasPrev,

    // actions
    next,
    prev,
    setPage,
    setLimit,
    setTotal,
    reset,
  }
})
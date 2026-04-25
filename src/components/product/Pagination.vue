<script setup lang="ts">
/**
 * Pagination Component
 * ---------------------------------------
 * Componente de paginación avanzado desacoplado
 * basado en pagination.store.
 *
 * RESPONSABILIDADES:
 * - Navegación entre páginas
 * - Mostrar rango inteligente de páginas
 * - Control de límite por página
 * - Mostrar estado actual (page / totalPages)
 *
 * FEATURES:
 * - Paginación tipo Google
 * - Responsive (mobile-first)
 * - UI aesthetic premium
 * - Control centralizado en store
 *
 * STORE:
 * usePaginationStore()
 *
 * PROPS:
 * none
 *
 * DEPENDENCIAS:
 * - pagination.page
 * - pagination.totalPages
 * - pagination.hasNext
 * - pagination.hasPrev
 * - pagination.limit
 *
 * ACCIONES:
 * - pagination.next()
 * - pagination.prev()
 * - pagination.setPage()
 * - pagination.setLimit()
 */
import { computed } from "vue"
import { usePaginationStore } from "@/stores/pagination.store"

const pagination = usePaginationStore()

/**
 * pages (computed)
 * ---------------------------------------
 * Genera el rango dinámico de páginas visibles.
 *
 * Ejemplo:
 * current = 6
 * total = 20
 *
 * Resultado:
 * 1 ... 4 5 [6] 7 8 ... 20
 *
 * delta:
 * Cantidad de páginas visibles alrededor
 * de la página actual.
 */
const pages = computed(() => {
    const total = pagination.totalPages
    const current = pagination.page

    const delta = 2
    const range: number[] = []

    const start = Math.max(1, current - delta)
    const end = Math.min(total, current + delta)

    for (let i = start; i <= end; i++) {
        range.push(i)
    }

    if (start > 1) {
        if (start > 2) range.unshift(-1) // ellipsis
        range.unshift(1)
    }

    if (end < total) {
        if (end < total - 1) range.push(-1)
        range.push(total)
    }

    return range
})
</script>

<template>
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-8 border-t pt-6">
        <!-- LEFT INFO -->
        <div class="text-sm text-gray-500">
            Página
            <span class="font-semibold text-gray-900">
                {{ pagination.page }}
            </span>
            de
            <span class="font-semibold text-gray-900">
                {{ pagination.totalPages }}
            </span>
        </div>

        <!-- CENTER PAGINATION -->
        <div class="flex items-center gap-1">

            <!-- PREV -->
            <button class="px-3 py-2 rounded-lg border text-sm transition
               disabled:opacity-40 disabled:cursor-not-allowed
               hover:bg-gray-50" :disabled="!pagination.hasPrev" @click="pagination.prev">
                Prev
            </button>

            <!-- NUMBERS -->
            <template v-for="p in pages" :key="p">
                <span v-if="p === -1" class="px-2 text-gray-400">
                    ...
                </span>

                <button v-else @click="pagination.setPage(p)" class="px-3 py-2 text-sm rounded-lg border transition"
                    :class="[
                        p === pagination.page
                            ? 'bg-black text-white border-black shadow-sm'
                            : 'hover:bg-gray-50 text-gray-700'
                    ]">
                    {{ p }}
                </button>
            </template>

            <!-- NEXT -->
            <button class="px-3 py-2 rounded-lg border text-sm transition
               disabled:opacity-40 disabled:cursor-not-allowed
               hover:bg-gray-50" :disabled="!pagination.hasNext" @click="pagination.next">
                Next
            </button>

        </div>

        <!-- RIGHT LIMIT -->
        <div class="flex items-center gap-2">
            <span class="text-sm text-gray-500">
                Mostrar
            </span>

            <select v-model="pagination.limit" class="px-3 py-2 border rounded-lg text-sm bg-white
               focus:ring-2 focus:ring-black/10 focus:outline-none"
                @change="pagination.setLimit(Number(pagination.limit))">
                <option :value="8">8</option>
                <option :value="12">12</option>
                <option :value="24">24</option>
                <option :value="50">50</option>
            </select>
        </div>

    </div>
</template>
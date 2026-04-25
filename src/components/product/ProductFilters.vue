<script setup lang="ts">
/**
 * ProductFilters
 * -------------------------
 * Toolbar de filtros del dashboard:
 *
 * - Búsqueda por nombre
 * - Filtro por categoría
 * - Reset filtros
 *
 * La búsqueda usa debounce para evitar
 * múltiples requests mientras el usuario escribe.
 *
 * NOTA:
 * MockAPI no soporta endpoint de categorías,
 * por lo que se derivan desde los productos.
 */

import { useProductsStore } from "@/stores/products.store"
import { useDebounce } from "@/composables/useDebounce"

const store = useProductsStore()

/**
 * Debounced search
 */
const onSearch = useDebounce((e: Event) => {
    store.search = (e.target as HTMLInputElement).value
}, 400)

const reset = () => {
    store.resetFilters()
}
</script>

<template>
    <div class="flex flex-col lg:flex-row lg:items-center gap-4">

        <!-- LEFT : SEARCH -->
        <div class="relative w-full">
            <input class="w-full pl-10 pr-4 py-2.5 border rounded-lg
               focus:ring-2 focus:ring-black/10 focus:outline-none
               transition" placeholder="Search products..." @input="onSearch" />

            <!-- ICON -->
            <svg class="absolute left-3 top-1/2 -translate-y-1/2
               w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z" />
            </svg>
        </div>

        <!-- RIGHT -->
        <div class="flex items-center gap-2 lg:ml-auto">

            <button v-if="store.search || store.category" @click="reset" class="px-4 py-2 text-sm border rounded-lg
               hover:bg-gray-50 transition">
                Reset
            </button>

            <select v-model="store.category" class="px-4 py-2.5 border rounded-lg bg-white
               focus:ring-2 focus:ring-black/10 focus:outline-none
               transition min-w-[180px]">
                <option value="">All categories</option>

                <option v-for="cat in store.categories" :key="cat" :value="cat">
                    {{ cat }}
                </option>
            </select>

        </div>

    </div>
</template>
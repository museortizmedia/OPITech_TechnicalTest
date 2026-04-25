<script setup lang="ts">
import { onMounted } from "vue"
import { useProductsStore } from "@/stores/products.store"

import ProductCard from "@/components/product/ProductCard.vue"
import ProductFilters from "@/components/product/ProductFilters.vue"
import Pagination from "@/components/product/Pagination.vue"
import LoadingState from "@/components/ui/LoadingState.vue"
import EmptyState from "@/components/ui/EmptyState.vue"

const store = useProductsStore()

onMounted(() => {
    store.fetchProducts()
})
</script>

<template>
    <div class="max-w-7xl mx-auto px-4 py-6">

        <!-- HEADER -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">

            <div>
                <h1 class="text-3xl font-semibold text-gray-900">
                    Products Dashboard
                </h1>

                <p class="text-gray-500 mt-1">
                    Explore and manage your product catalog
                </p>
            </div>

            <!-- RESULTS -->
            <div class="mt-3 md:mt-0 text-sm text-gray-500">
                {{ store.filteredProducts.length }}
                productos encontrados
            </div>

        </div>

        <!-- FILTERS CARD -->
        <div class="mb-6">
            <ProductFilters />
        </div>

        <!-- LOADING -->
        <LoadingState v-if="store.loading" />

        <!-- EMPTY -->
        <div v-else-if="store.filteredProducts.length === 0" class="py-20">
            <EmptyState />
        </div>

        <!-- GRID -->
        <div v-else class="grid gap-5
             grid-cols-1
             sm:grid-cols-2
             lg:grid-cols-3
             xl:grid-cols-4">
            <ProductCard v-for="product in store.filteredProducts" :key="product.id" :product="product" />
        </div>

        <!-- PAGINATION -->
        <Pagination class="mt-10" />

    </div>
</template>
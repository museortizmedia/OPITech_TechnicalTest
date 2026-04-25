<script setup lang="ts">
import { onMounted } from "vue"
import { useRoute } from "vue-router"
import { useProductsStore } from "@/stores/products.store"

const route = useRoute()
const store = useProductsStore()

onMounted(() => {
    store.fetchProduct(route.params.id as string)
})
</script>

<template>
    <div class="max-w-6xl mx-auto px-4 py-8">

        <!-- BACK -->
        <router-link to="/"
            class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition mb-6">
            ← Back to products
        </router-link>

        <!-- LOADING -->
        <div v-if="store.loading" class="grid md:grid-cols-2 gap-8">

            <div class="h-[420px] bg-gray-100 rounded-xl animate-pulse" />

            <div class="space-y-4">
                <div class="h-6 bg-gray-100 rounded w-1/3 animate-pulse" />
                <div class="h-10 bg-gray-100 rounded w-2/3 animate-pulse" />
                <div class="h-4 bg-gray-100 rounded animate-pulse" />
                <div class="h-4 bg-gray-100 rounded animate-pulse" />
                <div class="h-4 bg-gray-100 rounded w-3/4 animate-pulse" />
                <div class="h-10 bg-gray-100 rounded w-32 animate-pulse" />
            </div>

        </div>

        <!-- PRODUCT -->
        <div v-else-if="store.product" class="grid md:grid-cols-2 gap-10">
            <!-- IMAGE -->
            <div class="bg-white border rounded-2xl p-4 shadow-sm">
                <img :src="store.product.image" class="w-full h-[420px] object-cover rounded-xl" />
            </div>

            <!-- INFO -->
            <div class="flex flex-col">

                <!-- CATEGORY -->
                <span class="text-xs uppercase tracking-wide
                 bg-gray-100 px-3 py-1 rounded-full
                 w-fit mb-3">
                    {{ store.product.category }}
                </span>

                <!-- TITLE -->
                <h1 class="text-3xl font-semibold text-gray-900">
                    {{ store.product.name }}
                </h1>

                <!-- PRICE -->
                <div class="mt-4 text-3xl font-bold text-gray-900">
                    ${{ store.product.price }}
                </div>

                <!-- DIVIDER -->
                <div class="border-t my-6" />

                <!-- DESCRIPTION -->
                <p class="text-gray-600 leading-relaxed">
                    {{ store.product.description }}
                </p>

                <!-- ACTIONS -->
                <div class="flex gap-3 mt-8">

                    <button class="px-6 py-3 bg-black text-white
                   rounded-lg font-medium
                   hover:bg-black/90 transition">
                        Add to cart
                    </button>

                    <button class="px-6 py-3 border rounded-lg
                   hover:bg-gray-50 transition">
                        Wishlist
                    </button>

                </div>

            </div>

        </div>

        <!-- EMPTY -->
        <div v-else class="text-center py-20 text-gray-500">
            Product not found
        </div>

    </div>
</template>
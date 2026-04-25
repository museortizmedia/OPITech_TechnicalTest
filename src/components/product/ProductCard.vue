<script setup lang="ts">
import type { Product } from "@/types/product"

defineProps<{
    product: Product
}>()
</script>

<template>
    <RouterLink :to="`/products/${product.id}`" class="group bg-white border rounded-2xl
           hover:shadow-lg hover:-translate-y-1
           transition-all duration-300
           overflow-hidden flex flex-col">
        <!-- IMAGE -->
        <div class="relative overflow-hidden">
            <img :src="product.image" class="w-full h-48 object-cover
               group-hover:scale-105
               transition duration-300" />

            <!-- CATEGORY BADGE -->
            <span class="absolute top-3 left-3
               text-xs font-medium
               bg-white/90 backdrop-blur
               px-2 py-1 rounded-md">
                {{ product.category }}
            </span>
        </div>

        <!-- CONTENT -->
        <div class="p-4 flex flex-col flex-1">

            <!-- NAME -->
            <h3 class="font-semibold text-gray-900
               line-clamp-2 min-h-[48px]">
                {{ product.name }}
            </h3>

            <!-- PRICE + CTA -->
            <div class="flex items-center justify-between mt-auto pt-4">

                <p class="text-lg font-bold text-gray-900">
                    ${{ product.price }}
                </p>

                <span class="text-sm text-gray-500
                 group-hover:text-black
                 transition">
                    View →
                </span>

            </div>

        </div>
    </RouterLink>
</template>
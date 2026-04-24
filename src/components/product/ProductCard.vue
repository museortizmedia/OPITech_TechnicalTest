<script setup lang="ts">
import type { Product } from "@/types/product"

defineProps<{
    product: Product
}>()
</script>

<template>
    <RouterLink :to="`/products/${product.id}`"
        class="bg-white rounded-xl shadow hover:shadow-lg transition p-3 flex flex-col">
        <img :src="product.image" class="w-full h-40 object-cover rounded" />

        <h3 class="font-semibold mt-2">
            {{ product.name }}
        </h3>

        <p class="text-sm text-gray-500">
            {{ product.category }}
        </p>

        <p class="font-bold text-lg mt-auto">
            ${{ product.price }}
        </p>
    </RouterLink>
</template>
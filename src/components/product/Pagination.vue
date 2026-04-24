<script setup lang="ts">
import { useProductsStore } from "@/stores/products.store"

const store = useProductsStore()
</script>

<template>
    <div class="flex justify-center gap-2 mt-6">

        <button class="btn" :disabled="store.page === 1" @click="store.page--">
            Prev
        </button>

        <span class="px-3">
            {{ store.page }}
        </span>

        <button class="btn" @click="store.page++">
            Next
        </button>

    </div>
</template>
<script setup lang="ts">
import { useProductsStore } from "@/stores/products.store"
import { useDebounce } from "@/composables/useDebounce"

const store = useProductsStore()

const onSearch = useDebounce((e: Event) => {
    store.search = (e.target as HTMLInputElement).value
}, 400)
</script>

<template>
    <div class="flex flex-col md:flex-row gap-3">

        <input class="input" placeholder="Buscar producto..." @input="onSearch" />

        <select v-model="store.category" class="input">
            <option value="">Todas</option>
            <option value="electronics">Electronics</option>
            <option value="clothes">Clothes</option>
        </select>

    </div>
</template>
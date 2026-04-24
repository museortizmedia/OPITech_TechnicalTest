<script setup lang="ts">
defineProps<{
    variant?: "primary" | "secondary"
}>()
</script>

<template>
    <button :class="[
        'px-4 py-2 rounded transition',
        variant === 'secondary'
            ? 'bg-gray-200'
            : 'bg-blue-600 text-white'
    ]">
        <slot />
    </button>
</template>
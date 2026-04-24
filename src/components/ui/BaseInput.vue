<script setup lang="ts">
defineProps<{
    modelValue: string
}>()

defineEmits(["update:modelValue"])
</script>

<template>
    <input class="border rounded px-3 py-2 w-full" :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
</template>
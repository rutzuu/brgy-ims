<script setup lang="ts">
  import { ref, watch } from 'vue';

  const page = ref(1)
  const emits = defineEmits(['page-changed'])
  const props = defineProps<{
    lastPage: Number,
    total: Number
  }>()
  watch(page, () => {
    emits('page-changed', page.value)
  })

  const next =  () => {
    if (page.value < props.lastPage) {
      page.value++
    }
  }

  const prev = () => {
    if (page.value > 1) {
      page.value--
    }
  }
</script>

<template>
  <nav class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6" aria-label="Pagination">
    <div class="flex-1 flex justify-between sm:justify-end">
      <a @click="prev" href="javascript:void(0)" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Previous </a>
      <a @click="next" href="javascript:void(0)" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Next </a>
    </div>
  </nav>
</template>
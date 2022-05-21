<template>
  <Nav/>
  <div class="max-w-4xl m-auto p-4 sm:p-6 lg:p-8">
    <main class="flex-1">
      <router-view/>
    </main>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Nav from '../components/Nav.vue';

// onMounted( async () => {
//   const router = useRouter();
//   const route = useRoute()
//   try {
//     const { data } = await axios.get(`/residents/${route.params.id}`)
  
//   } catch (error) {
//     router.push('/residents/register')
//   }
// })

</script>
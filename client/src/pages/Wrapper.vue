<template>
  <Nav/>
    
  <div class="md:pl-64 flex flex-col flex-1">
    <main class="flex-1">
      <router-view/>
    </main>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted } from 'vue';
import Nav from '../components/Nav.vue'
import { useRouter } from 'vue-router';

onMounted( async () => {
  const router = useRouter();

  try {
    const { data } = await axios.get('/user')
  
  } catch (error) {
    router.push('/login')
  }
})

</script>
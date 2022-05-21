<script setup lang="ts">
import { reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const form = reactive({
    email: '',
    password: ''
  })

const router = useRouter()

const submit = async () => {
  try {
    await axios.post('/login', {
      email: form.email,
      password: form.password
    })
    await router.push('/')
  } catch (error) {
    alert('Invalid email or password, or account is not yet activated.')
  }
}
</script>

<template>

  <div class="min-h-full flex">
    <div class="hidden lg:block relative w-0 flex-1">
      <img class="absolute inset-0 h-screen w-auto object-cover" src="../assets/brgy-holy-spirit-cover.jpeg" alt="" />
    </div>
    <div class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
          <img class="mx-auto h-28 sm:h-36 w-auto bg-white rounded-full p-2 shadow-md" src="../assets/brgy-holy-spirit-logo.png" alt="Brgy. Holy Spirit Logo" />
        </div>

        <div class="mt-8">
          <div>
            <div>
              <h2 class="mb-8 text-center text-2xl font-bold text-gray-90 px-4 sm:px-0">Log in to Brgy.Holy Spirit IMS</h2>

            </div>
          </div>

          <div class="mt-6">
            <form @submit.prevent="submit" action="#" method="POST" class="space-y-6">
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700"> Email address </label>
                <div class="mt-1">
                  <input v-model="form.email" id="email" name="email" type="email" autocomplete="email" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
              </div>

              <div class="space-y-1">
                <label  for="password" class="block text-sm font-medium text-gray-700"> Password </label>
                <div class="mt-1">
                  <input v-model="form.password" id="password" name="password" type="password" autocomplete="current-password" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
              </div>

              <div>
                <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign in</button>
              </div>
            </form>
            <div class="mt-6">
              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-300" />
                </div>
                <div class="relative flex justify-center text-sm">
                  <router-link to="/register" class="px-2 bg-gray-100 font-medium text-blue-600 hover:text-blue-500">Register a new account here. </router-link>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
    
  
</template>

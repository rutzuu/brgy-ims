<script setup lang="ts">
import { reactive } from 'vue';
import { LockClosedIcon } from '@heroicons/vue/solid'
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
  } catch (error) {
    alert('Invalid email or password')
  }

  await router.push('/')
}
</script>

<template>
  <div class="relative py-28 sm:py-36 lg:py-48 2xl:py-64">
    <div class="absolute inset-0">
      <img class="w-full h-full object-cover" src="../assets/brgy-holy-spirit-cover.jpeg" alt="" />
      <div class="absolute inset-0 bg-gradient-to-l from-sky-100 to-cyan-50 mix-blend-multiply" aria-hidden="true" />
    </div>

    <div class="absolute w-full inset-0">
      <div class="min-h-full flex flex-col justify-center py-8 lg:py-24 2xl:py-48 sm:px-6 lg:px-8">
        <div class="w-full space-y-8">
          
          <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <img class="mx-auto h-28 sm:h-36 w-auto bg-white rounded-full p-2 shadow-md" src="../assets/brgy-holy-spirit-logo.png" alt="Brgy. Holy Spirit Logo" />
          </div>
  
          <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <h2 class="mb-8 text-center text-2xl font-bold text-gray-90 px-4 sm:px-0">Log in to Brgy.Holy Spirit IMS</h2>

              <form @submit.prevent="submit" class="space-y-6" action="#" method="POST">
                <div class="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label for="email-address" class="sr-only">Email address</label>
                    <input v-model="form.email" id="email-address" name="email" type="email" autocomplete="email" required="true" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                  </div>
                  <div>
                    <label for="password" class="sr-only">Password</label>
                    <input v-model="form.password" id="password" name="password" type="password" autocomplete="current-password" required="true" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Password" />
                  </div>
                </div>
    
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    <label for="remember-me" class="ml-2 block text-sm text-gray-900"> Remember me </label>
                  </div>
    
                  <div class="text-sm">
                    <a href="#" class="font-medium text-blue-600 hover:text-blue-500"> Forgot your password? </a>
                  </div>
                </div>
    
                <div>
                  <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                      <LockClosedIcon class="h-5 w-5 text-blue-500 group-hover:text-blue-400" aria-hidden="true" />
                    </span>
                    Log in
                  </button>
                </div>
              </form>
    
              <div class="mt-6">
                <div class="relative">
                  <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-gray-300" />
                  </div>
                  <div class="relative flex justify-center text-sm">
                    <!-- <span class="px-2 bg-white text-gray-500"> Or continue with </span> -->
                    <router-link to="/register" class="px-2 bg-white font-medium text-blue-600 hover:text-blue-500">Register a new account here. </router-link>
  
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
  
</template>

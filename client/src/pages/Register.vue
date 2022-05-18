<script setup lang="ts">
  import { reactive, ref } from 'vue'
  import { useRouter } from 'vue-router';
  import axios from 'axios'

  const data = reactive({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role_id: 2
  })

  const router = useRouter()
  const roles = [{
    id: '1',
    name: 'Admin',
  },
  {
    id: '2',
    name: 'Employee',
  },
  {
    id: '3',
    name: 'Customer',
  }]

  const submit = async () => {
    
    if (data.password != data.password_confirmation) {
      alert('Passwords do not match')
      return
    } else {
      await axios.post('/register', data)
      alert('Registered successfully')
    await router.push('/login')
    }
  }

</script>
<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="w-full space-y-8">
      <!-- <div class="sm:mx-auto sm:w-full sm:max-w-md"> -->
        
        <!-- <p class="mt-2 text-center text-sm text-gray-600">
          {{ ' ' }}
        </p> -->
      <!-- </div> -->

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h2 class="text-center text-2xl font-bold text-gray-90 px-8">Register to Brgy. Holy Spirit IMS</h2>
          <!-- <img class="mx-auto h-24 w-auto bg-white rounded-full p-2 shadow-md" src="../assets/brgy-holy-spirit-logo.png" alt="Brgy. Holy Spirit Logo" /> -->
          <form @submit.prevent="submit" class="mt-4 space-y-6" action="#" method="POST">
            <div>
              <fieldset>
                <legend class="block text-sm font-medium text-gray-700">Employee Name</legend>
                <div class="mt-1 bg-white rounded-md shadow-sm -space-y-px">
                  <div class="flex -space-x-px">
                    <div class="w-1/2 flex-1 min-w-0">
                      <label for="last-name" class="sr-only">Last Name</label>
                      <input v-model="data.last_name" type="text" name="last-name" id="last-name" class="focus:ring-blue-500 focus:border-blue-500 relative block w-full rounded-none rounded-bl-md rounded-tl-md bg-transparent focus:z-10 sm:text-sm border-gray-300" placeholder="Last Name" />
                    </div>
                    <div class="flex-1 min-w-0">
                      <label for="first-name" class="sr-only">First Name</label>
                      <input v-model="data.first_name" type="text" name="first-name" id="first-name" class="focus:ring-blue-500 focus:border-blue-500 relative block w-full rounded-none rounded-br-md rounded-tr-md bg-transparent focus:z-10 sm:text-sm border-gray-300" placeholder="First Name" />
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset class="mt-6 bg-white">
                <legend class="block text-sm font-medium text-gray-700">Email address</legend>
                <div class="mt-1 rounded-md shadow-sm -space-y-px">
                  <div>
                    <label for="email-address" class="sr-only">Email address</label>
                    <input v-model="data.email" type="text" name="email-address" id="email-address" autocomplete="email-address" class="focus:ring-blue-500 focus:border-blue-500 relative block w-full rounded-md bg-transparent focus:z-10 sm:text-sm border-gray-300" placeholder="your@email.com" />
                  </div>
                </div>
                  
              </fieldset>
              <fieldset class="mt-6 bg-white">
                <legend class="block text-sm font-medium text-gray-700">Password</legend>
                <div class="mt-1 rounded-md shadow-sm -space-y-px">
                  <div>
                    <label for="password" class="sr-only">Password</label>
                    <input v-model="data.password" id="password" name="password" type="password" autocomplete="current-password" required="true" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-tl-md rounded-tr-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Password" />
                  </div>
                </div>
              </fieldset>
                  <div>
                    <label for="repeat-password" class="sr-only">Repeat Password</label>
                    <input v-model="data.password_confirmation" type="password" required="true" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-br-md rounded-bl-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Repeat Password" />
                  </div>
              
            </div>

            <div>
              <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Register</button>
            </div>
          </form>

          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300" />
              </div>
              <div class="relative flex justify-center text-sm">
                <!-- <span class="px-2 bg-white text-gray-500"> Or continue with </span> -->
                <router-link to="/login" class="px-2 bg-white font-medium text-blue-600 hover:text-blue-500"> Already have an account? Log in here. </router-link>

              </div>
            </div>

          </div>
        </div>          
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const form = reactive({
    // email: '',
    phone: ''
  })
const router = useRouter()

const submit = async () => {
  try {
    const {data} = await axios.get(`/residents/login/${form.phone}`)
    await router.push(`/resident/${data.id}`)
  } catch (error) {
    await router.push(`/residents/register/${form.phone}`)
  }
}
</script>

<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <img class="mx-auto h-28 sm:h-36 w-auto bg-white rounded-full p-2 shadow-md" src="../assets/brgy-holy-spirit-logo.png" alt="Brgy. Holy Spirit Logo" />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Welcome to Brgy. Holy Spirit Resident Registration!</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          This is open only for Brgy. Holy Spirit Residents only. Register your information to proceed with your document process.
          {{ ' ' }}
          <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"></a>
        </p>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form @submit.prevent="submit" class="space-y-6" action="#" method="POST">
            <!-- <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Login with Email address </label>
              <div class="mt-1">
                <input v-model="form.email" id="email" name="email" type="email" autocomplete="email" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </div> -->

            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700"> Mobile Number </label>
              <div class="mt-1">
                <input v-model="form.phone" id="phone" name="phone" type="phone" pattern="[0-9]+" autocomplete="tel" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </div>

            <div>
              <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign in</button>
            </div>
          </form>

        </div>
      </div>
  </div>
  
</template>

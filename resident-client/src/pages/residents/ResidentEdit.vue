<script setup lang="ts">
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()

const data = reactive ({
  id: '',
  last_name: '',
  first_name: '',
  middle_name: '',
  email: '',
  phone: '',
  address: '',
  date_issued: '',
  valid_until: '',
  date_of_birth: '',
  gender: '',
  place_of_birth: '',
  nationality: '',
  civil_status: ''
})

onMounted( async () => {
  const response = await axios.get(`/residents/${route.params.id}`)

  data.id = response.data.id
  data.last_name = response.data.last_name
  data.first_name = response.data.first_name
  data.middle_name = response.data.middle_name
  data.email = response.data.email
  data.phone = response.data.phone
  data.address = response.data.address
  data.date_issued = response.data.date_issued
  data.valid_until = response.data.valid_until
  data.date_of_birth = response.data.date_of_birth
  data.gender = response.data.gender
  data.place_of_birth = response.data.place_of_birth
  data.nationality = response.data.nationality
  data.civil_status = response.data.civil_status
})

const submit = async () => {
    if(confirm('Are you sure you are updating your profile?')) {
      await axios.put(`/residents/${route.params.id}`, data)
      alert('Profile updated successfully')
      router.push(`/resident/${data.id}`)
    }
  }
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- We've used 3xl here, but feel free to try other max-widths based on your needs -->
    <div class="max-w-3xl mx-auto">
      <form @submit.prevent="submit" class="p-4 sm:p-6 lg:p-8 space-y-8 divide-y divide-gray-200">
        <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">

          <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
            <div class="space-y-6 sm:space-y-5">
              <div class="pt-8">
                <div>
                  <h3 class="text-lg leading-6 font-medium text-gray-900">Edit Resident Data</h3>
                  <p class="mt-1 text-sm text-gray-500">Edit the existing resident's data.</p>
                </div>
                <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div class="sm:col-span-2">
                    <label for="first-name" class="block text-sm font-medium text-gray-700"> First name </label>
                    <div class="mt-1">
                      <input v-model="data.first_name" type="text" name="first-name" id="first-name" autocomplete="given-name" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                    </div>
                  </div>

                  <div class="sm:col-span-2">
                    <label for="middle-name" class="block text-sm font-medium text-gray-700"> Middle name </label>
                    <div class="mt-1">
                      <input v-model="data.middle_name" type="text" name="middle-name" id="middle-name" autocomplete="family-name" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                    </div>
                  </div>

                  <div class="sm:col-span-2">
                    <label for="last-name" class="block text-sm font-medium text-gray-700"> Last name </label>
                    <div class="mt-1">
                      <input v-model="data.last_name" type="text" name="last-name" id="last-name" autocomplete="family-name" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                    </div>
                  </div>

                  <div class="sm:col-span-3">
                    <label for="email" class="block text-sm font-medium text-gray-700"> Email address </label>
                    <div class="mt-1">
                      <input v-model="data.email" id="email" name="email" type="email" autocomplete="email" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                    </div>
                  </div>
                  <div class="sm:col-span-3">
                    <label for="phone" class="block text-sm font-medium text-gray-700"> Phone number </label>
                    <div class="mt-1">
                      <input v-model="data.phone" id="phone" name="phone" type="tel" autocomplete="phone" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                    </div>
                  </div>

                  <div class="sm:col-span-6">
                    <label for="street-address" class="block text-sm font-medium text-gray-700"> Street address </label>
                    <div class="mt-1">
                      <input v-model="data.address" type="text" name="street-address" id="street-address" autocomplete="street-address" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                    </div>
                  </div>
                
                  <div class="sm:col-span-3">
                    <label for="date-of-birth" class="block text-sm font-medium text-gray-700"> Date of Birth</label>
                    <div class="mt-1">
                      <input v-model="data.date_of_birth" type="text" name="date-of-birth" id="date-of-birth" autocomplete="date-of-birth" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                    </div>
                  </div>
                  
                  <div class="sm:col-span-3">
                    <label for="gender" class="block text-sm font-medium text-gray-700"> Gender </label>
                    <div class="mt-1">
                      <select v-model="data.gender" id="gender" name="gender" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div class="sm:col-span-2">
                    <label for="place-of-birth" class="block text-sm font-medium text-gray-700"> Place of birth </label>
                    <div class="mt-1">
                      <input v-model="data.place_of_birth" type="text" name="place-of-birth" id="place-of-birth" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                    </div>
                  </div>

                  <div class="sm:col-span-2">
                    <label for="nationality" class="block text-sm font-medium text-gray-700"> Nationality </label>
                    <div class="mt-1">
                      <input v-model="data.nationality" type="text" name="nationality" id="nationality" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                    </div>
                  </div>

                  <div class="sm:col-span-2">
                    <label for="civil-status" class="block text-sm font-medium text-gray-700"> Civil Status </label>
                    <div class="mt-1">
                      <input v-model="data.civil_status" type="text" name="civil-status" id="civil-status" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                    </div>
                  </div>

                  <div class="sm:col-span-3">
                    <label for="date-issued" class="block text-sm font-medium text-gray-700">Date Issued</label>
                    <div class="mt-1">
                      <input v-model="data.date_issued" type="text" disabled name="date-issued" id="date-issued" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                    </div>
                  </div>

                  <div class="sm:col-span-3">
                    <label for="valid-until" class="block text-sm font-medium text-gray-700">Valid Until</label>
                    <div class="mt-1">
                      <input v-model="data.valid_until" type="date" name="valid-until" id="valid-until" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="pt-5">
          <div class="flex justify-end">
            <button type="button" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <router-link to="/residents">
                Cancel
              </router-link>
            </button>
            <button type="submit" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Save</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

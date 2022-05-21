<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import axios from 'axios'
import { useRoute  } from 'vue-router'

const date = new Date()
const validUntilDate = new Date(date.getTime())
const validity = validUntilDate.setFullYear(date.getFullYear() + 1)
const validUntil = new Date(validity).toLocaleDateString()
const validityDate = new Date(validity).toLocaleDateString()

  const data = reactive({
    id: '',
    last_name: '',
    first_name: '',
    middle_name: '',
    email: '',
    phone: '',
    address: '',
    date_issued: validityDate,
    valid_until: validUntil,
    date_of_birth: '',
    gender: '',
    place_of_birth: '',
    nationality: '',
    civil_status: ''
  })
  const route = useRoute()

  const load = async() => {
  const response  = await axios.get(`/residents/${route.params.id}`)

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

  console.log(data)

  }

onMounted(load)

</script>

<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg leading-6 font-medium text-gray-900">Resident Information</h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
    </div>
    <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
      <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Full name</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ data.last_name }}, {{ data.first_name }} {{ data.middle_name }}</dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Phone Number</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ data.phone }}</dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Email address</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ data.email }}</dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Date of Birth</dt>
          <dd class="mt-1 text-sm text-gray-900"> {{ data.date_of_birth }} </dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Place of Birth</dt>
          <dd class="mt-1 text-sm text-gray-900"> {{ data.place_of_birth }} </dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Gender</dt>
          <dd class="mt-1 text-sm text-gray-900"> {{ data.gender }} </dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Nationality</dt>
          <dd class="mt-1 text-sm text-gray-900"> {{ data.nationality }} </dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Civil Status</dt>
          <dd class="mt-1 text-sm text-gray-900"> {{ data.civil_status }} </dd>
        </div>
        <div class="sm:col-span-3">
          <dt class="text-sm font-medium text-gray-500">Address</dt>
          <dd class="mt-1 text-sm text-gray-900"> {{ data.address }}</dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Date Issued</dt>
          <dd class="mt-1 text-sm text-gray-900"> {{ data.date_issued }} </dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Valid Until</dt>
          <dd class="mt-1 text-sm text-gray-900"> {{ data.valid_until }} </dd>
        </div>
      </dl>
      <div class="pt-5">
        <div class="flex justify-center">
        <router-link :to="`/residents/${data.id}/edit`" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Edit<span class="sr-only">, {{ data.last_name }}, {{ data.first_name }} </span>
        </router-link>
          <button type="button" class="ml-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <router-link to="/">
              Log out
            </router-link>
          </button>
        </div>
      </div>
    </div>
    
  </div>
</template>
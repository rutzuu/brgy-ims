<script setup lang="ts">
import { TrashIcon } from '@heroicons/vue/outline'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { Resident } from '../../models/residents'
import Paginator from '../../components/Paginator.vue'
  const residents = ref()
  const lastPage = ref(0)
  const total = ref()

  const load = async( page = 1 ) => {
  const { data } = await axios.get(`/residents?page=${page}`)
  
  residents.value = data.data
  lastPage.value = data.meta.last_page
  total.value = data.meta.total
}

onMounted(load)

const del = async (id: Number) => {
  if (confirm('Are you sure you are deleting this resident?')) {
    await axios.delete(`/resident/${id}`)
    alert('Resident deleted')
    residents.value = residents.value.filter((r: Resident) => r.id !== id)
  }
}

</script>

<template>
  <div class="p-4 sm:p-6 lg:p-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Residents</h1>
        <p class="mt-2 text-sm text-gray-700">A list of all the users in your account including their name, title, email and role.</p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button type="button" class="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto">
          <router-link to="/residents/create">
            Add Resident
          </router-link>
          </button>
      </div>
    </div>
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Address</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date of Birth</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Gender</th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white">
                <tr v-for="resident in residents" :key="resident.id">
                  <td class="whitespace-nowrap py-4 pl-4  text-sm font-medium text-gray-900 sm:pl-6">{{ resident.last_name }}, {{ resident.first_name }} {{ resident.middle_name }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ resident.email }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ resident.address }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ resident.date_of_birth }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ resident.gender }}</td>
                  <td class="relative flex-1 sm:flex justify-end whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <router-link :to="`/residents/${resident.id}/edit`" class="text-blue-600 hover:text-blue-900">
                      Edit<span class="sr-only">, {{ resident.last_name }}, {{ resident.first_name }} </span>
                    </router-link>
                    <a @click="del(resident.id)" href="javascript:void(0)" class="ml-4 flex-shrink-0">
                      <TrashIcon class="text-red-600 hover:text-red-900 flex-shrink-0 mr-1.5 h-5 w-5" aria-hidden="true"/>
                      <span class="sr-only">, {{ resident.last_name }}, {{ resident.first_name }} </span>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <Paginator :last-page="lastPage" :total="total" @page-changed="load($event)"/>
  </div>
</template>
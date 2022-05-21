<script setup lang="ts">
import { TrashIcon } from '@heroicons/vue/outline'
import Paginator from '../../components/Paginator.vue'
import axios from 'axios';
import { onMounted, ref } from 'vue';
import {User} from '../../models/user'
const users = ref()
const lastPage = ref(0)
const total = ref()

const load = async (page = 1) => {
  const { data } = await axios.get(`/users?page=${page}`)

  users.value = data.data
  lastPage.value = data.meta.last_page
  total.value = data.meta.total
  }

onMounted(load)

const del = async (id: number) => {
  if (confirm('Are you sure?')) {
    try {
      await axios.delete(`/users/${id}`)
      await alert('User deleted.')
      users.value = users.value.filter((u: User) => u.id !== id)
    } catch (error) {
      alert(error)
    }
  }
}

</script>

<template>
  <div class="p-4 sm:p-6 lg:p-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Users</h1>
        <p class="mt-2 text-sm text-gray-700">A list of all the users in your account including their name, title, email and role.</p>
      </div>

      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button type="button" class="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto">
          <router-link to="/users/create">
            Add user
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
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">User ID</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Role</th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="user in users" :key="user.id">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ user.id }}</td>
                  <td class="truncate px-3 py-4 text-sm text-gray-500">{{ user.first_name }} {{ user.last_name }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ user.email }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ user.role.name }}</td>
                  <td class="relative flex-1 flex justify-between sm:justify-end whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <router-link :to="`/users/${user.id}/edit`" class="text-blue-600 hover:text-blue-900">
                      Edit<span class="sr-only">, {{ user.first_name }}</span>
                    </router-link>
                    <a @click="del(user.id)" href="javascript:void(0)" aria-hidden="true">
                      <TrashIcon class="ml-8 text-red-600 hover:text-red-900 flex-shrink-0 mr-1.5 h-5 w-5">
                      <span class="sr-only">, {{ user.first_name }}</span>
                    </TrashIcon>
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
<script setup lang="ts">
import { PencilIcon, TrashIcon } from '@heroicons/vue/solid'
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
import { Role } from '../../models/roles';

const roles = ref()

onMounted( async() => {
  const { data } = await axios.get('/roles')
  roles.value = data
})

const del = async (id: number) => {
  if (confirm('Are you sure?')) {
    await axios.delete(`/roles/${id}`)
    alert('Role deleted.')
    roles.value = roles.value.filter((r: Role) => r.id !== id)
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto sm:p-6 lg:p-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Roles</h1>
        <p class="mt-2 text-sm text-gray-700">A list of all the roles and their permissions.</p>
      </div>

      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button type="button" class="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto">
          <router-link to="/roles/create">
            Add Role
          </router-link>
          </button>
      </div>
    </div>
    <ul role="list" class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="role in roles" :key="role.id" class="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
        <div class="w-full flex items-center justify-between p-6 space-x-6">
          <div class="flex space-x-3">
            <!-- <div v-for="permission in permissionsData.permissions" :key="permission.id" class="flex items-center space-x-3"> -->
            <!-- </div> -->
            <div class="flex items-center space-x-3">
              <h3 class="ml-1 text-gray-900 text-lg font-medium truncate">{{ role.name }}</h3>
            </div>
          </div>
        </div>
        <div>
          <div class="-mt-px flex divide-x divide-gray-200">
            <div class="w-0 flex-1 flex">
              <router-link :to="`/roles/${role.id}/edit`" href="javascript:void(0)" class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">
                <PencilIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
                <span class="ml-3">Edit Role</span>
              </router-link>
            </div>
            <div class="-ml-px w-0 flex-1 flex">
              <a @click="del(role.id)" href="javascript:void(0)" class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">
                <TrashIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
                <span class="ml-3">Delete</span>
              </a>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <!-- Content goes here -->
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import axios from 'axios'
import { useRouter } from 'vue-router';

  const formData = reactive({
    name: '',
    permissions: [] as number[]
  })
  const permList = ref()
  const { push } = useRouter()

  onMounted( async () => {
    const { data } = await axios.get('/permissions')

    permList.value = data
  })

  const select = (id: number, checked: boolean) => {
    if (checked) {
      formData.permissions = [...formData.permissions, id]
      return
    }
    formData.permissions = formData.permissions.filter(((p: any) => p !== id))
  }

  const submit = async () => {
    if (formData.name.length === 0) {
      alert('Name is required')
      return
    }
    if (confirm('Are you sure?')) {
      await axios.post('/roles', formData)
      alert('Role created.')
      push('/roles')
    }
  }
</script>

<template>
  <div class="max-w-xl mx-auto sm:py-8 lg:py-12">
  <form @submit.prevent="submit" class="space-y-8 divide-y divide-gray-200">
    <div class="space-y-8 divide-y divide-gray-200">
      <div class="pt-8">
        <div>
          <h3 class="text-lg leading-6 font-medium text-gray-900">Role Information</h3>
          <p class="mt-1 text-sm text-gray-500">Name the new role and select its permissions.</p>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">

          <div class="sm:col-span-6">
            <label for="role-name" class="block text-sm font-medium text-gray-700"> Role Name</label>
            <div class="mt-1">
              <input v-model="formData.name" type="text" name="role-name" id="role-name" autocomplete="role-name" class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" />
            </div>
          </div>
        </div>
        <div class="mt-6">
          <fieldset>
            <legend class="sr-only">Permissions</legend>
            <div class="text-base font-medium text-gray-900" aria-hidden="true">Permissions</div>
            <div v-for="permission in permList" :key="permission.id" class="mt-4 space-y-4 flex">
            <div class="flex-wrap">
              <div class="relative flex items-start">
                <div class="flex items-center h-5">
                  <input :value="permission.id" id="permission" name="permission" type="checkbox" @change="select(permission.id, ($event.target as HTMLInputElement).checked)" class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                </div>
                <div class="ml-3 text-sm">
                  <label for="permission" class="font-medium text-gray-700">{{ permission.name }}</label>
                  <!-- <p class="text-gray-500">Get notified when someones posts a comment on a posting.</p> -->
                </div>
              </div>
            </div>
            </div>
          </fieldset>
        </div>
      </div>
    </div>

    <div class="pt-5">
      <div class="flex justify-end">
        <button type="button" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <router-link to="/roles">
            Cancel
          </router-link>
          </button>
        <button type="submit" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Save</button>
      </div>
    </div>
  </form>

  </div>
</template>

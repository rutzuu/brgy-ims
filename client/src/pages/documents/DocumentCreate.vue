<script setup lang="ts">
import axios from 'axios';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const data = reactive ({
  code: '',
  title: '',
  price: '',
})

const submit = async () => {
    if(confirm('Are you sure you are creating this document?')) {
      await axios.post('/products', data)
      alert('Document created successfully')
      router.push('/documents')
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
            <div>
              <h3 class="text-lg leading-6 font-medium text-gray-900">Document Information</h3>
              <p class="mt-1 max-w-2xl text-sm text-gray-500">Fill up the document details including the code and price.</p>
            </div>
            <div class="space-y-6 sm:space-y-5">
              <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label for="document-code" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Document Code </label>
                <div class="mt-1 sm:mt-0 sm:col-span-2">
                  <input v-model="data.code" type="text" name="document-code" id="document-code" class="max-w-lg block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md required" />
                </div>
              </div>

              <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label for="document-title" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Document Title </label>
                <div class="mt-1 sm:mt-0 sm:col-span-2">
                  <input v-model="data.title" type="text" name="document-title" id="document-title" class="max-w-lg block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md required" />
                </div>
              </div>

              <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label for="price" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Price </label>
                <div class="mt-1 sm:mt-0 sm:col-span-2">
                  <input v-model="data.price" id="price" name="price" type="text" class=" max-w-lg w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 sm:max-w-xs rounded-md required" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="pt-5">
          <div class="flex justify-end">
            <button type="button" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <router-link to="/documents" class="text-gray-500 hover:text-gray-400 focus:text-gray-400">
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

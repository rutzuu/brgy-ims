<script setup lang="ts">
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

  const data = reactive({
    product_id: '',
    resident_id: ''
  })
  const products = ref()
  const router = useRouter()

  onMounted(async () => {
    const { data } = await axios.get('/products')
    const response = await axios.get('/residents/all')

    products.value = data.data
    residents.value = response.data
  }) 

const residents = ref()

  const submit = async () => {
    if (confirm('Confirm creating a new transaction? Please make sure that the information is correct.')) {
      await axios.post('/orders', data)
      await alert('Transaction recorded successfully!')
      await router.push('/transactions')
    }
  }
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <form @submit.prevent="submit" class="p-4 sm:p-6 lg:p-8 space-y-8 divide-y divide-gray-200">
        <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">

          <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
            <div>
              <h3 class="text-lg leading-6 font-medium text-gray-900">Add New Transaction</h3>
              <p class="mt-1 max-w-2xl text-sm text-gray-500">Choose between the available documents and the existing residents. Those who are not registered yet should sign up first.</p>
            </div>
            <div class="space-y-6 sm:space-y-5">
              <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label for="Product" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Document </label>
                <div class="mt-1 sm:mt-0 sm:col-span-2">
                  <select v-model="data.product_id" id="product" name="product" autocomplete="product-name" class="max-w-lg block focus:ring-blue-500 focus:border-blue-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                    <option v-for="product of products" :key="product.id" :value="product.id">{{ product.title }}
                    <label for="Product" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">: ₱{{ product.price }} </label>
                    </option>
                    
                  </select>
                </div>
              </div>
              <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label for="Resident" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Resident </label>
                <div class="mt-1 sm:mt-0 sm:col-span-2">
                  <select v-model="data.resident_id" id="resident" name="resident" autocomplete="resident-name" class="max-w-lg block focus:ring-blue-500 focus:border-blue-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                    <option v-for="resident of residents" :key="resident.id" :value="resident.id">{{ resident.first_name }} {{resident.last_name}}</option>
                  </select>
                </div>
              </div>

              <!-- <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label for="city" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> City </label>
                <div class="mt-1 sm:mt-0 sm:col-span-2">
                  <input type="text" name="city" id="city" autocomplete="address-level2" class="max-w-lg block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
                </div>
              </div>

              <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label for="region" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> State / Province </label>
                <div class="mt-1 sm:mt-0 sm:col-span-2">
                  <input type="text" name="region" id="region" autocomplete="address-level1" class="max-w-lg block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
                </div>
              </div> -->

            </div>
          </div>
        </div>

        <div class="pt-5">
          <div class="flex justify-end">
            <button type="button" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <router-link to="/transactions">Cancel</router-link>
              </button>
            <button type="submit" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Save</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from 'axios'
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createDeflate } from 'zlib';

const orders = ref()
// const lastPage = ref(0)
// const total = ref()
// const take = ref()

const load = async() => {
  const { data } = await axios.get(`/orders-today`)
  
  orders.value = data
  // lastPage.value = data.meta.last_page
  // total.value = data.meta.total
  // take.value = data.meta.take
}

onMounted(load)

  const generateCSV = async () => {
    const { data } = await axios.post(`/orders/export-csv`, {}, {responseType: 'blob'})
    const blob = new Blob([data], { type: 'text/csv' })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = 'Transactions.csv'
    link.click()
    }
  // const submit = async () => {
  //   if (confirm('Confirm creating a new transaction? Please make sure that the information is correct.')) {
  //     await axios.post('/orders', data)
  //     await alert('Transaction recorded successfully!')
  //     await router.push('/transactions')
  //   }
  // }
</script>

<template>
  <div class="p-4 sm:p-6 lg:p-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Transactions Report</h1>
        <p class="mt-2 text-sm text-gray-700">A summary of the transactions for this system.</p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button @click="generateCSV" type="button" class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">Export</button>
      </div>
    </div>
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Transaction ID</th>
                  <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">Product Title</th>
                  <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">Product Code</th>
                  <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">Resident Name</th>
                  <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">Address</th>
                  <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">Phone Number</th>
                  <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">Price</th>
                  <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">Created At</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="transaction in orders" :key="transaction.id">
                  <td class="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">{{ transaction.id }}</td>
                  <td class="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">{{ transaction.product.title }}</td>
                  <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{{ transaction.product.code }}</td>
                  <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{{ transaction.resident.last_name }}, {{ transaction.resident.first_name }}</td>
                  <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{{ transaction.resident.address }}</td>
                  <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{{ transaction.resident.phone }}</td>
                  <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{{ transaction.product.price }}</td>
                  <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{{ transaction.created_at }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

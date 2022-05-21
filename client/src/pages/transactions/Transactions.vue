<script setup lang="ts">
import axios from 'axios'
import { PencilIcon,TrashIcon } from '@heroicons/vue/outline'
import { onMounted, ref } from 'vue'
import { Order } from '../../models/orders'
import Paginator from '../../components/Paginator.vue'

const orders = ref()
const lastPage = ref(0)
const total = ref()
const take = ref()

const load = async( page = 1 ) => {
  const { data } = await axios.get(`/orders?page=${page}`)
  
  orders.value = data.data
  lastPage.value = data.meta.last_page
  total.value = data.meta.total
  take.value = data.meta.take
}

onMounted(load)

const del = async (id: Number) => {
  if (confirm('Are you sure you are deleting this transaction?')) {
    await axios.delete(`/orders/${id}`)
    alert('Order deleted')
    orders.value = orders.value.filter((p: Order) => p.id !== id)
  }
}
</script>
<template>
  <div class="p-4 sm:p-6 lg:p-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Transactions</h1>
        <p class="mt-2 text-sm text-gray-700">List or transactions.</p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button type="button" class="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto">
          <router-link to="/transactions/create">
            Add New Transaction
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
                  <th scope="col" class="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Transaction ID</th>
                  <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">Document Name</th>
                  <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">Document Code</th>
                  <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">Resident Name</th>
                  <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">Price</th>
                  <th scope="col" class="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="order in orders" :key="order.id">
                  <td class="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">{{ order.id }}</td>
                  <td class="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">{{ order.product.title }}</td>
                  <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{{ order.product.code }}</td>
                  <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{{ order.resident.last_name }}, {{ order.resident.first_name }}</td>
                  <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">₱{{ order.product.price }}</td>
                  <td class="relative whitespace-nowrap py-2 flex justify-end pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <div class="ml-5 flex-shrink-0">
                      <router-link :to="`/transactions/${order.id}/edit`">
                        <PencilIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </router-link>
                    </div>
                    <div class="ml-8 flex-shrink-0">
                      <a @click="del(order.id)" href="javascript:void(0)" aria-hidden="true">
                        <TrashIcon class="text-red-600 hover:text-red-900 flex-shrink-0 mr-1.5 h-5 w-5">
                        <span class="sr-only">, {{ order.title }}</span>
                      </TrashIcon>
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <Paginator :last-page="lastPage" :take="take" :total="total" @page-changed="load($event)"/>
  </div>
</template>
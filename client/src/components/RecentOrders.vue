<script setup lang="ts">
import { CashIcon } from '@heroicons/vue/outline'
import axios from 'axios';
import { onMounted, ref } from 'vue';
import Paginator from '../components/Paginator.vue'

const orders = ref()
const lastPage = ref(0)
const total = ref()
const take = ref()

const load = async( page = 1 ) => {
  const { data } = await axios.get(`/orders/dashboard?page=${page}`)
  
  orders.value = data.data
  lastPage.value = data.meta.last_page
  total.value = data.meta.total
  take.value = data.meta.take
}

onMounted(load)

const productStyles = {
  'BRGY-CL': 'bg-green-100 text-green-800',
  'CRT-ID': 'bg-yellow-100 text-yellow-800',
  'BRGY-ID': 'bg-gray-100 text-gray-800',
}
</script>
<template>
  <div class="relative border-gray-300 shadow-sm flex items-center">
    <div class="flex-1 min-w-0">
      <div>
        <h2 class="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-0">Recent Orders</h2>

        <!-- Activity list (smallest breakpoint only) -->
        <div class="shadow sm:hidden">
          <ul role="list" class="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
            <li v-for="order in orders" :key="order.id">
              <a :href="order.href" class="block px-4 py-4 bg-white hover:bg-gray-50">
                <span class="flex items-center space-x-4">
                  <span class="flex-1 flex space-x-2 truncate">
                    <CashIcon class="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span class="flex flex-col text-gray-500 text-sm truncate">
                      <span class="truncate">{{ order.id }}</span>
                      <span class="truncate">{{ order.name }}</span>
                      <span class="truncate">{{ order.product }}</span>
                      <span
                        >₱<span class="text-gray-900 font-medium">{{ order.amount }}</span></span
                      >
                      <time :datetime="order.datetime">{{ order.date }}</time>
                    </span>
                  </span>
                  <ChevronRightIcon class="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </a>
            </li>
          </ul>
          <!-- Pagination -->
          <nav class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200" aria-label="Pagination">
            <div class="flex-1 flex justify-between">
              <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"> Previous </a>
              <a href="#" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"> Next </a>
            </div>
          </nav>
        </div>

        <!-- Activity table (small breakpoint and up) -->
        <div class="hidden sm:block">
          <div class="max-w-6xl mx-auto px-4 mt-5 sm:px-6 lg:px-0">
            <div class="flex flex-col mt-2">
              <div class="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number</th>
                      <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resident</th>
                      <th class="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block">Product</th>
                      <th class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="order in orders" :key="order.id" class="bg-white">
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div class="flex">
                          <a :href="order.href" class="group inline-flex space-x-2 truncate text-sm">
                            <p class="text-gray-500 truncate group-hover:text-gray-900">
                              {{ order.id }}
                            </p>
                          </a>
                        </div>
                      </td>
                      
                      <td class="px-6 py-4 text-left truncate text-sm text-gray-500">
                        {{ order.resident.first_name }} {{order.resident.last_name}}
                      </td>
                      <td class="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                        <span :class="[productStyles[order.product.code as keyof typeof productStyles], 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize']">
                          {{ order.product.code }}
                        </span>
                      </td>
                      <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                        ₱<span class="text-gray-900 font-medium">{{ order.product.price }}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- Pagination -->
                <Paginator :last-page="lastPage" :take="take" :total="total" @page-changed="load($event)"/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
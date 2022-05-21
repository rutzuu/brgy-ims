<script setup lang="ts">
import { PencilIcon,TrashIcon } from '@heroicons/vue/outline'
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'
import { Product } from '../../models/products'
import Paginator from '../../components/Paginator.vue';

const products = ref()
const lastPage = ref(0)
const total = ref()
const take = ref()

const load = async( page = 1 ) => {
  const { data } = await axios.get(`/products?page=${page}`)
  
  products.value = data.data
  lastPage.value = data.meta.last_page
  total.value = data.meta.total
  take.value = data.meta.take
}

onMounted(load)

const del = async (id: Number) => {
  if (confirm('Are you sure you are deleting this product?')) {
    await axios.delete(`/products/${id}`)
    products.value = products.value.filter((p: Product) => p.id !== id)
  }
}

</script>

<template>
  <div class="max-w-7xl mx-auto sm:py-12 sm:px-6 lg:px-8 lg:py-36">
    <div class="md:flex md:items-center md:justify-between">
      <div class="flex-1 min-w-0">
        <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Documents</h2>
      </div>
      <div class="mt-4 flex md:mt-0 md:ml-4">
        <button type="button" class="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <router-link to="/documents/create">
            Add New Document
          </router-link>
        </button>
      </div>
    </div>

    <div class="mt-8 bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" class="divide-y divide-gray-200">
        <li v-for="product in products" :key="product.id">
          <a class="block hover:bg-gray-50">
            <div class="px-4 py-4 flex items-center sm:px-6">
              <div class="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                <div class="truncate">
                  <div class="flex text-sm">
                    <p class="font-medium text-blue-600 truncate">{{ product.title }}</p>
                    <div class="ml-2 flex-shrink-0 flex">
                      <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {{ product.code }}
                      </p>
                    </div>
                  </div>
                  <div class="mt-2 flex">
                    <div class="flex items-center text-sm text-gray-500">
                      <p>
                        ₱
                        {{ ' ' }}
                        <time :datetime="product.closeDate">{{ product.price }}</time>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="ml-5 flex-shrink-0">
                <router-link :to="`/products/${product.id}/edit`">
                  <PencilIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </router-link>
              </div>
              <div class="ml-8 flex-shrink-0">
                <a @click="del(product.id)" href="javascript:void(0)" aria-hidden="true">
                  <TrashIcon class="text-red-600 hover:text-red-900 flex-shrink-0 mr-1.5 h-5 w-5">
                  <span class="sr-only">, {{ product.title }}</span>
                </TrashIcon>
                </a>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>

    <Paginator :last-page="lastPage" :take="take" :total="total" @page-changed="load($event)"/>
  </div>

</template>


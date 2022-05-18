<script setup lang="ts">
import { IdentificationIcon, MailOpenIcon, UsersIcon } from '@heroicons/vue/outline'
import RecentOrders from '../components/RecentOrders.vue';
import RecentRegisteredResidents from '../components/RecentRegisteredResidents.vue';

const stats = [
  { id: 1, name: 'Orders Today', stat: '72', icon: MailOpenIcon, change: '122', changeType: 'increase' },
  { id: 2, name: 'Newly Registered Residents Today', stat: '58', icon: UsersIcon, change: '5.4%', changeType: 'increase' },
]

</script>

<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <!-- Page header -->
      <div class="flex-1 pb-8">
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 sm:px-6 lg:max-w-7xl lg:mx-auto lg:px-8">
            <div class="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
              <div class="flex-1 min-w-0">
                <!-- Employee Profile -->
                <div class="flex items-center">
                  <div class="hidden sm:inline-flex align-middle items-center justify-center h-16 w-16 bg-blue-400 rounded-full">
                      <span class="text-xl font-medium leading-none text-white">JD</span>
                  </div>
                  <div>
                    <div class="flex items-center">
                      <div class="inline-flex items-center text-center justify-center h-16 w-16 rounded-full bg-blue-400 sm:hidden">
                        <span class="text-2xl font-medium text-center leading-none text-white">JD</span>
                      </div>
                      <h1 class="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">Juan Dela Cruz</h1>
                    </div>
                    <dl class="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                      <dt class="sr-only">Employee Number</dt>
                      <dd class="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6">
                        <IdentificationIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                          Employee #10001
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <!-- Add Residents and New Order Button -->
              <div class="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                <button type="button" class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <router-link to="/residents/create">
                    Add Residents
                  </router-link>
                  </button>
                <button type="button" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <router-link to="/orders/create">
                    New Order
                  </router-link>                  
                  </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div class="mt-8">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Today's Activity</h3>
          
          <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
            <div v-for="item in stats" :key="item.id" class="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
              <dt>
                <div class="absolute bg-blue-500 rounded-md p-3">
                  <component :is="item.icon" class="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p class="ml-16 text-sm font-medium text-gray-500 truncate">{{ item.name }}</p>
              </dt>
              <dd class="ml-16 pb-6 flex items-baseline sm:pb-7">
                <p class="text-2xl font-semibold text-gray-900">
                  {{ item.stat }}
                </p>
                <div class="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                  <div class="text-sm">
                    <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
                      View all
                      <span class="sr-only"> {{ item.name }} stats</span>
                    </a>
                  </div>
                </div>
              </dd>
            </div>
          </dl>
        </div>

        <!-- Recent Activities -->
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <!-- Recent Orders Activity -->
          <RecentOrders/>
          <!-- Recent Registered Residents -->
          <RecentRegisteredResidents/>
        </div>


      </div>
    </div>
  </div>
</template>
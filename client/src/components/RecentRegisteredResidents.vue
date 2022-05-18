<script setup lang="ts">
import { UserCircleIcon } from '@heroicons/vue/outline'

const residents = [
    {
      id: 1,
      name: 'Benjamin Santos',
      href: '#',
      address: '1127 Faustino, Quezon City, Metro Manila',
      date: 'May 10, 2022',
      datetime: '2022-05-10',
    },
    {
      id: 1,
      name: 'Benjamin Santos',
      href: '#',
      address: '1127 Faustino, Quezon City, Metro Manila',
      date: 'May 10, 2022',
      datetime: '2022-05-10',
    },
    {
      id: 1,
      name: 'Benjamin Santos',
      href: '#',
      address: '1127 Faustino, Quezon City, Metro Manila',
      date: 'May 10, 2022',
      datetime: '2022-05-10',
    },
    {
      id: 1,
      name: 'Benjamin Santos',
      href: '#',
      address: '1127 Faustino, Quezon City, Metro Manila',
      date: 'May 10, 2022',
      datetime: '2022-05-10',
    },
    {
      id: 1,
      name: 'Benjamin Santos',
      href: '#',
      address: '1127 Faustino, Quezon City, Metro Manila',
      date: 'May 10, 2022',
      datetime: '2022-05-10',
    }
    // More residents...
]
</script>

<template>
  <div class="relative border-gray-300 shadow-sm flex items-center">
    <div class="flex-1 min-w-0">
      <h2 class="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-0">Recent Registered Residents</h2>

      <div>
        <!-- Activity list (smallest breakpoint only) -->
        <div class="shadow sm:hidden">
          <ul role="list" class="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
            <li v-for="resident in residents" :key="resident.id">
              <a :href="resident.href" class="block px-4 py-4 bg-white hover:bg-gray-50">
                <span class="flex items-center space-x-4">
                  <span class="flex-1 flex space-x-2 truncate">
                    <UserCircleIcon class="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span class="flex flex-col text-gray-500 text-sm truncate">
                      <span class="truncate">{{ resident.name }}</span>
                      <span class="truncate">{{ resident.address }}</span>
                      <time :datetime="resident.datetime">{{ resident.date }}</time>
                    </span>
                  </span>
                  <ChevronRightIcon class="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </a>
            </li>
          </ul>

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
                      <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                      <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                      <th class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Date Issued</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="resident in residents" :key="resident.id" class="bg-white">
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div class="flex">
                          <a :href="resident.href" class="group inline-flex space-x-2 truncate text-sm">
                            <UserCircleIcon class="flex-shrink-0 h-6 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                            <p class="text-gray-500 truncate group-hover:text-gray-900">
                              {{ resident.name }}
                            </p>
                          </a>
                        </div>
                      </td>
                      <td class="max-w-0 w-full px-6 py-4 text-left truncate text-sm text-gray-500">
                        {{ resident.address }}
                      </td>
                      <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                        <time :datetime="resident.datetime">{{ resident.date }}</time>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- Pagination -->
                <nav class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6" aria-label="Pagination">
                  <div class="hidden sm:block">
                    <p class="text-sm text-gray-700">
                      Showing
                      {{ ' ' }}
                      <span class="font-medium">1</span>
                      {{ ' ' }}
                      to
                      {{ ' ' }}
                      <span class="font-medium">5</span>
                      {{ ' ' }}
                      of
                      {{ ' ' }}
                      <span class="font-medium">20</span>
                      {{ ' ' }}
                      results
                    </p>
                  </div>
                  <div class="flex-1 flex justify-between sm:justify-end">
                    <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Previous </a>
                    <a href="#" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Next </a>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
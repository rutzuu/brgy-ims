<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import {
  QuestionMarkCircleIcon,
} from '@heroicons/vue/outline'

  const data = reactive({
    last_name: '',
    first_name: '',
    middle_name: '',
    email: '',
    phone: '',
    address: '',
    date_issued: '',
    valid_until: '',
    date_of_birth: '',
    gender: '',
    place_of_birth: '',
    nationality: '',
    civil_status: ''
  })
  const route = useRoute()

  const navigation = [
    // { name: 'Profile', href: '#', icon: UserIcon, current: false },
    { name: 'Requirements', href: `/help`, icon: QuestionMarkCircleIcon, current: false },
  ]
  const load = async() => {
  const response  = await axios.get(`/residents/${route.params.id}`)

  data.last_name = response.data.last_name
  data.first_name = response.data.first_name
  }

onMounted(load)

const sidebarOpen = ref(false)
</script>

<template>
  -->
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog as="div" class="relative z-40 md:hidden" @close="sidebarOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>

        <div class="fixed inset-0 flex z-40">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
            <DialogPanel class="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
              <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div class="absolute top-0 right-0 -mr-12 pt-2">
                  <button type="button" class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" @click="sidebarOpen = false">
                    <span class="sr-only">Close sidebar</span>
                    <XIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <router-link to ="/">
                  <div class="flex items-center flex-shrink-0 px-2">
                    <img class="h-20 w-auto" src="../assets/brgy-holy-spirit-logo.png" alt="Brgy. Holy Spirit" />
                    <p class="text-gray-50 text-left pl-4 text-lg font-semibold">Brgy. Holy Spirit IMS</p>
                </div>
                </router-link>
                <nav class="mt-5 px-2 space-y-1">
                  <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'group flex items-center px-2 py-2 text-base font-medium rounded-md']">
                    <component :is="item.icon" :class="[item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300', 'mr-4 flex-shrink-0 h-6 w-6']" aria-hidden="true" />
                    {{ item.name }}
                  </a>
                </nav>
              </div>
              <div class="flex-shrink-0 flex bg-gray-700 p-4">
                <a href="#" class="flex-shrink-0 group block">
                  <div class="flex items-center">
                    <div class="ml-3">
                      <p class="text-base font-medium text-white"> {{ data.first_name }} {{ data.last_name }}</p>
                      <route-link to="/">
                        <p class="text-sm font-medium text-gray-400 group-hover:text-gray-300">Logout</p>
                      </route-link>
                    </div>
                  </div>
                </a>
              </div>
            </DialogPanel>
          </TransitionChild>
          <div class="flex-shrink-0 w-14">
            <!-- Force sidebar to shrink to fit close icon -->
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex-1 flex flex-col min-h-0 bg-gray-800">
        <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <router-link to ="/">
                  <div class="flex items-center flex-shrink-0 px-2">
                    <img class="h-20 w-auto" src="../assets/brgy-holy-spirit-logo.png" alt="Brgy. Holy Spirit" />
                    <p class="text-gray-50 text-left pl-8 text-lg font-semibold">Brgy. Holy Spirit IMS</p>
                </div>
                </router-link>
          <nav class="mt-5 flex-1 px-2 space-y-1">
            <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'group flex items-center px-2 py-2 text-sm font-medium rounded-md']">
              <component :is="item.icon" :class="[item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300', 'mr-3 flex-shrink-0 h-6 w-6']" aria-hidden="true" />
              {{ item.name }}
            </a>
          </nav>
        </div>
        <div class="flex-shrink-0 flex bg-gray-700 p-4">
          <a href="#" class="flex-shrink-0 w-full group block">
            <div class="flex items-center">
              <div class="ml-3">
                <p class="text-base font-medium text-white"> {{ data.first_name }} {{ data.last_name }}</p>
                <router-link to="/">
                  <p class="text-sm font-medium text-gray-400 group-hover:text-gray-300">Logout</p>
                </router-link>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div class="md:pl-64 flex flex-col flex-1">
      <div class="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
        <button type="button" class="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" @click="sidebarOpen = true">
          <span class="sr-only">Open sidebar</span>
          <MenuIcon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </div>
  </div>
</template>

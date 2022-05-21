<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue'
  import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
  import { ChartBarIcon, FolderIcon, HomeIcon, IdentificationIcon, InboxIcon, MenuIcon, UserGroupIcon, UsersIcon } from '@heroicons/vue/outline'
  import axios from 'axios';
  
  const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon, current: true },
    { name: 'Transactions', href: '/transactions', icon: InboxIcon, current: false },
    { name: 'Residents', href: '/residents', icon: UsersIcon, current: false },
    { name: 'Users', href: '/users', icon: UserGroupIcon, current: false },
    { name: 'Roles', href: '/roles', icon: IdentificationIcon, current: false },
    { name: 'Documents', href: '/documents', icon: FolderIcon, current: false },
    { name: 'Reports', href: '/reports', icon: ChartBarIcon, current: false },
  ]

  const account = ref()

  const accounts = reactive({ 
      first_name: '',
      last_name: '',
      id: ''
    })

  const sidebarOpen = ref(false)

  onMounted( async () => {
  const { data } = await axios.get('/user')

  accounts.first_name = data.first_name
  accounts.last_name = data.last_name
  accounts.id= data.id

  account.value = `${data.first_name} ${data.last_name}`
  })

  const logout = async () => {
    try {
      if(confirm('Are you sure you want to logout?')) {
        await axios.post('/logout')
      }
      } catch (error) {
        alert(error)
    }
  }
</script>

<template>
  <div>
    <!-- Sidebar for mobile -->
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
                  <span class="sr-only">Close sidebar</span>
                </div>
              </TransitionChild>
              <div class="flex flex-col flex-grow border-r border-gray-200 pt-5 pb-4 bg-white overflow-y-auto">
                <router-link to ="/">
                  <div class="flex items-center flex-shrink-0 px-2">
                    <img class="h-20 w-auto" src="../assets/brgy-holy-spirit-logo.png" alt="Brgy. Holy Spirit" />
                    <p class="text-gray-900 text-left pl-4 text-lg font-semibold">Brgy. Holy Spirit IMS</p>
                </div>
                </router-link>
                <div class="mt-5 flex-grow flex flex-col">
                  <nav class="flex-1 px-2 space-y-8 bg-white" aria-label="Sidebar">
                    <div class="space-y-1">
                      <router-link v-for="item in navigation" :key="item.name" :to="item.href" :class="[item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900', 'group flex items-center px-2 py-2 text-sm font-medium rounded-md']">
                        <component :is="item.icon" :class="[item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500', 'mr-3 flex-shrink-0 h-6 w-6']" aria-hidden="true" />
                        {{ item.name }}
                      </router-link>
                    </div>
                    <div class="space-y-1">
                      <h3 class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"> {{ account }}</h3>
                      <div class="space-y-1" role="group" aria-labelledby="profile-headline">
                        <!-- <router-link v-for="item in secondaryNavigation" :key="item.name" :to="item.href" @click="item.click" class="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50">
                          <span class="truncate">
                            {{ item.name }}
                          </span>
                        </router-link> -->
                        <router-link to="/" @click="" class="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50">
                          <span class="truncate">
                            Settings
                          </span>
                        </router-link>
                        <router-link to="/" @click="" class="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50">
                          <span class="truncate">
                            Help
                          </span>
                        </router-link>
                        <router-link to="/login" @click="logout" class="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50">
                          <span class="truncate">
                            Logout
                          </span>
                        </router-link>
                      </div>
                    </div>
                  </nav>
                </div>
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
      <div class="flex flex-col flex-grow border-r border-gray-200 pt-5 pb-4 bg-white overflow-y-auto">
      <router-link to="/">
        <div class="flex items-center flex-shrink-0 px-2">
            <img class="h-20 w-auto" src="../assets/brgy-holy-spirit-logo.png" alt="Brgy. Holy Spirit" />
            <p class="text-gray-900 text-left pl-4 text-lg font-semibold">Brgy. Holy<br/>Spirit IMS</p>
        </div>
      </router-link>
      <div class="mt-5 flex-grow flex flex-col">
        <nav class="flex-1 px-2 space-y-8 bg-white" aria-label="Sidebar">
          <div class="space-y-1">
            <router-link v-for="item in navigation" :key="item.name" :to="item.href" :class="[item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900', 'group flex items-center px-2 py-2 text-sm font-medium rounded-md']">
              <component :is="item.icon" :class="[item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500', 'mr-3 flex-shrink-0 h-6 w-6']" aria-hidden="true" />
              {{ item.name }}
            </router-link>
          </div>
          <div class="space-y-1">
            <h3 class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"> {{ account }}</h3>
            <div class="space-y-1" role="group" aria-labelledby="profile-headline">
              <!-- <router-link v-for="item in secondaryNavigation" :key="item.name" :to="item.href" @click="item.click" class="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50">
                <span class="truncate">
                  {{ item.name }}
                </span>
              </router-link> -->
              <router-link to="" @click="" class="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50">
                <span class="truncate">
                  Profile
                </span>
              </router-link>
              <router-link to="/login" @click="logout" class="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50">
                <span class="truncate">
                  Logout
                </span>
              </router-link>
            </div>
          </div>
        </nav>
      </div>
    </div>
    </div>
    
    <div class="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
      <button type="button" class="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" @click="sidebarOpen = true">
        <span class="sr-only">Open sidebar</span>
        <MenuIcon class="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>
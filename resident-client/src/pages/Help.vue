<script setup lang="ts">
const messages = [
  { id: 1, title: 'Barangay ID Application Requirements', subject: `Must be a Filipino citizen. 6 months residency in the barangay

DVA ID/Proof of residency from DVA (for resident)

Certificate of employment issued by employer (Kasambahay, driver etc.)` },
]
const back = () => {
  history.back()
}
</script>
<template>
  <div class="max-w-4xl m-auto p-4 sm:p-6 lg:p-8">
    <main class="flex-1">
      <div class="md:flex md:items-center md:justify-between">
        <div class="flex-1 min-w-0">
          <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Requirements</h2>
        </div>
      </div>

      <div class="mt-3 bg-white shadow overflow-hidden rounded-md">
        <ul role="list" class="divide-y divide-gray-200">
          <li class="relative bg-white py-5 px-4 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
            <div class="flex justify-between space-x-3">
              <div class="min-w-0 flex-1">
                <a href="#" class="block focus:outline-none">
                  <span class="absolute inset-0" aria-hidden="true" />
                  <p class="text-sm font-medium text-gray-900 truncate">Barangay ID Application Requirements</p>
                </a>
              </div>
            </div>
            <div class="mt-1">
              <p class="line-clamp-2 text-sm text-gray-600">
                - Must be a Filipino citizen.<br>
                - 6 months residency in the barangay<br>
                - DVA ID/Proof of residency from DVA (for resident)<br>
                - Certificate of employment issued by employer (Kasambahay, driver etc.)
              </p>
            </div>
          </li>
          <li class="relative bg-white py-5 px-4 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
            <div class="flex justify-between space-x-3">
              <div class="min-w-0 flex-1">
                <a href="#" class="block focus:outline-none">
                  <span class="absolute inset-0" aria-hidden="true" />
                  <p class="text-sm font-medium text-gray-900 truncate">Barangay Business Clearance</p>
                </a>
              </div>
            </div>
            <div class="mt-1">
              <p class="line-clamp-2 text-sm text-gray-600">
                - DTI or SEC<br>
                - Memorandum of Agreement (CSA, Petron, MRT and MECC Concessionaires)<br>
                - ID of Owner/Authorization (Id of representative)<br>
                - Paid-up Capital (CSA, Petron, MRT and MECC Concessionaires)<br>
                - Payment
              </p>
            </div>
          </li>
        </ul>
      </div>
    </main>
    <div class="flex justify-center">
        <button @click="back" type="button" class="mt-3 ml-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Back
        </button>
      </div>
  </div>
  
</template>
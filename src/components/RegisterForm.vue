<template>
  <div class="flex justify-center items-center mt-52">
    <div class="w-full max-w-xs">
      <form @submit.prevent="register" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label for="username" class="block text-gray-700 text-sm font-bold mb-2">Username</label>
          <input v-model="username" id="username" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input v-model="email" id="email" type="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input v-model="password" id="password" type="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div class="flex items-center justify-between">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '../utils/apiClient'

export default defineComponent({
  name: 'RegisterForm',
  setup() {
    const username = ref('')
    const email = ref('')
    const password = ref('')
    const router = useRouter()

    const register = async () => {
      await apiClient.post('/api/auth/register', { username: username.value, email: email.value, password: password.value })
      router.push('/login')
    }

    return {
      username,
      email,
      password,
      register
    }
  }
})
</script>

<template>
  <div class="flex justify-center items-center mt-52">
    <div class="w-full max-w-xs">
      <form @submit.prevent="login" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="identity-input mb-4">
          <label for="email" class="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            id="email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Email"
            aria-describedby="emailHelp"
            v-model="email"
          />
          <span class="text-xs text-red-700" id="emailHelp"></span>
        </div>

        <div class="password-input mb-6">
          <label for="password" class="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            aria-describedby="passwordHelp"
            v-model="password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="*******"
          />
          <span class="text-xs text-red-700" id="passwordHelp"></span>
        </div>

        <div class="flex items-center justify-between">
          <button
            class="bg-blue-600 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
        <p v-if="errorMessage" class="text-red-500 text-xs mt-4">{{ errorMessage }}</p>
        <p class="mt-4 text-sm">
          Not registered? 
          <router-link to="/register" class="text-blue-500 hover:text-blue-800 font-bold">
            Click here
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import apiClient from '../utils/apiClient'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'LoginForm',
  setup() {
    const email = ref('')
    const password = ref('')
    const errorMessage = ref('')
    const router = useRouter()

    const login = async () => {
      try {
        const response = await apiClient.post('/api/auth/login', {
          email: email.value,
          password: password.value
        })
        localStorage.setItem('token', response.data.token)
        router.push('/add-product')
      } catch (error) {
        console.error('Error logging in', error)
        errorMessage.value = 'Invalid email or password'
      }
    }

    return {
      email,
      password,
      errorMessage,
      login
    }
  }
})
</script>

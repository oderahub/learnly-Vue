<template>
  <div class="container mx-auto px-4">
    <div class="flex justify-between items-center py-4">
      <h2 class="text-2xl font-bold">Add Product</h2>
      <div>
        <router-link to="/" class="text-blue-500 hover:underline mr-4">Home</router-link>
        <router-link to="/login" class="text-blue-500 hover:underline mr-4" v-if="!isAuthenticated">Login</router-link>
        <router-link to="/register" class="text-blue-500 hover:underline mr-4" v-if="!isAuthenticated">Register</router-link>
        <button @click="logout" class="text-red-500 hover:underline" v-if="isAuthenticated">Logout</button>
      </div>
    </div>
    <form @submit.prevent="addProduct">
      <div class="mb-4">
        <label for="name" class="block text-gray-700">Product Name</label>
        <input v-model="name" id="name" type="text" class="mt-1 p-2 border w-full" required />
      </div>
      <div class="mb-4">
        <label for="description" class="block text-gray-700">Description</label>
        <textarea v-model="description" id="description" class="mt-1 p-2 border w-full" required></textarea>
      </div>
      <div class="mb-4">
        <label for="price" class="block text-gray-700">Price</label>
        <input v-model="price" id="price" type="number" class="mt-1 p-2 border w-full" required />
      </div>
      <div class="mb-4">
        <label for="image" class="block text-gray-700">Image</label>
        <input @change="handleFileUpload" id="image" type="file" class="mt-1 p-2 border w-full" required />
      </div>
      <button type="submit" class="bg-blue-500 text-white p-2 rounded">Add Product</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '../utils/apiClient'

export default defineComponent({
  name: 'ProductForm',
  setup() {
    const name = ref('')
    const description = ref('')
    const price = ref('')
    const image = ref<File | null>(null)
    const router = useRouter()

    const isAuthenticated = !!localStorage.getItem('token')

    const handleFileUpload = (event: Event) => {
      const target = event.target as HTMLInputElement
      if (target.files) {
        image.value = target.files[0]
      }
    }

    const addProduct = async () => {
      const formData = new FormData()
      formData.append('name', name.value)
      formData.append('description', description.value)
      formData.append('price', price.value)
      if (image.value) {
        formData.append('image', image.value)
      }

      await apiClient.post('/api/products', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      router.push('/')
    }

    const logout = () => {
      localStorage.removeItem('token')
      router.push('/login')
    }

    return {
      name,
      description,
      price,
      image,
      isAuthenticated,
      handleFileUpload,
      addProduct,
      logout
    }
  }
})
</script>

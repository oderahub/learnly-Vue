<template>
  <div class="container mx-auto px-4">
    <!-- Header -->
    <div class="flex justify-center items-center py-4">
      <h2 class="text-3xl font-bold">Products</h2>
    </div>
    <div class="flex justify-end items-center py-4">
      <div>
        <router-link to="/add-product" class="text-blue-500 hover:underline mr-4" v-if="isAuthenticated">Add Product</router-link>
        <router-link to="/login" class="text-blue-500 hover:underline mr-4" v-if="!isAuthenticated">Login</router-link>
        <router-link to="/register" class="text-blue-500 hover:underline mr-4" v-if="!isAuthenticated">Register</router-link>
        <button @click="logout" class="text-red-500 hover:underline" v-if="isAuthenticated">Logout</button>
      </div>
    </div>

    <!-- Search Bar -->
    <input v-model="searchQuery" placeholder="Search products by name..." class="mb-4 p-2 border rounded" />

    <!-- Product List -->
    <div v-if="filteredProducts.length === 0" class="text-center">
      <p>No products available.</p>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="border rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
      >
        <img :src="product.imageURL" alt="Product Image" class="w-full h-48 object-cover" />
        <div class="p-4">
          <h3 class="text-xl font-bold mb-2">{{ product.name }}</h3>
          <p class="text-gray-700 mb-2">{{ product.description }}</p>
          <p class="text-lg font-semibold mb-4">${{ product.price.toFixed(2) }}</p>
          <div class="flex justify-between">
            <button v-if="!isAuthenticated" @click="buyProduct(product)" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Buy</button>
            <div v-if="isAuthenticated" class="flex space-x-2">
              <button @click="showEditModal(product)" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2">Edit</button>
              <button @click="deleteProduct(product.id)" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg w-1/3">
        <h3 class="text-xl font-bold mb-4">Edit Product</h3>
        <form @submit.prevent="updateProduct">
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Name</label>
            <input v-model="editProductData.name" class="w-full p-2 border rounded" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Description</label>
            <textarea v-model="editProductData.description" class="w-full p-2 border rounded" rows="3" required></textarea>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Price</label>
            <input v-model="editProductData.price" type="number" step="0.01" class="w-full p-2 border rounded" required />
          </div>
          <div class="flex justify-end">
            <button type="button" @click="closeEditModal" class="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '../utils/apiClient';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageURL: string;
}

export default defineComponent({
  name: 'ProductList',
  setup() {
    const products = ref<Product[]>([]);
    const searchQuery = ref('');
    const showModal = ref(false);
    const editProductData = ref<Product>({
      id: '',
      name: '',
      description: '',
      price: 0,
      imageURL: ''
    });
    const router = useRouter();

    const isAuthenticated = !!localStorage.getItem('token');

    const fetchProducts = async () => {
      const response = await apiClient.get('/api/products');
      products.value = response.data;
    };

    const showEditModal = (product: Product) => {
      editProductData.value = { ...product };
      showModal.value = true;
    };

    const closeEditModal = () => {
      showModal.value = false;
    };

    const updateProduct = async () => {
      await apiClient.put(`/api/products/${editProductData.value.id}`, editProductData.value, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchProducts();
      closeEditModal();
    };

    const deleteProduct = async (id: string) => {
      await apiClient.delete(`/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchProducts();
    };

    const logout = () => {
      localStorage.removeItem('token');
      router.push('/login');
    };

    const buyProduct = (product: Product) => {
      // Implement buy functionality here
      alert(`Bought product: ${product.name}`);
    };

    const filteredProducts = computed(() => {
      const query = searchQuery.value.toLowerCase();
      return products.value.filter(product => product.name.toLowerCase().includes(query));
    });

    onMounted(() => {
      fetchProducts();
    });

    return {
      products,
      searchQuery,
      filteredProducts,
      showModal,
      editProductData,
      isAuthenticated,
      showEditModal,
      closeEditModal,
      updateProduct,
      deleteProduct,
      logout,
      buyProduct
    };
  }
});
</script>

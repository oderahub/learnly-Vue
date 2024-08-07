<!-- src/components/BackButton.vue -->
<template>
  <button @click="goBack" class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
    ← Back
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'BackButton',
  setup() {
    const router = useRouter();

    const goBack = () => {
      router.go(-1);
    };

    return {
      goBack
    };
  }
});
</script>

<style scoped>
button {
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 1000;
}
</style>

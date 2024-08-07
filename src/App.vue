<!-- src/App.vue -->
<template>
  <div id="app">
    <BackButton />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BackButton from './components/BackButton.vue';

export default defineComponent({
  name: 'App',
  components: {
    BackButton
  }
});
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin: 0;
}
</style>

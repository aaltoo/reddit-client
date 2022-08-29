<script setup lang="ts">
import { RouterView } from "vue-router";
import HeaderComponent from "./components/HeaderComponent.vue";
</script>

<template>
  <div class="container">
    <HeaderComponent />
    <RouterView />
  </div>
</template>

<style scoped>
.container {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>

<script setup lang="ts">
import { RouterView } from "vue-router";
import HeaderComponent from "./components/HeaderComponent.vue";
</script>

<template>
  <div class="w-screen flex justify-center items-center flex-col">
    <HeaderComponent />
    <RouterView />
  </div>
</template>

<style scoped></style>

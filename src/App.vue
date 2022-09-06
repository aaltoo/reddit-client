<script setup lang="ts">
import { RouterView } from "vue-router";
import HeaderComponent from "./components/HeaderComponent.vue";
import SidebarMobileComponent from "./components/SidebarMobileComponent.vue";
</script>

<template>
  <div class="w-screen flex justify-center items-center flex-col">
    <HeaderComponent />
    <SidebarMobileComponent />
    <RouterView />
  </div>
</template>

<style scoped></style>

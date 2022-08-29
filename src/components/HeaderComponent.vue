<template>
  <header class="header">
    <p>Reddit</p>
    <button @click="logout">Выйти</button>
  </header>
</template>

<script setup lang="ts">
import router from "@/router";

function logout() {
  localStorage.removeItem("refresh_token");
  router.push("/auth/login");
}
</script>

<style scoped>
.header {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: antiquewhite;
  color: black;
}
</style>

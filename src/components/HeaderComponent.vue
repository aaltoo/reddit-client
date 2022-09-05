<template>
  <header
    class="w-full h-14 flex justify-between items-center px-5 bg-gray-200"
  >
    <p>Reddit</p>
    <img :src="me.icon_img" alt="avatar" class="w-10 rounded-full" />
    <!-- <button @click="logout">Выйти</button> -->
  </header>
</template>

<script setup lang="ts">
import { requester } from "@/api/requester";
import router from "@/router";
import { ref, type Ref } from "vue";

const me: Ref<any> = ref({});

function logout() {
  localStorage.removeItem("refresh_token");
  router.push("/auth/login");
}

function getMe() {
  requester.getMe().then((data) => {
    me.value = data;
  });
}

getMe();
</script>

<style scoped></style>

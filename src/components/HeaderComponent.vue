<template>
  <header
    class="w-full h-14 flex justify-between items-center px-5 bg-gray-200 fixed top-0 z-10"
  >
    <router-link to="/">Reddit</router-link>
    <img
      :src="me.icon_img"
      alt="avatar"
      class="w-10 rounded-full"
      @click="toggleSidebar()"
    />
    <!-- <button @click="logout">Выйти</button> -->
  </header>
  <div class="mb-14"></div>
</template>

<script setup lang="ts">
import { requester } from "@/api/requester";
import router from "@/router";
import { useSidebarStore } from "@/stores/sidebar";
import { storeToRefs } from "pinia";
import { ref, type Ref } from "vue";

const { isActive } = storeToRefs(useSidebarStore());

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

function toggleSidebar() {
  isActive.value = !isActive.value;
}

getMe();
</script>

<style scoped></style>

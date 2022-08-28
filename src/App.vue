<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import Snoowrap from "snoowrap";
import { ref } from "@vue/runtime-dom";

const r = new Snoowrap({
  userAgent: import.meta.env.VITE_USER_AGENT,
  clientId: import.meta.env.VITE_CLIENT_ID,
  clientSecret: import.meta.env.VITE_CLIENT_SECRET,
  refreshToken: import.meta.env.VITE_REFRESH_TOKEN,
});

const authenticationUrl = Snoowrap.getAuthUrl({
  clientId: import.meta.env.VITE_CLIENT_ID,
  scope: ["identity", "history", "edit", "account", "save", "read"],
  redirectUri: import.meta.env.VITE_REDIRECT_URI,
  permanent: false,
});

function goToAuthPage() {
  window.location.href = authenticationUrl;
}

const code = new URLSearchParams(window.location.search).get("code");

if (code) {
  localStorage.setItem("code", code);
}

function goToSomeMoreUrl() {
  const requester = Snoowrap.fromAuthCode({
    code: localStorage.getItem("code")!,
    userAgent: import.meta.env.VITE_USER_AGENT,
    clientSecret: import.meta.env.VITE_CLIENT_SECRET,
    clientId: import.meta.env.VITE_CLIENT_ID,
    redirectUri: import.meta.env.VITE_REDIRECT_URI,
  });
}

function getHot() {
  r.getHot().then((data) => {
    console.log(data);
    hot.value = data;
  });
}

const hot: any = ref([{ data: "" }, { data: "" }]);
</script>

<template>
  <button @click="goToAuthPage">auth</button>
  <button @click="goToSomeMoreUrl">get posts</button>
  <button @click="getHot">get hot</button>

  <div v-for="hotItem in hot">1</div>

  <!-- <RouterView /> -->
</template>

<style scoped></style>

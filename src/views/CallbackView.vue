<template>
  <div>callback</div>
</template>

<script setup lang="ts">
import router from "@/router";
import Snoowrap from "snoowrap";

const code = new URLSearchParams(window.location.search).get("code");

if (code) {
  localStorage.setItem("code", code);
}

Snoowrap.fromAuthCode({
  code: localStorage.getItem("code")!,
  userAgent: import.meta.env.VITE_USER_AGENT,
  clientSecret: import.meta.env.VITE_CLIENT_SECRET,
  clientId: import.meta.env.VITE_CLIENT_ID,
  redirectUri: import.meta.env.VITE_REDIRECT_URI,
}).then((resp) => {
  localStorage.setItem("refresh_token", resp.refreshToken);
  router.push("/");
});
</script>

<style scoped></style>

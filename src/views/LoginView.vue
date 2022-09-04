<template>
  <div class="container">
    <button @click="goToAuthPage">auth</button>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import Snoowrap from "snoowrap";

const authenticationUrl = Snoowrap.getAuthUrl({
  clientId: import.meta.env.VITE_CLIENT_ID,
  scope: [
    "creddits",
    "modnote",
    "modcontributors",
    "modmail",
    "modconfig",
    "subscribe",
    "structuredstyles",
    "vote",
    "wikiedit",
    "mysubreddits",
    "submit",
    "modlog",
    "modposts",
    "modflair",
    "save",
    "modothers",
    "read",
    "privatemessages",
    "report",
    "identity",
    "livemanage",
    "account",
    "modtraffic",
    "wikiread",
    "edit",
    "modwiki",
    "modself",
    "history",
    "flair",
  ],
  redirectUri: import.meta.env.VITE_REDIRECT_URI,
  permanent: true,
});

function goToAuthPage() {
  window.location.href = authenticationUrl;
}

if (localStorage.getItem("refresh_token")!) {
  router.push("/");
}
</script>

<style scoped lang="scss">
.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  button {
    padding: 1rem 2rem;
    border: none;
    border-radius: 0.5rem;
    background-color: #ff4500;
    color: #fff;
    font-size: 1.5rem;
    font-weight: 600;
    cursor: pointer;
  }
}
</style>

<template>
  <div>
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
  console.log(localStorage.getItem("refresh_token")!);
  router.push("/");
}
</script>

<style scoped></style>

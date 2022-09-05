<template>
  <router-link :to="`${post.permalink}`" v-for="post in posts" :key="post.id">
    <h1>{{ post.subreddit.display_name }}</h1>
    <h2>{{ post.title }}</h2>
  </router-link>
</template>

<script setup lang="ts">
import { requester } from "@/api/requester";
import { ref, type Ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const posts: Ref<any> = ref([]);

function getSubredditHot() {
  requester.getHot(`${route.params.subredditName}`).then((data) => {
    posts.value = data;
  });
}

route.params.subredditName && getSubredditHot();
</script>

<style scoped></style>

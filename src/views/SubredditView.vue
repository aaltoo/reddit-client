<template>
  <PostPreviewComponent v-for="post in posts" :key="post.id" :post="post" />
</template>

<script setup lang="ts">
import { requester } from "@/api/requester";
import { ref, type Ref } from "vue";
import { useRoute } from "vue-router";
import PostPreviewComponent from "../components/PostPreviewComponent.vue";

const route = useRoute();
const posts: Ref<any> = ref([]);

function getSubredditHot() {
  requester.getHot(`${route.params.subredditName}`).then((data) => {
    posts.value = data;
  });
}

route.params.subredditName && getSubredditHot();
</script>

<style scoped>
.preview {
  width: 300px;
  height: 300px;
  object-fit: cover;
}
</style>

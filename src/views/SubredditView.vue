<template>
  <div class="flex flex-col items-center">
    <img :src="subredditImg" alt="" class="w-screen" />
    <h1>{{ subredditName }}</h1>
    <h2>{{ subredditTitle }}</h2>
    <button class="rounded-xl bg-gray-200 px-4 py-1">{{}}</button>
  </div>
  <div class="mx-3 flex flex-col items-center">
    <PostPreviewComponent v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<script setup lang="ts">
import { requester } from "@/api/requester";
import { ref, watch, type Ref } from "vue";
import { useRoute } from "vue-router";
import PostPreviewComponent from "../components/PostPreviewComponent.vue";

const route = useRoute();
const posts: Ref<any> = ref([]);
const subredditName: Ref<string> = ref("");
const subredditImg: Ref<string> = ref("");
const subredditTitle: Ref<string> = ref("");
const isSubscribed: Ref<boolean> = ref(false);

watch(route, () => {
  getSubreddit();
});

async function getSubreddit() {
  subredditName.value = await requester.getSubreddit(
    `${route.params.subredditName}`
  ).display_name;
  subredditImg.value = await requester.getSubreddit(
    `${route.params.subredditName}`
  ).banner_img;
  subredditTitle.value = await requester.getSubreddit(
    `${route.params.subredditName}`
  ).title;
}

function getSubredditHot() {
  requester.getHot(`${route.params.subredditName}`).then((data) => {
    posts.value = data;
  });
}

function joinSubreddit() {
  requester
    .getSubreddit(`${route.params.subredditName}`)
    .subscribe()
    .then(() => {
      console.log("Joined subreddit");
    });
}

route.params.subredditName && getSubredditHot();
route.params.subredditName && getSubreddit();
</script>

<style scoped></style>

<template>
  <div class="flex flex-col items-center">
    <img :src="subredditImg" alt="" class="w-screen" />
    <h1 class="text-xl">{{ posts[0].subreddit_name_prefixed }}</h1>
    <button
      class="rounded-xl bg-gray-200 px-4 py-1"
      @click="isSubscribed ? leaveSubreddit() : joinSubreddit()"
    >
      {{ isSubscribed ? "unsubscribe" : "subscribe" }}
    </button>
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
const subredditImg: Ref<string> = ref("");
const isSubscribed: Ref<boolean> = ref(false);

watch(route, () => {
  getSubreddit();
});

async function getSubreddit() {
  subredditImg.value = await requester.getSubreddit(
    `${route.params.subredditName}`
  ).banner_img;
  isSubscribed.value = await requester.getSubreddit(
    `${route.params.subredditName}`
  ).user_is_subscriber;
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
      isSubscribed.value = true;
    });
}

function leaveSubreddit() {
  requester
    .getSubreddit(`${route.params.subredditName}`)
    .unsubscribe()
    .then(() => {
      isSubscribed.value = false;
    });
}

route.params.subredditName && getSubredditHot();
route.params.subredditName && getSubreddit();
</script>

<style scoped></style>

<template>
  <HeaderComponent />
  <div>
    <button @click="getHot">get hot</button>
  </div>
  <router-link :to="hotPost.permalink" v-for="hotPost in hot" :key="hotPost.id">
    <h1>{{ hotPost.subreddit.display_name }}</h1>
    <h2>{{ hotPost.title }}</h2>
    <img
      :src="hotPost.preview.images[0].source.url"
      alt="post image"
      class="preview"
      v-if="hotPost.preview"
    />
  </router-link>
</template>

<script setup lang="ts">
import HeaderComponent from "../components/HeaderComponent.vue";
import { requester } from "@/api/requester";
import { type Ref, ref } from "vue";

const hot: Ref<any> = ref([]);

function getHot() {
  requester.getHot().then((data) => {
    hot.value = data;
  });
}

getHot();
</script>

<style scoped>
.preview {
  width: 300px;
  height: 300px;
  object-fit: cover;
}
</style>

<template>
  <div>
    <h1>{{ comment.subreddit.display_name }}</h1>
    <h2>{{ comment.title }}</h2>
    <img
      :src="comment.preview.images[0].source.url"
      alt="post image"
      class="preview"
      v-if="comment.preview"
    />
  </div>
</template>

<script setup lang="ts">
import { requester } from "@/api/requester";
import { ref, type Ref } from "vue";
import { useRoute } from "vue-router";

const comment: Ref<any> = ref({});
const route = useRoute();

function getComment() {
  requester.getContentByIds([`t3_${route.params.postId}`]).then((data) => {
    comment.value = data[0];
    console.log(data);
  });
}

route.params.postId && getComment();
</script>

<style scoped></style>

<template>
  <router-link :to="`${post.permalink}`">
    <h1>{{ post.subreddit.display_name }}</h1>
    <h2>{{ post.title }}</h2>
    <img
      :src="post.preview.images[0].source.url"
      alt="post image"
      class="w-100"
      v-if="post.preview"
    />
  </router-link>
  <div class="flex justify-between">
    <div>
      <span>{{ postRef.ups }}</span>
      <span>{{ postRef.num_comments }}</span>
    </div>
    <div>
      <button
        :class="{
          'bg-green-500': postRef.likes,
        }"
        @click="upvote()"
      >
        upvote
      </button>
      <button
        :class="{ 'bg-green-500': postRef.likes === false }"
        @click="downvote()"
      >
        downvote
      </button>
      <button
        :class="{ 'bg-green-500': !postRef.saved, 'bg-red-500': postRef.saved }"
        @click="postRef.saved ? unsave() : save()"
      >
        {{ postRef.saved ? "unsave" : "save" }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { requester } from "@/api/requester";
import { ref } from "vue";

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const postRef = ref(props.post);

function upvote() {
  requester
    .getSubmission(postRef.value.id)
    .upvote()
    .then((data) => {
      postRef.value.likes = true;
    });
}
function downvote(): void {
  requester
    .getSubmission(postRef.value.id)
    .downvote()
    .then((data) => {
      postRef.value.likes = false;
    });
}
function unsave(): void {
  requester
    .getSubmission(postRef.value.id)
    .unsave()
    .then((data) => {
      postRef.value.saved = false;
    });
}
function save() {
  requester
    .getSubmission(postRef.value.id)
    .save()
    .then((data) => {
      postRef.value.saved = true;
    });
}
</script>

<style scoped></style>

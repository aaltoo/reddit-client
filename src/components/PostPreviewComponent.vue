<template>
  <div class="w-full md:w-7/12 bg-gray-200 p-3 rounded-xl my-2">
    <router-link :to="`${post.permalink}`">
      <span class="flex gap-2">
        <h1>{{ post.subreddit.display_name }}</h1>
        <router-link :to="`/u/${post.author.name}`"
          >u/{{ post.author.name }}</router-link
        >
      </span>
      <h2>{{ post.title }}</h2>
      <img
        :src="post.preview.images[0].source.url"
        alt="post image"
        class="w-full"
        v-if="post.preview"
      />
    </router-link>
    <div class="flex justify-between mt-3">
      <div class="flex gap-2">
        <div class="flex gap-1">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
          <span>{{ postRef.ups }}</span>
        </div>
        <div class="flex gap-1">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            ></path>
          </svg>
          <span>{{ postRef.num_comments }}</span>
        </div>
      </div>
      <div class="flex justify-center items-center gap-1">
        <button @click="postRef.likes ? unvote() : upvote()">
          <svg
            class="w-6 h-6"
            fill="none"
            :stroke="postRef.likes ? 'green' : 'currentColor'"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 15l7-7 7 7"
            ></path>
          </svg>
        </button>
        <button @click="postRef.likes === false ? unvote() : downvote()">
          <svg
            class="w-6 h-6"
            fill="none"
            :stroke="postRef.likes === false ? 'red' : 'currentColor'"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
        <button @click="postRef.saved ? unsave() : save()">
          <svg
            class="w-6 h-6"
            :fill="postRef.saved ? '#000' : 'none'"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            ></path>
          </svg>
        </button>
      </div>
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
      if (postRef.value.likes === false) {
        postRef.value.ups += 2;
      } else {
        postRef.value.ups += 1;
      }
      postRef.value.likes = true;
    });
}
function downvote(): void {
  requester
    .getSubmission(postRef.value.id)
    .downvote()
    .then((data) => {
      if (postRef.value.likes) {
        postRef.value.ups -= 2;
      } else {
        postRef.value.ups -= 1;
      }
      postRef.value.likes = false;
    });
}
function unvote(): void {
  requester
    .getSubmission(postRef.value.id)
    .unvote()
    .then((data) => {
      if (postRef.value.likes) {
        postRef.value.ups -= 1;
      } else {
        postRef.value.ups += 1;
      }
      postRef.value.likes = null;
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

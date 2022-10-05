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
          <HeartIcon class="w-6 h-6"></HeartIcon>
          <span>{{ postRef.ups }}</span>
        </div>
        <div class="flex gap-1">
          <ChatBubbleOvalLeftIcon class="w-6 h-6"></ChatBubbleOvalLeftIcon>
          <span>{{ postRef.num_comments }}</span>
        </div>
      </div>
      <div class="flex justify-center items-center gap-1">
        <button @click="postRef.likes ? unvote() : upvote()">
          <ChevronUpIcon
            class="w-6 h-6"
            :class="{ 'text-green-500': postRef.likes }"
          ></ChevronUpIcon>
        </button>
        <button @click="postRef.likes === false ? unvote() : downvote()">
          <ChevronDownIcon
            class="w-6 h-6"
            :class="{ 'text-blue-500': postRef.likes === false }"
          ></ChevronDownIcon>
        </button>
        <button @click="postRef.saved ? unsave() : save()">
          <BookmarkIcon
            class="w-6 h-6"
            :class="{ 'text-blue-300': postRef.saved }"
          >
          </BookmarkIcon>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { requester } from "@/api/requester";
import { ref } from "vue";
import {
  HeartIcon,
  ChatBubbleOvalLeftIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  BookmarkIcon,
} from "@heroicons/vue/24/outline";

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

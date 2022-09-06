<template>
  <div class="w-7/12">
    <div v-if="submission">
      <router-link :to="`/${submission.subreddit_name_prefixed}`">{{
        submission.subreddit.display_name
      }}</router-link>
      <h2>{{ submission.title }}</h2>
      <img
        :src="submission.preview.images[0].source.url"
        alt="post image"
        class="preview"
        v-if="submission.preview"
      />
    </div>
    <ul v-if="submission">
      <CommentComponent
        v-for="comment in submission.comments"
        :key="comment.id"
        :comment="comment"
      ></CommentComponent>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { requester } from "@/api/requester";
import { ref, type Ref } from "vue";
import { useRoute } from "vue-router";
import CommentComponent from "../components/CommentComponent.vue";

const submission: Ref<any | null> = ref(null);

const route = useRoute();

function getSubmission() {
  requester
    .getSubmission(`${route.params.postId}`)
    .expandReplies({ limit: 10 })
    .then((data) => {
      submission.value = data;
      console.log(data);
    });
}

route.params.postId && getSubmission();
</script>

<style scoped></style>

<template>
  <li class="bg-gray-200 my-2 py-3 pl-3 rounded-md" @click="toggleReplies">
    <span class="flex justify-between items-center">
      <span>
        <p>{{ comment.author.name }}</p>
        <p>{{ comment.body }}</p>
        <p>{{ comment.ups }}</p>
      </span>
      <ChevronDownIcon
        v-if="!areRepliesCollapsed && comment.replies.length"
        class="w-6 h-6 mr-2"
      />
    </span>
    <span v-if="comment.replies && areRepliesCollapsed">
      <ul v-for="reply in comment.replies" :key="reply.id">
        <CommentComponent :comment="reply"></CommentComponent>
      </ul>
    </span>
  </li>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ChevronDownIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
});

const areRepliesCollapsed = ref(false);

function toggleReplies(e: Event) {
  areRepliesCollapsed.value = !areRepliesCollapsed.value;
  e.stopPropagation();
}
</script>

<style scoped></style>

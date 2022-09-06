<template>
  <div class="left-0 top-16 p-3 bg-gray-200 rounded-lg fixed hidden md:block">
    <router-link
      :to="subscription.url"
      v-for="subscription in subscriptions"
      :key="subscription.id"
    >
      <h1>{{ subscription.display_name }}</h1>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { requester } from "@/api/requester";
import { ref, type Ref } from "vue";

const subscriptions: Ref<any> = ref([]);

async function getSubscriptions() {
  subscriptions.value = await requester.getSubscriptions();
}

getSubscriptions();
</script>

<style scoped></style>

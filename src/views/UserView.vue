<template>
  <div>{{ user }}</div>
</template>

<script setup lang="ts">
import { requester } from "@/api/requester";
import { ref, type Ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const user: Ref<any> = ref("");

async function getUser() {
  user.value = await requester.getUser(`${route.params.username}`).name;
}

getUser();
</script>

<style scoped></style>

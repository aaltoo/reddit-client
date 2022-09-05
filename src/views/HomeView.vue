<template>
  <HeaderComponent />
  <PostPreview
    v-for="hotPost in hot"
    :key="hotPost.id"
    :post="hotPost"
  ></PostPreview>
</template>

<script setup lang="ts">
import HeaderComponent from "../components/HeaderComponent.vue";
import PostPreview from "@/components/PostPreview.vue";
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

<style scoped></style>

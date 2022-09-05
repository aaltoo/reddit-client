<template>
  <HeaderComponent />
  <SidebarComponent />
  <div>
    <PostPreviewComponent
      v-for="hotPost in hot"
      :key="hotPost.id"
      :post="hotPost"
    ></PostPreviewComponent>
  </div>
</template>

<script setup lang="ts">
import HeaderComponent from "../components/HeaderComponent.vue";
import PostPreviewComponent from "@/components/PostPreviewComponent.vue";
import { requester } from "@/api/requester";
import { type Ref, ref } from "vue";
import SidebarComponent from "../components/SidebarComponent.vue";

const hot: Ref<any> = ref([]);

function getHot() {
  requester.getHot().then((data) => {
    hot.value = data;
  });
}

getHot();
</script>

<style scoped></style>

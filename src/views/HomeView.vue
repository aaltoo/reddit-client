<template>
  <div>
    <button @click="getHot">get hot</button>
  </div>
</template>

<script setup lang="ts">
import { requester } from "@/api/requester";
import { type Ref, ref } from "vue";

const hot: Ref<any> = ref([]);

function getHot() {
  requester.getHot().then((data) => {
    hot.value = data;
  });
}
</script>

<style scoped></style>

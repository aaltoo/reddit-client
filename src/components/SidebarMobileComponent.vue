<template>
  <div
    class="w-screen h-screen bg-gray-200 block md:hidden fixed top-0 duration-300 transform-gpu"
    :class="{ '-translate-x-full': !isActive }"
  >
    <ul class="flex justify-center flex-col mx-3">
      <li v-for="subscription in subscriptions" :key="subscription.id">
        <router-link :to="subscription.url" @click="closeSidebar()">
          <h1>{{ subscription.display_name }}</h1>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { requester } from "@/api/requester";
import { useSidebarStore } from "@/stores/sidebar";
import { storeToRefs } from "pinia";
import { ref, type Ref } from "vue";

const subscriptions: Ref<any> = ref([]);
const { isActive } = storeToRefs(useSidebarStore());

function closeSidebar() {
  isActive.value = false;
}

async function getSubscriptions() {
  subscriptions.value = await requester.getSubscriptions();
}

getSubscriptions();
</script>

<style scoped></style>

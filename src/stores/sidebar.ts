import { defineStore } from "pinia";

export const useSidebarStore = defineStore({
  id: "sidebar",
  state: () => ({
    isActive: false,
  }),
  getters: {
    // isActive: (state) => state.isActive,
  },
  actions: {
    toggle() {
      this.isActive = !this.isActive;
    },
  },
});

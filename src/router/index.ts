import CallbackView from "@/views/CallbackView.vue";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import SubredditView from "@/views/SubredditView.vue";
import { createRouter, createWebHistory } from "vue-router";
import SubmissionView from "../views/SubmissionView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/r/:subredditName/",
      name: "subreddit",
      component: SubredditView,
    },
    {
      path: "/r/:subredditName/comments/:postId/:postTitle?",
      name: "comment",
      component: SubmissionView,
    },
    {
      path: "/auth",
      children: [
        {
          path: "login",
          name: "login",
          component: LoginView,
        },
        {
          path: "callback",
          name: "callback",
          component: CallbackView,
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from) => {
  if (
    !localStorage.getItem("refresh_token") &&
    to.name !== "login" &&
    to.name !== "callback"
  ) {
    return { name: "login" };
  }
});

export default router;

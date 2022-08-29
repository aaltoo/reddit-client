import Snoowrap from "snoowrap";

export const requester = new Snoowrap({
  userAgent: import.meta.env.VITE_USER_AGENT,
  clientId: import.meta.env.VITE_CLIENT_ID,
  clientSecret: import.meta.env.VITE_CLIENT_SECRET,
  refreshToken: localStorage.getItem("refresh_token")!,
});

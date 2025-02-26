import { handleAuth, handleLogin, handleProfile } from "@auth0/nextjs-auth0";

export const GET = handleAuth({
  callbback: handleProfile({
    returnTo: "/admin",
  }),
  login: handleLogin({
    returnTo: "/admin",
  }),
});
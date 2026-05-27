import { jwtClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
const client = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  plugins: [jwtClient()],
});
export const authClient = client
export const { signIn, signUp, signOut, useSession } = client
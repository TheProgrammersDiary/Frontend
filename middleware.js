import { withAuth } from "next-auth/middleware"

export default withAuth({
  // Must match config in `[...nextauth]`
  pages: {
    signIn: '/login'
  }
})

export const config = { matcher: ["/admin"] }
import NextAuth from "next-auth/next";

declare module "next-auth" {
    interface User {
        username: string
        fullname: string
    }
    interface Session {
        user: User & {
            username: string
            fullname: string
        }
        token: {
            username: string
            fullname: string
        }
    }
}
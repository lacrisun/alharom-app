import NextAuth from "next-auth/next";

declare module "next-auth" {
    interface User {
        username: string
        fullname: string
        phone: string
        role: string
    }
    interface Session {
        user: User & {
            username: string
            fullname: string
            phone: string
            role: string
        }
        token: {
            username: string
            fullname: string
            phone: string
            role: string
        }
    }
}
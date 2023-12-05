import NextAuth from "next-auth/next";

declare module "next-auth" {
    interface User {
        username: string
        fullname: string
        phone: string
        role: string
        verified: boolean
    }
    interface Session {
        user: User & {
            username: string
            fullname: string
            phone: string
            role: string
            verified: boolean
        }
        token: {
            username: string
            fullname: string
            phone: string
            role: string
            verified: boolean
        }
    }
}
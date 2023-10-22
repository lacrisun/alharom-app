import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcrypt";
import prisma from "./prisma";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: '/mentor'
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email"},
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials.email || !credentials.password) {
                    return null
                }
            
                const existingUser = await prisma.mentor.findUnique({
                    where: {
                        email: credentials.email
                    }
                })
                if (!existingUser) {
                    console.log("There's no user with that email")
                }

                const passwordMatch = await compare(credentials.password, existingUser.password)

                if (!passwordMatch) {
                    console.log("Password is invalid")
                    return null

                }

                return {
                    id: `${existingUser.id}`,
                    username: existingUser.username,
                    email: existingUser.email
                }

            }
        })
    ]
}

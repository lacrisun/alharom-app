import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import prisma from "./prisma";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
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
                    email: existingUser.email,
                    fullname: existingUser.nama_lengkap,
                    phone: existingUser.nomor_telepon,
                    isadmin: existingUser.izin_admin,
                }

            }
        })
    ],
    callbacks: {
        async jwt({token, user}) {
            if(user) {
                return {
                    ...token,
                    username: user.username,
                    fullname: user.fullname,
                    phone: user.phone,
                    isadmin: user.isadmin
                }
            }
            return token
        },
        async session({session, user, token}) {
            return {
                ...session,
                user: {
                    ...session.user,
                    username: token.username,
                    fullname: token.fullname,
                    phone: token.phone,
                    isadmin: token.isadmin
                }
            }
        },
    }
}

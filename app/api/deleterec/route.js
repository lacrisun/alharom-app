import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const fetchCache = 'only-no-store'
export async function POST(req) {
    const userData = await req.json()

    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                id: userData.userID
            },
        })

        if (existingUser) {
            let result = await prisma.user.delete({
                where: {
                    id: userData.userID
                },
            })
            return NextResponse.json({result}, {status: 200})
        } else {
            let result = await prisma.accounts.delete({
                where: {
                    id: userData.accuserid
                },
            })
            return NextResponse.json({result}, {status: 200})
        }
    } catch (error) {
        console.error(error)
        return NextResponse.json({error}, {status: 500})
    } finally {
        await prisma.$disconnect() 
    }
}
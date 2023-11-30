import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'
export const revalidate = 0
export async function GET() {
    try {
        const usercount = await prisma.accounts.count()
        const isVerified = await prisma.accounts.count({
            where: {
                is_verified: true
            }
        })
        const responsedata = JSON.stringify(usercount)
        const isVerifiedData = JSON.stringify(isVerified)
        return NextResponse.json({responsedata, isVerifiedData}, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: 'An error occurred'}, {status: 500})
    }
}
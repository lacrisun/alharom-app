import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'
export const revalidate = 0
export async function GET() {
    try {
        const usercount = await prisma.accounts.count()
        const responsedata = JSON.stringify(usercount)
        return NextResponse.json({responsedata}, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: 'An error occurred'}, {status: 500})
    }
}
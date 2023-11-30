import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'
export const revalidate = 0
export async function GET() {

    try {
        const users = await prisma.user.findMany()
        const accounts = await prisma.accounts.findMany()
        const responseUserData = JSON.stringify(users)
        const responseAccountData = JSON.stringify(accounts)
        return NextResponse.json({responseUserData, responseAccountData}, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "An error has occured."}, {status: 500})
    }
    
}
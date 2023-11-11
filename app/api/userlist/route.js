import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'
export async function GET() {

    try {
        const users = await prisma.user.findMany()
        const responsedata = JSON.stringify(users)
        return NextResponse.json({responsedata}, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "An error has occured."}, {status: 500})
    }
    
}
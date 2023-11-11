import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'
export const revalidate = 0
export async function GET() {
    const today = new Date()
    const firstday = new Date(today.getFullYear(), today.getMonth(), 1)

    try {
        const totalusers = await prisma.user.aggregate({
            _count: {
                id: true,
            },
            where: {
                data_dibuat: {
                    gte: firstday,
                },
            },
        })
        const amt = totalusers._count.id
        const responsedata = JSON.stringify(amt)
        return NextResponse.json({responsedata}, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "An error has occured."}, {status: 500})
    }
    
}
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'
export const revalidate = 0
export async function POST(req) {
    const userData = await req.json()

    try {
        let account = await prisma.accounts.findUnique({
            where: {
                email: userData.email
            }
        })
        if (!account) {
            account = await prisma.employee.findUnique({
                where: {
                    email: userData.email
                }
            })
        }
        return NextResponse.json({account}, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "An error has occured."}, {status: 500})
    }
    
}
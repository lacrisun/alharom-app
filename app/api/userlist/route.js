import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'
export const revalidate = 0
export async function GET() {

    try {
        const users = await prisma.user.findMany()
        const accounts = await prisma.accounts.findMany()
        const employee = await prisma.employee.findMany()
        const responseUserData = JSON.stringify(users)
        const responseAccountData = JSON.stringify(accounts)
        const responseEmployeeData = JSON.stringify(employee)
        return NextResponse.json({responseUserData, responseAccountData, responseEmployeeData}, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "An error has occured."}, {status: 500})
    }
    
}
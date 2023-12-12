import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'
export const revalidate = 0
export async function GET() {

    try {
        const finance = await prisma.financial.findMany()
        const responseFinancialData = JSON.stringify(finance)
        return NextResponse.json({responseFinancialData}, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "An error has occured."}, {status: 500})
    }
    
}
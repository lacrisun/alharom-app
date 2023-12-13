import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(req) {
    const userData = await req.json()
    try {
        const result = await prisma.financial.create({
            data: {
                id: userData.randomID,
                judul_keuangan: userData.financialjudul,
                nominal: userData.financialnominal,
                tipe_keuangan: userData.fintype,
            }
        })
        return NextResponse.json({ result }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req) {
    const updateData = await req.json()
    
    try {
        const result = await prisma.user.update({
            where: { id: updateData._externalId },
            data: {paystatus: updateData.lunas},
        })
        return NextResponse.json({result}, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error}, {status: 500})
    }
}
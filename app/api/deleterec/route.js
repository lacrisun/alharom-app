import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const fetchCache = 'only-no-store'
export async function POST(req) {
    const userData = await req.json(); // Assuming userData contains the parsed JSON

    try {
        // Determine the type of ID and delete the corresponding record
        if (userData.userID) {
            // User ID is present, delete user
            let result = await prisma.user.delete({
                where: {
                    id: userData.userID
                },
            });
            return NextResponse.json({ result }, { status: 200 });
        } else if (userData.accuserid) {
            // Account user ID is present, delete account
            let result = await prisma.accounts.delete({
                where: {
                    id: userData.accuserid
                },
            });
            return NextResponse.json({ result }, { status: 200 });
        } else if (userData.empuserid) {
            // Employee user ID is present, delete employee
            let result = await prisma.employee.delete({
                where: {
                    id: userData.empuserid
                },
            });
            return NextResponse.json({ result }, { status: 200 });
        } else {
            return NextResponse.json({ message: "No valid ID provided." }, { status: 400 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
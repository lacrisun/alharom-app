/**
 * This module exports a function called `GET` that retrieves the count of user accounts and the count of verified user accounts from a database using the Prisma ORM. It then returns a JSON response with the counts and a status code.
 *
 * @module GET
 * @returns {Promise<object>} A JSON response object with the following structure:
 * - `responsedata`: A JSON string representing the count of user accounts.
 * - `isVerifiedData`: A JSON string representing the count of verified user accounts.
 * @throws {Error} If an error occurs during the execution of the `GET` function, it is caught and logged to the console. The code then returns a JSON response with an error message and a status code of 500.
 *
 * @example
 * const response = await GET();
 * console.log(response);
 * // Output: { responsedata: '...', isVerifiedData: '...' }
 */
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
    try {
        const usercount = await prisma.accounts.count()
        const isVerified = await prisma.accounts.count({
            where: {
                is_verified: true
            }
        })
        const responsedata = JSON.stringify(usercount)
        const isVerifiedData = JSON.stringify(isVerified)
        return NextResponse.json({responsedata, isVerifiedData}, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: 'An error occurred'}, {status: 500})
    }
}
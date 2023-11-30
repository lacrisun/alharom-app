import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import supabase from "@/lib/supabase";

export async function POST(req) {
    const userData = await req.json()

    if (userData.accbool) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(userData.accpassword, saltRounds);

        try {
            const result = await prisma.accounts.create({
                data: {
                    id: userData.randomID,
                    nama_lengkap: userData.accnamalengkap,
                    email: userData.accemail,
                    nomor_telepon: userData.accnomortelepon,
                    tanggal_lahir: userData.acctgllahir,
                    username: userData.accusername,
                    password: hashedPassword,
                    sisa_pembayaran: userData.accsisapembayaran,
                }
            })
            return NextResponse.json({ result }, { status: 200 })
        } catch (error) {
            console.error(error)
            return NextResponse.json({ error }, { status: 500 })
        } finally {
            await prisma.$disconnect()
        }
    } else {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

        try {
            const result = await prisma.accounts.create({
                data: {
                    id: userData.randomID,
                    nama_lengkap: userData.namalengkap,
                    email: userData.email,
                    nomor_telepon: userData.nomortelepon,
                    tanggal_lahir: userData.tgllahir,
                    username: userData.username,
                    password: hashedPassword,
                    sisa_pembayaran: userData.sisapembayaran,
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
}
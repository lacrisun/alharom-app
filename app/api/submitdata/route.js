import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
    const userData = await req.json()

    try {
        const result = await prisma.user.create({
            data: {
                pumrah: userData.paketumrah,
                kamar: userData.tipekamar,
                nama: userData.namalengkap,
                nik: userData.nonik,
                tmptlahir: userData.tempatlahir,
                tgllahir: userData.tanggallahir,
                ayahkdg: userData.ayahkandung,
                numpaspor: userData.nopaspor,
                pasporex: userData.expirepaspor,
                pasportpt: userData.tempatpaspor,
                pasporklu: userData.pasporissued,
                jkelamin: userData.jeniskelamin,
                goldarah: userData.golongandarah,
                stkawin: userData.statuskawin,
                namawaris: userData.namawaris,
                hubwaris: userData.hubunganwaris,
                alamat: userData.alamat,
                email: userData.email,
                notelpon: userData.notelponhp,
                pengumrah: userData.pengalaman,
                pendidikn: userData.pendidikanterakhir,
                pekerjaan: userData.pekerjaan,
                penyakit: userData.penyakit,
                keldarurt: userData.keluargadarurat
            }
        })
        return NextResponse.json({result}, {status: 200})
    } catch (error) {
        console.error(error)
        return NextResponse.json({error}, {status: 500})
    } finally {
        await prisma.$disconnect() 
    }
}
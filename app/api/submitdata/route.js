import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
    const userData = await req.json()

    try {
        const result = await prisma.user.create({
            data: {
                id: userData.randomID,
                paket_umrah: userData.paketumrah,
                tipe_kamar: userData.tipekamar,
                nama_lengkap: userData.namalengkap,
                nik: userData.nonik,
                tempat_lahir: userData.tempatlahir,
                tanggal_lahir: userData.tanggallahir,
                ayah_kandung: userData.ayahkandung,
                nomor_paspor: userData.nopaspor,
                paspor_expired: userData.expirepaspor,
                tempat_paspor: userData.tempatpaspor,
                paspor_dibuat: userData.pasporissued,
                jenis_kelamin: userData.jeniskelamin,
                golongan_darah: userData.golongandarah,
                status_kawin: userData.statuskawin,
                nama_waris: userData.namawaris,
                hubungan_waris: userData.hubunganwaris,
                alamat: userData.alamat,
                email: userData.email,
                nomor_telpon: userData.notelponhp,
                pengalaman_umrah: userData.pengalaman,
                pendidikan: userData.pendidikanterakhir,
                pekerjaan: userData.pekerjaan,
                penyakit: userData.penyakit,
                keluarga_darurat: userData.keluargadarurat,
                paystatus: userData.statusbyr
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
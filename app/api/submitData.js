import logger from "winston";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
export default async function handle(req, res) {
    const { paketumrah, tipekamar, namalengkap, nonik, tempatlahir, tanggallahir, ayahkandung, nopaspor, expirepaspor, tempatpaspor, pasporissued, jeniskelamin, golongandarah, statuskawin, namawaris, hubunganwaris, alamat, email, notelponhp, pengalaman, pendidikanterakhir, pekerjaan, penyakit, keluargadarurat } = req.body

    try {
        const result = await prisma.user.create({
            data: {
                pumrah: paketumrah,
                kamar: tipekamar,
                nama: namalengkap,
                nik: nonik,
                tmptlahir: tempatlahir,
                tgllahir: tanggallahir,
                ayahkdg: ayahkandung,
                numpaspor: nopaspor,
                pasporex: expirepaspor,
                pasportpt: tempatpaspor,
                pasporklu: pasporissued,
                jkelamin: jeniskelamin,
                goldarah: golongandarah,
                stkawin: statuskawin,
                namawaris: namawaris,
                hubwaris: hubunganwaris,
                alamat: alamat,
                email: email,
                notelpon: notelponhp,
                pengumrah: pengalaman,
                pendidikn: pendidikanterakhir,
                pekerjaan: pekerjaan,
                penyakit: penyakit,
                keldarurt: keluargadarurat
            }
        })
        res.json(result)
    } catch (error) {
        logger.error("Error creating user:", error);
        res.status(500).json({ error: "Internal server error" });
    } finally {
        await prisma.$disconnect() // Closing the PrismaClient instance
    }
}
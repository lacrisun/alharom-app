import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
    const userData = await req.json()

    if (userData.accountData) {
        try {
            const result = await prisma.accounts.update({
                where: {
                    id: userData.accuserid
                },
                data: {
                    nama_lengkap: userData.accnamalengkap,
                    email: userData.accemail,
                    nomor_telepon: userData.accnomortelepon,
                    tanggal_lahir: userData.acctgllahir,
                    username: userData.accusername,
                    sisa_pembayaran: userData.accsisapembayaran,
                    is_verified: userData.verifbool
                }
            })
            if (result.email) {
                const user = await prisma.user.findUnique({
                  where: {
                    email: result.email
                  }
                });
              
                if (user) {
                  await prisma.user.update({
                    where: {
                      email: userData.accemail
                    },
                    data: {
                      sisa_bayar: userData.accsisapembayaran
                    }
                  });
                }
              }
            return NextResponse.json({result}, {status: 200})
        } catch (error) {
            console.error(error)
            return NextResponse.json({error}, {status: 500})
        } finally {
            await prisma.$disconnect() 
        }
    } else if (userData.employeeData) {
      try {
          const result = await prisma.employee.update({
              where: {
                  id: userData.empuserid
              },
              data: {
                  nama_lengkap: userData.empnamalengkap,
                  email: userData.empemail,
                  nomor_telepon: userData.empnomortelepon,
                  tanggal_lahir: userData.emptgllahir,
                  username: userData.empusername,
                  role: userData.emprole
              }
          })
          return NextResponse.json({result}, {status: 200})
      } catch (error) {
          console.error(error)
          return NextResponse.json({error}, {status: 500})
      } finally {
          await prisma.$disconnect() 
      }
  } else if (userData.usersData) {
        try {
            const result = await prisma.user.update({
                where: {
                    id: userData.userID
                },
                data: {
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
                    paystatus: userData.statusbyr,
                    sisa_bayar: userData.sisaPembayaran,
                    paystatus: userData.statusbyr,
                    sudah_berangkat: userData.statusberangkat
                }
            })
            if (result.email) {
                await prisma.accounts.update({
                  where: {
                    email: userData.email
                  },
                  data: {
                    sisa_pembayaran: userData.sisaPembayaran
                  }
                }) 
              }
            return NextResponse.json({result}, {status: 200})
        } catch (error) {
            console.error(error)
            return NextResponse.json({error}, {status: 500})
        } finally {
            await prisma.$disconnect() 
        }
    } else if (userData.financialData) {
      try {
          const result = await prisma.financial.update({
              where: {
                  id: userData.financialID
              },
              data: {
                  judul_keuangan: userData.financialjudul,
                  nominal: userData.financialnominal,
                  tipe_keuangan: userData.fintype
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
    else {
        return NextResponse.json({ message: "Invalid request data" }, { status: 400 });
    }
}

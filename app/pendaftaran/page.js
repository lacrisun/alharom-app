'use client'

import Form from "@/components/formsec";
import HeroDaft from "@/components/herodaftar";
import Navbar from "@/components/navbar";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import Footer from "@/components/footer";
import { resolve } from "styled-jsx/css";
import { Invoice as InvoiceClient, Xendit } from "xendit-node";
import { useSession } from "next-auth/react";
import NavbarLoggedIn from "@/components/loggedin/navbar";
import LoadingPage from "@/components/loading";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export default function Pendaftaran() {
    const router = useRouter()
    const secret = process.env.XENDIT_KEY
    const xenditClient = new Xendit({secretKey: secret})
    const { Invoice } = xenditClient
    
    const xenditInvoiceClient = new InvoiceClient({secretKey: secret})

    const {data: session, status} = useSession()
    const [user, setUser] = useState({})

    const getUserData = async (email) => {
        try {
            const data = {
                email
            }
            await fetch('/api/userinfo', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            }) .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            }) .then((data) => {
                setUser(data)
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(status === 'authenticated') {
            getUserData(session.user.email)
        }
    }, [status])

    const [paketumrah, setPaketumrah] = useState("Umrah Reguler (Silver)");
    const [tipekamar, setTipekamar] = useState("Quad");
    const [namalengkap, setNamalengkap] = useState("");
    const [nonik, setNonik] = useState("");
    const [tempatlahir, setTempatlahir] = useState("");
    const [tanggallahir, setTanggallahir] = useState("");
    const [ayahkandung, setAyahkandung] = useState("");
    const [nopaspor, setNopaspor] = useState("");
    const [expirepaspor, setExpirepaspor] = useState("");
    const [tempatpaspor, setTempatpaspor] = useState("");
    const [pasporissued, setPasporissued] = useState("");
    const [jeniskelamin, setJeniskelamin] = useState("Laki-laki");
    const [golongandarah, setGolongandarah] = useState("");
    const [statuskawin, setStatuskawin] = useState("Menikah");
    const [namawaris, setNamawaris] = useState("");
    const [hubunganwaris, setHubunganwaris] = useState("");
    const [alamat, setAlamat] = useState("");
    const [email, setEmail] = useState("");
    const [notelponhp, setNotelponhp] = useState("");
    const [pengalaman, setPengalaman] = useState("Ke-1");
    const [pendidikanterakhir, setPendidikanterakhir] = useState("SD");
    const [pekerjaan, setPekerjaan] = useState("");
    const [penyakit, setPenyakit] = useState("");
    const [keluargadarurat, setKeluargadarurat] = useState("");

    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [submitfail, setSubmitfail] = useState(false)
    const [statusbyr, setStatusbyr] = useState("BELUM_LUNAS")
    const [didaftarkans, setDidaftarkans] = useState("User/Sendiri")
    const [nonuser, setNonuser] = useState(false)
    const [price, setPrice] = useState('33500000')

    const [payment, setPayment] = useState("Angsuran")

    const [mentoremail, setMentoremail] = useState("")

    useEffect(() => {
        if (session?.user.role === 'Mentor' || session?.user.role === 'Admin') {
            setDidaftarkans(session.user.fullname)
            setNonuser(true)
            setMentoremail(session.user.email)
        }
    }, [session])

    useEffect(() => {
        let newPrice = '33500000';
        if (paketumrah === 'Umrah Reguler (Silver)') {
            newPrice = '33500000';
        } else if (paketumrah === 'Umrah Reguler (Gold)') {
            newPrice = '35300000';
        } else if (paketumrah === 'Umrah VIP') {
            newPrice = '37550000';
        } else if (paketumrah === 'Umrah Plus Turki') {
            newPrice = '39197000';
        } else if (paketumrah === 'Umrah Plus Dubai') {
            newPrice = '35350000';
        }

        setPrice(newPrice);
    }, [paketumrah]);

    const random = Math.floor(Math.random() * 100000)
    const randomStr = random.toString()

    const randomID = "ALHRM-" + randomStr

    const schema = z.object({
        namalengkap: z.string().max(50, "Tidak boleh melebihi batas huruf").min(1, "Wajib di isi"),
        nonik: z.string().max(30, "Tidak boleh melebihi batas huruf").min(1, "Wajib di isi"),
        tempatlahir: z.string().max(50, "Tidak boleh melebihi batas huruf").min(1, "Wajib di isi"),
        ayahkandung: z.string().max(50, "Tidak boleh melebihi batas huruf").min(1, "Wajib di isi"),
        nopaspor: z.string().max(30, "Tidak boleh melebihi batas huruf").min(1, "Wajib di isi"),
        tempatpaspor: z.string().max(50, "Tidak boleh melebihi batas huruf").min(1, "Wajib di isi"),
        golongandarah: z.string().max(6, "Tidak boleh melebihi batas huruf").min(1, "Wajib di isi"),
        namawaris: z.string().max(50, "Tidak boleh melebihi batas huruf").min(1, "Wajib di isi"),
        hubunganwaris: z.string().max(50, "Tidak boleh melebihi batas huruf").min(1, "Wajib di isi"),
        alamat: z.string().max(255, "Tidak boleh melebihi batas huruf").min(1, "Wajib di isi"),
        email: z.string().max(50, "Tidak boleh melebihi batas huruf").min(1, "Wajib di isi"),
        notelponhp: z.string().max(15, "Tidak boleh melebihi batas huruf").min(1, "Wajib di isi"),
        pekerjaan: z.string().max(50, "Tidak boleh melebihi batas huruf").min(1, "Wajib di isi"),
        penyakit: z.string().max(50, "Tidak boleh melebihi batas huruf"),
        keluargadarurat: z.string().max(50, "Tidak boleh melebihi batas huruf").min(1, "Wajib di isi"),
    })

    const handleSubmit = async (event) => {
        event.preventDefault()
        setSubmitting(true)

        let statusinv
        let linkinvoice

        
        try {
            const userbody = {
                randomID,
                paketumrah,
                tipekamar,
                namalengkap,
                nonik,
                tempatlahir,
                tanggallahir,
                ayahkandung,
                nopaspor,
                expirepaspor,
                tempatpaspor,
                pasporissued,
                jeniskelamin,
                golongandarah,
                statuskawin,
                namawaris,
                hubunganwaris,
                alamat,
                email,
                notelponhp,
                pengalaman,
                pendidikanterakhir,
                pekerjaan,
                penyakit,
                keluargadarurat,
                statusbyr,
                didaftarkans,
                price,
                nonuser,
                payment,
                mentoremail
            };

            const validationResult = schema.safeParse(userbody);

            if (validationResult.success) {
                await fetch("/api/submitdata", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userbody),
                }).then((response) => {
                    if (!response.ok) {
                        setSubmitfail(true)
                        setSubmitted(false)
                    } else {
                        setSubmitted(true)
                        setSubmitfail(false)
                    } 
                })

                setSubmitting(false);
            } else {
                console.error(validationResult.error);
                setSubmitfail(true);
                setSubmitted(false);
            }
        } catch (error) {
            console.error(error);
            setSubmitfail(true);
            setSubmitted(false);
        }

        try {
            const data = {
                'externalId': randomID,
                'amount': price,
                'description': paketumrah,
                'customer': {
                    'givenNames': namalengkap,
                    'email': email,
                    'mobileNumber': notelponhp,
                }
            }
            await fetch('/api/invoicemaker', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            }) .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            }) .then((data) => {
                console.log(data)
                statusinv = data.response.status
                linkinvoice = data.response.invoiceUrl
            })
        } catch (error) {
            console.log(error)
        }
        if (payment === 'Cash (Bayar full)') {
            await new Promise(resolve => setTimeout(resolve, 2000))
            router.push(linkinvoice)
        }
    }

    if (status === 'loading') {
        return (
            <LoadingPage/>
        )
    }
    if (!session?.user) {
        return (
            redirect('/login')
        )
    }
    if (!user.account.is_verified) {
        return (
            redirect('/not-yet-verified')
        )
    }
    return (

        <>
        {session ? <NavbarLoggedIn profilepic={session.user.username} admin={session.user.role}/> : <Navbar/>}
        <HeroDaft />
        <div className="hero min-h-screen bg-secondary">
            <div className="hero-content w-full flex-col lg:flex-row-reverse">
                <div className="card flex-shrink-0 w-full shadow-2xl bg-primary">
                    <form onSubmit={handleSubmit} className="card-body">
                        <h1 className="text-3xl text-bold text-white">Pendaftaran</h1>
                        <h1 className="text-xl text-normal text-white">Masukkan data sesuai di KTP/Paspor anda!</h1>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Paket Umrah</span>
                            </label>
                            <select value={paketumrah} onChange={(e) => setPaketumrah(e.target.value)} className="select select-bordered bg-secondary placeholder-slate-400 text-slate-950" required>
                                <option>Umrah Reguler (Silver)</option>
                                <option>Umrah Reguler (Gold)</option>
                                <option>Umrah VIP</option>
                                <option>Umrah Plus Dubai</option>
                                <option>Umrah Plus Turki</option>
                            </select>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Tipe Kamar</span>
                            </label>
                            <select value={tipekamar} onChange={(e) => setTipekamar(e.target.value)} className="select select-bordered bg-secondary placeholder-slate-400 text-slate-950" required>
                                <option>Quad</option>
                                <option>Triple</option>
                                <option>Double</option>
                                <option>Single</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Nama Lengkap</span>
                            </label>
                            <input value={namalengkap} onChange={(e) => setNamalengkap(e.target.value)} type="text" name="Nama" placeholder="contoh : 'Agus Budiman' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required maxLength={50}/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">No. KTP/NIK</span>
                            </label>
                            <input value={nonik} onChange={(e) => setNonik(e.target.value)} type="number" name="No. KTP/NIK" placeholder="1471110000000000" className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required maxLength={30}/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Tempat Lahir</span>
                            </label> 
                            <input value={tempatlahir} onChange={(e) => setTempatlahir(e.target.value)} type="text" name="Tempat Lahir" placeholder="Kota Pekanbaru" className="bg-secondary placeholder-slate-400 text-slate-950 textarea textarea-bordered" required maxLength={30}/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Tanggal Lahir</span>
                            </label> 
                            <input value={tanggallahir} onChange={(e) => setTanggallahir(e.target.value)} type="date" name="Tanggal Lahir" placeholder="17-08-45" className="bg-secondary placeholder-slate-400 text-slate-950 textarea textarea-bordered" required/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Nama Ayah Kandung</span>
                            </label>
                            <input value={ayahkandung} onChange={(e) => setAyahkandung(e.target.value)} type="text" name="Ayah Kandung" placeholder="contoh : 'Agus Budiman' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required maxLength={50}/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Nomor Paspor</span>
                            </label>
                            <input value={nopaspor} onChange={(e) => setNopaspor(e.target.value)} type="number" name="No Paspor" placeholder="123456789" className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required maxLength={30}/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Paspor Berlaku sampai</span>
                            </label> 
                            <input value={expirepaspor} onChange={(e) => setExpirepaspor(e.target.value)} type="date" name="Masa berlaku passpor" placeholder="17-08-45" className="bg-secondary placeholder-slate-400 text-slate-950 textarea textarea-bordered" required/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Tempat dikeluarkan paspor</span>
                            </label> 
                            <input value={tempatpaspor} onChange={(e) => setTempatpaspor(e.target.value)} type="text" name="Tempat paspor" placeholder="Kota Pekanbaru" className="bg-secondary placeholder-slate-400 text-slate-950 textarea textarea-bordered" required maxLength={50}/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Tanggal dikeluarkan paspor</span>
                            </label> 
                            <input value={pasporissued} onChange={(e) => setPasporissued(e.target.value)} type="date" name="Tanggal dikeluarkan passpor" placeholder="17-08-45" className="bg-secondary placeholder-slate-400 text-slate-950 textarea textarea-bordered" required/>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Jenis Kelamin</span>
                            </label>
                            <select value={jeniskelamin} onChange={(e) => setJeniskelamin(e.target.value)} className="select select-bordered bg-secondary placeholder-slate-400 text-slate-950" required>
                                <option>Laki-laki</option>
                                <option>Perempuan</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Golongan Darah</span>
                            </label>
                            <input value={golongandarah} onChange={(e) => setGolongandarah(e.target.value)} type="text" name="Golongan Darah" placeholder="contoh : 'O+' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" maxLength={4} required/>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Status Perkawinan</span>
                            </label>
                            <select value={statuskawin} onChange={(e) => setStatuskawin(e.target.value)} className="select select-bordered bg-secondary placeholder-slate-400 text-slate-950" required>
                                <option>Menikah</option>
                                <option>Cerai</option>
                                <option>Belum Menikah</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Nama Ahli Waris</span>
                            </label>
                            <input value={namawaris} onChange={(e) => setNamawaris(e.target.value)} type="text" name="Ahli Waris" placeholder="contoh : 'Dewi Septiana' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required maxLength={50}/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Hubungan Ahli Waris</span>
                            </label>
                            <input value={hubunganwaris} onChange={(e) => setHubunganwaris(e.target.value)} type="text" name="Hubungan Ahli Waris" placeholder="contoh : 'Anak' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required maxLength={50}/>
                        </div>
                        
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Alamat Tempat Tinggal</span>
                            </label>
                            <input value={alamat} onChange={(e) => setAlamat(e.target.value)} type="text" name="Alamat Tempat Tinggal" placeholder="contoh : 'Jl. Kaharuddin Nst No.40, Simpang Tiga, Kec. Bukit Raya, Kota Pekanbaru, Riau' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required maxLength={255}/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">E-mail</span>
                            </label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="Email" placeholder="contoh : 'alharom@gmail.com' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required maxLength={50}/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">No. Telp/ No. HP/No. WhatsApp</span>
                            </label>
                            <input value={notelponhp} onChange={(e) => setNotelponhp(e.target.value)} type="number" name="Nomor Telepon" placeholder="contoh : '081356324299' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required maxLength={15}/>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Pengalaman Umrah</span>
                            </label>
                            <select value={pengalaman} onChange={(e) => setPengalaman(e.target.value)} className="select select-bordered bg-secondary placeholder-slate-400 text-slate-950" required>
                                <option>Ke-1</option>
                                <option>Ke-2</option>
                                <option>Lebih dari 2</option>
                            </select>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Pendidikan Terakhir</span>
                            </label>
                            <select value={pendidikanterakhir} onChange={(e) => setPendidikanterakhir(e.target.value)} className="select select-bordered bg-secondary placeholder-slate-400 text-slate-950" required>
                                <option>SD</option>
                                <option>SLTP</option>
                                <option>SLTA</option>
                                <option>Diploma</option>
                                <option>S1/S2/S3</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Pekerjaan</span>
                            </label>
                            <input value={pekerjaan} onChange={(e) => setPekerjaan(e.target.value)} type="text" name="Pekerjaan" placeholder="contoh : 'Tentara' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" maxLength={50}/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Penyakit yang di derita</span>
                            </label>
                            <input value={penyakit} onChange={(e) => setPenyakit(e.target.value)} type="text" name="Penyakit yang diderita" placeholder="contoh : 'Kanker, Asma, dll.' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" maxLength={50}/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Keluarga yang dapat dihubungi ketika darurat</span>
                            </label>
                            <input value={keluargadarurat} onChange={(e) => setKeluargadarurat(e.target.value)} type="text" name="Keluarga Darurat" placeholder="contoh : 'Dewi : 0813-5632-4299' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required maxLength={50}/>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Bayar via :</span>
                            </label>
                            <select value={payment} onChange={(e) => setPayment(e.target.value)} className="select select-bordered bg-secondary placeholder-slate-400 text-slate-950" required>
                                <option>Angsuran (DP)</option>
                                <option>Cash (Bayar full)</option>
                            </select>
                        </div>
                        <div className="form-control mt-6">
                            { submitting ? ( <><input type="submit" value='Mengirim...' className="btn btn-secondary"></input></> ) : (<><input type="submit" value='Kirim' className="btn btn-secondary"></input></>) }
                            { submitted && (<div className="alert alert-success mt-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>Data anda telah berhasil di kirim! Anda akan kami segera kami hubungi.</span></div>) }
                            { submitfail && (<div className="alert alert-error mt-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span>Error! Mohon coba lagi dalam beberapa saat, atau hubungi kami.</span></div>) }
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div className="toast toast-end z-30 items-center">
            <div className="flex bg-primary rounded-xl text-white hover:scale-105 transition-transform duration-300">
                <a href="https://wa.me/6281361126363?text=Assalamualaikum%20saya%20ingin%20mengetahui%20program%20keberangkatan%20umroh%20dan%20haji%20alharom%20bina%20hati">
                    <span className='flex m-4'>
                        <FontAwesomeIcon icon={faWhatsapp} className='self-center' size='2xl' />
                    </span>
                </a>
            </div>
        </div>
        <Footer />
        </>

    )
}
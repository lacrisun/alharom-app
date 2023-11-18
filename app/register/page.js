'use client'

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useState } from "react";
import { signIn, useSession } from 'next-auth/react';
import { redirect, useRouter } from "next/navigation";
import LoadingPage from "@/components/loading";
import Link from "next/link";
import { z } from 'zod';
import { createClient } from "@supabase/supabase-js";

export default function Login() {
    
    const supaKey = process.env.SUPABASE_KEY

    const supabase = createClient('https://ioijksivulsyacpizroe.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvaWprc2l2dWxzeWFjcGl6cm9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU3MzIxOTEsImV4cCI6MjAxMTMwODE5MX0.0KvEsY8u2iqEU39dtkoEmD_4XiY8atR7ELC-CH5NIZw')
    const {data: session, status} = useSession()

    const [namalengkap, setNamalengkap] = useState("")
    const [email, setEmail] = useState("")
    const [nomortelepon, setNomortelepon] = useState("")
    const [tgllahir, setTgllahir] = useState("")
    const [username, setUsername] = useState(namalengkap.toLowerCase())
    const [password, setPassword] = useState("")
    const [sisapembayaran, setSisapembayaran] = useState("0")
    const [avatar, setAvatar] = useState(null)

    const [loginerror, setLoginerror] = useState(false)
    const [loginsuccess, setLoginsuccess] = useState(false)

    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [submitfail, setSubmitfail] = useState(false)

    const router = useRouter()

    const random = Math.floor(Math.random() * 100000)
    const randomStr = random.toString()

    const randomID = "ACC-" + randomStr

    const schema = z.object({
        namalengkap: z.string().max(50, "Tidak boleh melebihi batas huruf").min(1, "Wajib di isi"),
        email: z.string().max(50, "Tidak boleh melebihi batas huruf").min(1, "Wajib di isi"),
        nomortelepon: z.string().max(16, "Tidak boleh melebihi batas huruf").min(1, "Wajib di isi"),
        tgllahir: z.string().max(20, "Tidak boleh melebihi batas huruf").min(1, "Wajib di isi"),
        username: z.string().max(20, "Tidak boleh melebihi batas huruf").min(1, "Wajib di isi"),
        password: z.string().max(255, "Tidak boleh melebihi batas huruf").min(8, "Wajib di isi"),
    })

    const sendFile = async (e) => {
        const { error } = await supabase.storage.from('avatars').upload(username, avatar)
        if (error) {
            console.error('Error uploading file : ', error)
        } else {
            console.log('File successfully uploaded')
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setSubmitting(true)
        console.log(avatar)
        try {
            
            const userbody = {
                randomID,
                namalengkap,
                email,
                nomortelepon,
                tgllahir,
                username,
                password,
                sisapembayaran,
                avatar
            };

            const validationResult = schema.safeParse(userbody);

            if (validationResult.success) {
                await fetch("/api/register", {
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
                        sendFile()
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
        await new Promise(resolve => setTimeout(resolve, 2000))
        router.push('/login')
    }

    if (status === 'loading') {
        return (
            <LoadingPage/>
        )
    }
    if (session?.user) {
        return (
            redirect('/profile')
        )
    }
    return (
        <>
        
        <Navbar />


        <div className="hero min-h-screen bg-secondary">
            <div className="hero-content w-full flex-col lg:flex-row-reverse">
                <div className="card flex-shrink-0 w-full shadow-2xl bg-primary">
                    <form onSubmit={handleSubmit} className="card-body">
                        <h1 className="text-3xl text-bold text-white">Register Akun</h1>
                        <h1 className="text-xl text-normal text-white">Jika sudah memiliki akun, <Link href="/login" className="hover:text-red-700">klik disini</Link></h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Nama Lengkap</span>
                            </label>
                            <input type="text" name="Nama lengkap" value={namalengkap} onChange={(e) => setNamalengkap(e.target.value)} placeholder="contoh : Agus Dewana" className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required maxLength={50}/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="Email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="contoh : agusdewana@gmail.com" className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required maxLength={50}/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="contoh : agusdewana99" className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required maxLength={20}/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="Password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan password" className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required minLength={8}/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">No. Telp/ No. HP/No. WhatsApp</span>
                            </label>
                            <input value={nomortelepon} onChange={(e) => setNomortelepon(e.target.value)} type="number" name="Nomor Telepon" placeholder="contoh : '081356324299' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required maxLength={16}/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Tanggal Lahir</span>
                            </label> 
                            <input value={tgllahir} onChange={(e) => setTgllahir(e.target.value)} type="date" name="Tanggal Lahir" placeholder="17-08-45" className="bg-secondary placeholder-slate-400 text-slate-950 textarea textarea-bordered" required/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Foto Profil</span>
                            </label>
                            <input type="file" name="avatar" onChange={(e) => setAvatar(e.target.files[0])} className="bg-secondary text-slate-950 input input-bordered" accept="image/*" />
                        </div>
                        { submitfail ? (<div className="alert alert-error mt-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span>Ada kesalahan dalam membuat akun, mohon periksa kembali data anda.</span></div>) : null }
                        { submitted ? (<div className="alert alert-success mt-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>Pembuatan akun sukses, mohon tunggu sebentar</span></div>) : null }
                        { submitting ? ( <><input type="submit" value='Mengirim...' className="btn btn-secondary"></input></> ) : (<><input type="submit" value='Register' className="btn btn-secondary mt-5"></input></>) }
                    </form>
                </div>
            </div>
        </div>

        <Footer/>
        </>
    )
}
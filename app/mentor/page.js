'use client'

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useState } from "react";
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";

export default function Login() {
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [loginerror, setLoginerror] = useState(false)
    const [loginsuccess, setLoginsuccess] = useState(false)

    const router = useRouter()

    const handleSubmit = async (event) => {
        event.preventDefault()

        const signInData = await signIn('credentials', {
            email: email,
            password: password,
            redirect: false
        })
        if(signInData.error) {
            console.log(signInData.error)
            setLoginerror(true)
        } else {
            setLoginsuccess(true)
            setLoginerror(false)
            await new Promise(resolve => setTimeout(resolve, 5000))
            router.push("/profile")
        }
    }

    return (
        <>
        
        <Navbar />


        <div className="hero min-h-screen bg-secondary">
            <div className="hero-content w-full flex-col lg:flex-row-reverse">
                <div className="card flex-shrink-0 w-full shadow-2xl bg-primary">
                    <form onSubmit={handleSubmit} className="card-body">
                        <h1 className="text-3xl text-bold">Login Mentor</h1>
                        <h1 className="text-xl text-normal">Hanya untuk karyawan Al-Harom Bina Hati</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="Password" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Masukkan email' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="Password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan password' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required/>
                        </div>
                        <input type="submit" value='Login' className="btn btn-secondary mt-5"></input>
                        { loginerror && (<div className="alert alert-error mt-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span>Ada kesalahan dalam login, mohon periksa kembali data anda.</span></div>) }
                        { loginsuccess && (<div className="alert alert-success mt-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>Login sukses, mohon tunggu sebentar</span></div>) }
                    </form>
                </div>
            </div>
        </div>

        <Footer/>
        </>
    )
}
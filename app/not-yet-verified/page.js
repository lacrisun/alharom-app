'use client'

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useEffect, useRef, useState } from "react";
import { signIn, useSession } from 'next-auth/react';
import { redirect, useRouter } from "next/navigation";
import LoadingPage from "@/components/loading";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import NavbarLoggedIn from "@/components/loggedin/navbar";
import dynamic from "next/dynamic";
const Player = dynamic(() => import("@lordicon/react").then((module) => module.Player), {
    ssr: false,
  });
export default function NotVerified() {
    
    const {data: session, status} = useSession()
    const playerRef = useRef(null)
    const ErrorStatusIcon = require('@/public/system-regular-55-error.json')

    useEffect(() => {
        playerRef.current?.playFromBeginning()
    })

    const [user, setUser] = useState([])

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

    if (status === 'loading') {
        return (
            <LoadingPage/>
        )
    }
    if (user?.account?.is_verified === true || user?.account?.role) {
        return (
            redirect('/')
        )
    }
    return (
        <>
        {session ? <NavbarLoggedIn profilepic={session.user.username} admin={session.user.role}/> : <Navbar />}

        <div className="hero min-h-screen bg-secondary">
            <div className="hero-content w-full flex-col lg:flex-row-reverse">
                <div className="card flex-shrink-0 w-full bg-secondary">
                    <div className="card-body items-center text-center">
                        <div>
                            <Player
                                ref={playerRef}
                                icon={ErrorStatusIcon}
                                size={96}
                                onComplete={() => playerRef.current?.playFromBeginning()}
                            />
                        </div>
                        
                        <div>
                            <h1 className="text-xl">Akun anda belum terverifikasi!</h1>
                            <p>Mohon tunggu sesaat lagi, jika perlu hubungi kami.</p>
                        </div>
                    </div>
                    
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

        <Footer/>
        </>
    )
}
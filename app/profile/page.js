"use client"

import Footer from "@/components/footer";
import LoadingPage from "@/components/loading";
import NavbarLoggedIn from "@/components/loggedin/navbar";
import Navbar from "@/components/navbar";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {

    const {data: session, status} = useSession()
    console.log(session)

    const [fetchingData, setFetchingData] = useState(false)
    const [user, setUser] = useState({})

    const getUserData = async (email) => {
        setFetchingData(true)
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
        } finally {
            setFetchingData(false)
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

    
    if (session) {
        const profilepicture = `https://ioijksivulsyacpizroe.supabase.co/storage/v1/object/public/avatars/${session.user.username}`
        return (
            <>
        
            <NavbarLoggedIn profilepic={session.user.username} admin={session.user.role}/>

            <div className="hero min-h-screen bg-secondary">
                <div className="hero-content w-full flex-col lg:flex-row-reverse">
                    <div className="card flex-shrink-0 w-full shadow-2xl bg-primary text-white">
                        <div className="avatar items-center p-5">
                            <div className="w-24 rounded-full">
                                <img src={profilepicture} />
                            </div>
                            <h1 className="text-3xl text-bold ms-5">Hai, {session?.user.fullname}!</h1>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 justify-items-stretch gap-2 m-5">
                                <div>
                                    <h3 className="text-2xl font-bold">Tanggal Lahir</h3>
                                    {fetchingData ? (
                                            <div className="text-lg">
                                                <span className="loading loading-spinner loading-md"></span>
                                            </div>
                                        ) : (
                                            <>
                                                {user?.account?.tanggal_lahir ? (
                                                    <div className="text-lg">{user.account.tanggal_lahir}</div>
                                                ) : (
                                                    <div className="text-lg loading loading-spinner loading-md"></div>
                                                )}
                                            </>
                                    )}                            
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold">Tanggal Bergabung</h3>
                                    {fetchingData ? (
                                            <div className="text-lg">
                                                <span className="loading loading-spinner loading-md"></span>
                                            </div>
                                        ) : (
                                            <>
                                                {user?.account?.tanggal_bergabung ? (
                                                    <div className="text-lg">{new Date(user.account.tanggal_bergabung).toLocaleString()}</div>
                                                ) : (
                                                    <div className="text-lg loading loading-spinner loading-md"></div>
                                                )}
                                            </>
                                    )}       
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold">Nomor Telepon</h3>
                                    {fetchingData ? (
                                            <div className="text-lg">
                                                <span className="loading loading-spinner loading-md"></span>
                                            </div>
                                        ) : (
                                            <>
                                                {user?.account?.nomor_telepon ? (
                                                    <div className="text-lg">{user.account.nomor_telepon}</div>
                                                ) : (
                                                    <div className="text-lg loading loading-spinner loading-md"></div>
                                                )}
                                            </>
                                    )}                                     
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold">Email</h3>
                                    {fetchingData ? (
                                        <div className="text-lg">
                                            <span className="loading loading-spinner loading-md"></span>
                                        </div>
                                    ) : (
                                        <>
                                            {user?.account?.email ? (
                                                <div className="text-lg">{user.account.email}</div>
                                            ) : (
                                                <div className="text-lg loading loading-spinner loading-md"></div>
                                            )}
                                        </>
                                    )}
                            </div>
                            <div className="flex flex-col sm:flex-row w-full justify-around">

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

            </>
        )
    }

    return (
        redirect('/')
    )
}
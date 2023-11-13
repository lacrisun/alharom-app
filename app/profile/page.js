import Footer from "@/components/footer";
import NavbarLoggedIn from "@/components/loggedin/navbar";
import Navbar from "@/components/navbar";
import { authOptions } from "@/lib/auth";
import supabase from "@/lib/supabase";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function Profile() {

    const session = await getServerSession(authOptions)
    console.log(session)

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
                        <div className="grid place-items-center m-5 gap-5">
                            <div className="flex flex-col sm:flex-row w-full gap-3 justify-around">
                                <div>
                                    <h3 className="text-2xl font-bold">Tanggal Lahir</h3>
                                    <p className="text-lg">14 Juni 2006</p>                                
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold">Tanggal Bergabung</h3>
                                    <p className="text-lg">18 September 2021</p>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold">Nomor Telepon</h3>
                                    <p className="text-lg">{session.user.phone}</p>                                
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold">Email</h3>
                                    <p className="text-lg">{session?.user.email}</p>
                                </div>
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
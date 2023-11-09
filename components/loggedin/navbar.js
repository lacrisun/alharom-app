import Image from "next/image"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse, faPhone, faRightFromBracket, faRightToBracket, faTag, faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { faCodepen } from "@fortawesome/free-brands-svg-icons"
import { signOut, useSession } from "next-auth/react"
import LogoutBtn from "./logoutbtn"
import LogoutList from "./logoutlist"

export default function NavbarLoggedIn({ profilepic, admin }) {

    const profilelink = `https://ioijksivulsyacpizroe.supabase.co/storage/v1/object/public/avatars/${profilepic}`

    return (
        <div className="drawer z-40 drawer-end">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
        <div className="drawer-content flex flex-col">
            <div className="w-full navbar bg-secondary">
            <div className="flex-1 px-2 mx-2 mb-3 justify-start">
                <Link href="/"><Image 
                    src="/logo.png"
                    width={150}
                    height={76}
                    alt='Al-Harom logo'
                /></Link>
            </div>
            <div className="flex-none px-2 mx-2 lg:hidden justify-end">
                <label htmlFor="my-drawer-3" className="btn btn-square btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </label>
            </div> 
            <div className="flex-none hidden lg:block">
                <ul className="menu menu-horizontal menu-lg space-x-1">
                <li><Link href="/" className="text-black hover:text-primary">Tentang Kami</Link></li>
                <li><Link href="/pendaftaran" className="text-black hover:text-primary">Pendaftaran</Link></li>
                <li><Link href="/program&paket" className="text-black hover:text-primary">Program & Paket</Link></li>
                <li>
                    <Link href="/profile" className="avatar p-0 mr-2">
                        <div className="w-12 rounded-full">
                            <img src={profilelink} />
                        </div>
                    </Link>
                </li>
                {
                    admin && <li><Link href="/admin" className="btn btn-primary">Dashboard</Link></li>

                }
                <LogoutBtn />
                </ul>
            </div>
            </div>
        </div> 
        <div className="drawer drawer-side">
            <label htmlFor="my-drawer-3" className="drawer-overlay"></label> 
            <ul className="menu p-4 w-80 min-h-full bg-primary">
                <li><Link href="/" className="text-white hover:bg-neutral"><i><FontAwesomeIcon icon={faHouse}></FontAwesomeIcon></i>Tentang Kami</Link></li>
                <li><Link href="/pendaftaran" className="text-white hover:bg-neutral"><i><FontAwesomeIcon icon={faUserPlus}></FontAwesomeIcon></i>Pendaftaran</Link></li>
                <li><Link href="/program&paket" className="text-white hover:bg-neutral"><i><FontAwesomeIcon icon={faTag} /></i>Program & Paket</Link></li>
                <li><Link href="/profile" className="text-white hover:bg-neutral"><i><FontAwesomeIcon icon={faUser} /></i>Profil Akun</Link></li>
                {
                    admin && <li><Link href="/admin" className="text-white hover:bg-neutral">Dashboard Admin</Link></li>

                }
                <LogoutList/>
            </ul>
        </div>
        </div>
    )
}
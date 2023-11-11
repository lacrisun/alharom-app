'use client'

import AdminNav from "@/components/admincomponents/adminnavbar";
import Dashboard from "@/components/admincomponents/dashboard";
import LoadingPage from "@/components/loading";
import prisma from "@/lib/prisma";
import { faChartLine, faRightFromBracket, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Admin() {
    const router = useRouter();
    const { data: session, status } = useSession();

    const [userCount, setUserCount] = useState(0)
    const [userpermonth, setUserpermonth] = useState(0)
    const [dashboard, setDashboard] = useState(true)
    const [umrahtable, setUmrahTable] = useState(false)

    const [users, setUsers] = useState([])

    const adminRole = session?.user.isadmin;

    const date = new Date()
    const today = date.toLocaleString('default', { day: 'numeric', month: 'long', year: 'numeric'})
    

    const fetchUserCount = async () => {
        try {
            const response = await fetch('/api/usercount', {cache: 'no-store', next: { revalidate: 0 }});
            const data = await response.json();
            setUserCount(data.responsedata)
        } catch (error) {
            console.error("Error fetching user count:", error);
        }
    };

    const fetchCurrentMonthUserCount = async () => {
        try {
            const response = await fetch('/api/userpermonth', {cache: 'no-store', next: { revalidate: 0 }});
            const data = await response.json();
            setUserpermonth(data.responsedata)
        } catch (error) {
            console.error("Error fetching user count:", error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/userlist', {cache: 'no-store', next: { revalidate: 0 }})
            const data = await response.json()
            const users = data.responsedata
            const array = JSON.parse(users)
            setUsers(array)
        } catch (error) {
            console.error("Error fetching user", error)
        }
    }

    useEffect(() => {
        fetchUserCount()
        fetchCurrentMonthUserCount()
        fetchUsers()
    }, [])


    if (status === 'loading') {
        return <LoadingPage />;
    }
    if (adminRole) {
        return (
            <>
                <div className="drawer lg:drawer-open">
                    <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                    {dashboard &&
                    
                    <div className="drawer-content flex flex-col text-3xl">
                        <div className="w-full navbar bg-secondary">
                            <div className="flex-none lg:hidden">
                                <label htmlFor="my-drawer-3" className="btn btn-square btn-primary">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        className="inline-block w-6 h-6 stroke-current"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                    </svg>
                                </label>
                            </div>
                            <div className="flex-1 px-2 mx-2 text-black">Admin Page</div>
                        </div>
                        <div className="grid min-h-screen z-40 bg-red-950">
                            <div className="stats h-min w-min m-4 shadow stats-vertical lg:stats-horizontal">
                                <div className="stat bg-primary">
                                    <div className="stat-title">Total Jamaah</div>
                                    <div className="stat-value">{userCount}</div>
                                    <div className="stat-desc">Jumlah jamaah yang terdata dalam database</div>                                   
                                </div>
                                <div className="stat bg-primary">
                                    <div className="stat-title">Total Jamaah Bulan Ini</div>
                                    <div className="stat-value">{userpermonth}</div>       
                                    <div className="stat-desc">Sesuai hari ini, {today}</div>                            
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    }

                    {umrahtable &&
                    
                    <div className="drawer-content flex flex-col text-3xl">
                        <div className="w-full navbar bg-secondary">
                            <div className="flex-none lg:hidden">
                                <label htmlFor="my-drawer-3" className="btn btn-square btn-primary">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        className="inline-block w-6 h-6 stroke-current"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                    </svg>
                                </label>
                            </div>
                            <div className="flex-1 px-2 mx-2 text-black">Admin Page</div>
                        </div>
                        <div className="grid min-h-screen z-40 bg-red-950">
                                <div className="overflow-x-auto m-4">
                                    <table className="table text-white">
                                        {/* head */}
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Nama</th>
                                                <th>Email</th>
                                                <th>Data Dibuat</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users && users.map((user) => (
                                                <tr key={user.id}>
                                                    <td>{user.id}</td>
                                                    <td>{user.nama_lengkap}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.data_dibuat}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                        </div>
                    </div>

                    }
                    <div className="drawer-side z-50">
                        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 min-h-full bg-primary">
                            <li className="text-3xl text-white">Halo, {session.user.fullname}</li>
                            <div className="divider"></div>
                            <li className="text-white text-lg" onClick={() => { setDashboard(true); setUmrahTable(false); }}>
                                <a>
                                    <i>
                                        <FontAwesomeIcon icon={faChartLine} />
                                    </i>
                                    Dashboard
                                </a>
                            </li>
                            <li className="text-white text-lg" onClick={() => { setDashboard(false); setUmrahTable(true); }}>
                                <a>
                                    <i>
                                        <FontAwesomeIcon icon={faUsers} />
                                    </i>
                                    Daftar Calon Umrah
                                </a>
                            </li>
                            <li className="text-white text-lg" onClick={() => signOut()}>
                                <a>
                                    <i>
                                        <FontAwesomeIcon icon={faRightFromBracket} />
                                    </i>
                                    Logout/Keluar
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </>
        );
    }
    return redirect('/');
}
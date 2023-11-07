'use client'

import AdminNav from "@/components/admincomponents/adminnavbar";
import Dashboard from "@/components/admincomponents/dashboard";
import LoadingPage from "@/components/loading";
import prisma from "@/lib/prisma";
import { faChartLine, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Admin() {
    const router = useRouter();
    const { data: session, status } = useSession();

    const [userCount, setUserCount] = useState(0)
    const [dashboard, setDashboard] = useState(true)
    const [umrahtable, setUmrahTable] = useState(false)

    const adminRole = session?.user.isadmin;

    const fetchUserCount = async () => {
        try {
            const response = await fetch('/api/usercount');
            const data = await response.json();
            setUserCount(data.responsedata)
        } catch (error) {
            console.error("Error fetching user count:", error);
        }
    };


    useEffect(() => {
        fetchUserCount()
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
                            <div className="stats h-min w-min gap-4 m-4 shadow">
                                <div className="stat bg-primary">
                                    <div className="stat-title">Total Jamaah</div>
                                    <div className="stat-value">{userCount}</div>                                   
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
                            <div className="stats h-min w-min gap-4 m-4 shadow">
                                <div className="stat bg-primary">
                                    <div className="stat-title">what</div>
                                    <div className="stat-value">{userCount}</div>                                   
                                </div>
                            </div>
                        </div>
                    </div>

                    }
                    <div className="drawer-side z-50">
                        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 min-h-full bg-primary">
                            <li className="text-3xl text-white">Halo, Admin!</li>
                            <div className="divider"></div>
                            <li className="text-lg" onClick={() => { setDashboard(true); setUmrahTable(false); }}>
                                <a>
                                    <i>
                                        <FontAwesomeIcon icon={faChartLine} />
                                    </i>
                                    Dashboard
                                </a>
                            </li>
                            <li className="text-lg" onClick={() => { setDashboard(false); setUmrahTable(true); }}>
                                <a>
                                    <i>
                                        <FontAwesomeIcon icon={faUsers} />
                                    </i>
                                    Daftar Calon Umrah
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
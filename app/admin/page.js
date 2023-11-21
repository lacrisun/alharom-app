'use client'

import AdminNav from "@/components/admincomponents/adminnavbar";
import Dashboard from "@/components/admincomponents/dashboard";
import LoadingPage from "@/components/loading";
import prisma from "@/lib/prisma";
import { faChartLine, faHome, faRightFromBracket, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
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
    const [searchQuery, setSearchQuery] = useState('');
    const [currentDay, setCurrentDay] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const roles = session?.user.role;

    const date = new Date()
    const today = date.toLocaleString('default', { day: 'numeric', month: 'long', year: 'numeric'})
    

    const fetchUserCount = async () => {
        try {
            const response = await fetch('/api/usercount');
            const data = await response.json();
            setUserCount(data.responsedata)
        } catch (error) {
            console.error("Error fetching user count:", error);
        }
    };

    const fetchCurrentMonthUserCount = async () => {
        try {
            const response = await fetch('/api/userpermonth');
            const data = await response.json();
            setUserpermonth(data.responsedata)
        } catch (error) {
            console.error("Error fetching user count:", error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch(`/api/userlist?search=${searchQuery}`);
            const data = await response.json();
            const users = data.responsedata;
            const array = JSON.parse(users);
            const sortedUsers = array.sort((a, b) => new Date(b.data_dibuat) - new Date(a.data_dibuat));
    
            const filteredUsers = sortedUsers.filter((user) => {
                return user.nama_lengkap.toLowerCase().includes(searchQuery.toLowerCase());
            });
    
            setUsers(filteredUsers);

            if (filteredUsers.length > 0) {
                const firstUserDate = new Date(filteredUsers[0].data_dibuat);
                const formattedDate = firstUserDate.toLocaleString('default', { day: 'numeric', month: 'long', year: 'numeric' });
                setCurrentDay(formattedDate);
            } else {
                setCurrentDay('');
            }

        } catch (error) {
            console.error("Error fetching user", error);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
      
        try {
          await fetchUserCount();
          await fetchCurrentMonthUserCount();
          await fetchUsers();
        } catch (error) {
          console.error("Error refreshing data:", error);
        }
      
        setRefreshing(false);
      };

    useEffect(() => {
        fetchUserCount()
        fetchCurrentMonthUserCount()
        fetchUsers()
    }, [searchQuery])


    if (status === 'loading') {
        return <LoadingPage />;
    }
    if (roles === 'Admin') {
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
                                <div className="overflow-x-auto m-4 text-black">
                                    <div className="form-control max-w-xs m-2 flex flex-row">
                                        <label className="label mr-3">
                                            <span className="label-text text-white">Pencarian</span>
                                        </label>
                                        <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="text" name="search" placeholder="" className="bg-secondary placeholder-slate-400 text-slate-950 textarea textarea-bordered" required maxLength={30} />
                                        <button
                                            className="btn btn-primary ml-3"
                                            onClick={handleRefresh}
                                            disabled={refreshing}
                                        >
                                            Refresh Data
                                        </button>
                                    </div>
                                    <table className="table text-slate-900 bg-secondary rounded-lg">
                                        {/* head */}
                                        <thead className="text-slate-900">
                                            <tr>
                                                <th>ID</th>
                                                <th>Nama</th>
                                                <th>Nomor NIK</th>
                                                <th>Paket Umrah</th>
                                                <th>Tipe kamar</th>
                                                <th>Status Pembayaran</th>
                                                <th>Email</th>
                                                <th>Alamat</th>
                                                <th>Jenis Kelamin</th>
                                                <th>Tempat Lahir</th>
                                                <th>Tanggal Lahir</th>
                                                <th>Nomor Telepon</th>
                                                <th>Nomor Paspor</th>
                                                <th>Paspor Dibuat</th>
                                                <th>Masa Berlaku paspor</th>
                                                <th>Tempat dikeluarkan paspor</th>
                                                <th>Golongan Darah</th>
                                                <th>Nama Ayah Kandung</th>
                                                <th>Pekerjaan</th>
                                                <th>Pendidikan Terakhir</th>
                                                <th>Status Perkawinan</th>
                                                <th>Penyakit yang di idapi</th>
                                                <th>Nama Waris</th>
                                                <th>Hubungan dengan Waris</th>
                                                <th>Keluarga yang bisa dihubungi</th>
                                                <th>Didaftarkan oleh</th>
                                                <th>Pembayaran via</th>
                                                <th>Sisa pembayaran</th>
                                                <th>Data Dibuat</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users && users.map((user, index) => (
                                                <>
                                                    {index === 0 || new Date(user.data_dibuat).toLocaleDateString() !== new Date(users[index - 1].data_dibuat).toLocaleDateString() ? (
                                                        <tr key={`divider-${user.id}`} className="justify-items-center">
                                                            <td colSpan="4" className="divider">
                                                            {new Date(user.data_dibuat).toLocaleDateString('in-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                                            </td>
                                                        </tr>
                                                    ) : null}
                                                    <tr key={user.id}>
                                                        <td>{user.id}</td>
                                                        <td>{user.nama_lengkap}</td>
                                                        <td>{user.nik}</td>
                                                        <td>{user.paket_umrah}</td>
                                                        <td>{user.tipe_kamar}</td>
                                                        <td>
                                                            <div className={user.paystatus === 'LUNAS' ? 'badge badge-success' : 'badge badge-error'}>{user.paystatus}</div>
                                                        </td>
                                                        <td>{user.email}</td>
                                                        <td>{user.alamat}</td>
                                                        <td>{user.jenis_kelamin}</td>
                                                        <td>{user.tempat_lahir}</td>
                                                        <td>{user.tanggal_lahir}</td>
                                                        <td>{user.nomor_telpon}</td>
                                                        <td>{user.nomor_paspor}</td>
                                                        <td>{user.paspor_dibuat}</td>
                                                        <td>{user.paspor_expired}</td>
                                                        <td>{user.tempat_paspor}</td>
                                                        <td>{user.golongan_darah}</td>
                                                        <td>{user.ayah_kandung}</td>
                                                        <td>{user.pekerjaan}</td>
                                                        <td>{user.pendidikan}</td>
                                                        <td>{user.status_kawin}</td>
                                                        <td>{user.penyakit}</td>
                                                        <td>{user.nama_waris}</td>
                                                        <td>{user.hubungan_waris}</td>
                                                        <td>{user.keluarga_darurat}</td>
                                                        <td>{user.didaftarkan}</td>
                                                        <td>{user.pembayaran}</td>
                                                        <td>RP. {user.sisa_bayar}</td>
                                                        <td>{new Date(user.data_dibuat).toLocaleString()}</td>
                                                    </tr>
                                                </>
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
                            <li className="text-white text-lg">
                                <Link href="/">
                                    <i>
                                        <FontAwesomeIcon icon={faHome} />
                                    </i>
                                    Balik ke halaman utama
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </>
        );
    }
    return redirect('/');
}
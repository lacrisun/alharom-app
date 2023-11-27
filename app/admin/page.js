'use client'

import AdminNav from "@/components/admincomponents/adminnavbar";
import Dashboard from "@/components/admincomponents/dashboard";
import LoadingPage from "@/components/loading";
import prisma from "@/lib/prisma";
import { faAddressCard, faBed, faBook, faCalendar, faChartLine, faEnvelope, faFileInvoice, faFileInvoiceDollar, faHandHoldingDollar, faHeartPulse, faHome, faIdCard, faLocationDot, faMapLocationDot, faMoneyBill, faNotesMedical, faPassport, faPen, faPersonCircleCheck, faPhone, faPhoneVolume, faPlaneDeparture, faRightFromBracket, faTrash, faUser, faUserDoctor, faUserGroup, faUsers, faVenusMars, faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Bar as ReactBar } from "react-chartjs-2";
import { CategoryScale, Chart, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { z } from "zod";

export default function Admin() {
    const router = useRouter();
    const { data: session, status } = useSession();

    Chart.register(CategoryScale, LinearScale, BarElement, Tooltip)

    const [userCount, setUserCount] = useState(0)
    const [userpermonth, setUserpermonth] = useState(0)
    const [accountCount, setAccountCount] = useState(0)
    const [dashboard, setDashboard] = useState(true)
    const [umrahtable, setUmrahTable] = useState(false)

    const [users, setUsers] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [currentDay, setCurrentDay] = useState('');

    const [fetchingData, setFetchingData] = useState(false)
    const [refreshing, setRefreshing] = useState(false);

    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [submitfail, setSubmitfail] = useState(false)

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
    const [userID, setUserID] = useState("")
    const [sisaPembayaran, setSisaPembayaran] = useState("")
    const [statusbyr, setStatusbyr] = useState("BELUM_LUNAS")
    const [didaftarkans, setDidaftarkans] = useState("User/Sendiri")
    const [nonuser, setNonuser] = useState(false)
    const [price, setPrice] = useState('33500000')

    const [payment, setPayment] = useState("Angsuran")

    const roles = session?.user.role;

    const date = new Date()
    const today = date.toLocaleString('default', { day: 'numeric', month: 'long', year: 'numeric' })

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

    const labels = ['Jan', 'Feb', 'Mar', 'Apr']

    const data = {
        labels: labels,
        datasets: [{
            label: 'My First Dataset',
            data: [65, 59, 80, 81],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
            ],
            borderWidth: 1
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'lmao banget'
            }
        }
    }

    const fetchUserCount = async () => {
        try {
            setFetchingData(true)
            const response = await fetch('/api/usercount');
            const data = await response.json();
            setUserCount(data.responsedata)
        } catch (error) {
            console.error("Error fetching user count:", error);
        } finally {
            setFetchingData(false)
        }
    };

    const fetchAccountCount = async () => {
        try {
            setFetchingData(true)
            const response = await fetch('/api/accountcount');
            const data = await response.json();
            setAccountCount(data.responsedata)
        } catch (error) {
            console.error("Error fetching user count:", error);
        } finally {
            setFetchingData(false)
        }
    };

    const fetchCurrentMonthUserCount = async () => {
        try {
            setFetchingData(true)
            const response = await fetch('/api/userpermonth');
            const data = await response.json();
            setUserpermonth(data.responsedata)
        } catch (error) {
            console.error("Error fetching user count:", error);
        } finally {
            setFetchingData(false)
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
            await fetchAccountCount()
        } catch (error) {
            console.error("Error refreshing data:", error);
        }

        setRefreshing(false);
    };

    const delModalopener = (userId) => {
        const modal = document.getElementById('del_modal')
        modal.showModal()

        const user = users.find((user) => user.id === userId);

        setUserID(user.id)       

        
    }

    const deleteFunc = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            const userbody = {
                userID,
            }
            await fetch("/api/deleterec", {
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
            setSubmitting(false)

        } catch (error) {
            console.error(error)
            setSubmitfail(true)
            setSubmitted(false)
        }
    }


    const editModalopener = async (userId) => {
        const modal = document.getElementById('edit_modal')
        modal.showModal()

        const user = users.find((user) => user.id === userId);

        setUserID(user.id)

        setPaketumrah(user.paket_umrah)
        setTipekamar(user.tipe_kamar)
        setNamalengkap(user.nama_lengkap)
        setNonik(user.nik)
        setTempatlahir(user.tempat_lahir)
        setTanggallahir(user.tanggal_lahir)
        setAyahkandung(user.ayah_kandung)
        setNopaspor(user.nomor_paspor)
        setExpirepaspor(user.paspor_expired)
        setTempatpaspor(user.tempat_paspor)
        setPasporissued(user.paspor_dibuat)
        setJeniskelamin(user.jenis_kelamin)
        setGolongandarah(user.golongan_darah)
        setStatuskawin(user.status_kawin)
        setNamawaris(user.nama_waris)
        setHubunganwaris(user.hubungan_waris)
        setEmail(user.email)
        setNotelponhp(user.nomor_telpon)
        setPengalaman(user.pengalaman_umrah)
        setPendidikanterakhir(user.pendidikan)
        setPekerjaan(user.pekerjaan)
        setPenyakit(user.penyakit)
        setKeluargadarurat(user.keluarga_darurat)
        setAlamat(user.alamat)
        setSisaPembayaran(user.sisa_bayar)

        modal.addEventListener('close', () => {
            setSubmitted(false)
            setSubmitfail(false)
        })

    }

    const createModalOpener = async () => {
        const modal = document.getElementById('create_modal')
        modal.showModal()

        modal.addEventListener('close', () => {
            setSubmitted(false)
            setSubmitfail(false)
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)

        try {
            const userbody = {
                userID,
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
                sisaPembayaran,
                statusbyr,
            };

            const validationResult = schema.safeParse(userbody);

            if (validationResult.success) {
                await fetch("/api/dataeditor", {
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

    }

    useEffect(() => {
        if (session?.user) {
            setDidaftarkans(session.user.fullname)
            setNonuser(true)
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

        setSisaPembayaran(newPrice);
    }, [paketumrah]);

    useEffect(() => {
        if (sisaPembayaran === '0') {
            setStatusbyr('LUNAS')
        }
    }, [sisaPembayaran])

    const random = Math.floor(Math.random() * 100000)
    const randomStr = random.toString()

    const randomID = "ALHRM-" + randomStr

    const handleCreateSubmit = async (event) => {
        event.preventDefault()
        setSubmitting(true)

        
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
    }

    useEffect(() => {
        fetchUserCount()
        fetchCurrentMonthUserCount()
        fetchAccountCount()
    }, [])

    useEffect(() => {
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
                            <div className="grid grid-cols-1 z-40 bg-red-950">
                                <div className="form-control ml-2 mb-2 mt-2 flex flex-row h-min justify-between">
                                        <div>
                                            <button
                                                className="btn btn-primary rounded-2xl"
                                                onClick={handleRefresh}
                                                disabled={refreshing}
                                            >
                                                Refresh Data
                                            </button>
                                        </div>
                                    </div>
                            </div>
                            <div className="grid grid-cols-2 min-h-screen z-40 bg-red-950 justify-items-stretch gap-2">
                                <div className="stats h-min ml-2 shadow stats-vertical">
                                    <div className="stat bg-primary">
                                        <div className="stat-title">Total Jamaah</div>
                                        {fetchingData ? (
                                            <div className="stat-value">
                                                <span className="loading loading-spinner loading-md"></span>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="stat-value">{userCount}</div>
                                            </>
                                        )}
                                        <div className="stat-desc">Jumlah jamaah yang terdata dalam database</div>
                                    </div>
                                    <div className="stat bg-primary">
                                        <div className="stat-title">Total Jamaah Bulan Ini</div>
                                        {fetchingData ? (
                                            <div className="stat-value">
                                                <span className="loading loading-spinner loading-md"></span>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="stat-value">{userpermonth}</div>
                                            </>
                                        )}
                                        <div className="stat-desc">Sesuai hari ini, {today}</div>
                                    </div>
                                </div>
                                <div className="stats h-min mr-2 shadow stats-vertical">
                                    <div className="stat bg-primary">
                                        <div className="stat-title">Total Akun</div>
                                        {fetchingData ? (
                                            <div className="stat-value">
                                                <span className="loading loading-spinner loading-md"></span>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="stat-value">{accountCount}</div>
                                            </>
                                        )}
                                        <div className="stat-desc">Jumlah akun yang terdata dalam database</div>
                                    </div>
                                    <div className="stat bg-primary">
                                    <div className="stat-title">Total Akun</div>
                                        {fetchingData ? (
                                            <div className="stat-value">
                                                <span className="loading loading-spinner loading-md"></span>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="stat-value">{accountCount}</div>
                                            </>
                                        )}
                                        <div className="stat-desc">Jumlah akun yang terdata dalam database</div>
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
                            <div className="grid min-h-screen z-40 bg-red-950 grid-cols-1">
                                <div>
                                    <div className="form-control m-2 flex flex-row h-min justify-between">
                                        <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="text" name="search" placeholder="Pencarian" className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered w-full max-w-xs" required />
                                        <div>
                                            <button
                                                className="btn btn-primary ml-3"
                                                onClick={handleRefresh}
                                                disabled={refreshing}
                                            >
                                                Refresh Data
                                            </button>
                                            <button
                                                className="btn btn-primary ml-3"
                                                onClick={createModalOpener}
                                            >
                                                Tambah Data
                                            </button>
                                        </div>
                                    </div>
                                    <div className="overflow-x-auto m-2 text-black">
                                        <table className="table text-slate-900 bg-secondary rounded-lg">
                                            {/* head */}
                                            <thead className="text-slate-900">
                                                <tr>
                                                    <th><span><FontAwesomeIcon icon={faIdCard} /></span> ID</th>
                                                    <th><span><FontAwesomeIcon icon={faUser} /></span> Nama</th>
                                                    <th><span><FontAwesomeIcon icon={faAddressCard} /></span> Nomor NIK</th>
                                                    <th><span><FontAwesomeIcon icon={faPlaneDeparture} /></span> Paket Umrah</th>
                                                    <th><span><FontAwesomeIcon icon={faBed} /></span> Tipe kamar</th>
                                                    <th><span><FontAwesomeIcon icon={faFileInvoiceDollar} /></span> Status Pembayaran</th>
                                                    <th><span><FontAwesomeIcon icon={faEnvelope} /></span> Email</th>
                                                    <th><span><FontAwesomeIcon icon={faLocationDot} /></span> Alamat</th>
                                                    <th><span><FontAwesomeIcon icon={faVenusMars} /></span> Jenis Kelamin</th>
                                                    <th><span><FontAwesomeIcon icon={faMapLocationDot} /></span> Tempat Lahir</th>
                                                    <th><span><FontAwesomeIcon icon={faCalendar} /></span> Tanggal Lahir</th>
                                                    <th><span><FontAwesomeIcon icon={faPhone} /></span> Nomor Telepon</th>
                                                    <th><span><FontAwesomeIcon icon={faPassport} /></span> Nomor Paspor</th>
                                                    <th><span><FontAwesomeIcon icon={faPassport} /></span> Paspor Dibuat</th>
                                                    <th><span><FontAwesomeIcon icon={faPassport} /></span> Masa Berlaku paspor</th>
                                                    <th><span><FontAwesomeIcon icon={faPassport} /></span> Tempat dikeluarkan paspor</th>
                                                    <th><span><FontAwesomeIcon icon={faNotesMedical} /></span> Golongan Darah</th>
                                                    <th><span><FontAwesomeIcon icon={faUser} /></span> Nama Ayah Kandung</th>
                                                    <th><span><FontAwesomeIcon icon={faUserDoctor} /></span> Pekerjaan</th>
                                                    <th><span><FontAwesomeIcon icon={faBook} /></span> Pendidikan Terakhir</th>
                                                    <th><span><FontAwesomeIcon icon={faUserGroup} /></span> Status Perkawinan</th>
                                                    <th><span><FontAwesomeIcon icon={faHeartPulse} /></span> Penyakit yang di idapi</th>
                                                    <th><span><FontAwesomeIcon icon={faUserGroup} /></span> Nama Waris</th>
                                                    <th><span><FontAwesomeIcon icon={faUserGroup} /></span> Hubungan dengan Waris</th>
                                                    <th><span><FontAwesomeIcon icon={faPhoneVolume} /></span> Keluarga yang bisa dihubungi</th>
                                                    <th><span><FontAwesomeIcon icon={faPersonCircleCheck} /></span> Didaftarkan oleh</th>
                                                    <th><span><FontAwesomeIcon icon={faMoneyBill} /></span> Pembayaran via</th>
                                                    <th><span><FontAwesomeIcon icon={faHandHoldingDollar} /></span> Sisa pembayaran</th>
                                                    <th><span><FontAwesomeIcon icon={faCalendar} /></span> Data Dibuat</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {users && users.map((user, index) => (
                                                    <>
                                                        {index === 0 || new Date(user.data_dibuat).toLocaleDateString() !== new Date(users[index - 1].data_dibuat).toLocaleDateString() ? (
                                                            <tr key={`divider-${user.id}`} className="justify-items-center">
                                                                <td colSpan="4" className="divider bg-primary text-white rounded-lg m-2">
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
                                                            <td>Rp. {user.sisa_bayar},-</td>
                                                            <td>{new Date(user.data_dibuat).toLocaleString()}</td>
                                                            <td>
                                                                <button onClick={() => editModalopener(user.id)} className="btn btn-primary"><span><FontAwesomeIcon icon={faPen} /></span></button>
                                                            </td>
                                                            <td>
                                                                <button onClick={() => delModalopener(user.id)} className="btn btn-primary"><span><FontAwesomeIcon icon={faTrash} /></span></button>
                                                            </td>
                                                        </tr>
                                                    </>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <dialog id="del_modal" className="modal">
                                        <div className="modal-box bg-primary text-white">
                                            <h1 className="text-3xl text-bold text-white">Hapus Data {userID}</h1>
                                            <h1 className="text-xl text-normal text-white "><span><FontAwesomeIcon icon={faWarning} /></span> Anda yakin ingin menghapus data ini?</h1>
                                            {submitted && (<div className="alert alert-success mt-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                <span>Data anda telah berhasil di hapus! Mohon klik refresh untuk melihat perubahan</span></div>)}
                                            {submitfail && (<div className="alert alert-error mt-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span>Error! Mohon coba lagi dalam beberapa saat</span></div>)}
                                            <div className="modal-action">
                                                <div>
                                                    <button id="delbtn" className="btn btn-error" onClick={deleteFunc} disabled={submitting}>Hapus</button>
                                                </div>
                                                <form method="dialog">
                                                    <button className="btn btn-secondary">Close</button>
                                                </form>
                                            </div>
                                        </div>
                                        
                                    </dialog>
                                    <dialog id="edit_modal" className="modal">
                                        <div className="modal-box bg-primary text-white">
                                            <form onSubmit={handleSubmit} className="card-body">
                                                <h1 className="text-3xl text-bold text-white">Edit Data</h1>
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
                                                <div className="form-control w-full max-w-xs">
                                                    <label className="label">
                                                        <span className="label-text">Status Pembayaran</span>
                                                    </label>
                                                    <select value={statusbyr} onChange={(e) => setStatusbyr(e.target.value)} className="select select-bordered bg-secondary placeholder-slate-400 text-slate-950" required>
                                                        <option>BELUM_LUNAS</option>
                                                        <option>LUNAS</option>
                                                    </select>
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Nama Lengkap</span>
                                                    </label>
                                                    <input value={namalengkap} onChange={(e) => setNamalengkap(e.target.value)} type="text" name="Nama" placeholder="contoh : 'Agus Budiman' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required maxLength={50} />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">No. KTP/NIK</span>
                                                    </label>
                                                    <input value={nonik} onChange={(e) => setNonik(e.target.value)} type="number" name="No. KTP/NIK" placeholder="1471110000000000" className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required maxLength={30} />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Tempat Lahir</span>
                                                    </label>
                                                    <input value={tempatlahir} onChange={(e) => setTempatlahir(e.target.value)} type="text" name="Tempat Lahir" placeholder="Kota Pekanbaru" className="bg-secondary placeholder-slate-400 text-slate-950 textarea textarea-bordered" required maxLength={30} />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Tanggal Lahir</span>
                                                    </label>
                                                    <input value={tanggallahir} onChange={(e) => setTanggallahir(e.target.value)} type="date" name="Tanggal Lahir" placeholder="17-08-45" className="bg-secondary placeholder-slate-400 text-slate-950 textarea textarea-bordered" required />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Nama Ayah Kandung</span>
                                                    </label>
                                                    <input value={ayahkandung} onChange={(e) => setAyahkandung(e.target.value)} type="text" name="Ayah Kandung" placeholder="contoh : 'Agus Budiman' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required maxLength={50} />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Nomor Paspor</span>
                                                    </label>
                                                    <input value={nopaspor} onChange={(e) => setNopaspor(e.target.value)} type="number" name="No Paspor" placeholder="123456789" className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required maxLength={30} />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Paspor Berlaku sampai</span>
                                                    </label>
                                                    <input value={expirepaspor} onChange={(e) => setExpirepaspor(e.target.value)} type="date" name="Masa berlaku passpor" placeholder="17-08-45" className="bg-secondary placeholder-slate-400 text-slate-950 textarea textarea-bordered" required />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Tempat dikeluarkan paspor</span>
                                                    </label>
                                                    <input value={tempatpaspor} onChange={(e) => setTempatpaspor(e.target.value)} type="text" name="Tempat paspor" placeholder="Kota Pekanbaru" className="bg-secondary placeholder-slate-400 text-slate-950 textarea textarea-bordered" required maxLength={50} />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Tanggal dikeluarkan paspor</span>
                                                    </label>
                                                    <input value={pasporissued} onChange={(e) => setPasporissued(e.target.value)} type="date" name="Tanggal dikeluarkan passpor" placeholder="17-08-45" className="bg-secondary placeholder-slate-400 text-slate-950 textarea textarea-bordered" required />
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
                                                    <input value={golongandarah} onChange={(e) => setGolongandarah(e.target.value)} type="text" name="Golongan Darah" placeholder="contoh : 'O+' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" maxLength={4} required />
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
                                                    <input value={namawaris} onChange={(e) => setNamawaris(e.target.value)} type="text" name="Ahli Waris" placeholder="contoh : 'Dewi Septiana' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required maxLength={50} />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Hubungan Ahli Waris</span>
                                                    </label>
                                                    <input value={hubunganwaris} onChange={(e) => setHubunganwaris(e.target.value)} type="text" name="Hubungan Ahli Waris" placeholder="contoh : 'Anak' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required maxLength={50} />
                                                </div>

                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Alamat Tempat Tinggal</span>
                                                    </label>
                                                    <input value={alamat} onChange={(e) => setAlamat(e.target.value)} type="text" name="Alamat Tempat Tinggal" placeholder="contoh : 'Jl. Kaharuddin Nst No.40, Simpang Tiga, Kec. Bukit Raya, Kota Pekanbaru, Riau' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required maxLength={255} />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">E-mail</span>
                                                    </label>
                                                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="Email" placeholder="contoh : 'alharom@gmail.com' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required maxLength={50} />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">No. Telp/ No. HP/No. WhatsApp</span>
                                                    </label>
                                                    <input value={notelponhp} onChange={(e) => setNotelponhp(e.target.value)} type="number" name="Nomor Telepon" placeholder="contoh : '081356324299' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required maxLength={15} />
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
                                                    <input value={pekerjaan} onChange={(e) => setPekerjaan(e.target.value)} type="text" name="Pekerjaan" placeholder="contoh : 'Tentara' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" maxLength={50} />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Penyakit yang di derita</span>
                                                    </label>
                                                    <input value={penyakit} onChange={(e) => setPenyakit(e.target.value)} type="text" name="Penyakit yang diderita" placeholder="contoh : 'Kanker, Asma, dll.' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" maxLength={50} />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Keluarga yang dapat dihubungi ketika darurat</span>
                                                    </label>
                                                    <input value={keluargadarurat} onChange={(e) => setKeluargadarurat(e.target.value)} type="text" name="Keluarga Darurat" placeholder="contoh : 'Dewi : 0813-5632-4299' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required maxLength={50} />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Sisa pembayaran</span>
                                                    </label>
                                                    <input value={sisaPembayaran} onChange={(e) => setSisaPembayaran(e.target.value)} type="number" name="No Paspor" placeholder="123456789" className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required maxLength={30} />
                                                </div>
                                                <div className="form-control mt-6">
                                                    {submitting ? (<><input type="submit" value='Mengirim...' className="btn btn-secondary"></input></>) : (<><input type="submit" value='Kirim' className="btn btn-secondary"></input></>)}
                                                    {submitted && (<div className="alert alert-success mt-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                        <span>Data anda telah berhasil di edit! Mohon klik refresh untuk melihat perubahan</span></div>)}
                                                    {submitfail && (<div className="alert alert-error mt-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span>Error! Mohon coba lagi dalam beberapa saat</span></div>)}
                                                </div>
                                            </form>
                                        </div>
                                        <form method="dialog" className="modal-backdrop">
                                                <button>X</button>
                                            </form>
                                    </dialog>
                                    <dialog id="create_modal" className="modal">
                                        <div className="modal-box bg-primary text-white">
                                            <form onSubmit={handleCreateSubmit} className="card-body">
                                                <h1 className="text-3xl text-bold text-white">Pendaftaran</h1>
                                                <h1 className="text-xl text-normal text-white">Masukkan data sesuai di KTP/Paspor client!</h1>
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
                                                    <input value={namalengkap} onChange={(e) => setNamalengkap(e.target.value)} type="text" name="Nama" placeholder="contoh : 'Agus Budiman' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required maxLength={50} />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">No. KTP/NIK</span>
                                                    </label>
                                                    <input value={nonik} onChange={(e) => setNonik(e.target.value)} type="number" name="No. KTP/NIK" placeholder="1471110000000000" className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required maxLength={30} />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Tempat Lahir</span>
                                                    </label>
                                                    <input value={tempatlahir} onChange={(e) => setTempatlahir(e.target.value)} type="text" name="Tempat Lahir" placeholder="Kota Pekanbaru" className="bg-secondary placeholder-slate-400 text-slate-950 textarea textarea-bordered" required maxLength={30} />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Tanggal Lahir</span>
                                                    </label>
                                                    <input value={tanggallahir} onChange={(e) => setTanggallahir(e.target.value)} type="date" name="Tanggal Lahir" placeholder="17-08-45" className="bg-secondary placeholder-slate-400 text-slate-950 textarea textarea-bordered" required />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Nama Ayah Kandung</span>
                                                    </label>
                                                    <input value={ayahkandung} onChange={(e) => setAyahkandung(e.target.value)} type="text" name="Ayah Kandung" placeholder="contoh : 'Agus Budiman' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required maxLength={50} />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Nomor Paspor</span>
                                                    </label>
                                                    <input value={nopaspor} onChange={(e) => setNopaspor(e.target.value)} type="number" name="No Paspor" placeholder="123456789" className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required maxLength={30} />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Paspor Berlaku sampai</span>
                                                    </label>
                                                    <input value={expirepaspor} onChange={(e) => setExpirepaspor(e.target.value)} type="date" name="Masa berlaku passpor" placeholder="17-08-45" className="bg-secondary placeholder-slate-400 text-slate-950 textarea textarea-bordered" required />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Tempat dikeluarkan paspor</span>
                                                    </label>
                                                    <input value={tempatpaspor} onChange={(e) => setTempatpaspor(e.target.value)} type="text" name="Tempat paspor" placeholder="Kota Pekanbaru" className="bg-secondary placeholder-slate-400 text-slate-950 textarea textarea-bordered" required maxLength={50} />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Tanggal dikeluarkan paspor</span>
                                                    </label>
                                                    <input value={pasporissued} onChange={(e) => setPasporissued(e.target.value)} type="date" name="Tanggal dikeluarkan passpor" placeholder="17-08-45" className="bg-secondary placeholder-slate-400 text-slate-950 textarea textarea-bordered" required />
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
                                                    <input value={golongandarah} onChange={(e) => setGolongandarah(e.target.value)} type="text" name="Golongan Darah" placeholder="contoh : 'O+' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" maxLength={4} required />
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
                                                    <input value={namawaris} onChange={(e) => setNamawaris(e.target.value)} type="text" name="Ahli Waris" placeholder="contoh : 'Dewi Septiana' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required maxLength={50} />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Hubungan Ahli Waris</span>
                                                    </label>
                                                    <input value={hubunganwaris} onChange={(e) => setHubunganwaris(e.target.value)} type="text" name="Hubungan Ahli Waris" placeholder="contoh : 'Anak' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required maxLength={50} />
                                                </div>

                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Alamat Tempat Tinggal</span>
                                                    </label>
                                                    <input value={alamat} onChange={(e) => setAlamat(e.target.value)} type="text" name="Alamat Tempat Tinggal" placeholder="contoh : 'Jl. Kaharuddin Nst No.40, Simpang Tiga, Kec. Bukit Raya, Kota Pekanbaru, Riau' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required maxLength={255} />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">E-mail</span>
                                                    </label>
                                                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="Email" placeholder="contoh : 'alharom@gmail.com' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required maxLength={50} />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">No. Telp/ No. HP/No. WhatsApp</span>
                                                    </label>
                                                    <input value={notelponhp} onChange={(e) => setNotelponhp(e.target.value)} type="number" name="Nomor Telepon" placeholder="contoh : '081356324299' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required maxLength={15} />
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
                                                    <input value={pekerjaan} onChange={(e) => setPekerjaan(e.target.value)} type="text" name="Pekerjaan" placeholder="contoh : 'Tentara' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" maxLength={50} />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Penyakit yang di derita</span>
                                                    </label>
                                                    <input value={penyakit} onChange={(e) => setPenyakit(e.target.value)} type="text" name="Penyakit yang diderita" placeholder="contoh : 'Kanker, Asma, dll.' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" maxLength={50} />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Keluarga yang dapat dihubungi ketika darurat</span>
                                                    </label>
                                                    <input value={keluargadarurat} onChange={(e) => setKeluargadarurat(e.target.value)} type="text" name="Keluarga Darurat" placeholder="contoh : 'Dewi : 0813-5632-4299' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required maxLength={50} />
                                                </div>
                                                <div className="form-control w-full max-w-xs">
                                                    <label className="label">
                                                        <span className="label-text">Bayar via :</span>
                                                    </label>
                                                    <select value={payment} onChange={(e) => setPayment(e.target.value)} className="select select-bordered bg-secondary placeholder-slate-400 text-slate-950" required>
                                                        <option>Angsuran (DP)</option>
                                                    </select>
                                                </div>
                                                <div className="form-control mt-6">
                                                    {submitting ? (<><input type="submit" value='Mengirim...' className="btn btn-secondary"></input></>) : (<><input type="submit" value='Kirim' className="btn btn-secondary"></input></>)}
                                                    {submitted && (<div className="alert alert-success mt-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                        <span>Data anda telah berhasil di kirim! Klik refresh data untuk melihat data baru.</span></div>)}
                                                    {submitfail && (<div className="alert alert-error mt-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span>Error! Mohon coba lagi dalam beberapa saat, atau hubungi developer.</span></div>)}
                                                </div>
                                            </form>
                                        </div>
                                        <form method="dialog" className="modal-backdrop">
                                            <button>close</button>
                                        </form>
                                    </dialog>
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
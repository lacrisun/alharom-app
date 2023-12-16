import Link from "next/link";

export default function Paket() {
    return (

        <div className="grid place-items-center p-12 gap-3 min-h-screen bg-secondary">
            <h1 className="text-3xl font-bold mt-2 text-slate-800">Paket-Paket Umrah & Haji</h1>
            <div className="collapse mt-2 collapse-arrow bg-primary">
                <input type="checkbox" name="my-accordion-2" /> 
                <div className="collapse-title text-xl font-medium text-primary-content">
                    Syarat & Ketentuan
                </div>
                <div className="collapse-content text-primary-content"> 
                    <p>
                    ✓ Membayar uang muka Rp. 5.000.000<br />
                    ✓ Fotocopy KTP (Kartu Tanda Penduduk) 5 lembar<br/>
                    ✓ Fotocopy KK (Kartu Keluarga) 5 lembar<br/>
                    ✓ Paspor asli & fotocopy paspor 5 lembar<br/>
                    ✓ Pas foto terbaru dengan ukuran 3x4 & 4x6 masing-masing 5 lembar<br/>
                    ✓ (foto berwarna, latar putih bersih, fokus wajah 80%)<br/>
                    </p>
                </div>
            </div>
            <div className="collapse my-2 collapse-arrow bg-primary">
                <input type="checkbox" name="my-accordion-2" /> 
                <div className="collapse-title text-xl font-medium text-primary-content">
                    Gratis Kelengkapan Umrah
                </div>
                <div className="collapse-content text-primary-content"> 
                    <p>
                    ✓ Koper Besar<br />
                    ✓ Tas Oleh-oleh/Koper kecil<br/>
                    ✓ Ihrom/Mukena<br/>
                    ✓ Sabuk Ihram/Jilbab<br/>
                    ✓ Kain bahan seragam<br/>
                    ✓ Tas passport<br/>
                    ✓ Syal<br/>
                    ✓ Buku panduan Umrah/Haji<br/>
                    ✓ Bantai Leher<br/>
                    </p>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row text-slate-800 gap-3">
                <div className="card w-full bg-primary text-primary-content shadow-xl" style={{ backgroundImage: "url(/stock/mecca.png)" }}>
                    <div className="card-body bg-primary/80 rounded-2xl">
                        <h2 className="card-title">Umroh Reguler (Silver)</h2>
                        <p>Selama 12 hari, menginap di Hotel 4★ Concorde/Madinah (Madinah) dan Hotel 5★ Fajr Badea 2 (Mekkah)</p>
                        <Link href="/pendaftaran" className="card-actions justify-end">
                            <button className="btn btn-secondary text-primary">Rp. 33.500.000</button>
                        </Link>
                    </div>
                </div>
                <div className="card w-full bg-primary text-primary-content shadow-xl" style={{ backgroundImage: "url(/stock/madina.png)" }}>
                    <div className="card-body bg-primary/80 rounded-2xl">
                        <h2 className="card-title">Umroh Reguler (Gold)</h2>
                        <p>Selama 12 hari, menginap di Hotel 4★ Concorde/Madinah (Madinah) dan Hotel 5★ Fajr Badea 2 (Mekkah)</p>
                        <Link href="/pendaftaran" className="card-actions justify-end">
                            <button className="btn btn-secondary text-primary">Rp. 35.300.000</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row text-slate-800 gap-3">
                <div className="card w-full bg-primary text-primary-content shadow-xl" style={{ backgroundImage: "url(/stock/mecca2.png)" }}>
                    <div className="card-body bg-primary/80 rounded-2xl">
                        <h2 className="card-title">Umrah VIP</h2>
                        <p>Selama 12 hari, menginap di Hotel 4★ Concorde/Madinah (Madinah) dan Hotel 5★ Pullman/Rotana (Mekkah)</p>
                        <Link href="/pendaftaran" className="card-actions justify-end">
                            <button className="btn btn-secondary text-primary">Rp. 37.550.000</button>
                        </Link>
                    </div>
                </div>
                <div className="card w-full bg-primary text-primary-content shadow-xl" style={{ backgroundImage: "url(/stock/istanbul.png)" }}>
                    <div className="card-body bg-primary/80 rounded-2xl">
                        <h2 className="card-title">Umrah Plus Turki</h2>
                        <p>Selama 16 hari, menginap di Hotel 4★ Concorde/Madinah (Madinah), Hotel 5★ Fajr Badea 2 (Mekkah), dan menginap di Hotel 5★ Pullman (Turki)</p>
                        <Link href="/pendaftaran" className="card-actions justify-end">
                            <button className="btn btn-secondary text-primary">Rp. 39.197.000</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row text-slate-800 gap-3">
                <div className="card w-full bg-primary text-primary-content shadow-xl" style={{ backgroundImage: "url(/stock/dubai.png)" }}>
                    <div className="card-body bg-primary/80 rounded-2xl">
                        <h2 className="card-title">Umrah Plus Dubai</h2>
                        <p>Selama 13 hari, menginap di Hotel 4★ Concorde/Madinah (Madinah), Hotel 5★ Fajr Badea 2 (Mekkah), dan menginap di Hotel 5★ Pullman (Dubai)</p>
                        <Link href="/pendaftaran" className="card-actions justify-end">
                            <button className="btn btn-secondary text-primary">Rp. 35.350.000</button>
                        </Link>
                    </div>
                </div>
                <div className="card w-full bg-primary text-primary-content shadow-xl" style={{ backgroundImage: "url(/stock/mecca.png)" }}>
                    <div className="card-body bg-primary/80 rounded-2xl">
                        <h2 className="card-title">Haji Reguler</h2>
                        <p>Memungkinkan Anda untuk menjalani ibadah Haji dengan nyaman dan terorganisir. Dengan fasilitas yang memadai, paket ini memberikan pengalaman Haji yang menyeluruh. (Masa tunggu 30 tahun)</p>
                        <Link href="/pendaftaran" className="card-actions justify-end">
                            <button className="btn btn-secondary text-primary">Rp. 65.000.000</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row text-slate-800 gap-3">
                <div className="card w-full bg-primary text-primary-content shadow-xl" style={{ backgroundImage: "url(/stock/mecca2.png)" }}>
                    <div className="card-body bg-primary/80 rounded-2xl">
                        <h2 className="card-title">Haji Plus</h2>
                        <p>Tawaran yang lebih eksklusif untuk melengkapi momen ibadah Anda. Dengan tambahan fasilitas dan layanan unggulan, paket ini memberikan kenyamanan ekstra dan pengalaman Haji yang lebih mendalam. (Masa tunggu 4-7 tahun)</p>
                        <Link href="/pendaftaran" className="card-actions justify-end">
                            <button className="btn btn-secondary text-primary">Rp. 150.000.000</button>
                        </Link>
                    </div>
                </div>
                <div className="card w-full bg-primary text-primary-content shadow-xl" style={{ backgroundImage: "url(/stock/mecca.png)" }}>
                    <div className="card-body bg-primary/80 rounded-2xl">
                        <h2 className="card-title">Haji Furudah</h2>
                        <p>Pilihan paling eksklusif untuk mereka yang mencari pengalaman Haji yang sangat istimewa. Dengan fasilitas premium dan pelayanan terbaik, paket ini menghadirkan perjalanan Haji yang mewah dan tak terlupakan. (Masa tunggu 1-2 tahun)</p>
                        <Link href="/pendaftaran" className="card-actions justify-end">
                            <button className="btn btn-secondary text-primary">Rp. 300.000.000</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default function Form() {
    return (

        <div className="hero min-h-screen bg-secondary">
            <div className="hero-content w-full flex-col lg:flex-row-reverse">
                <div className="card flex-shrink-0 w-full shadow-2xl bg-primary">
                    <form action="mailto:gustipanji2006@gmail.com" method="post" encType="text/plain" className="card-body">
                        <h1 className="text-3xl text-bold">Pendaftaran</h1>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Paket Umrah</span>
                            </label>
                            <select className="select select-bordered bg-secondary placeholder-slate-400 text-slate-950" required>
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
                            <select className="select select-bordered bg-secondary placeholder-slate-400 text-slate-950" required>
                                <option>Quad</option>
                                <option>Tiple</option>
                                <option>Double</option>
                                <option>Single</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Nama Lengkap</span>
                            </label>
                            <input type="text" name="Nama" placeholder="contoh : 'Agus Budiman' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">No. KTP/NIK</span>
                            </label>
                            <input type="number" name="No. KTP/NIK" placeholder="1471110000000000" className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Tempat Lahir</span>
                            </label> 
                            <input type="text" name="Tempat Lahir" placeholder="Kota Pekanbaru" className="bg-secondary placeholder-slate-400 text-slate-950 textarea textarea-bordered" required/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Tanggal Lahir</span>
                            </label> 
                            <input type="date" name="Tanggal Lahir" placeholder="17-08-45" className="bg-secondary placeholder-slate-400 text-slate-950 textarea textarea-bordered" required/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Nama Ayah Kandung</span>
                            </label>
                            <input type="text" name="Ayah Kandung" placeholder="contoh : 'Agus Budiman' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Nomor Paspor</span>
                            </label>
                            <input type="number" name="No Paspor" placeholder="123456789" className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Paspor Berlaku sampai</span>
                            </label> 
                            <input type="date" name="Masa berlaku passpor" placeholder="17-08-45" className="bg-secondary placeholder-slate-400 text-slate-950 textarea textarea-bordered" required/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Tempat dikeluarkan paspor</span>
                            </label> 
                            <input type="text" name="Tempat paspor" placeholder="Kota Pekanbaru" className="bg-secondary placeholder-slate-400 text-slate-950 textarea textarea-bordered" required/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Tanggal dikeluarkan paspor</span>
                            </label> 
                            <input type="date" name="Tanggal dikeluarkan passpor" placeholder="17-08-45" className="bg-secondary placeholder-slate-400 text-slate-950 textarea textarea-bordered" required/>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Jenis Kelamin</span>
                            </label>
                            <select className="select select-bordered bg-secondary placeholder-slate-400 text-slate-950" required>
                                <option>Laki-laki</option>
                                <option>Perempuan</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Golongan Darah</span>
                            </label>
                            <input type="text" name="Golongan Darah" placeholder="contoh : 'O+' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required/>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Status Perkawinan</span>
                            </label>
                            <select className="select select-bordered bg-secondary placeholder-slate-400 text-slate-950" required>
                                <option>Menikah</option>
                                <option>Cerai</option>
                                <option>Belum Menikah</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Nama Ahli Waris</span>
                            </label>
                            <input type="text" name="Ahli Waris" placeholder="contoh : 'Dewi Septiana' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Hubungan Ahli Waris</span>
                            </label>
                            <input type="text" name="Hubungan Ahli Waris" placeholder="contoh : 'Anak' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required/>
                        </div>
                        
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Alamat Tempat Tinggal</span>
                            </label>
                            <input type="text" name="Alamat Tempat Tinggal" placeholder="contoh : 'Jl. Kaharuddin Nst No.40, Simpang Tiga, Kec. Bukit Raya, Kota Pekanbaru, Riau' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">E-mail</span>
                            </label>
                            <input type="email" name="Email" placeholder="contoh : 'alharom@gmail.com' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">No. Telp/ No. HP/No. WhatsApp</span>
                            </label>
                            <input type="email" name="Nomor Telepon" placeholder="contoh : '0813-5632-4299' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required/>
                        </div>

                        <div className="form-control mt-6">
                        <input type="submit" value='Kirim' className="btn btn-secondary"></input>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}
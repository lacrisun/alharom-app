import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default async function Login() {
    
    return (
        <>
        
        <Navbar />


        <div className="hero min-h-screen bg-secondary">
            <div className="hero-content w-full flex-col lg:flex-row-reverse">
                <div className="card flex-shrink-0 w-full shadow-2xl bg-primary">
                    <form className="card-body">
                        <h1 className="text-3xl text-bold">Login Mentor</h1>
                        <h1 className="text-xl text-normal">Hanya untuk karyawan Al-Harom Bina Hati</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="Password" placeholder="Masukkan email' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="Password" placeholder="Masukkan password' " className="bg-secondary placeholder-slate-400 text-slate-950 input input-bordered" required/>
                        </div>
                        <input type="submit" value='Mengirim...' className="btn btn-secondary mt-5"></input>
                    </form>
                </div>
            </div>
        </div>

        <Footer/>
        </>
    )
}
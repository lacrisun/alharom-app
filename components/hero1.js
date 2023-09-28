import Image from "next/image"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function HeroSatu() {
    return (

    <div className="hero min-h-screen" style={{backgroundImage: 'url(/hajjstock1.png)'}}>
        <div className="hero-overlay bg-opacity-50"></div>
            <div className="hero-content text-center text-white">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Tuntut impian, Abadikan kenangan.</h1>
                    <p className="mb-5 text-xl">Bersama kami, Anda dapat menjalankan ibadah haji dengan lancar dan penuh kedamaian. Bergabunglah dengan ratusan jemaah yang telah menjalani pengalaman suci bersama kami. Hubungi kami sekarang dan mulailah perjalanan suci anda menuju Mekkah.</p>
                    <Link href="/program&paket" className="btn btn-primary">Saya ingin daftar</Link>
                </div>
            </div>
    </div>

    )
}
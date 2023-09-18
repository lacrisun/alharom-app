import Image from "next/image"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function HeroDua() {
    return (
        <div id="aboutsection" className="hero min-h-screen bg-secondary">
            <div className="hero-content text-slate-800 flex-col lg:flex-row-reverse">
                <img src="/staffalharom.jpg" className="max-w-sm rounded-lg shadow-2xl my-5" />
                    <div>
                    <h1 className="text-5xl font-bold">Tentang Kami</h1>
                    <p className="py-6">Kami, PT INDO MITRA ALHAROM, dengan bangga menghadirkan diri sebagai penyelenggara jasa Umrah & Haji terpercaya. Dedikasi kami tak tergoyahkan dalam memberikan fasilitas pelayanan yang sepenuhnya difokuskan pada kepuasan dan kenyamanan jamaah kami.</p>
                </div>
            </div>
        </div>
    )
}
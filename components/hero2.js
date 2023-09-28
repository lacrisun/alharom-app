import Image from "next/image"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function HeroDua() {
    return (
        <div id="aboutsection" className="hero min-h-screen bg-secondary">
            <div className="w-full p-10 text-slate-800 flex-col text-center lg:flex-row-reverse">
                <div className="flex justify-center">
                    <img src="/staffalharom.jpg" className="w-full md:max-w-xl rounded-lg shadow-2xl my-5 " />
                </div>
                    <div>
                        <h1 className="text-5xl font-bold">Tentang Kami</h1>
                        <p className="text-xl py-6">Kami, PT INDO MITRA ALHAROM, dengan bangga dan penuh semangat, senantiasa berkomitmen tinggi sebagai penyelenggara jasa Umrah & Haji terpercaya yang dikenal atas dedikasi tak tergoyahkan kami. Selama perjalanan panjang kami, kami telah meneguhkan tekad kami untuk menyediakan fasilitas pelayanan yang sepenuhnya berorientasi pada kepuasan dan kenyamanan jamaah kami, sehingga menjadikan pengalaman ibadah mereka tak terlupakan.</p>
                    </div>
            </div>
        </div>
    )
}
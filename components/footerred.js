import { faFacebook, faInstagram, faWhatsapp, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export default function FooterRed() {
    return (
        <footer className="footer p-10 bg-primary text-secondary font-bold">
            <aside>
                <Image 
                    src="/normallogo.jpg"
                    width={150}
                    height={150}
                    alt="Al-Harom Bina Hati"
                />
                <p>PT INDO MITRA ALHAROM<br/>Penyelenggara Haji & Umrah #1 di Riau</p>
                <div className="flex gap-1">
                    <Image 
                        src="/pastiumrah.jpg"
                        width={45}
                        height={20}
                        alt="5 Pasti Umrah"
                        className="self-center"
                    />
                    <Image 
                        src="/siskopatuh.jpg"
                        width={45}
                        height={30}
                        alt="Sisko Patuh"
                        className="self-center"
                    />
                    <Image 
                        src="/iata.jpg"
                        width={45}
                        height={20}
                        alt="IATA Certified"
                        className="self-center"
                    />
                    <Image 
                        src="/asita.jpg"
                        width={45}
                        height={20}
                        alt="ASITA"
                        className="self-center"
                    />
                    <Image 
                        src="/himpuh.jpg"
                        width={45}
                        height={20}
                        alt="Himpuh"
                        className="self-center"
                    />
                </div>
            </aside> 
            <nav>
                <header className="footer-title">Social</header> 
                <div className="grid grid-flow-col gap-4">
                    <a href="http://facebook.com/alharomofficial" ><FontAwesomeIcon icon={faFacebook} size="2xl"/></a> 
                    <a href="https://wa.me/6281361126363?text=Assalamualaikum%20saya%20ingin%20mengetahui%20program%20keberangkatan%20umroh%20dan%20haji%20alharom%20bina%20hati"><FontAwesomeIcon icon={faWhatsapp} size="2xl"/></a> 
                    <a href="https://www.youtube.com/channel/UC_3bXPoXK-pwStwnKW7Z78A"><FontAwesomeIcon icon={faYoutube} size="2xl"/></a>
                    <a href="https://www.instagram.com/alharom_official/"><FontAwesomeIcon icon={faInstagram} size="2xl"/></a>
                </div>
                <header className="footer-title mt-2">Alamat</header> 
                <div className="grid grid-flow-col gap-4">
                    <p>Jl. Kaharuddin Nst No.40, RW.57,<br/>Simpang Tiga, Kec. Bukit Raya,<br/>Kota Pekanbaru, Riau 28288</p>
                </div>
            </nav>
        </footer>
    )
}
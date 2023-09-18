import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function HeroTiga() {
    return (

        <div className="hero min-h-screen bg-primary" style={{ backgroundImage: 'url(/kabah.png)' }}>
            <div className="hero-overlay bg-primary/90">
                <div className="w-full p-3 my-3 justify-start">
                    <div>
                        <h1 className="text-5xl font-bold my-2">Pertanyaan terkait</h1>
                        <div className="collapse mt-2 collapse-arrow bg-secondary">
                            <input type="checkbox" name="my-accordion-2" /> 
                            <div className="collapse-title text-xl font-medium text-black">
                                Apa saja yang perlu dibawa saat melaksanakan umrah?
                            </div>
                            <div className="collapse-content text-black"> 
                                <p>Saat melaksanakan umrah, ada beberapa barang yang perlu Anda bawa. Beberapa barang yang penting termasuk pakaian ihram, perlengkapan mandi, sandal, tas kecil untuk menyimpan barang berharga, dan dokumen identitas yang diperlukan. Pastikan Anda membawa perlengkapan yang cukup untuk memenuhi kebutuhan selama perjalanan umrah.</p>
                            </div>
                        </div>
                        <div className="collapse mt-2 collapse-arrow bg-secondary">
                            <input type="checkbox" name="my-accordion-2" /> 
                            <div className="collapse-title text-xl font-medium text-black">
                                Apa saja syarat umrah yang perlu dipenuhi?
                            </div>
                            <div className="collapse-content text-black"> 
                                <p>Beberapa syarat umrah yang perlu dipenuhi adalah mencapai usia dewasa mulai dari umur 18 tahun, dan memiliki kemampuan fisik serta finansial untuk melaksanakan perjalanan. Selain itu, Anda juga harus memiliki paspor yang masih berlaku dan mengurus visa umrah. Pastikan Anda memenuhi semua persyaratan yang ditetapkan sebelum melaksanakan umrah.</p>
                            </div>
                        </div>
                        <div className="collapse mt-2 collapse-arrow bg-secondary">
                            <input type="checkbox" name="my-accordion-2" /> 
                            <div className="collapse-title text-xl font-medium text-black">
                                Apakah keberangkatan memerlukan transit terlebih dahulu?
                            </div>
                            <div className="collapse-content text-black"> 
                                <p>Tidak, maskapai kami langsung dari Pekanbaru - Jeddah/Madinah</p>
                            </div>
                        </div>
                        <div className="collapse mt-2 collapse-arrow bg-secondary">
                            <input type="checkbox" name="my-accordion-2" /> 
                            <div className="collapse-title text-xl font-medium text-black">
                                Apakah bisa melakukan umrah dengan visa selain visa umrah?
                            </div>
                            <div className="collapse-content text-black"> 
                                <p>Bisa bagi pemegang visa kunjungan, pariwisata, kerja dapat melakukan ibadah umrah</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
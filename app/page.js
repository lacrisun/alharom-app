import Footer from '@/components/footer'
import HeroSatu from '@/components/hero1'
import HeroDua from '@/components/hero2'
import HeroTiga from '@/components/hero3'
import Navbar from '@/components/navbar'
import Image from 'next/image'

export default function Home() {
  return (
    <>

      <Navbar />
      <HeroSatu />
      <HeroDua />
      <HeroTiga />
      <Footer /> 

    </>
  )
}

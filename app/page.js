import Footer from '@/components/footer'
import HeroSatu from '@/components/hero1'
import HeroDua from '@/components/hero2'
import HeroTiga from '@/components/hero3'
import NavbarLoggedIn from '@/components/loggedin/navbar'
import Navbar from '@/components/navbar'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Image from 'next/image'

export default async function Home() {

  const session = await getServerSession(authOptions)
  console.log(session)

  return (
    <>

      {session ? <NavbarLoggedIn profilepic={session.user.username}/> : <Navbar />}
      <HeroSatu />
      <HeroDua />
      <HeroTiga />
      <Footer /> 

    </>
  )
}

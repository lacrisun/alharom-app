import Footer from '@/components/footer'
import HeroSatu from '@/components/hero1'
import HeroDua from '@/components/hero2'
import HeroTiga from '@/components/hero3'
import NavbarLoggedIn from '@/components/loggedin/navbar'
import Navbar from '@/components/navbar'
import { authOptions } from '@/lib/auth'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getServerSession } from 'next-auth'

export default async function Home() {

  const session = await getServerSession(authOptions)
  console.log(session)

  return (
    <>

      {session ? <NavbarLoggedIn profilepic={session.user.username} admin={session.user.role} /> : <Navbar />}
      <HeroSatu />
      <HeroDua />
      <HeroTiga />
      <Footer />
      <div className="toast toast-end z-30 items-center">
        <div className="flex bg-primary rounded-xl text-white hover:scale-105 transition-transform duration-300">
          <a href="https://wa.me/6281361126363?text=Assalamualaikum%20saya%20ingin%20mengetahui%20program%20keberangkatan%20umroh%20dan%20haji%20alharom%20bina%20hati">
            <span className='flex m-4'>
              <FontAwesomeIcon icon={faWhatsapp} className='self-center' size='2xl' />
            </span>
          </a>
        </div>
      </div>

    </>
  )
}

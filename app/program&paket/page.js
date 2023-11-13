import Footer from "@/components/footer";
import FooterRed from "@/components/footerred";
import HeroProg from "@/components/heroprogram";
import NavbarLoggedIn from "@/components/loggedin/navbar";
import Navbar from "@/components/navbar";
import Paket from "@/components/paketpaket";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function ProgramPaket () {

    const session = await getServerSession(authOptions)
    console.log(session)

    return (

        <>
        {session ? <NavbarLoggedIn profilepic={session.user.username} admin={session.user.role}/> : <Navbar />}
        <HeroProg />
        <Paket />
        <Footer />
        </>

    )
}
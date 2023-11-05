'use client'

import AdminNav from "@/components/admincomponents/adminnavbar";
import Dashboard from "@/components/admincomponents/dashboard";
import LoadingPage from "@/components/loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Admin() {
    const router = useRouter()
    const {data: session, status} = useSession()

    const adminRole = session?.user.isadmin

    useEffect(() => {
        if (!adminRole) {
            return (
                router.push('/')
            )

        }
    }, [adminRole])

    if (status === 'loading') {
        return (
            <LoadingPage />
        )
    }
    return (
        <>
        
        <h1>tes</h1>

        </>
    )

}
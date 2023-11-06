'use client'

import AdminNav from "@/components/admincomponents/adminnavbar";
import Dashboard from "@/components/admincomponents/dashboard";
import LoadingPage from "@/components/loading";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Admin() {
    const router = useRouter()
    const {data: session, status} = useSession()

    const adminRole = session?.user.isadmin

    if (status === 'loading') {
        return (
            <LoadingPage />
        )
    }
    if (adminRole) {
        return (
            <>
            
            <h1>Hai semua!</h1>
            
            </>
        )
    }
    return (
        redirect('/')
    )

}
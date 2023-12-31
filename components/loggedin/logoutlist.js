"use client"

import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { signOut } from "next-auth/react"

export default function LogoutList() {
    return (
        <li><a onClick={() => signOut()} className="text-white hover:bg-neutral"><i><FontAwesomeIcon icon={faRightFromBracket} /></i>Keluar</a></li>
    )
}
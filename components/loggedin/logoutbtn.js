"use client"

import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { signOut } from "next-auth/react"

export default function LogoutBtn() {
    return (
        <li><button onClick={() => signOut()} className="btn btn-primary"><i><FontAwesomeIcon icon={faRightFromBracket}></FontAwesomeIcon></i>Keluar</button></li>
    )
}
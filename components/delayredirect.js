import { useRouter } from "next/router";
import { useEffect } from "react";

const router = useRouter()

export default function DelayRedirect(delay) {
    function DelayRedirect() {
        useEffect(() => {
            const timeoutId = setTimeout(() => {
                router.push('/')
            }, delay);
            return clearTimeout(timeoutId)
        }, [])
    }
}
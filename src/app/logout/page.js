"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {
        const logout = async () => {
            try {
                await axios.get('/api/logout');
                router.push('/login');
            } catch (err) {
                console.log(err.message);
            }
        };

        logout();
    }, [router]);

    return <div>Logging out...</div>;
}
``

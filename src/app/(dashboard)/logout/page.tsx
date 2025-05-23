"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";

function LogoutPage() {
    useEffect(() => {
        const logout = async () => {
            Cookies.remove("auth.sms", { domain: ".at-tahfiz-international-madrasha.com", secure: true, sameSite: "none" });
            Cookies.remove("user.sms");
            window.location.href = "/login";
            // try {
            //     const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/authentication/logout`, {
            //         method: "GET",
            //         credentials: "include",
            //     });

            //     if (res.status === 200) {
            //         Cookies.get("user.sms");
            //         window.location.href = "/login"; 
            //     }

            // } catch (error) {
            //     console.error("Logout failed:", error);
            // }
        };

        logout();
    }, []);
    return (
        <div className="flex items-center justify-center min-h-screen">
            <h1 className="text-lg font-semibold">Logging out...</h1>
        </div>
    );
}

export default LogoutPage;

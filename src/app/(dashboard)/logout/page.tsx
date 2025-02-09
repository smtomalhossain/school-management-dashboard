"use client";

import { useEffect } from "react";

function LogoutPage() {
    useEffect(() => {
        const logout = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/authentication/logout`, {
                    method: "GET",
                    credentials: "include",
                });

                if (res.status === 200) {
                    localStorage.removeItem("user.sms");
                    window.location.href = "/login"; 
                }

            } catch (error) {
                console.error("Logout failed:", error);
            }
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

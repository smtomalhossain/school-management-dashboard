import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { SCHOOL_ADMIN } from "./lib/roles";
// import Cookies from "js-cookie";

export async function middleware(req: NextRequest) {
    //
    let devMode = false;

    if (devMode) {
        const res = NextResponse.next();
        res.cookies.set("user.sms", JSON.stringify({
            "id": 5,
            "username": "mokbul",
            "role": SCHOOL_ADMIN
        }));
        return res;
    }

    let isAuthenticated = false;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/authentication/get-user`,
            {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: req.headers.get("cookie") || "",
                    // "authorization": "Bearer " + req.cookies.get("auth.sms")
                }
            }
        );

        if (res.status === 200) {
            isAuthenticated = true;
        }
    } catch (error) {
        console.log(error);
    }

    const isLoginRoute = req.nextUrl.pathname === "/login";
    const isBaseRoute = req.nextUrl.pathname === "/";

    if (isAuthenticated && (isLoginRoute || isBaseRoute)) {
        return NextResponse.redirect(new URL("/admin", req.nextUrl.origin));
    }

    if (!isAuthenticated && !isLoginRoute) {
        return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
    }

    return NextResponse.next();

}

export const config = {
    matcher: ["/((?!_next/static|_next/image|images|favicon.ico|.*\\..*).*)"],
};
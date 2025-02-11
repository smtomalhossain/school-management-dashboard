import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {

    var isAuthenticated = false;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/authentication/get-user`,
            {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: req.headers.get("cookie") || "",
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
        return NextResponse.redirect(new URL("/admin", 'http://localhost:3000'));
    }

    if (!isAuthenticated && !isLoginRoute) {
        return NextResponse.redirect(new URL("/login", "http://localhost:3000"));
    }

    // return NextResponse.next();

}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";

export async function middleware(req: NextRequest) {
    console.log('------------------' + req.nextUrl.pathname);
    // add cookie to request
    const res = await axios("http://localhost:3001/api/authentication/get-user",
        {
            headers: {
                Cookie: req.headers.get("cookie") || "",
            },
        }
    );
    console.log(res.status);
    if (res.status === 401) {
        return NextResponse.redirect(new URL("/login", 'http://localhost:3000'));
    }
    return NextResponse.next(); // Allow access if authenticated
}

export const config = {
    matcher: ["/((?!login|_next/static|_next/image|favicon.ico).*)"],
};
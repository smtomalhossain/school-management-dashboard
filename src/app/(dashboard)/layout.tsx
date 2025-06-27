"use client";

import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Define the routes where you want to hide Menu and Navbar
  const isAuthPage = pathname === "/login" || pathname === "/register";

  return (
    <div className="h-screen flex">
      <ToastContainer />
      {/* LEFT */}
      {!isAuthPage && (
        <div className="hidden lg:block lg:w-[16%] xl:w-[16%] bg-white-200 p-4 overflow-scroll">
          <Link href="/admin" className="flex items-center justify-center lg:justify-start gap-2">
            <Image src="/logo.png" alt="logo" width={32} height={32} />
            <span className="hidden lg:block font-bold">EduKit</span>
          </Link>
          <Menu />
        </div>
      )}
      {/* RIGHT */}
      <div
        className={`w-full ${!isAuthPage ? "lg:w-[84%] xl:w-[84%]" : ""} bg-[#F7F8FA] overflow-scroll flex flex-col`}
      >
        {!isAuthPage && <Navbar />}
        {children}
      </div>
    </div>
  );
}

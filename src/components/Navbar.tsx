"use client"

import Image from "next/image";
import React, { useState } from "react";
import ProfileDropdownMenu from "@/components/ProfileDropdownMenu";
import Link from "next/link";
import NotificationDropdown from "./DropdownAnnouncements";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import Menu from "./Menu";



function Navbar() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen)
    console.log("IT is work")
  }
  return (
    <div className="  flex items-center justify-between p-4">
      {/* SEARCH BAR */}
      <div className="flex items-center gap-5 justify-start w-full">
        <GiHamburgerMenu onClick={handleClick} className="text-3xl lg:hidden cursor-pointer text-gray-500" />
        <div className="flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
          <Image src="/search.png" alt="" width={14} height={14} />
          <input
            type="text"
            placeholder="Search..."
            className="w-[150px] md:w-[300px] p-2 bg-transparent outline-none"
          />
        </div>
      </div>

      {/* ICONS AND USER */}
      <div className="gap-2 flex items-center md:gap-5  justify-end w-full">
        <Link href="/list/messages">
          <div className="hidden bg-white rounded-full w-7 h-7 lg:flex items-center justify-center cursor-pointer hover:bg-gray-200">
            <Image src="/message.png" alt="" width={20} height={20} />
          </div>
        </Link>
        {/* <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative hover:bg-gray-200">
          <Image src="/announcement.png" alt="" width={20} height={20} />
          <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs">
            3
          </div>
        </div> */}
        <NotificationDropdown />
        {/* <div className='flex flex-col'>
                <span className='text-xs leading-3 font-medium'>Tom Hossen</span>
                <span className='text-[10px] text-gray-500 text-right'>Admin</span>
            </div>
            <Image src="/avatar.png" alt='' width={36} height={36} className='rounded-full'/> */}
        <ProfileDropdownMenu />
      </div>
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={handleClick}>
          <div className="fixed left-0 top-0 h-full bg-white w-64 shadow-lg p-4 overflow-scroll" onClick={(e) => e.stopPropagation()}>
            {/* Close Icon */}
            <div className="flex justify-between ">

              <div className="bg-white-200">
                <Link href="/admin" className="flex items-center justify-start gap-2">
                  <Image src="/logo.png" alt="logo" width={32} height={32} />
                  <span className="font-bold">EduKit</span>
                </Link>
              </div>
              <button
                onClick={handleClick}
                className="text-gray-600 hover:text-gray-900"
              >
                <AiOutlineClose className="text-2xl" />
              </button>
            </div>

            <Menu />
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;

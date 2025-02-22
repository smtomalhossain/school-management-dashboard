"use client";

import Image from "next/image";
import React, { useState } from "react";

const ProfileDropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");

  

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        id="dropdownAvatarNameButton"
        onClick={toggleDropdown}
        className="flex items-center gap-2 text-sm pe-1 font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 "
        type="button"
      >
        <span className="sr-only">Open user menu</span>
        <div className='flex flex-col'>
                <span className='text-xs leading-3 font-medium'>Tom Hossen</span>
                <span className='text-[10px] text-gray-500 text-right'>Admin</span>
            </div>
        <Image
          width={36}
          height={36}
          className="w-8 h-8 me-2 rounded-full"
          src="/avatar.png"
          alt="user photo"
        />
        
      </button>

      {isOpen && (
        <div
          id="dropdownAvatarName"
          className="z-10 absolute right-0 mt-2 bg-white rounded-lg w-44 ring-1 ring-gray-100"
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <a
                href="/admin"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/profile"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Profile
              </a>
            </li>
          </ul>
          <div className="py-2">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Sign out
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdownMenu;

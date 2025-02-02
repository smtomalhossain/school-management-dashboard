"use client"

import { useState, useEffect } from 'react'; // Importing useState to manage state
// import { role } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Importing up and down icons
import React from 'react';
import { menuItems } from '@/lib/menuData';
import { SCHOOL_ADMIN } from '@/lib/roles';


const Menu = () => {
  const [isAccountingOpen, setIsAccountingOpen] = useState(false);

  const toggleAccounting = () => setIsAccountingOpen(prev => !prev);
  
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    // Ensure this runs only on the client side
    const user = localStorage.getItem("user.sms");
    const role = user ? JSON.parse(user).role : null;
    setRole(role);
  }, []);


  return (
    <div className='mt-4 text-sm'>
      {menuItems.map((i) => (
        <div className='flex flex-col gap-2' key={i.title}>
          <span className='hidden lg:block text-gray-400 font-light my-4'>{i.title}</span>
          {i.items.map(item => {
            // Render accounting with nested links and open/close functionality
            if (item.label === "Accounting") {
              return (
                <div key={item.label}>
                  {/* Accounting link with click functionality */}
                  <div
                    className={`flex items-center justify-between cursor-pointer ${isAccountingOpen ? 'bg-tomSkyLight' : ''}`}
                    onClick={toggleAccounting}
                  >
                    <div className='flex items-center gap-4'>
                      <Image src={item.icon} alt='' width={20} height={20} />
                      <span className='hidden lg:block text-gray-500'>{item.label}</span>
                    </div>
                    {/* Up/Down icon */}
                    <span className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-0 rounded-md hover:bg-tomSkyLight">
                      {isAccountingOpen ? <FaChevronUp /> : <FaChevronDown />}
                    </span>
                  </div>
                  {/* Nested links */}
                  {isAccountingOpen && item.nested && (
                    <div className='pl-2 pt-2'>
                      {item.nested.map(subItem => {
                        if (subItem.visible.includes(role)) {
                          return (
                            <>
                              <div className='w-full'>
                                <Link href={subItem.href} key={subItem.label} className='flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-0 rounded-md hover:bg-tomSkyLight'>
                                  <Image className='' src={subItem.icon} alt='' width={16} height={16} />
                                  <span className='hidden lg:block'>{subItem.label}</span>
                                </Link>
                              </div>
                            </>
                          );
                        }
                      })}
                    </div>
                  )}
                </div>
              );
            } else {
              // Regular item rendering
              if (item.visible.includes(role)) {
                return (
                  <Link href={item.href} key={item.label} className='flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-0 rounded-md hover:bg-tomSkyLight'>
                    <Image src={item.icon} alt='' width={20} height={20} />
                    <span className='hidden lg:block'>{item.label}</span>
                  </Link>
                );
              }
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;

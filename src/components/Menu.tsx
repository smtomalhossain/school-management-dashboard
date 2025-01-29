"use client"

import { useState } from 'react'; // Importing useState to manage state
import { role } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Importing up and down icons
import React from 'react';

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/super-admin.png",
        label: "Super Admin",
        href: "/superadmin",
        visible: ["admin"],
      },
      {
        icon: "/home.png",
        label: "Home",
        href: "/admin",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/teacher.png",
        label: "Teachers",
        href: "/list/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/student.png",
        label: "Students",
        href: "/list/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/parent.png",
        label: "Parents",
        href: "/list/parents",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/subject.png",
        label: "Subjects",
        href: "/list/subjects",
        visible: ["admin"],
      },
      {
        icon: "/class.png",
        label: "Classes",
        href: "/list/classes",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/lesson.png",
        label: "Lessons",
        href: "/list/lessons",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/exam.png",
        label: "Exams",
        href: "/list/exams",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/assignment.png",
        label: "Assignments",
        href: "/list/assignments",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/result.png",
        label: "Results",
        href: "/list/results",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/attendance.png",
        label: "Attendance",
        href: "/list/attendance",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/accounting.png",
        label: "Accounting",
        href: "/list/accounting",
        visible: ["admin"],
        nested: [
          {
            icon: "/fees.png",
            label: "Fees Collection",
            href: "/list/accounting/fees-collection",
            visible: ["admin"],
          },
          {
            icon: "/expense.png",
            label: "Expenses",
            href: "/list/accounting/expenses",
            visible: ["admin"],
          }
        ],
      },
      {
        icon: "/calendar.png",
        label: "Events",
        href: "/list/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/message.png",
        label: "Messages",
        href: "/list/messages",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/announcement.png",
        label: "Announcements",
        href: "/list/announcements",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

const Menu = () => {
  const [isAccountingOpen, setIsAccountingOpen] = useState(false); // State to manage the open/close status of Accounting

  const toggleAccounting = () => setIsAccountingOpen(prev => !prev); // Function to toggle the Accounting section

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
                            <div className='bg-tomPurple w-full'>
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

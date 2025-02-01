"use client"

import { useState, useEffect } from 'react'; // Importing useState to manage state
// import { role } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Importing up and down icons
import React from 'react';
import { CENTRAL_ADMIN, PARENT, SCHOOL_ADMIN, STUDENT, TEACHER } from '@/lib/roles';

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/super-admin.png",
        label: "Super Admin",
        href: "/superadmin",
        visible: [CENTRAL_ADMIN],
      },
      {
        icon: "/home.png",
        label: "Home",
        href: "/admin",
        visible: [SCHOOL_ADMIN, TEACHER, STUDENT, PARENT],
      },
      {
        icon: "/teacher.png",
        label: "Teachers",
        href: "/list/teachers",
        // visible: ["admin", "teacher"],
        visible: [SCHOOL_ADMIN, TEACHER],
      },
      {
        icon: "/student.png",
        label: "Students",
        href: "/list/students",
        // visible: ["admin", "teacher"],
        visible: [SCHOOL_ADMIN, TEACHER],
      },
      {
        icon: "/parent.png",
        label: "Parents",
        href: "/list/parents",
        // visible: ["admin", "teacher"],
        visible: [SCHOOL_ADMIN, TEACHER],
      },
      {
        icon: "/subject.png",
        label: "Subjects",
        href: "/list/subjects",
        // visible: ["admin"],
        visible: [SCHOOL_ADMIN],
      },
      {
        icon: "/class.png",
        label: "Classes",
        href: "/list/classes",
        // visible: ["admin", "teacher"],
        visible: [SCHOOL_ADMIN, TEACHER],
      },
      {
        icon: "/lesson.png",
        label: "Lessons",
        href: "/list/lessons",
        // visible: ["admin", "teacher"],
        visible: [SCHOOL_ADMIN, TEACHER],
      },
      {
        icon: "/exam.png",
        label: "Exams",
        href: "/list/exams",
        // visible: ["admin", "teacher", "student", "parent"],
        visible: [SCHOOL_ADMIN, TEACHER, STUDENT, PARENT],
      },
      {
        icon: "/assignment.png",
        label: "Assignments",
        href: "/list/assignments",
        // visible: ["admin", "teacher", "student", "parent"],
        visible: [SCHOOL_ADMIN, TEACHER, STUDENT, PARENT],
      },
      {
        icon: "/result.png",
        label: "Results",
        href: "/list/results",
        // visible: ["admin", "teacher", "student", "parent"],
        visible: [SCHOOL_ADMIN, TEACHER, STUDENT, PARENT],
      },
      {
        icon: "/attendance.png",
        label: "Attendance",
        href: "/list/attendance",
        // visible: ["admin", "teacher", "student", "parent"],
        visible: [SCHOOL_ADMIN, TEACHER, STUDENT, PARENT],
      },
      {
        icon: "/accounting.png",
        label: "Accounting",
        href: "/list/accounting",
        // visible: ["admin"],
        visible: [SCHOOL_ADMIN],
        nested: [
          {
            icon: "/fees.png",
            label: "Fees Collection",
            href: "/list/accounting/fees-collection",
            // visible: ["admin"],
            visible: [SCHOOL_ADMIN],
          },
          {
            icon: "/expense.png",
            label: "Expenses",
            href: "/list/accounting/expenses",
            // visible: ["admin"],
            visible: [SCHOOL_ADMIN],
          }
        ],
      },
      {
        icon: "/calendar.png",
        label: "Events",
        href: "/list/events",
        // visible: ["admin", "teacher", "student", "parent"],
        visible: [SCHOOL_ADMIN, TEACHER, STUDENT, PARENT],
      },
      {
        icon: "/message.png",
        label: "Messages",
        href: "/list/messages",
        // visible: ["admin", "teacher", "student", "parent"],
        visible: [SCHOOL_ADMIN, TEACHER, STUDENT, PARENT],
      },
      {
        icon: "/announcement.png",
        label: "Announcements",
        href: "/list/announcements",
        // visible: ["admin", "teacher", "student", "parent"],
        visible: [SCHOOL_ADMIN, TEACHER, STUDENT, PARENT],
      },
      {
        icon: "/web-3.png",
        label: "Website Setting",
        href: "/website-setting",
        // visible: ["admin"],
        visible: [SCHOOL_ADMIN],
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
        // visible: ["admin", "teacher", "student", "parent"],
        visible: [SCHOOL_ADMIN, TEACHER, STUDENT, PARENT],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        // visible: ["admin", "teacher", "student", "parent"],
        visible: [SCHOOL_ADMIN, TEACHER, STUDENT, PARENT],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        // visible: ["admin", "teacher", "student", "parent"],
        visible: [SCHOOL_ADMIN, TEACHER, STUDENT, PARENT],
      },
    ],
  },
];

const Menu = () => {
  const [isAccountingOpen, setIsAccountingOpen] = useState(false); // State to manage the open/close status of Accounting

  const toggleAccounting = () => setIsAccountingOpen(prev => !prev); // Function to toggle the Accounting section

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

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { menuItems } from "@/lib/menuData";
import Cookies from "js-cookie";

const Menu = () => {
  const [role, setRole] = useState<string>('');
  const [openSection, setOpenSection] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = Cookies.get("user.sms");
      const storedRole: string = user ? JSON.parse(user).role : '';
      setRole(storedRole);
    }
  }, []);

  const toggleSection = (section: string) => {
    setOpenSection(prev => (prev === section ? null : section));
  };

  console.log(role);

  // if (!role) return null; // Prevent rendering if role is not set

  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {i.title}
          </span>
          {i.items.map((item) => {
            const isOpen = openSection === item.label;

            if (item.nested) {
              return (
                <div key={item.label}>
                  <div
                    className={`flex items-center justify-between cursor-pointer ${isOpen ? "bg-tomSkyLight" : ""
                      }`}
                    onClick={() => toggleSection(item.label)}
                  >
                    <div className="flex items-center gap-4">
                      <Image src={item.icon} alt="" width={20} height={20} />
                      <span className="hidden lg:block text-gray-500">
                        {item.label}
                      </span>
                    </div>
                    <span className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-0 rounded-md hover:bg-tomSkyLight">
                      {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                    </span>
                  </div>
                  {isOpen && (
                    <div className="pl-2 pt-2">
                      {item.nested.map((subItem) => (
                        subItem.visible.includes(role) && (
                          <div className="w-full" key={subItem.label}>
                            <Link
                              href={subItem.href}
                              className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-0 rounded-md hover:bg-tomSkyLight"
                            >
                              <Image src={subItem.icon} alt="" width={16} height={16} />
                              <span className="hidden lg:block">
                                {subItem.label}
                              </span>
                            </Link>
                          </div>
                        )
                      ))}
                    </div>
                  )}
                </div>
              );
            } else if (item.visible.includes(role)) {
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-0 rounded-md hover:bg-tomSkyLight"
                >
                  <Image src={item.icon} alt="" width={20} height={20} />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
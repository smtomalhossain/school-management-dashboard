"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { menuItems } from "@/lib/menuData";
import Cookies from "js-cookie";

const Menu = () => {
  const [role, setRole] = useState<string>("");
  const [openSection, setOpenSection] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const user = Cookies.get("user.sms");
    const storedRole = user ? JSON.parse(user).role : "";
    setRole(storedRole);
  }, []);

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  if (!role) return null;

  return (
    <div className="mt-6 px-3 text-sm">
      {menuItems.map((group) => (
        <div key={group.title} className="mb-6">
          <h4 className="text-xs text-gray-400 font-semibold px-2 mb-2 uppercase">
            {group.title}
          </h4>

          {group.items.map((item) => {
            const isOpen = openSection === item.label;

            // Nested item group
            if (item.nested && item.visible.includes(role)) {
              return (
                <div key={item.label} className="mb-2">
                  <div
                    onClick={() => toggleSection(item.label)}
                    className={`flex items-center justify-between cursor-pointer px-3 py-2 rounded-md hover:bg-gray-100 transition ${
                      isOpen ? "bg-gray-100" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3 text-gray-600">
                      <Image src={item.icon} alt="" width={20} height={20} />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </div>

                  {isOpen && (
                    <div className="ml-6 mt-1 flex flex-col gap-1">
                      {item.nested.map(
                        (subItem) =>
                          subItem.visible.includes(role) && (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              className={`flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 transition ${
                                pathname === subItem.href
                                  ? "bg-blue-100 text-blue-700 font-medium"
                                  : "text-gray-500"
                              }`}
                            >
                              <Image
                                src={subItem.icon}
                                alt=""
                                width={16}
                                height={16}
                              />
                              <span>{subItem.label}</span>
                            </Link>
                          )
                      )}
                    </div>
                  )}
                </div>
              );
            }

            // Regular menu item
            if (item.visible.includes(role)) {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition ${
                    isActive
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : "text-gray-600"
                  }`}
                >
                  <Image src={item.icon} alt="" width={20} height={20} />
                  <span>{item.label}</span>
                </Link>
              );
            }

            return null;
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;

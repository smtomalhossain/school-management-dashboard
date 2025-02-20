"use client";

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { SCHOOL_ADMIN } from "@/lib/roles";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Cookies from "js-cookie";


type Teacher = {
  id: number;
  teacherId: string;
  name: string;
  email?: string;
  image: string;
  phone: string;
  subjects: string[];
  classes: string[];
  address: string;
};

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Teacher ID",
    accessor: "teacherId",
    className: "hidden lg:table-cell md:hidden",
  },
  {
    header: "Subjects",
    accessor: "subjects",
    className: "hidden md:table-cell",
  },
  {
    header: "Classes",
    accessor: "classes",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell md:hidden",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell md:hidden",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

const TeachersListPage = () => {
  const [role, setRole] = useState<string>("");
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    const user = Cookies.get("user.sms");
    const role = user ? JSON.parse(user).role : null;
    setRole(role);
  }, []);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/teachers/by-school`, {
          method: "GET",
          credentials: "include",
        });

        if (res.status === 200) {
          const j = await res.json();
          const data = j.data;
          console.log(data);
          var schoolList: Teacher[] = data.map((item: any) => {
            const teacher: Teacher = {
              id: item.id,
              teacherId: item.id,
              name: item.name,
              email: item.email,
              image: item.image && `http://localhost:9000/profile-pictures/${item.image}`,
              phone: item.phone,
              subjects: item.subjects?.length > 0 ? item.subjects.map((subject: any) => subject.name) : ["No Subjects"],
              classes: item.classes?.length > 0 ? item.classes.map((classItem: any) => classItem.name) : ["No Classes"],
              address: item.address,
            };
            return teacher;
          });

          setTeachers(schoolList);
        } else {
          console.error("Failed to fetch schools");
        }
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    };

    fetchTeachers();
  }, []);

  const renderRow = (item: Teacher) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-tomPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.image || "http://localhost:9000/profile-pictures/avatar.jpg"}
          alt=""
          width={40}
          height={40}
          className=" w-10 h-10 rounded-full object-cover"
          onError={(e) => (e.currentTarget.src = "http://localhost:9000/profile-pictures/avatar.jpg")}
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item.email}</p>
        </div>
      </td>
      <td className="hidden lg:table-cell ">{item.teacherId}</td>
      <td className="hidden md:table-cell">{item.subjects.join(",")}</td>
      <td className="hidden md:table-cell">{item.classes.join(",")}</td>
      <td className="hidden lg:table-cell">{item.phone}</td>
      <td className="hidden lg:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-tomSky">
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link>
          {role === SCHOOL_ADMIN && (
            <FormModal table="teacher" type="delete" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div>
      <ToastContainer />
      <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
        {/* TOP */}
        <div className="flex items-center justify-between">
          <h1 className="hidden md:block text-lg font-semibold">All Teacher</h1>
          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <TableSearch />
            <div className="flex items-center gap-4 self-end">
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-tomYellow">
                <Image src="/filter.png" alt="" width={14} height={14} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-tomYellow">
                <Image src="/sort.png" alt="" width={14} height={14} />
              </button>
              {role === SCHOOL_ADMIN && (
                // <button className="w-8 h-8 flex items-center justify-center rounded-full bg-tomYellow">
                //   <Image src="/plus.png" alt="" width={14} height={14} />
                // </button>
                <FormModal table="teacher" type="create" />
              )}
            </div>
          </div>
        </div>
        {/* LIST */}
        <Table columns={columns} renderRow={renderRow} data={teachers} />
        {/* PAGINATION */}
        <Pagination />
      </div>
    </div>
  );
};

export default TeachersListPage;

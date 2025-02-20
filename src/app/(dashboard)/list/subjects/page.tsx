"use client";

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { SCHOOL_ADMIN } from "@/lib/roles";

type Subject = {
  id: number;
  name: string;
  teachers: string[];
};

const columns = [
  {
    header: "Subjects Name",
    accessor: "subject",
  },
  {
    header: "Teacher",
    accessor: "teachers",
    className: "hidden lg:table-cell md:hidden",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

const SubjectListPage = () => {

  const [role, setRole] = useState<string>("");
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    const user = Cookies.get("user.sms");
    const role = user ? JSON.parse(user).role : null;
    setRole(role);
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subjects/by-school`, {
          method: "GET",
          credentials: "include",
        });

        if (res.status === 200) {
          const j = await res.json();
          const data = j.data;
          console.log(data);
          var subjectList: Subject[] = data.map((item: any) => {
            const subject: Subject = {
              id: item.id,
              name: item.name,
              teachers: item.teachers?.length > 0 ? item.teachers.map((teacher: any) => teacher.name) : ["No Teachers"],
            };
            return subject;
          });

          setSubjects(subjectList);
        } else {
          console.error("Failed to fetch subjects");
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  const renderRow = (item: Subject) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-tomPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.name}</td>
      <td className="hidden md:table-cell">{item.teachers.join(",")}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === SCHOOL_ADMIN && (
            <>
              <FormModal table="subject" type="update" data={item} />
              <FormModal table="subject" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Subjects</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-tomYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-tomYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === SCHOOL_ADMIN && <FormModal table="subject" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={subjects} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default SubjectListPage;

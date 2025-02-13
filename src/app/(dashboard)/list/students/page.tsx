"use client";

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { studentsData } from "@/lib/data";
import { SCHOOL_ADMIN } from "@/lib/roles";
import Image from "next/image";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

type Student = {
  id: number;
  studentId: string;
  name: string;
  email?: string;
  photo: string;
  phone?: string;
  // grade: number;
  // class: string;
  address: string;
};

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Student ID",
    accessor: "studentID",
    className: "hidden lg:table-cell md:hidden",
  },
  // {
  //   header: "Grade",
  //   accessor: "grade",
  //   className: "hidden md:table-cell",
  // },
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

const StudentListPage = () => {
  const [role, setRole] = useState<string>("");
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const user = Cookies.get("user.sms");
    const role = user ? JSON.parse(user).role : null;
    setRole(role);
  }, []);


  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/students/by-school`, {
          method: "GET",
          credentials: "include",
        });

        if (res.status === 200) {
          const j = await res.json();
          const data = j.data;
          console.log(data);
          var studentList: Student[] = data.map((item: any) => {
            const teacher: Student = {
              id: item.id,
              studentId: item.id,
              name: item.firstName + " " + item.lastName,
              email: item.email,
              photo: item.image && `http://localhost:9000/profile-pictures/${item.image}`,
              phone: item.phone,
              // class: item.class,
              // grade: item.grade,
              address: item.address,
            };
            return teacher;
          });

          setStudents(studentList);
        } else {
          console.error("Failed to fetch schools");
        }
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    };

    fetchStudents();
  }, []);

  const renderRow = (item: Student) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-tomPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.photo || "http://localhost:9000/profile-pictures/avatar.jpg"}
          alt=""
          width={40}
          height={40}
          className=" w-10 h-10 rounded-full object-cover"
          onError={(e) => (e.currentTarget.src = "http://localhost:9000/profile-pictures/avatar.jpg")}
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          {/* <p className="text-xs text-gray-500">{item.grade}</p> */}
        </div>
      </td>
      <td className="hidden lg:table-cell ">{item.studentId}</td>
      {/* <td className="hidden md:table-cell">{item.grade}</td> */}
      <td className="hidden lg:table-cell">{item.phone}</td>
      <td className="hidden lg:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          {/* <Link href={`/list/teacher/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-tomSky">
              <Image src="/edit.png" alt="" width={16} height={16} />
            </button>
          </Link> */}
          {role === SCHOOL_ADMIN && (
            <>
              <FormModal
                table="teacher"
                type="update"
                data={{
                  id: 1,
                  username: "tomalhossain",
                  email: "tomal@gmail.com",
                  password: "password",
                  firstName: "Toaml",
                  lastName: "Hossain",
                  phone: "+880 17684-47320",
                  address: "1234 Main St, Anytown, USA",
                  bloodType: "A+",
                  dateOfBirth: "1998-01-02",
                  sex: "male",
                  img: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200",
                }}
              />
              <FormModal table="student" type="delete" id={item.id} />

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
        <h1 className="hidden md:block text-lg font-semibold">All Student</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-tomYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-tomYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === SCHOOL_ADMIN && <FormModal table="student" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={students} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default StudentListPage;

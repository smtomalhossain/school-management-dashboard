"use client";

import FormModal from "@/components/FormModal";
import InputField from "@/components/inputField";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
// import { attendanceDate, role } from "@/lib/data";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Cookies from "js-cookie";
import { SCHOOL_ADMIN } from "@/lib/roles";

// ✅ Schema Validation using Zod
const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" }),
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  phone: z.string().min(1, { message: "Phone is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  birthday: z.string().min(1, { message: "Birthday is required!" }), // ✅ Changed to string
  class: z.enum(["one", "two", "three", "four", "five"], {
    message: "Class is required!",
  }),
  student: z.enum(["one", "two", "three", "four", "five"], {
    message: "Student is required!",
  }),
  img: z.any(),
});

type Inputs = z.infer<typeof schema>;

type Attendance = {
  id: number;
  name: string;
  class: string;
  studentId: string;
  date: string;
  inTime: string;
  status: string;
};

const columns = [
  { header: "Student Name", accessor: "name" },
  { header: "Class", accessor: "class", className: "hidden md:table-cell" },
  {
    header: "Student Id",
    accessor: "studentId",
    className: "hidden md:table-cell",
  },
  { header: "Date", accessor: "date", className: "hidden md:table-cell" },
  { header: "In Time", accessor: "inTime", className: "hidden md:table-cell" },
  { header: "Status", accessor: "status" },
  { header: "Actions", accessor: "actions" },
];

const AttendanceListPage = ({
  type,
  data,
}: any) => {
  // ✅ Using useForm correctly
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const [role, setRole] = useState<string>("");
  const [attendance, setAttendance] = useState<Attendance[]>([]);

  useEffect(() => {
    const user = Cookies.get("user.sms");
    const role = user ? JSON.parse(user).role : null;
    setRole(role);
  }, []);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/attendances/by-school`, {
          method: "GET",
          credentials: "include",
        });

        if (res.status === 200) {
          const j = await res.json();
          const data = j.data;
          console.log(data);
          var attendanceList: Attendance[] = data.map((item: any) => {

            const utcDate = new Date(item.inTime);

            // Convert to Dhaka time (UTC+6)
            const optionsDate: Intl.DateTimeFormatOptions = { timeZone: "Asia/Dhaka", year: "numeric", month: "2-digit", day: "2-digit" };
            const optionsTime: Intl.DateTimeFormatOptions = { timeZone: "Asia/Dhaka", hour: "2-digit", minute: "2-digit", hour12: true };

            // Get formatted date and time separately
            const dhakaDate = new Intl.DateTimeFormat("en-CA", optionsDate).format(utcDate); // YYYY-MM-DD format
            const dhakaTime = new Intl.DateTimeFormat("en-US", optionsTime).format(utcDate); // 12-hour format


            const attendance: Attendance = {
              id: item.id,
              class: item.class.name,
              date: dhakaDate,
              inTime: dhakaTime,
              name: item.student.name,
              studentId: item.studentId,
              status: item.status,
            };
            return attendance;
          });

          setAttendance(attendanceList);
        } else {
          console.error("Failed to fetch schools");
        }
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    };

    fetchAttendance();
  }, []);

  const onSubmit = handleSubmit((data) => {
    console.log("Form Data:", data);
  });

  // ✅ Function to get status colors
  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "Present":
        return "bg-green-400";
      case "Delay":
        return "bg-sky-300";
      case "Absent":
        return "bg-red-400 text-white";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const renderRow = (item: Attendance) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-gray-100"
    >
      <Link href={`/list/attendance/student-attendance/${item.id}`}>
      <td className="flex items-center gap-4 p-4">{item.name}</td>
      </Link>
      <td className="hidden md:table-cell">{item.class}</td>
      <td className="hidden md:table-cell">{item.studentId}</td>
      <td className="hidden md:table-cell">{item.date}</td>
      <td className="hidden md:table-cell">{item.inTime}</td>
      <td>
        <span className={`px-2 py-1 rounded ${getStatusBgColor(item.status)}`}>
          {item.status}
        </span>
      </td>
      <td>
        <div className="flex items-center gap-2">
          {role === SCHOOL_ADMIN && (
            <>
              <FormModal table="attendance" type="update" data={item} />
              <FormModal table="attendance" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* HEADER */}
      <div className="flex items-center justify-between pb-4">
        <h1 className="hidden md:block text-lg font-semibold">
          All Student Attendance
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
          <div className="flex flex-col gap-1 w-full ">
            {/* <label className="text-xs text-gray-500">Class</label> */}
            <select
              className="ring-[1.5px] ring-gray-300 p-[10px] rounded-md text-sm w-full"
              {...register("class")}
            >
              <option value="" style={{ color: "#9CA3AF" }}>
                Select a class
              </option>
              <option value="one">One</option>
              <option value="two">Two</option>
              <option value="three">Three</option>
              <option value="four">Four</option>
              <option value="five">Five</option>
            </select>
            {errors.class?.message && (
              <p className="text-xs text-red-400">{errors.class.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1 w-full ">
            {/* <label className="text-xs text-gray-500 ">Student</label> */}
            <select
              className="ring-[1.5px] ring-gray-300 p-[10px] rounded-md text-sm w-full"
              {...register("class")}
            >
              <option value="" style={{ color: "#9CA3AF" }}>
                Select a Section
              </option>
              <option value="one">A</option>
              <option value="two">B</option>

            </select>
            {errors.class?.message && (
              <p className="text-xs text-red-400">{errors.class.message}</p>
            )}
          </div>

          <InputField
            label=""
            name="birthday"
            register={register}
            error={errors.birthday}
            type="date"
          />
          <div>
            <button className=" items-center justify-center border border-blue-500 text-white bg-blue-500 hover:text-blue-500 hover:bg-white font-medium py-2 px-4 rounded-md transition-all float-right m-1">
              Find
            </button>
          </div>
          <div className="flex flex-row items-center">
            <Link href="/list/attendance/take-attendance" className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-medium py-2 px-4 rounded-md transition-all m-1 flex flex-row gap-2">
              <span>Take</span>
              <span>Attendance</span>
            </Link>
          </div>

        </div>
        {/* {role === "admin" && <FormModal table="attendance" type="create" />} */}
      </div>

      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={attendance} />

      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default AttendanceListPage;

"use client";

import FormModal from "@/components/FormModal";
import InputField from "@/components/inputField";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import { attendanceDate, role } from "@/lib/data";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

const TakeAttendancePage = ({
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
      <td className="flex items-center gap-4 p-4">{item.name}</td>
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
          {role === "admin" && (
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
      <div className="flex-row md:flex-row lg:flex items-center justify-between pb-4">
        <h1 className="items-center md:block text-lg font-semibold">
          Generate Student Admit Card
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">

        <div className="flex flex-col gap-1 w-full ">
            <label className="text-xs text-gray-500 ">Exam Term</label>
            <select
              className="ring-[1.5px] ring-gray-300 p-[10px] rounded-md text-sm w-full"
              {...register("class")}
            >
              <option value="" style={{ color: "#9CA3AF" }}>
                Select a Exam
              </option>
              <option value="one">Mid Term Exam</option>
              <option value="two">Class Exam</option>
              <option value="two">Final Exam</option>
            </select>
            {errors.class?.message && (
              <p className="text-xs text-red-400">{errors.class.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1 w-full ">
            <label className="text-xs text-gray-500">Class</label>
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
            <label className="text-xs text-gray-500 ">Section</label>
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

          <div className="flex flex-col gap-1 w-full ">
            <label className="text-xs text-gray-500 ">Student</label>
            <select
              className="ring-[1.5px] ring-gray-300 p-[10px] rounded-md text-sm w-full"
              {...register("class")}
            >
              <option value="" style={{ color: "#9CA3AF" }}>
                Select a Student
              </option>
              <option value="one">All Student</option>
              <option value="two">Munna</option>
              <option value="two">Lemon</option>
              <option value="two">Lekhon</option>
            </select>
            {errors.class?.message && (
              <p className="text-xs text-red-400">{errors.class.message}</p>
            )}
          </div>
          <div>
            <button className="flex flex-row gap-1  items-center justify-center border border-blue-500 text-white bg-blue-500 hover:text-blue-500 hover:bg-white font-medium py-2 px-4 rounded-md transition-all float-right mt-5 m-1">
              <p>Generate</p>
            </button>
          </div>
          {/* <div className="flex flex-row items-center">
            <Link
              href="/attendance"
              className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-medium py-2 px-4 rounded-md transition-all m-1 flex flex-row gap-2"
            >
              <span>Take</span>
              <span>Attendance</span>
            </Link>
          </div> */}
        </div>
        {/* {role === "admin" && <FormModal table="attendance" type="create" />} */}
      </div>

      {/* LIST */}
      {/* <Table columns={columns} renderRow={renderRow} data={attendanceDate} /> */}

      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default TakeAttendancePage;

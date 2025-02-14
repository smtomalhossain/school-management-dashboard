"use client";

import FormModal from "@/components/FormModal";
import InputField from "@/components/inputField";
import Pagination from "@/components/Pagination";
import ShowStudentListButton from "@/components/ShowStudentListButton";
import Table from "@/components/Table";
import Attendance from "@/components/TakeAttendance";
import { attendanceDate, role } from "@/lib/data";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
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
  img: z.instanceof(File, { message: "Image is required" }),
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


const TakeAttendancePage = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  // ✅ Using useForm correctly
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const [showAttendancePage, setShowAttendancePage] = useState(false);

  const handleClick = () => {
    setShowAttendancePage(!showAttendancePage); // Toggle visibility
  };

  const handleCloseAttendance = () => {
    setShowAttendancePage(false); // Hide the Attendance component
  };



  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* HEADER */}
      <div className="flex-row md:flex-row lg:flex items-center justify-between pb-4">
        <h1 className="md:block text-lg font-semibold">
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
                Select a Class
              </option>
              <option value="one">One</option>
              <option value="two">Tow</option>
              <option value="three">Three</option>
              <option value="four">Four</option>
              <option value="five">Five</option>
            </select>
            {errors.class?.message && (
              <p className="text-xs text-red-400">{errors.class.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1 w-full ">
            {/* <label className="text-xs text-gray-500">Class</label> */}
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

          <div className="flex flex-row items-center">
          <ShowStudentListButton handleClick={handleClick} />
          </div>
        </div>
      </div>

      {/* LIST */}
    
      {showAttendancePage && <Attendance onCancel={handleCloseAttendance}/>}
      {/* PAGINATION */}
      {/* <Pagination /> */}
    </div>
  );
};

export default TakeAttendancePage;

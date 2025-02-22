"use client";

import FormModal from "@/components/FormModal";
import InputField from "@/components/inputField";
import Pagination from "@/components/Pagination";
import ShowStudentListButton from "@/components/ShowStudentListButton";
import Table from "@/components/Table";
import TakeAttendance from "@/components/TakeAttendance";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// ✅ Schema Validation using Zod
const schema = z.object({
  class: z.string().min(1, "Class is required!"),
  section: z.string().min(1, "Section is required!"),
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

const TakeAttendancePage = ({ type, data }: any) => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const [showAttendancePage, setShowAttendancePage] = useState(true); 
  const [classOptions, setClassOptions] = useState<{ value: string; label: string }[]>([]);
  const [sectionOptions, setSectionOptions] = useState<{ value: string; label: string }[]>([]);

  const [selectedClassId] = watch(["class"]); 

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/classes/by-school`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch classes");
        }
        const j = await res.json();
        const classesData = j.data;
        const options = classesData.map((_class: any) => ({
          value: _class.id,
          label: _class.name,
        }));
        setClassOptions(options);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sections/by-school`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch sections");
        }
        const j = await res.json();
        const sectionsData = j.data;
        const options = sectionsData.map((section: any) => ({
          value: section.id,
          label: section.name,
        }));
        setSectionOptions(options);
      } catch (error) {
        console.error("Error fetching section:", error);
      }
    };

    fetchSections();
  }, []);

  const handleClick = () => {
  //   setShowAttendancePage(!showAttendancePage);
  };

  const handleCloseAttendance = () => {
    // setShowAttendancePage(false);
  };

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex-row md:flex-row lg:flex items-center justify-between pb-4">
        <h1 className="md:block text-lg font-semibold">All Student Attendance</h1>
        <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
          <div className="flex flex-col gap-1 w-full ">
            <select className="ring-[1.5px] ring-gray-300 p-[10px] rounded-md text-sm w-full" {...register("class")}>
              <option value="" style={{ color: "#9CA3AF" }}>Select a Class</option>
              {classOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            {errors.class?.message && <p className="text-xs text-red-400">{errors.class.message}</p>}
          </div>

          <div className="flex flex-col gap-1 w-full ">
            <select className="ring-[1.5px] ring-gray-300 p-[10px] rounded-md text-sm w-full" {...register("section")}>
              <option value="" style={{ color: "#9CA3AF" }}>Select a Section</option>
              {sectionOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            {errors.section?.message && <p className="text-xs text-red-400">{errors.section.message}</p>}
          </div>
          <div className="flex flex-row items-center">
            <ShowStudentListButton handleClick={handleClick} />
          </div>
        </div>
      </div>
      <TakeAttendance key={selectedClassId} onCancel={handleCloseAttendance} selectedClassId={selectedClassId} />
      {/* {showAttendancePage && <Attendance onCancel={handleCloseAttendance} selectedClassId={selectedClassId} />} */}
    </div>
  );
};

export default TakeAttendancePage;

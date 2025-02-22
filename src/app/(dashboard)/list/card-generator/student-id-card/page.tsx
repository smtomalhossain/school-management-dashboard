"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// ✅ Schema Validation using Zod
const schema = z.object({
  classId: z.string().min(1, { message: "Class is required!" }),
  sectionId: z.string().min(1, { message: "Section is required!" }),
  studentId: z.string().min(1, { message: "Student is required!" }),
});

type Inputs = z.infer<typeof schema>;

const GenerateStudentIdCard = ({
  type,
  data,
}: any) => {
  // ✅ Using useForm correctly
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const [classOptions, setClassOptions] = useState<{ value: string; label: string }[]>([]);
  const [sectionOptions, setSectionOptions] = useState<{ value: string; label: string }[]>([]);
  const [studentOptions, setStudentOptions] = useState<{ value: string; label: string }[]>([]);
  const [selectedStudentCard, setSelectedStudentCard] = useState<string | undefined>(undefined);

  //
  const [selectedClassId, selectedStudentId] = watch(["classId", "studentId"]);

  // Fetch class
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
        // Map your API data to react-select option objects
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

  // Fetch sections
  useEffect(() => {
    const fetchSections = async () => {
      return;
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
        // Map your API data to react-select option objects
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

  // Fetch students
  useEffect(() => {
    const fetchStudents = async () => {
      try {

        let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/students/by-school`;
        if (selectedClassId) {
          url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/students/by-class/${selectedClassId}`;
        }
        const res = await fetch(url, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch students");
        }
        const j = await res.json();
        const studentsData = j.data;
        // Map your API data to react-select option objects
        const options = studentsData.map((student: any) => ({
          value: student.id,
          label: student.name,
        }));
        setStudentOptions(options);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [selectedClassId]);

  // Fetch student card
  useEffect(() => {
    const fetchStudents = async () => {
      if (!selectedStudentId) {
        return;
      }
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pdf-generate/student-card/${selectedStudentId}`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch pdf");
        }
        const j = await res.text();
        // Map your API data to react-select option objects
        console.log(j);

        setSelectedStudentCard(j);
      } catch (error) {
        console.error("Error fetching pdf:", error);
      }
    };

    fetchStudents();
  }, [selectedStudentId]);

  const onSubmit = handleSubmit((data) => {
    console.log("Form Data:", data);
  });

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* HEADER */}
      <div className="flex-row md:flex-row lg:flex items-center justify-between pb-4">
        <h1 className="items-center md:block text-lg font-semibold">
          Generate Student ID Card
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
          <div className="flex flex-col gap-1 w-full ">
            <label className="text-xs text-gray-500">Class</label>
            <select
              className="ring-[1.5px] ring-gray-300 p-[10px] rounded-md text-sm w-full"
              {...register("classId")}
            >
              <option value="" style={{ color: "#9CA3AF" }}>
                Select a class
              </option>
              {classOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.classId?.message && (
              <p className="text-xs text-red-400">{errors.classId.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1 w-full ">
            <label className="text-xs text-gray-500 ">Section</label>
            <select
              className="ring-[1.5px] ring-gray-300 p-[10px] rounded-md text-sm w-full"
              {...register("sectionId")}
            >
              <option value="" style={{ color: "#9CA3AF" }}>
                Select a Section
              </option>
              {sectionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.sectionId?.message && (
              <p className="text-xs text-red-400">{errors.sectionId.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1 w-full ">
            <label className="text-xs text-gray-500 ">Student</label>
            <select
              className="ring-[1.5px] ring-gray-300 p-[10px] rounded-md text-sm w-full"
              {...register("studentId")}
            >
              <option value="" style={{ color: "#9CA3AF" }}>
                Select a Student
              </option>
              {studentOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.studentId?.message && (
              <p className="text-xs text-red-400">{errors.studentId.message}</p>
            )}
          </div>
          <div>
            <button className="flex flex-row gap-1  items-center justify-center border border-blue-500 text-white bg-blue-500 hover:text-blue-500 hover:bg-white font-medium py-2 px-4 rounded-md transition-all float-right mt-5 m-1">
              <p>Generate</p>
            </button>
          </div>

        </div>
      </div>

      {/* Display the student ID card HTML */}
      {selectedStudentCard && (
        <div className="flex justify-center items-center mt-6">
          <div
            // className="border p-4 shadow-md rounded-md w-full max-w-lg"
            dangerouslySetInnerHTML={{ __html: selectedStudentCard }}
          />
        </div>
      )}
      {/* Display Download button */}
      {selectedStudentCard && (
        <div className="flex justify-center items-center mt-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all"
            onClick={async () => {
              try {
                const res = await fetch(
                  `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pdf-generate/student-card-pdf/${selectedStudentId}`,
                  {
                    method: "GET",
                    credentials: "include",
                  }
                );

                if (!res.ok) {
                  throw new Error("Failed to download PDF");
                }

                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "student_id_card.pdf";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
              } catch (error) {
                console.error("Error downloading PDF:", error);
              }
            }}
          >
            Download PDF
          </button>
        </div>
      )}

    </div>
  );
};

export default GenerateStudentIdCard;

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../inputField";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

// name,
// capacity,
// supervisorId,

const schema = z.object({
  name: z
    .string()
    .min(1, { message: "Class Name must be at least 1 characters long!" })
    .max(20, { message: "Class Name must be at most 20 characters long!" }),
  capacity: z.string().min(1, { message: "Capacity is required!" }),
  supervisorId: z.string({ message: "Supervisor is required!" })
});

type Inputs = z.infer<typeof schema>;

const ClassesForm = ({
  type,
  data,
}: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const [teacherOptions, setTeacherOptions] = useState<{ value: string; label: string }[]>([]);

  // Fetch teachers
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/teachers/by-school`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch teachers");
        }
        const j = await res.json();
        const studentsData = j.data;
        // Map your API data to react-select option objects
        const options = studentsData.map((student: any) => ({
          value: student.id,
          label: student.name,
        }));
        setTeacherOptions(options);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  const onSubmit = handleSubmit(async (data) => {

    const payload: {
      name: string;
      capacity: number;
      supervisorId: number;
    } = {
      name: data.name,
      capacity: Number(data.capacity),
      supervisorId: Number(data.supervisorId)
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/classes/with-school`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });

    if (response.status === 200) {
      toast.success("Teacher created successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => {
        window.location.href = "/list/classes";
      }, 500);

    } else {
      toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 3000,
      });
    }

    const result = await response.json();
    console.log(result);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Create a new Class</h1>
      <span className="text-xs text-gray-400 font-medium">
        Class Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField label="Class Name" name="name" defaultValue={data?.name} register={register} error={errors?.name} />
        <InputField label="Capacity" name="capacity" defaultValue={data?.capacity} register={register} error={errors?.capacity} />

        <div className="flex flex-col gap-2 w-full md:w-2/5">
          <label className="text-xs text-gray-500">Supervisor</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("supervisorId")}
            defaultValue={""}
          >
            <option value="" disabled>
              Select Supervisor
            </option>
            {teacherOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors?.supervisorId && <p className="text-xs text-red-400">{errors.supervisorId.message?.toString()}</p>}
        </div>

      </div>

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default ClassesForm;

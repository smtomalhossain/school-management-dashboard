"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../inputField";
import MultiSelect from "../MultiSelect";
import { useEffect, useState } from "react";

const schema = z.object({
  name: z
    .string()
    .min(3, { message: "Subject must be at least 3 characters long!" })
    .max(20, { message: "Subject must be at most 20 characters long!" }),
  teachersId: z.array(z.string()).optional(),
});

type Inputs = z.infer<typeof schema>;

const SubjectForm = ({
  type,
  data,
}: any) => {
  const {
    control,
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
        const teachersData = j.data;
        // Map your API data to react-select option objects
        const options = teachersData.map((teacher: any) => ({
          value: teacher.id,
          label: teacher.name,
        }));
        setTeacherOptions(options);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  const onSubmit = handleSubmit((data) => {

    // const payload : {
    //   name: string;
    //   teachersId: number[];
    // } = {
    //   name: data.name,
    //   teachersId: data.teachersId ? data.teachersId : [],
    // };

    console.log(data);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Create a new subject</h1>
      <span className="text-xs text-gray-400 font-medium">
        Subject Information
      </span>
      <div className="flex justify-around gap-4">
        <InputField label="Subject Name" name="subject" defaultValue={data?.subject} register={register} error={errors?.name} />
        <MultiSelect label="Teachers" name="teachersId" control={control} options={teacherOptions} placeholder="Select teachers" />
      </div>

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default SubjectForm;

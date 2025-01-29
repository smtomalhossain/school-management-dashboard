"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../inputField";

const schema = z.object({
  subject: z
    .string()
    .min(3, { message: "Subject Name must be at least 3 characters long!" })
    .max(20, { message: "Subject Name must be at most 20 characters long!" }),
  student: z
    .string()
    .min(3, { message: "Student must be at least 3 characters long!" })
    .max(20, { message: "Student must be at most 20 characters long!" }),
  score: z
    .string()
    .min(1, { message: "Score Name must be at 1 least  characters long!" })
    .max(20, { message: "Score Name must be at most 20 characters long!" }),
  teacher: z
    .string()
    .min(3, { message: "Teacher Name must be at least 3 characters long!" })
    .max(20, { message: "Teacher Name must be at most 20 characters long!" }),
  class: z
    .string()
    .min(3, { message: "Class Name must be at least 3 characters long!" })
    .max(20, { message: "Class Name must be at most 20 characters long!" }),
  date: z.date({ message: "date is required!" }),
});

type Inputs = z.infer<typeof schema>;

const ResultForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Create a new Assignment</h1>
      <span className="text-xs text-gray-400 font-medium">
        Assignment Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Subjects Name"
          name="subject"
          defaultValue={data?.subject}
          register={register}
          error={errors?.subject}
        />

        <InputField
          label="Student"
          name="student"
          defaultValue={data?.student}
          register={register}
          error={errors?.student}
        />

        <InputField
          label="Score"
          name="score"
          defaultValue={data?.score}
          register={register}
          error={errors?.score}
        />

        <InputField
          label="Teacher"
          name="teacher"
          defaultValue={data?.teacher}
          register={register}
          error={errors?.teacher}
        />
        <InputField
          label="Class"
          name="class"
          defaultValue={data?.teacher}
          register={register}
          error={errors?.teacher}
        />
        <InputField
          label="Date"
          name="date"
          defaultValue={data?.date}
          register={register}
          error={errors.date}
          type="date"
        />
      </div>

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default ResultForm;

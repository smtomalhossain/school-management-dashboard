"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../inputField";

const schema = z.object({
    subject: z
    .string()
    .min(3, { message: "Subject Name must be at least 1 characters long!" })
    .max(20, { message: "Subject Name must be at most 20 characters long!" }),
  class: z
    .string()
    .min(1, { message: "Class must be at least 1 characters long!" })
    .max(20, { message: "Class must be at most 20 characters long!" }),
  teacher: z
    .string()
    .min(3, { message: "Teacher Name must be at least  characters long!" })
    .max(20, { message: "Teacher Name must be at most 20 characters long!" }),
});

type Inputs = z.infer<typeof schema>;

const LessonForm = ({
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

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Create a new Lesson</h1>
      <span className="text-xs text-gray-400 font-medium">
        Lesson Information
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
          label="class"
          name="Class"
          defaultValue={data?.class}
          register={register}
          error={errors?.class}
        />

        <InputField
          label="Teacher"
          name="teacher"
          defaultValue={data?.teacher}
          register={register}
          error={errors?.teacher}
        />
      </div>

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default LessonForm;

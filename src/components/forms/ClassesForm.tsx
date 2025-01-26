"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../inputField";

const schema = z.object({
  className: z
    .string()
    .min(1, { message: "Class Name must be at least 1 characters long!" })
    .max(20, { message: "Class Name must be at most 20 characters long!" }),
  capacity: z
    .string()
    .min(1, { message: "Capacity must be at least 1 characters long!" })
    .max(20, { message: "Capacity must be at most 20 characters long!" }),
  grade: z
    .string()
    .min(1, { message: "Grade must be at least 1 characters long!" })
    .max(20, { message: "Grade must be at most 20 characters long!" }),
  supervisor: z
    .string()
    .min(3, { message: "supervisor must be at least 3 characters long!" })
    .max(20, { message: "supervisor must be at most 20 characters long!" }),
});

type Inputs = z.infer<typeof schema>;

const ClassesForm = ({
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
      <h1 className="text-xl font-semibold">Create a new Class</h1>
      <span className="text-xs text-gray-400 font-medium">
        Class Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Class Name"
          name="className"
          defaultValue={data?.className}
          register={register}
          error={errors?.className}
        />

        <InputField
          label="Capacity"
          name="capacity"
          defaultValue={data?.capacity}
          register={register}
          error={errors?.capacity}
        />

        <InputField
          label="Grade"
          name="grade"
          defaultValue={data?.grade}
          register={register}
          error={errors?.grade}
        />

        <InputField
          label="Supervisor"
          name="supervisor"
          defaultValue={data?.supervisor}
          register={register}
          error={errors?.supervisor}
        />
      </div>

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default ClassesForm;

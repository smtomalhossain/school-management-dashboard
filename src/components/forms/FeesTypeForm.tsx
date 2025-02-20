"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../inputField";

const schema = z.object({
  feesTitle: z
    .string()
    .min(1, { message: "Fees Title must be at least 1 characters long!" })
    .max(20, { message: "Fees Title must be at most 20 characters long!" }),
  amount: z
    .string()
    .min(1, { message: "Amount must be at least 1 characters long!" })
    .max(20, { message: "Amount must be at most 20 characters long!" }),
});

type Inputs = z.infer<typeof schema>;

const FeeTypeForm = ({
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
      <h1 className="text-xl font-semibold">Create a new Fee Type</h1>
      <span className="text-xs text-gray-400 font-medium">
        Fees Information
      </span>
      <div className="flex justify-around gap-4">
        <InputField
          label="Fees Title"
          name="feesTitle"
          defaultValue={data?.feesTitle}
          register={register}
          error={errors?.feesTitle}
        />

        <InputField
          label="Amount"
          name="amount"
          defaultValue={data?.amount}
          register={register}
          error={errors?.amount}
        />
      </div>

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default FeeTypeForm;

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../inputField";
import { toast } from "react-toastify";
import SingleSelect from "../SingleSelect";

const schema = z.object({
  title: z
    .string()
    .min(1, { message: "Fees Title must be at least 1 characters long!" })
    .max(20, { message: "Fees Title must be at most 20 characters long!" }),
  amount: z
    .string()
    .min(1, { message: "Amount must be at least 1 characters long!" })
    .max(20, { message: "Amount must be at most 20 characters long!" }),
  // Billing Type can be Monthly, Yearly, OneTime
  billingType: z.string().min(1, { message: "Billing Type must be provided!" }),
  // .enum(["Monthly", "Yearly", "OneTime"], {
    // message: "Billing Type must be Monthly, Yearly, or OneTime!"
  // }),
});

type Inputs = z.infer<typeof schema>; 

const FeeTypeForm = ({
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

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

    const payload: {
      title: string;
      amount: string;
      billingType: string;
    } = {
      title: data.title,
      amount: data.amount,
      billingType: data.billingType
    };


    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/fee-types/with-school`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      credentials: "include",
    });

    if (response.status === 200) {
      toast.success("Teacher created successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => {
        window.location.href = "/list/accounting/fee-type";
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
      <h1 className="text-xl font-semibold">Create a new Fee Type</h1>
      <span className="text-xs text-gray-400 font-medium">
        Fees Information
      </span>
      <div className="flex justify-around gap-4">
        <InputField label="Fees Title" name="title" defaultValue={data?.title} register={register}
          error={errors?.title} />
        <InputField label="Amount" name="amount" defaultValue={data?.amount} register={register}
          error={errors?.amount} />
        <SingleSelect name="billingType" label="Billing Type"
          defaultValue={data?.billingType} register={register}
          options={[{ value: "Monthly", label: "Monthly" },
          { value: "Yearly", label: "Yearly" }, { value: "OneTime", label: "One Time" }]}
          unselectable="Select billing type" error={errors?.billingType} />
      </div>

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default FeeTypeForm;

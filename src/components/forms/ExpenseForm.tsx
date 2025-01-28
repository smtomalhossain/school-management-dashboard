"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../inputField";

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
  birthday: z.date({ message: "Birthday is required!" }),
  class: z.enum(["one", "tow", "three", "four", "five"], {
    message: "Class is required!",
  }),
  student: z.enum(["one", "tow", "three", "four", "five"], {
    message: "Student is required!",
  }),
  img: z.instanceof(File, { message: "Image is required" }),
});

type Inputs = z.infer<typeof schema>;

const ExpenseForm = ({
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
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Expense Manager</h1>
      <span className="text-xs text-gray-400 font-medium">Expense Information</span>
      <div className="flex flex-row justify-between flex-wrap gap-4">
        <InputField
          label="Expense Title"
          name="lastName"
          defaultValue={data?.lastName}
          register={register}
          error={errors.lastName}
        />

        <InputField
          label="Amount"
          name="firstName"
          defaultValue={data?.firstName}
          register={register}
          error={errors.firstName}
        />

<div className="flex flex-col gap-2 w-full md:w-2/5">
          <label className="text-xs text-gray-500">Payment Method</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("class")}
            defaultValue="class" 
          >  <option value="class" style={{ color: '#9CA3AF' }}>
          Select a payment method
        </option>
            <option value="male">Cash</option>
            <option value="female">BKash</option>
            <option value="female">Bank</option>
          </select>
          {errors.class?.message && (
            <p className="text-xs text-red-400">
              {errors.class.message.toString()}
            </p>
          )}
        </div>

        <InputField
          label="Date"
          name="birthday"
          defaultValue={data?.birthday}
          register={register}
          error={errors.birthday}
          type="date"
        />
      </div>

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default ExpenseForm;

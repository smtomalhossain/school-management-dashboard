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
  class: z.enum(["one", "tow" , "three", "four", "five"], { message: "Class is required!" }),
  student: z.enum(["one", "tow" , "three", "four", "five"], { message: "Student is required!" }),
  img: z.instanceof(File, { message: "Image is required" }),
});

type Inputs = z.infer<typeof schema>;

const StudentFeeForm = ({
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
      <h1 className="text-xl font-semibold">Student Fee Manager</h1>
      <span className="text-xs text-gray-400 font-medium">
        Fee Information
      </span>
      <div className="flex flex-row justify-between flex-wrap">
      <div className="flex flex-col gap-2 w-full md:w-2/5">
          <label className="text-xs text-gray-500">Class</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("class")}
            defaultValue="class" 
          >  <option value="class" style={{ color: '#9CA3AF' }}>
          Class
        </option>
            <option value="male">One</option>
            <option value="female">Tow</option>
            <option value="female">Three</option>
            <option value="female">Four</option>
            <option value="female">Five</option>
          </select>
          {errors.class?.message && (
            <p className="text-xs text-red-400">
              {errors.class.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-2/5">
          <label className="text-xs text-gray-500">Select Student</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("student")}
            defaultValue={data?.student}
          >
            <option value="class" >
          Select a Student
        </option>
            <option value="male">Shohag</option>
            <option value="female">Onik</option>
            <option value="female">Lemon</option>
            <option value="female">Munna</option>
            <option value="female">Lekhon</option>
            <option value="female">Emon</option>
            <option value="female">Rajon</option>
            <option value="female">Tuser</option>
            <option value="female">Nirob</option>
            <option value="female">Osim</option>
          </select>
          {errors.student?.message && (
            <p className="text-xs text-red-400">
              {errors.student.message.toString()}
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Invoice Title"
          name="firstName"
          defaultValue={data?.firstName}
          register={register}
          error={errors.firstName}
        />
        <InputField
          label="Total Amount"
          name="lastName"
          defaultValue={data?.lastName}
          register={register}
          error={errors.lastName}
        />
        <InputField
          label="Discount Amount"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors.phone}
        />
        <InputField
          label="Paid Amount"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors.address}
        />
        <div className="flex flex-col gap-2 w-full md:w-2/5">
          <label className="text-xs text-gray-500">Status</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("class")}
            defaultValue="class" 
          >  <option value="class" style={{ color: '#9CA3AF' }}>
          Select a status
        </option>
            <option value="male">Paid</option>
            <option value="female">Unpaid</option>
          </select>
          {errors.class?.message && (
            <p className="text-xs text-red-400">
              {errors.class.message.toString()}
            </p>
          )}
        </div>
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
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
      {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default StudentFeeForm;
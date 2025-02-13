"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import InputField from "../inputField";
import { uploadFile } from "@/lib/upload-file";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Select from "react-select";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" })
    .or(z.string().max(0)),
  email: z.string().email({ message: "Invalid email address!" })
    .or(z.string().max(0)),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .or(z.string().max(0)),
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  phone: z.string().min(1, { message: "Phone is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  birthday: z.string().optional(),
  sex: z.enum(["male", "female"], { message: "Sex is required!" }),
  img: z.any(),
  students: z.array(z.string()).optional(),
});

type Inputs = z.infer<typeof schema>;

const ParentForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      // If you already have student data on update, you can pre-populate it
      students: data?.students || [],
    },
  });

  // State to hold the student list options
  const [studentOptions, setStudentOptions] = useState<
    { value: string; label: string }[]
  >([]);

  // Fetch students from your API on mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/students/by-school`, {
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
          label: `${student.firstName} ${student.lastName}`,
        }));
        setStudentOptions(options);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    const payload: {
      username: string;
      password: string;
      email: string;
      firstName: string;
      lastName: string;
      phone: string;
      address: string;
      bloodGroup: string;
      birthDate?: Date;
      gender: "male" | "female";
      image?: string;
      studentIds?: string[];
    } = {
      username: data.username,
      password: data.password,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      address: data.address,
      bloodGroup: data.bloodType,
      gender: data.sex,
      studentIds: data.students, // This will be an array of selected student IDs
    };

    if (data.birthday) {
      payload.birthDate = new Date(data.birthday!);
    }

    if (data.img && data.img.length > 0) {
      payload.image = await uploadFile(data.img[0]);
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/parents/with-school`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });

    if (response.status === 200) {
      toast.success("Parent created successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => {
        window.location.href = "/list/parents";
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
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Create a new parent</h1>

      <span className="text-xs text-gray-400 font-medium">
        Personal Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="First Name"
          name="firstName"
          defaultValue={data?.firstName}
          register={register}
          error={errors.firstName}
        />
        <InputField
          label="Last Name"
          name="lastName"
          defaultValue={data?.lastName}
          register={register}
          error={errors.lastName}
        />
        <InputField
          label="Phone"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors.phone}
        />
        <InputField
          label="Address"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors.address}
        />
        <InputField
          label="Blood Type"
          name="bloodType"
          defaultValue={data?.bloodType}
          register={register}
          error={errors.bloodType}
        />
        <InputField
          label="Birthday"
          name="birthday"
          defaultValue={data?.birthday}
          register={register}
          error={errors.birthday}
          type="date"
        />

        {/* Sex select */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Sex</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("sex")}
            defaultValue={data?.sex}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.sex?.message && (
            <p className="text-xs text-red-400">
              {errors.sex.message.toString()}
            </p>
          )}
        </div>

        {/* Image upload */}
        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
          <label
            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
            htmlFor="img"
          >
            <Image src="/upload.png" alt="" width={28} height={28} />
            <span>Upload a photo</span>
          </label>
          <input type="file" id="img" {...register("img")} className="hidden" />
          {errors.img?.message && (
            <p className="text-xs text-red-400">
              {errors.img.message.toString()}
            </p>
          )}
        </div>


      </div>

      <span className="text-xs text-gray-400 font-medium">
        Authentication Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Username"
          name="username"
          defaultValue={data?.username}
          register={register}
          error={errors?.username}
        />
        <InputField
          label="Email"
          name="email"
          defaultValue={data?.email}
          register={register}
          error={errors?.email}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          defaultValue={data?.password}
          register={register}
          error={errors?.password}
        />
      </div>

      <span className="text-xs text-gray-400 font-medium">
        Connect Parent to Students
      </span>
      <div className="flex justify-between flex-wrap gap-4">

        {/* Multi-Select for Students */}
        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-500">Select Students</label>
          <Controller
            name="students"
            control={control}
            render={({ field }) => (
              <Select
                isMulti
                options={studentOptions}
                onChange={(selectedOptions) =>
                  field.onChange(
                    selectedOptions
                      ? selectedOptions.map((option) => option.value)
                      : []
                  )
                }
                // Set the value based on the selected student IDs
                value={studentOptions.filter((option) =>
                  field.value?.includes(option.value)
                )}
                placeholder="Select students..."
              />
            )}
          />
          {errors.students && (
            <p className="text-xs text-red-400">
              {(errors.students as any).message}
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

export default ParentForm;




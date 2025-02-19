"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import InputField from "../inputField";
import { uploadFile } from "@/lib/upload-file";
import { toast } from "react-toastify";
import GenderSelect from "../GenderSelect";
import ImageUpload from "../ImageUpload";
import { useEffect, useState } from "react";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required!" }),
  email: z.string().email({ message: "Invalid email address!" })
    .or(z.string().max(0)),
  phone: z.string().min(1, { message: "Phone is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  bloodGroup: z.string().min(1, { message: "Blood Type is required!" }),
  birthDate: z.string().optional(),
  gender: z.enum(["male", "female"], { message: "Sex is required!" }),
  image: z.any(),
  //
  classId: z.string().optional(),
  parentId: z.string().optional(),
  //
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" })
    .or(z.string().max(0)),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .or(z.string().max(0)),
});

type Inputs = z.infer<typeof schema>;

const StudentForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const [classOptions, setClassOptions] = useState<{ value: string; label: string }[]>([]);
  const [parentOptions, setParentOptions] = useState<{ value: string; label: string }[]>([]);

  // Fetch class
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/classes/by-school`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch classes");
        }
        const j = await res.json();
        const classesData = j.data;
        // Map your API data to react-select option objects
        const options = classesData.map((_class: any) => ({
          value: _class.id,
          label: _class.name,
        }));
        setClassOptions(options);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

  const onSubmit = handleSubmit(async (data) => {


    const payload: {
      username: string;
      password: string;
      email: string;
      name: string;
      phone: string;
      address: string;
      bloodGroup: string;
      birthDate?: Date;
      gender: "male" | "female";
      image?: string;
      classId?: number;
      parentId?: number;
    } = {
      username: data.username,
      password: data.password,
      email: data.email,
      name: data.name,
      phone: data.phone,
      address: data.address,
      bloodGroup: data.bloodGroup,
      gender: data.gender,
      classId: data.classId ? Number(data.classId) : undefined,
      parentId: data.parentId ? Number(data.parentId) : undefined,
    };

    if (data.bloodGroup) {
      payload.birthDate = new Date(data.bloodGroup!);
    }

    if (data.image && data.image.length > 0) {
      payload.image = await uploadFile(data.image[0]);
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/students/with-school`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });

    if (response.status === 200) {
      toast.success("Student created successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => {
        window.location.href = "/list/students";
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

  // Fetch students
  useEffect(() => {
    const fetchParents = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/parents/by-school`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch parents");
        }
        const j = await res.json();
        const parentsData = j.data;
        // Map your API data to react-select option objects
        const options = parentsData.map((parent: any) => ({
          value: parent.id,
          label: parent.name,
        }));
        setParentOptions(options);
      } catch (error) {
        console.error("Error fetching parents:", error);
      }
    };

    fetchParents();
  }, []);

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Create a new student</h1>

      {/* Personal Information */}
      <hr className="border-gray-100" />
      <span className="text-xs text-gray-400 font-medium">        Personal Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField label="Name" name="name" defaultValue={data?.name} register={register} error={errors.name} />
        <InputField label="Email" name="email" defaultValue={data?.email} register={register} error={errors?.email} />
        <InputField label="Phone" name="phone" defaultValue={data?.phone} register={register} error={errors.phone} />
        <InputField label="Address" name="address" defaultValue={data?.address} register={register} error={errors.address} />
        <InputField label="Blood Group" name="bloodGroup" defaultValue={data?.bloodGroup} register={register} error={errors.bloodGroup} />
        <InputField label="Date of Birth" name="birthDate" defaultValue={data?.birthDate} register={register} error={errors.birthDate} type="date" />
        <GenderSelect register={register} error={errors.gender} defaultValue={data?.gender} />
        <ImageUpload register={register} error={errors.image} watch={watch} />
      </div>

      {/* Connection Information */}
      <hr className="border-gray-100" />
      <span className="text-xs text-gray-400 font-medium">Connection Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        {/* Class */}
        <div className="flex flex-col gap-2 w-full md:w-2/5">
          <label className="text-xs text-gray-500">Class</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("classId")}
            defaultValue={data?.classId}
          >
            <option value="" style={{ color: "#9CA3AF" }}>
              Select a class
            </option>
            {classOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors?.classId && <p className="text-xs text-red-400">{errors.classId?.message?.toString()}</p>}
        </div>

        {/* Parent */}
        <div className="flex flex-col gap-2 w-full md:w-2/5">
          <label className="text-xs text-gray-500">Parent</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("parentId")}
            defaultValue={data?.parentId}
          >
            <option value="" style={{ color: "#9CA3AF" }}>
              Select a parent
            </option>
            {parentOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors?.parentId && <p className="text-xs text-red-400">{errors.parentId?.message?.toString()}</p>}
        </div>
      </div>

      {/* Authentication Information */}
      <hr className="border-gray-100" />
      <span className="text-xs text-gray-400 font-medium">Authentication Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField label="Username" name="username" defaultValue={data?.username} register={register} error={errors?.username} />
        <InputField label="Password" name="password" type="password" defaultValue={data?.password} register={register} error={errors?.password} />
      </div>

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default StudentForm;
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../inputField";
import { uploadFile } from "@/lib/upload-file";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import GenderSelect from "../GenderSelect";
import ImageUpload from "../ImageUpload";
import MultiSelect from "../MultiSelect";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required!" }),
  phone: z.string().min(1, { message: "Phone is required!" }),
  email: z.string().email({ message: "Invalid email address!" })
    .or(z.string().max(0)),
  address: z.string().min(1, { message: "Address is required!" }),
  bloodGroup: z.string().min(1, { message: "Blood Type is required!" }),
  birthDate: z.string().optional(),
  gender: z.enum(["male", "female"], { message: "Sex is required!" }),
  image: z.any(),
  //
  studentsId: z.array(z.string()).optional(),
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

const ParentForm = ({
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
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const [studentOptions, setStudentOptions] = useState<{ value: string; label: string }[]>([]);

  // Fetch students
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
          label: student.name,
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
      name: string;
      phone: string;
      address: string;
      bloodGroup: string;
      birthDate?: Date;
      gender: "male" | "female";
      image?: string;
      studentsId?: string[];
    } = {
      username: data.username,
      password: data.password,
      email: data.email,
      name: data.name,
      phone: data.phone,
      address: data.address,
      bloodGroup: data.bloodGroup,
      gender: data.gender,
      studentsId: data.studentsId,
    };

    if (data.birthDate) {
      payload.birthDate = new Date(data.birthDate!);
    }

    if (data.image && data.image.length > 0) {
      payload.image = await uploadFile(data.image[0]);
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

      {/* Personal Information */}
      <hr className="border-gray-100" />
      <span className="text-xs text-gray-400 font-medium">Personal Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField label="First Name" name="name" defaultValue={data?.firstName} register={register} error={errors.name} />
        <InputField label="Phone" name="phone" defaultValue={data?.phone} register={register} error={errors.phone} />
        <InputField label="Email" name="email" defaultValue={data?.email} register={register} error={errors?.email} />
        <InputField label="Address" name="address" defaultValue={data?.address} register={register} error={errors.address} />
        <InputField label="Blood Group" name="bloodGroup" defaultValue={data?.bloodGroup} register={register} error={errors.bloodGroup} />
        <InputField label="Date of Birth" name="birthDate" defaultValue={data?.birthDate} register={register} error={errors.birthDate} type="date" />
        <GenderSelect register={register} error={errors.gender} defaultValue={data?.gender} />
        <ImageUpload register={register} error={errors.image} watch={watch} />
      </div>

      {/* Connect Parent to Students */}
      <hr className="border-gray-100" />
      <span className="text-xs text-gray-400 font-medium">Connect Parent to Students</span>
      <div className="flex justify-between flex-wrap gap-4">
        <MultiSelect label="Select Students" name="studentsId" control={control} error={errors?.studentsId?.message} options={studentOptions} />
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

export default ParentForm;




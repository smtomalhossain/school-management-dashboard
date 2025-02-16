"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../inputField";
import { uploadFile } from "@/lib/upload-file";
import { toast } from "react-toastify";
import GenderSelect from "../GenderSelect";
import ImageUpload from "../ImageUpload";
import MultiSelect from "../MultiSelect";

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
  classesId: z.array(z.string()).optional(),
  subjectsId: z.array(z.string()).optional(),
  //
  username: z.string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" })
    .or(z.string().max(0)),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .or(z.string().max(0)),
});

type Inputs = z.infer<typeof schema>;

const TeacherForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

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
    } = {
      username: data.username,
      password: data.password,
      email: data.email,
      name: data.name,
      phone: data.phone,
      address: data.address,
      bloodGroup: data.bloodGroup,
      gender: data.gender,
    };

    if (data.birthDate) {
      payload.birthDate = new Date(data.birthDate!);
    }

    if (data.image && data.image.length > 0) {
      payload.image = await uploadFile(data.image[0]);
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/teachers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });

    if (response.status === 200) {
      toast.success("Teacher created successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => {
        window.location.href = "/list/teachers";
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
      <h1 className="text-xl font-semibold">Add a new teacher</h1>


      {/* Personal info for teacher */}
      <hr className="border-gray-100" />
      <span className="text-xs text-gray-400 font-medium">Personal Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField label="Full Name" name="name" defaultValue={data?.name} register={register} error={errors.name} />
        <InputField label="Phone" name="phone" defaultValue={data?.phone} register={register} error={errors.phone} />
        <InputField label="Email" name="email" defaultValue={data?.email} register={register} error={errors?.email} />
        <InputField label="Address" name="address" defaultValue={data?.address} register={register} error={errors.address} />
        <InputField label="Blood Group" name="bloodGroup" defaultValue={data?.bloodGroup} register={register} error={errors.bloodGroup} />
        <InputField label="Date of Birth" name="birthDate" defaultValue={data?.birthDate} register={register} error={errors.birthDate} type="date" />
        <GenderSelect register={register} error={errors.gender} defaultValue={data?.gender} />
        <ImageUpload register={register} error={errors.image} watch={watch} />
      </div>

      {/* Connect info for teacher */}
      <hr className="border-gray-100" />
      <span className="text-xs text-gray-400 font-medium">Connection</span>
      <div className="flex justify-between flex-wrap gap-4">
        <MultiSelect name="classesId" options={[{ value: '1', label: "Teacher" }]} label="Classes" control={control} error={errors?.classesId?.message} />
        <MultiSelect name="subjectsId" options={[{ value: '1', label: "Subject" }]} label="Subjects" control={control} error={errors?.subjectsId?.message} />
      </div>

      {/* Authentication info for teacher */}
      <hr className="border-gray-100" />
      <span className="text-xs text-gray-400 font-medium">Authentication Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField label="Username" name="username" defaultValue={data?.username} register={register} error={errors?.username} />
        <InputField label="Password" name="password" type="password" defaultValue={data?.password} register={register} error={errors?.password} />
      </div>

      {/* Submit button */}
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default TeacherForm;
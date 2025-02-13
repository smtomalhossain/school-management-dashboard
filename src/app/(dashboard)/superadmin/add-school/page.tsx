"use client";

import { uploadFile } from "@/lib/upload-file";
import React, { ChangeEventHandler, useState } from "react";

const Page = () => {

  const [formData, setFormData] = useState({
    school_name: "",
    school_address: "",
    school_phone: "",
    school_email: "",
    school_logo: null,
    school_description: "",
    admin_name: "",
    admin_address: "",
    admin_phone: "",
    admin_image: null,
    admin_email: "",
    admin_username: "",
    admin_password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const schoolLogoUrl = await uploadFile(formData.school_logo);
    const adminImageUrl = await uploadFile(formData.admin_image);

    const payload = {
      ...formData,
      school_logo: schoolLogoUrl,
      admin_image: adminImageUrl,
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/schools/with-admin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });

    const result = await response.json();
    console.log(result);
  };


  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="border-b border-[#cacfd4] mb-5 pb-[18px]">
        <h3 className="text-black font-semibold">Create School</h3>
        <p className="text-gray-500 text-xs font-medium">
          Provide all the required information for your school, including an admin email and password for access.
        </p>
      </div>

      <div className="flex flex-col md:flex-row m-5 gap-8">
        <Section title="SCHOOL INFO">
          <Input label="School Name" name="school_name" onChange={handleChange} />
          <Input label="School Address" name="school_address" onChange={handleChange} />
          <Input label="School Email" name="school_email" type="email" onChange={handleChange} />
          <Input label="School Phone" name="school_phone" type="tel" onChange={handleChange} />
          <FileInput label="School Logo" name="school_logo" onChange={handleFileChange} />
          <Input label="School Description" name="school_description" onChange={handleChange} />
        </Section>

        <Section title="ADMIN INFO">
          <Input label="Admin Name" name="admin_name" onChange={handleChange} />
          <Input label="Admin Address" name="admin_address" onChange={handleChange} />
          <Input label="Admin Phone" name="admin_phone" type="tel" onChange={handleChange} />
          <FileInput label="Admin Picture" name="admin_image" onChange={handleFileChange} />
          <Input label="Admin Email" name="admin_email" type="email" onChange={handleChange} />
          <Input label="Admin Username" name="admin_username" onChange={handleChange} />
          <Input label="Admin Password" name="admin_password" type="password" onChange={handleChange} />
        </Section>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold text-gray-900">Cancel</button>
        <button type="submit" className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500">
          Submit
        </button>
      </div>
    </form>
  );
};

// Reusable Components
interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <div className="w-full md:w-1/2 pb-3 flex flex-col gap-4">
    <h3 className="text-sm font-semibold text-black">{title}</h3>
    {children}
  </div>
);

interface InputProps {
  label: string;
  name: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  type?: string;
}

const Input: React.FC<InputProps> = ({ label, name, type = "text", onChange }) => (
  <div className="col-span-full lg:sm:col-span-4">
    <label className="block text-sm/6 font-medium text-gray-900">{label}</label>
    <div className="mt-2">
      <div className="flex items-center rounded-md bg-white  outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
        <input
          name={name}
          type={type}
          onChange={onChange}
          className="ring-[1.5px] ring-gray-300 rounded-md  w-full block min-w-0 grow py-2 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
        />
      </div>
    </div>
  </div>
);

interface FileInputProps {
  label: string;
  name: string;
  note?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const FileInput: React.FC<FileInputProps> = ({ label, name, note, onChange }) => (
  <div className="text-sm text-gray-500 font-semibold mb-2 block">
    <label className="text-sm text-gray-500 font-semibold mb-2 block">{label}</label>
    <input name={name} onChange={onChange} type="file" className="w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 ring-[1.5px] ring-gray-300 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded" />
    {note && <p className="text-xs text-gray-400 mt-2">{note}</p>}
  </div>
);

export default Page;
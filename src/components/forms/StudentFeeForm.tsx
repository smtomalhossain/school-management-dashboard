"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../inputField";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Student = {
  id: number;
  studentId: string;
  name: string;
};

const schema = z.object({
  class: z.string().min(1, { message: "Class is required!" }),
  student: z.string().min(1, { message: "Student is required!" }),
  invoiceTitle: z.string().min(1, { message: "Invoice Title is required!" }),
  totalAmount: z.string().min(1, { message: "Total Amount is required!" }),
  discountAmount: z.string(), // Optional if not required
  paidAmount: z.string().min(1, { message: "Paid Amount is required!" }),
  status: z.string().min(1, { message: "Status is required!" }),
  paymentMethod: z.string().min(1, { message: "Payment Method is required!" }),
});

type Inputs = z.infer<typeof schema>;

const StudentFeeForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {

  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/students/by-school`, {
          method: "GET",
          credentials: "include",
        });

        if (res.status === 200) {
          const j = await res.json();
          const data = j.data;
          console.log(data);
          var studentList: Student[] = data.map((item: any) => {
            const student: Student = {
              id: item.id,
              studentId: item.id,
              name: item.firstName + " " + item.lastName,
            };
            return student;
          });

          setStudents(studentList);
        } else {
          console.error("Failed to fetch schools");
        }
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    };

    fetchStudents();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (formData) => {
    const payload: {
      totalAmount: number,
      discountAmount: number,
      paidAmount: number,
      details: string,
      status: string,
      date: Date,
      studentId: string
    } = {
      totalAmount: Number(formData.totalAmount),
      discountAmount: Number(formData.discountAmount),
      paidAmount: Number(formData.paidAmount),
      details: "Fee Payment",
      status: formData.status,
      date: new Date(),
      studentId: formData.student
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/fees/with-calclution`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });

    if (response.status === 200) {
      toast.success("Fee submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => {
        window.location.href = "/list/accounting/fees-collection";
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
      <h1 className="text-xl font-semibold">Student Fee Manager</h1>
      <span className="text-xs text-gray-400 font-medium">Fee Information</span>

      {/* First row: Class and Student */}
      <div className="flex flex-row justify-between flex-wrap">
        {/* Class */}
        <div className="flex flex-col gap-2 w-full md:w-2/5">
          <label className="text-xs text-gray-500">Class</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("class")}
            defaultValue=""
          >
            <option value="" disabled style={{ color: "#9CA3AF" }}>
              Select Class
            </option>
            <option value="one">One</option>
            <option value="two">Two</option>
            <option value="three">Three</option>
            <option value="four">Four</option>
            <option value="five">Five</option>
          </select>
          {errors.class?.message && (
            <p className="text-xs text-red-400">{errors.class.message}</p>
          )}
        </div>

        {/* Student */}
        <div className="flex flex-col gap-2 w-full md:w-2/5">
          <label className="text-xs text-gray-500">Select Student</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("student")}
            defaultValue={data?.student || ""}
          >
            <option value="" disabled>
              Select a Student
            </option>
            {students.map((student) => (
              <option key={student.id} value={student.studentId}>
                {student.name}
              </option>
            ))}
          </select>
          {errors.student?.message && (
            <p className="text-xs text-red-400">{errors.student.message}</p>
          )}
        </div>
      </div>

      {/* Second row: Other fields */}
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Invoice Title"
          name="invoiceTitle"
          defaultValue={data?.invoiceTitle || ""}
          register={register}
          error={errors.invoiceTitle}
        />
        <InputField
          label="Total Amount"
          name="totalAmount"
          defaultValue={data?.totalAmount || ""}
          register={register}
          error={errors.totalAmount}
        />
        <InputField
          label="Discount Amount"
          name="discountAmount"
          defaultValue={data?.discountAmount || ""}
          register={register}
          error={errors.discountAmount}
        />
        <InputField
          label="Paid Amount"
          name="paidAmount"
          defaultValue={data?.paidAmount || ""}
          register={register}
          error={errors.paidAmount}
        />

        {/* Status */}
        <div className="flex flex-col gap-2 w-full md:w-2/5">
          <label className="text-xs text-gray-500">Status</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("status")}
            defaultValue="paid"
          >
            <option value="" disabled style={{ color: "#9CA3AF" }}>
              Select a status
            </option>
            <option value="Paid" >Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>
          {errors.status?.message && (
            <p className="text-xs text-red-400">{errors.status.message}</p>
          )}
        </div>

        {/* Payment Method */}
        <div className="flex flex-col gap-2 w-full md:w-2/5">
          <label className="text-xs text-gray-500">Payment Method</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("paymentMethod")}
            defaultValue="cash"
          >
            <option value="" disabled style={{ color: "#9CA3AF" }}>
              Select a payment method
            </option>
            <option value="cash">Cash</option>
            <option value="bkash">BKash</option>
            <option value="bank">Bank</option>
          </select>
          {errors.paymentMethod?.message && (
            <p className="text-xs text-red-400">{errors.paymentMethod.message}</p>
          )}
        </div>
      </div>

      <button type="submit" className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default StudentFeeForm;

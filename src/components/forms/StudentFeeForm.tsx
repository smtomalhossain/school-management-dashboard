import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import InputField from "../inputField";

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

type FeeType = {
  id: number;
  title: string;
  amount: string;
};

const StudentFeeForm = ({
  type,
  data,
}: any) => {
  const [students, setStudents] = useState<any[]>([]);
  const [classOptions, setClassOptions] = useState<{ value: string; label: string }[]>([]);
  const [feeType, setFeeType] = useState<FeeType[]>([]);
  const [selectedFee, setSelectedFee] = useState<FeeType | null>(null);

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
          const studentList = data.map((item: any) => ({
            id: item.id,
            studentId: item.id,
            name: item.name,
          }));
          setStudents(studentList);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    const fetchClasses = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/classes/by-school`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch classes");

        const j = await res.json();
        const classesData = j.data;
        const options = classesData.map((_class: any) => ({
          value: _class.id,
          label: _class.name,
        }));
        setClassOptions(options);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    const fetchFeeTypes = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/fee-types/by-school`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch fee types");

        const j = await res.json();
        const feeTypesData = j.data;
        const options: FeeType[] = feeTypesData.map((feeType: any) => ({
          id: feeType.id,
          title: feeType.title,
          amount: feeType.amount,
        }));
        setFeeType(options);
      } catch (error) {
        console.error("Error fetching fee types:", error);
      }
    };

    fetchStudents();
    fetchClasses();
    fetchFeeTypes();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (formData) => {

    const selectedFee = feeType.find((fee) => fee.id.toString() === formData.invoiceTitle);

    const payload = {
      totalAmount: Number(formData.totalAmount),
      discountAmount: Number(formData.discountAmount),
      paidAmount: Number(formData.paidAmount),
      details: selectedFee?.title,
      status: formData.status,
      date: new Date(),
      studentId: formData.student,
    };

    // console.log(payload);
    // return;

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

  const handleFeeTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = feeType.find(fee => fee.id === Number(e.target.value));
    setSelectedFee(selected || null);
    if (selected) {
      setValue("invoiceTitle", selected.id.toString());
      setValue("totalAmount", selected.amount.toString());
      setValue("discountAmount", "0");
      setValue("paidAmount", selected.amount.toString());
    }
  };

  const handleDiscountAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const discountAmount = Number(e.target.value);
    const totalAmount = selectedFee ? Number(selectedFee.amount) : 0;
    const paidAmount = totalAmount - discountAmount;
    setValue("discountAmount", discountAmount.toString());
    setValue("paidAmount", paidAmount.toString());
  }

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
            {classOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.class?.message && <p className="text-xs text-red-400">{errors.class.message}</p>}
        </div>

        {/* Student */}
        <div className="flex flex-col gap-2 w-full md:w-2/5">
          <label className="text-xs text-gray-500">Select Student</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("student")}
            defaultValue={data?.student || ""}
          >
            <option value="" disabled>Select a Student</option>
            {students.map((student) => (
              <option key={student.id} value={student.studentId}>
                {student.name}
              </option>
            ))}
          </select>
          {errors.student?.message && <p className="text-xs text-red-400">{errors.student.message}</p>}
        </div>
      </div>

      {/* Second row: Other fields */}
      <div className="flex justify-between flex-wrap gap-4">
        {/* Invoice Title */}
        <div className="flex flex-col gap-2 w-full md:w-2/5">
          <label className="text-xs text-gray-500">Invoice Title</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("invoiceTitle")}
            onChange={handleFeeTypeChange}
            defaultValue={data?.invoiceTitle || ""}
          >
            <option value="" disabled>Select Fee Type</option>
            {feeType.map((fee) => (
              <option key={fee.id} value={fee.id}>
                {fee.title}
              </option>
            ))}
          </select>
          {errors.invoiceTitle?.message && <p className="text-xs text-red-400">{errors.invoiceTitle.message}</p>}
        </div>

        {/* Total Amount */}
        <InputField
          label="Total Amount"
          name="totalAmount"
          defaultValue={data?.totalAmount || ""}
          register={register}
          error={errors.totalAmount}
          // disabled
        />


        {/* <InputField
          label="Discount Amount"
          name="discountAmount"
          defaultValue={data?.discountAmount || ""}
          register={register}
          error={errors.discountAmount}
        /> */}


        <div className="flex flex-col gap-2 w-full md:w-2/5">
          <label className="text-xs text-gray-500">{"Discount Amount"}</label>
          <input
            type={type}
            {...register("discountAmount")}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            defaultValue={data?.discountAmount || ""}
            onChange={handleDiscountAmountChange}
          />
          {errors.discountAmount?.message && (
            <p className="text-xs text-red-400">{errors.discountAmount.message.toString()}</p>
          )}
        </div>

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
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>
          {errors.status?.message && <p className="text-xs text-red-400">{errors.status.message}</p>}
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
          {errors.paymentMethod?.message && <p className="text-xs text-red-400">{errors.paymentMethod.message}</p>}
        </div>
      </div>

      <button type="submit" className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default StudentFeeForm;

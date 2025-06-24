import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import InputField from "../inputField";
import SingleSelect from "../SingleSelect";
import MultiSelect from "../MultiSelect";
import Select from "react-select";


const schema = z.object({
  class: z.string().min(1, { message: "Class is required!" }),
  student: z.string().min(1, { message: "Student is required!" }),
  invoiceTitle: z.string().min(1, { message: "Invoice Title is required!" }),
  totalAmount: z.string().min(1, { message: "Total Amount is required!" }),
  discountAmount: z.string(), // Optional if not required
  paidAmount: z.string().min(1, { message: "Paid Amount is required!" }),
  status: z.string().min(1, { message: "Status is required!" }),
  paymentMethod: z.string().min(1, { message: "Payment Method is required!" }),
  months: z.array(z.string()).optional(),
  year: z.string().optional(),
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
  onSuccess,
}: {
  type: "create" | "update";
  data?: Inputs;
  onSuccess?: () => void;
}) => {
  const [studentOptions, setStudentOptions] = useState<{ value: string; label: string }[]>([]);
  const [classOptions, setClassOptions] = useState<{ value: string; label: string }[]>([]);
  const [feeType, setFeeType] = useState<FeeType[]>([]);
  const [selectedFee, setSelectedFee] = useState<FeeType | null>(null);
  const [months, setMonths] = useState<{ value: string; label: string }[]>([{
    value: "1",
    label: "January",
  }, {
    value: "2",
    label: "February",
  }, {
    value: "3",
    label: "March",
  }, {
    value: "4",
    label: "April",
  }, {
    value: "5",
    label: "May",
  }, {
    value: "6",
    label: "June",
  }, {
    value: "7",
    label: "July",
  }, {
    value: "8",
    label: "August",
  }, {
    value: "9",
    label: "September",
  }, {
    value: "10",
    label: "October",
  }, {
    value: "11",
    label: "November",
  }, {
    value: "12",
    label: "December",
  }]);

  const [years, setYears] = useState<{ value: string; label: string }[]>([]);

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
            value: item.id,
            label: item.name,
          }));
          setStudentOptions(studentList);
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

    const fetchYears = () => {
      const currentYear = new Date().getFullYear();
      const nextYear = currentYear + 1;
      const years = Array.from({ length: 10 }, (_, i) => nextYear - i).map(year => ({
        value: year.toString(),
        label: year.toString(),
      }));
      setYears(years);
    }

    fetchStudents();
    fetchClasses();
    fetchFeeTypes();
    fetchYears();
  }, []);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (formData) => {

    // const selectedFee = feeType.find((fee) => fee.id.toString() === formData.invoiceTitle);

    const payload = {
      totalAmount: Number(formData.totalAmount),
      discountAmount: Number(formData.discountAmount),
      paidAmount: Number(formData.paidAmount),
      details: selectedFee?.title,
      status: formData.status,
      date: new Date(),
      studentId: formData.student,
      year: formData && Number(formData.year),
      months: formData?.months?.map((month: string) => Number(month)),
      feeTypeId: formData.invoiceTitle,
    };

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
      onSuccess && onSuccess();
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
      setValue("months", []);
      setValue("discountAmount", "");
      setValue("paidAmount", selected.amount.toString());
    }
  };

  const handleDiscountAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const discountAmount = Number(e.target.value);
    const totalAmount = Number(getValues("totalAmount"));//selectedFee ? Number(selectedFee.amount) : 0;
    const paidAmount = totalAmount - discountAmount;
    // setValue("discountAmount", discountAmount.toString());
    setValue("paidAmount", paidAmount.toString());
  }

  const handleMonthsChange = (selectedOptions: any) => {
    if (!selectedFee) return;
    const months = selectedOptions.map((option: any) => option.value);
    if (months.length === 0) {
      setValue("totalAmount", selectedFee?.amount?.toString());
    } else {
      setValue("totalAmount", (Number(selectedFee.amount ?? "0") * (months?.length ?? 0)).toString());
    }

    const discountAmount = Number(getValues("discountAmount"));
    setValue("paidAmount", (Number(getValues("totalAmount")) - discountAmount).toString());
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Fee Collection</h1>
      <span className="text-xs text-gray-400 font-medium">Fee Information</span>

      {/* First row: Class and Student */}
      <div className="flex flex-row justify-between flex-wrap">
        {/* Class */}
        <SingleSelect
          register={register}
          name="class"
          label="Class"
          options={classOptions}
          defaultValue={data?.class}
          unselectable="Select Class"
          error={errors.class} />


        {/* Student */}
        <SingleSelect
          register={register}
          name="student"
          label="Select Student"
          options={studentOptions}
          defaultValue={data?.student}
          unselectable="Select a Student"
          error={errors.student} />
      </div>

      {/* Second row: Other fields */}
      <div className="flex justify-between flex-wrap gap-4">
        {/* Invoice Title */}
        <SingleSelect
          register={register}
          name="invoiceTitle"
          label="Fee Type"
          options={feeType.map((fee) => ({ value: fee.id.toString(), label: fee.title }))}
          defaultValue={data?.invoiceTitle}
          unselectable="Select a Fee Type"
          error={errors.invoiceTitle}
          onChange={handleFeeTypeChange} />

        {/* Months */}
        <MultiSelect
          label="Months"
          name="months"
          control={control}
          error={errors.months}
          options={months}
          placeholder="Select Months"
          onChange={handleMonthsChange}
        // defaultValue={data?.months} 
        />

        {/* Select Year */}
        {years.length > 0 && <SingleSelect
          register={register}
          name="year"
          label="Select Year"
          options={years}
          defaultValue={data?.year || new Date().getFullYear().toString()}
          unselectable="Select a Year"
          error={errors.year} />}

        {/* Total Amount */}
        <InputField
          label="Total Amount"
          name="totalAmount"
          defaultValue={data?.totalAmount}
          register={register}
          error={errors.totalAmount}
        // disabled
        />

        <InputField
          label="Discount Amount"
          name="discountAmount"
          defaultValue={data?.discountAmount}
          register={register}
          error={errors.discountAmount}
          onChange={handleDiscountAmountChange}
        />

        <InputField
          label="Paid Amount"
          name="paidAmount"
          defaultValue={data?.paidAmount}
          register={register}
          error={errors.paidAmount}
        />

        {/* Status */}
        <SingleSelect
          register={register}
          name="status"
          label="Status"
          options={[
            { value: "Paid", label: "Paid" },
            { value: "Unpaid", label: "Unpaid" },
          ]}
          defaultValue={"paid"}
          unselectable="Select a status"
          error={errors.status} />

        {/* Payment Method */}
        <SingleSelect
          register={register}
          name="paymentMethod"
          label="Payment Method"
          options={[
            { value: "cash", label: "Cash" },
            { value: "bkash", label: "BKash" },
            { value: "bank", label: "Bank" },
          ]}
          defaultValue={"cash"}
          unselectable="Select a payment method"
          error={errors.paymentMethod} />
      </div>

      <button type="submit" className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default StudentFeeForm;

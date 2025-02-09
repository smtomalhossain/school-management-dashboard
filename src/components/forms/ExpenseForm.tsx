"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../inputField";
import { toast } from "react-toastify";

// Define a new Zod schema for the Expense form.
const expenseSchema = z.object({
  title: z.string().min(1, { message: "Expense title is required!" }),
  amount: z.preprocess(
    (val) => {
      if (typeof val === "string") return parseFloat(val);
      return val;
    },
    z
      .number({ invalid_type_error: "Amount is required!" })
      .positive({ message: "Amount must be a positive number!" })
  ),
  // paymentMethod: z.enum(["Cash", "BKash", "Bank"], {
  //   required_error: "Payment method is required!",
  // }),
  date: z.string().min(1, { message: "Date is required!" }),
  // .preprocess(
  //   (val) => {
  //     if (typeof val === "string" || val instanceof Date) return new Date(val);
  //     return val;
  //   },
  //   z.date({ required_error: "Date is required!" })
  // ),
});

type Inputs = z.infer<typeof expenseSchema>;

interface ExpenseFormProps {
  type: "create" | "update";
  data?: Partial<Inputs>;
}

const ExpenseForm = ({ type, data }: ExpenseFormProps) => {
  // Set up the form using our expenseSchema.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(expenseSchema),
    // Optionally provide default values from passed data.
    defaultValues: {
      title: data?.title,
      amount: data?.amount,
      // paymentMethod: data?.paymentMethod || "Cash",
      // Convert a Date (or date string) to the YYYY-MM-DD format expected by an input[type="date"]
      date: data?.date
        ? new Date(data.date).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
    },
  });

  const onSubmit = handleSubmit(async (formData) => {

    const payload: {
      amount: number;
      date: Date;
      details: string;
    } = {
      amount: formData.amount,
      date: new Date(formData.date),
      details: formData.title,
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/expenses/with-calclution`, {
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
        window.location.href = "list/accounting/expenses";
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
      <h1 className="text-xl font-semibold">Expense Manager</h1>
      <span className="text-xs text-gray-400 font-medium">
        Expense Information
      </span>

      <div className="flex flex-row justify-between flex-wrap gap-4">
        {/* Expense Title Field */}
        <InputField
          label="Expense Title"
          name="title"
          defaultValue={data?.title}
          register={register}
          error={errors.title}
        />

        {/* Amount Field */}
        <InputField
          label="Amount"
          name="amount"
          defaultValue={
            data?.amount !== undefined ? data.amount.toString() : ""
          }
          register={register}
          error={errors.amount}
          type="number"
        // step="0.01"
        />

        {/* Payment Method Select */}
        {/* <div className="flex flex-col gap-2 w-full md:w-2/5">
          <label className="text-xs text-gray-500">Payment Method</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("paymentMethod")}
            defaultValue={data?.paymentMethod || ""}
          >
            <option value="" disabled>
              Select a payment method
            </option>
            <option value="Cash">Cash</option>
            <option value="BKash">BKash</option>
            <option value="Bank">Bank</option>
          </select>
          {errors.paymentMethod?.message && (
            <p className="text-xs text-red-400">
              {errors.paymentMethod.message}
            </p>
          )}
        </div> */}

        {/* Date Field */}
        <InputField
          label="Date"
          name="date"
          defaultValue={
            data?.date
              ? new Date(data.date).toISOString().split("T")[0]
              : ""
          }
          register={register}
          error={errors.date}
          type="date"
        />
      </div>

      <button type="submit" className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default ExpenseForm;

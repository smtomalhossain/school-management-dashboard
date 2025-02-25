"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import FeeTypeForm from "./forms/FeesTypeForm";
import { toast } from "react-toastify";

const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  loading: () => <h1>Loading...</h1>,
});
const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ParentForm = dynamic(() => import("./forms/ParentForm"), {
  loading: () => <h1>Loading...</h1>,
});
const SubjectForm = dynamic(() => import("./forms/SubjectForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ClassesForm = dynamic(() => import("./forms/ClassesForm"), {
  loading: () => <h1>Loading...</h1>,
});
const LessonForm = dynamic(() => import("./forms/LessonForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ExamForm = dynamic(() => import("./forms/ExamForm"), {
  loading: () => <h1>Loading...</h1>,
});
const AssignmentForm = dynamic(() => import("./forms/AssignmentForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ResultForm = dynamic(() => import("./forms/ResultForm"), {
  loading: () => <h1>Loading...</h1>,
});
const StudentFeeForm = dynamic(() => import("./forms/StudentFeeForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ExpenseForm = dynamic(() => import("./forms/ExpenseForm"), {
  loading: () => <h1>Loading...</h1>,
});

const forms: {
  [key: string]: (
    type: "create" | "update",
    data?: any,
    onSuccess?: () => void,
  ) => JSX.Element;
} = {
  teacher: (type, data, onSuccess) => <TeacherForm type={type} data={data} />,
  student: (type, data, onSuccess) => <StudentForm type={type} data={data} onSuccess={onSuccess} />,
  parent: (type, data, onSuccess) => <ParentForm type={type} data={data} />,
  subject: (type, data, onSuccess) => <SubjectForm type={type} data={data} />,
  class: (type, data, onSuccess) => <ClassesForm type={type} data={data} />,
  lesson: (type, data, onSuccess) => <LessonForm type={type} data={data} />,
  exam: (type, data, onSuccess) => <ExamForm type={type} data={data} />,
  assignment: (type, data, onSuccess) => <AssignmentForm type={type} data={data} />,
  result: (type, data, onSuccess) => <ResultForm type={type} data={data} />,
  studentFee: (type, data, onSuccess) => <StudentFeeForm type={type} data={data} />,
  expense: (type, data, onSuccess) => <ExpenseForm type={type} data={data} />,
  feesType: (type, data, onSuccess) => <FeeTypeForm type={type} data={data} />,
};

const FormModal = ({
  table,
  type,
  data,
  id,
  onSuccess,
}: {
  table:
  | "teacher"
  | "student"
  | "parent"
  | "subject"
  | "parent"
  | "class"
  | "lesson"
  | "exam"
  | "assignment"
  | "result"
  | "attendance"
  | "event"
  | "announcement"
  | "studentFee"
  | "feesType"
  | "expense";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number;
  onSuccess?: () => void;
}) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-tomYellow"
      : type === "update"
        ? "bg-tomSky"
        : "bg-tomPurple";
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      let deleteUrl: string | undefined = undefined;

      switch (table) {
        case "student":
          deleteUrl = `/api/students/${id}`;
          break;
      }

      if (deleteUrl) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${deleteUrl}`, {
          method: "DELETE",
          credentials: "include",
        });

        if (res.status === 200) {
          toast.success("Deleted successfully");
          onSuccess && onSuccess();
        } else {
          toast.error("Failed to delete");
        }
      }

      setOpen(false);
    } catch (error) {
      toast.error("Failed to delete");
      console.log(error);
    }
  };

  const Form = () => {
    return type === "delete" && id ? (
      <form action="" className="p-4 flex flex-col gap-4">
        <span className="text-center font-medium">
          All data will be lost. Are you sure you went to delete this
        </span>
        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
          Delete
        </button>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[table](type, data, () => {
        setOpen(false);
        onSuccess && onSuccess();
      })
    ) : (
      "Form not found!"
    );
  };

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt="" width={16} height={16} />
      </button>
      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60] xl:w-[50%] 2xl:w-[40%]">
            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="" width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;

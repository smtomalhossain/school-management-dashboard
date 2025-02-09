"use client";

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import FinanceChart from "@/components/FinanceChart";
import DropdownCom from "@/components/DropdownCom";
import { useEffect, useState } from "react";
import { SCHOOL_ADMIN } from "@/lib/roles";

type Fees = {
  id: number;
  invoiceId: string;
  invoiceTitle: string;
  name: string;
  totalAmount: string;
  discountAmount: string;
  paidAmount: number;
  photo: string;
  class: string;
  status: string;
  date: string;
};

const columns = [
  {
    header: "Student",
    accessor: "name",
  },
  {
    header: "Class",
    accessor: "class",
    className: "hidden lg:table-cell md:hidden",
  },
  {
    header: "Invoice Id",
    accessor: "invoiceId",
    className: "hidden lg:table-cell md:hidden",
  },
  {
    header: "Invoice Title",
    accessor: "invoiceTitle",
    className: "hidden lg:table-cell md:hidden",
  },

  {
    header: "Discount Amount",
    accessor: "discountAmount",
    className: "hidden lg:table-cell md:hidden",
  },
  {
    header: "Total Amount",
    accessor: "totalAmount",
    className: "hidden lg:table-cell md:hidden",
  },
  {
    header: "Paid Amount",
    accessor: "paidAmount",
    className: "hidden lg:table-cell md:hidden",
  },
  {
    header: "Status",
    accessor: "status",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

type Analytics = {
  thisMonthExpense: number;
  thisMonthIncome: number;
  todayExpense: number;
  todayIncome: number;
  totalExpense: number;
  totalIncome: number;
};

const FeesPage = () => {
  const [role, setRole] = useState<string>("");
  const [fees, setFees] = useState<Fees[]>([]);
  const [analytics, setAnalytics] = useState<Analytics>();

  useEffect(() => {
    const user = localStorage.getItem("user.sms");
    const role = user ? JSON.parse(user).role : null;
    setRole(role);
  }, []);

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/fees/by-school`, {
          method: "GET",
          credentials: "include",
        });

        if (res.status === 200) {
          const j = await res.json();
          const data = j.data;
          console.log(data);
          var schoolList: Fees[] = data.map((item: any) => {
            const fees: Fees = {
              id: item.id,
              name: item.student.firstName + " " + item.student.lastName,
              photo: item?.student?.image && `http://localhost:9000/profile-pictures/${item.student.image}`,
              class: item.class,
              invoiceId: item.id,
              invoiceTitle: item.details,
              discountAmount: item.discountAmount,
              totalAmount: item.totalAmount,
              paidAmount: item.paidAmount,
              date: new Date(item.date).toLocaleString(
                "en-US",
                {
                  timeZone: "Asia/Dhaka",
                  hour12: true,
                  hour: "numeric",
                  minute: "numeric",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              ),
              status: item.status,
            };
            return fees;
          });

          setFees(schoolList);
        } else {
          console.error("Failed to fetch schools");
        }
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    };

    fetchFees();
  }, []);

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/accounts/analytics`, {
          method: "GET",
          credentials: "include",
        });

        if (res.status === 200) {
          const j = await res.json();
          const data = j.data;
          console.log(data);

          setAnalytics(data);

        } else {
          console.error("Failed to fetch analytics");
        }
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    };

    fetchFees();
  }, []);

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-400";
      case "Unpaid":
        return "bg-sky-300";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  const renderRow = (item: Fees) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-tomPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.photo || "http://localhost:9000/profile-pictures/avatar.jpg"}
          alt=""
          width={40}
          height={40}
          className=" w-10 h-10 rounded-full object-cover"
          onError={(e) => (e.currentTarget.src = "http://localhost:9000/profile-pictures/avatar.jpg")}
        />
        <h3 className="font-semibold">{item.name}</h3>
      </td>
      <td className="hidden lg:table-cell md:hidden ">{item.class}</td>
      <td className="hidden lg:table-cell ">{item.invoiceId}</td>
      <td className="hidden lg:table-cell">{item.invoiceTitle}</td>
      <td className="hidden lg:table-cell">{item.discountAmount}</td>
      <td className="hidden lg:table-cell">{item.totalAmount}</td>
      <td className="hidden lg:table-cell">
        {item.paidAmount}
        <p className="text-xs text-gray-500">
          <span className="text-black font-semibold text-xs">
            Payment date:
          </span>{" "}
          {item.date}
        </p>
      </td>
      <td className=" md:table-cell font-semibold">
        <span className={`px-2 py-1 rounded ${getStatusBgColor(item.status)}`}>
          {item.status}
        </span>
      </td>
      <td>
        <div className="flex items-center gap-2">
          {role === SCHOOL_ADMIN && (
            <>
              <FormModal table="studentFee" type="update" data={item} />
              <FormModal table="studentFee" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <>
      <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
        {/* LEFT */}
        <div className="w-full xl:w-2/3">
          {/* TOP */}
          <div className="flex flex-col lg:flex-row gap-2">
            {/* SMALL CARD */}
            <div className="flex-1 flex gap-4 justify-between flex-wrap">
              {/* CARD */}
              <div className="bg-tomPurple  p-4 rounded-md flex justify-center items-center gap-4 w-full md:w-[48%] xl:w-[48%] 2xl:w-[48%] h-[180px]">
                <div className="flex flex-col justify-center items-center gap-3">
                  <h1 className="text-xl font-semibold ">{analytics?.thisMonthIncome || 0}</h1>
                  <span className="text-1xl text-blue-950 font-bold">
                    {" "}
                    This Month Income
                  </span>
                </div>
              </div>

              {/* CARD */}
              <div className="bg-tomYellow p-4 rounded-md flex justify-center items-center gap-4 w-full md:w-[48%] xl:w-[48%] 2xl:w-[48%] h-[180px]">
                <div className="flex flex-col justify-center items-center gap-3">
                  <h1 className="text-xl font-semibold ">{analytics?.thisMonthExpense || 0}</h1>
                  <span className="text-1xl text-blue-950 font-bold">
                    {" "}
                    This Month Expense
                  </span>
                </div>
              </div>

              {/* CARD */}
              <div className="bg-tomPurple p-4 rounded-md flex justify-center items-center gap-4 w-full md:w-[48%] xl:w-[48%] 2xl:w-[48%] h-[180px]">
                <div className="flex flex-col justify-center items-center gap-3">
                  <h1 className="text-xl font-semibold ">{analytics?.todayIncome || 0}</h1>
                  <span className="text-1xl text-blue-950 font-bold">
                    Today Income
                  </span>
                </div>
              </div>

              {/* CARD */}
              <div className="bg-tomYellow  p-4 rounded-md flex justify-center items-center gap-4 w-full md:w-[48%] xl:w-[48%] 2xl:w-[48%] h-[180px]">
                <div className="flex flex-col justify-center items-center gap-3">
                  <h1 className="text-xl font-semibold ">{analytics?.todayExpense || 0}</h1>
                  <span className="text-1xl text-blue-950 font-bold">
                    {" "}
                    Today Expense
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* RIGHT */}
        <div className="flex flex-col gap-4 w-full xl:w-3/3">
          <div className="w-full h-[375px]">
            <FinanceChart />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
        {/* TOP */}
        <div className="flex items-center justify-between">
          <h1 className="hidden md:block text-lg font-semibold">
            Fees Collection
          </h1>
          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <TableSearch />
            <div className="flex items-center gap-4 self-end">
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-tomYellow">
                <Image src="/filter.png" alt="" width={14} height={14} />
              </button>
              {/* <button className="w-8 h-8 flex items-center justify-center rounded-full bg-tomYellow">
                <Image src="/sort.png" alt="" width={14} height={14} />
              </button> */}
              <DropdownCom />
              {role === SCHOOL_ADMIN && (
                <FormModal table="studentFee" type="create" />
              )}
            </div>
          </div>
        </div>
        {/* LIST */}
        <Table columns={columns} renderRow={renderRow} data={fees} />
        {/* PAGINATION */}
        <Pagination />
      </div>
    </>
  );
};

export default FeesPage;

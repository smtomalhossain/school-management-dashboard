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

type Expense = {
  id: number;
  expanseTitle: string;
  paymentMethod: string;
  amount: string;
  date: string;
};

const columns = [
  {
    header: "Expanse Title",
    accessor: "expanseTitle",
  },
  {
    header: "Amount",
    accessor: "amount",
  },

  {
    header: "Payment Method",
    accessor: "paymentMethod",
    className: "hidden md:table-cell",

  },

  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",

  },
  {
    header: "Actions",
    accessor: "actions",
  },

];

const ExpensePage = () => {
  const [role, setRole] = useState<string>("");
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const user = localStorage.getItem("user.sms");
    const role = user ? JSON.parse(user).role : null;
    setRole(role);
  }, []);

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/expenses/by-school`, {
          method: "GET",
          credentials: "include",
        });

        if (res.status === 200) {
          const j = await res.json();
          const data = j.data;
          console.log(data);
          var expenseList: Expense[] = data.map((item: any) => {
            const exp: Expense = {
              id: item.id,
              amount: item.amount,
              expanseTitle: item.details,
              paymentMethod: "Cash",
              date: new Date(item.date).toLocaleString(
                "en-US",
                {
                  timeZone: "Asia/Dhaka",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              ),
            };
            return exp;
          });

          setExpenses(expenseList);
        } else {
          console.error("Failed to fetch schools");
        }
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    };

    fetchFees();
  }, []);
  const renderRow = (item: Expense) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-tomPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.expanseTitle}</td>
      <td className=" md:table-cell">{item.amount}</td>
      <td className="hidden md:table-cell">{item.paymentMethod}</td>
      <td className="hidden md:table-cell">{item.date}</td>
      <div className="flex items-center gap-2">
        {role === SCHOOL_ADMIN && (
          <>
            <FormModal table="expense" type="update" id={item.id} />
            <FormModal table="expense" type="delete" id={item.id} />
          </>
        )}
      </div>
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
            <div className="flex flex-col w-full gap-4 justify-between">

              {/* CARD */}
              <div className="bg-tomYellow p-4 rounded-md flex justify-center items-center gap-4 w-full  h-[180px]">
                <div className="flex flex-col justify-center items-center gap-3">
                  <h1 className="text-xl font-semibold ">2000.00</h1>
                  <span className="text-1xl text-blue-950 font-bold">
                    {" "}
                    Today Expense
                  </span>
                </div>
              </div>

              {/* CARD */}
              <div className="bg-tomPurple p-4 rounded-md flex justify-center items-center gap-4 w-full  h-[180px]">
                <div className="flex flex-col justify-center items-center gap-3">
                  <h1 className="text-xl font-semibold ">60000.00</h1>
                  <span className="text-1xl text-blue-950 font-bold">
                    This month Expense
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
              {role === SCHOOL_ADMIN && <FormModal table="expense" type="create" />}
            </div>
          </div>
        </div>
        {/* LIST */}
        <Table columns={columns} renderRow={renderRow} data={expenses} />
        {/* PAGINATION */}
        <Pagination />
      </div>
    </>
  );
};

export default ExpensePage;

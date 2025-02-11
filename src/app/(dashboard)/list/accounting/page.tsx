import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { feesData, role, studentsData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import FinanceChart from "@/components/FinanceChart";
import DropdownCom from "@/components/DropdownCom";

type Fees = {
  id: number;
  invoiceId: string;
  invoiceTitle: string;
  name: string;
  amount: string;
  totalAmount: string;
  paidAmount: number;
  photo: string;
  class: string;
  status: string;
  date: "string";
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
    header: "Amount",
    accessor: "amount",
    className: "hidden lg:table-cell md:hidden",
  },
  {
    header: "Total Amount",
    accessor: "totalAmount",
    className: "hidden lg:table-cell md:hidden",
  },
  {
    header: "Paid Amount",
    accessor: " paidAmount",
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

const FeesPage = () => {
  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-400";
      case "unpaid":
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
          src={item.photo}
          alt=""
          width={40}
          height={40}
          className=" w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item.date}</p>
        </div>
      </td>
      <td className="hidden lg:table-cell md:hidden ">{item.class}</td>
      <td className="hidden lg:table-cell ">{item.invoiceId}</td>
      <td className="hidden lg:table-cell">{item.invoiceTitle}</td>
      <td className="hidden lg:table-cell">{item.amount}</td>
      <td className="hidden lg:table-cell">{item.totalAmount}</td>
      <td className="hidden lg:table-cell">{item.paidAmount}</td>
      <td className=" md:table-cell font-semibold">
        <span className={`px-2 py-1 rounded ${getStatusBgColor(item.status)}`}>
          {item.status}
        </span>
      </td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/teacher/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-tomSky">
              <Image src="/edit.png" alt="" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            <FormModal table="student" type="delete" id={item.id} />
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
              <div className="bg-tomPurple  p-4 rounded-md flex justify-center items-center gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%] h-[180px]">
                <div className="flex flex-col justify-center items-center gap-3">
                  <h1 className="text-xl font-semibold ">38000.00</h1>
                  <span className="text-1xl text-blue-950 font-bold">
                    {" "}
                    This Month Income
                  </span>
                </div>
              </div>

              {/* CARD */}
              <div className="bg-tomYellow p-4 rounded-md flex justify-center items-center gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%] h-[180px]">
                <div className="flex flex-col justify-center items-center gap-3">
                  <h1 className="text-xl font-semibold ">82000.00</h1>
                  <span className="text-1xl text-blue-950 font-bold">
                    {" "}
                    This Month Expense
                  </span>
                </div>
              </div>

              {/* CARD */}
              <div className="bg-tomPurple p-4 rounded-md flex justify-center items-center gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%] h-[180px]">
                <div className="flex flex-col justify-center items-center gap-3">
                  <h1 className="text-xl font-semibold ">6000.00</h1>
                  <span className="text-1xl text-blue-950 font-bold">
                    Today Income
                  </span>
                </div>
              </div>

              {/* CARD */}
              <div className="bg-tomYellow  p-4 rounded-md flex justify-center items-center gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%] h-[180px]">
                <div className="flex flex-col justify-center items-center gap-3">
                  <h1 className="text-xl font-semibold ">0.00</h1>
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
              {role === "admin" && <FormModal table="student" type="create" />}
            </div>
          </div>
        </div>
        {/* LIST */}
        <Table columns={columns} renderRow={renderRow} data={feesData} />
        {/* PAGINATION */}
        <Pagination />
      </div>
    </>
  );
};

export default FeesPage;

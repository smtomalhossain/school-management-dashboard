import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { assignmentsData, feeTypeData, role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

type FeeType = {
  id: number;
  feeTitle: string;
  amount: string;
  note: string;
};

const columns = [
  {
    header: "Fees Title",
    accessor: "feeTitle",
  },
  {
    header: "Amount",
    accessor: "amount",
    className: "hidden md:table-cell",
  },
  {
    header: "Note",
    accessor: "note",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

const FeeTypePage = () => {
  const renderRow = (item: FeeType) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-tomPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.feeTitle}</td>
      <td className="hidden md:table-cell">{item.amount}</td>
      <td className="hidden md:table-cell">{item.note}</td>
      <td>
        <div className="flex items-center gap-2">
        {(role === "admin" || role === "teacher") && (
            <>
              <FormModal table="feesType" type="update" data={item} />
              <FormModal table="feesType" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          All Fee Type
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-tomYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-tomYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {(role === "admin" ||role === "teacher") && (
                <FormModal table="feesType" type="create" />
              )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={feeTypeData} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default FeeTypePage;

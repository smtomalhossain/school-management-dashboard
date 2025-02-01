import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, schoolListDate } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

type School = {
  id: number;
  adminName: string;
  schoolName: string;
  totalStudent: string;
  phone: string;
  address: string;
  status: string;
};

const columns = [
  {
    header: "Admin Name",
    accessor: "adminName",
  },
  {
    header: "School Names",
    accessor: "schoolName",
    className: "hidden lg:table-cell md:hidden",
  },
  {
    header: "Total Student",
    accessor: "totalStudent",
    className: "hidden lg:table-cell md:hidden",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell md:hidden",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell md:hidden",
  },
  {
    header: "Status",
    accessor: "status",
    className: "hidden lg:table-cell md:hidden",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

const SuperAdminPage = () => {
  const renderRow = (item: School) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-tomPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <h3 className="font-semibold">{item.adminName}</h3>
      </td>
      <td className="hidden lg:table-cell ">{item.schoolName}</td>
      <td className="hidden lg:table-cell ">{item.totalStudent}</td>
      <td className="hidden lg:table-cell">{item.phone}</td>
      <td className="hidden lg:table-cell">{item.address}</td>
      <td className="hidden lg:table-cell">{item.status}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="parent" type="update" data={item} />
              <FormModal table="parent" type="delete" id={item.id} />
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
          All School List
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            {/* <button className="w-8 h-8 flex items-center justify-center rounded-full bg-tomYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-tomYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="parent" type="create" />} */}
            <Link href="superadmin/add-school">
              <button className="items-center justify-center border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-medium py-2 px-4 rounded-md transition-all float-right m-1">
                +Add School
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={schoolListDate} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default SuperAdminPage;

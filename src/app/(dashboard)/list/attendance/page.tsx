import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { attendanceDate, role } from "@/lib/data";
import Image from "next/image";

type Attendance = {
  id: number;
  name: string;
  class: string;
  studentId: string;
  date: string;
  inTime: string;
  status: string;
};

const columns = [
  {
    header: "Student Name",
    accessor: "name",
  },
  {
    header: "Class",
    accessor: "class",
    className: "hidden md:table-cell",

  },
  {
    header: "Student Id",
    accessor: "studentId",
    className: "hidden md:table-cell",

  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    header: "In Time",
    accessor: "inTime",
    className: "hidden md:table-cell",

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

const AnnouncementListPage = () => {
    const getStatusBgColor = (status: string) => {
        switch (status) {
          case "Present":
            return "bg-green-400";
          case "Delay":
            return "bg-sky-300";
          case "Absent":
            return "bg-red-400 text-white";
          default:
            return "bg-gray-100 text-gray-700";
        }
      };
  const renderRow = (item: Attendance) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-tomPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.name}</td>
      <td className="hidden md:table-cell">{item.class}</td>
      <td className="hidden md:table-cell">{item.studentId}</td>
      <td className="hidden md:table-cell">{item.date}</td>
      <td className="hidden md:table-cell">{item.inTime}</td>
      <td className=" ">
        <span
          className={`px-2 py-1 rounded ${getStatusBgColor(item.status)}`}
        >
          {item.status}
        </span>
      </td>
      <td>
        <div className="flex items-center gap-2">
        {role === "admin"  && (
            <>
              <FormModal table="attendance" type="update" data={item} />
              <FormModal table="attendance" type="delete" id={item.id} />
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
        <h1 className="hidden md:block text-lg font-semibold">All Attendance</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-tomYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-tomYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="attendance" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={attendanceDate} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default AnnouncementListPage;

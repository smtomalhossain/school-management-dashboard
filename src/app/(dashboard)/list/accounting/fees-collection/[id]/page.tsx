"use client";

import { useTable } from "react-table";
import { useMemo } from "react";
import Pagination from "@/components/Pagination";

// Define the type for a single student's fee data
type StudentFeeData = {
  studentName?: string;
  january?: string;
  february?: string;
  march?: string;
  april?: string;
  may?: string;
  june?: string;
  july?: string;
  august?: string;
  september?: string;
  october?: string;
  november?: string;
  december?: string;
};

export default function FeeCollectionPage() {
  // Sample data for students and their fee status
  const data = useMemo<StudentFeeData[]>(
    () => [
      {
        studentName: "Tomal Hossain",
        january: "Paid",
        february: "Paid",
        march: "Paid",
      },
    ],
    [] // Empty dependency array ensures data is stable
  );

  // Define columns for the table
  const columns = useMemo(
    () => [
      {
        Header: "Student Name",
        accessor: "studentName" as const, // Use `as const` to infer the correct type
      },
      {
        Header: "January",
        accessor: "january" as const,
      },
      {
        Header: "February",
        accessor: "february" as const,
      },
      {
        Header: "March",
        accessor: "march" as const,
      },
      {
        Header: "April",
        accessor: "april" as const,
      },
      {
        Header: "May",
        accessor: "may" as const,
      },
      {
        Header: "June",
        accessor: "june" as const,
      },
      {
        Header: "July",
        accessor: "july" as const,
      },
      {
        Header: "August",
        accessor: "august" as const,
      },
      {
        Header: "September",
        accessor: "september" as const,
      },
      {
        Header: "October",
        accessor: "october" as const,
      },
      {
        Header: "November",
        accessor: "november" as const,
      },
      {
        Header: "December",
        accessor: "december" as const,
      },
    ],
    [] // Empty dependency array ensures columns are stable
  );

  // Use react-table to create the table instance
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* HEADER */}
      <div className="flex-row md:flex-row lg:flex items-center justify-between pb-4">
        <h1 className="items-center md:block text-2xl font-semibold">
          2025 Fees Summary
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
          <div className="flex flex-col gap-1 w-full ">
            <label className="text-xs text-gray-500">Year</label>
            <select
              className="ring-[1.5px] ring-gray-300 p-[10px] rounded-md text-sm w-full"
              //   {...register("class")}
            >
              <option value="" style={{ color: "#9CA3AF" }}>
                Select Year
              </option>
              <option value="one">2020-21</option>
              <option value="two">2021-22</option>
              <option value="three">2022-23</option>
              <option value="four">2023-24</option>
              <option value="five">2024-25</option>
            </select>
            {/* {errors.class?.message && (
      <p className="text-xs text-red-400">{errors.class.message}</p>
    )} */}
          </div>
        </div>
      </div>
      {/* Wrap the table in a scrollable container for mobile responsiveness */}
      <div className="overflow-x-auto">
        <table
          {...getTableProps()}
          className="min-w-full bg-white border border-gray-300"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="p-3 font-semibold text-left bg-gray-100 border border-gray-200 whitespace-nowrap"
                    key={column.id}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="hover:bg-gray-50"
                  key={row.id}
                >
                  {row.cells.map((cell) => {
                    // Apply conditional text color based on the cell value
                    const cellValue = cell.value;
                    const textColor =
                      cellValue === "Paid"
                        ? "text-green-600" // Green text for "Paid"
                        : cellValue === "Unpaid"
                        ? "text-red-600" // Red text for "Unpaid"
                        : "text-gray-800"; // Default text color

                    return (
                      <td
                        {...cell.getCellProps()}
                        className={`p-3 border border-gray-200 ${textColor} whitespace-nowrap`}
                        key={cell.column.id}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

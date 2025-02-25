"use client";

import Link from "next/link";
import React, { useMemo, useState, useCallback } from "react";
import { useTable, Column, CellProps } from "react-table";

// Define the shape of a student's data
interface Student {
  name: string;
  days: string[]; // Array of "P" or "A"
}

const AttendanceSheet: React.FC = () => {
  // Sample data for students
  const [data, setData] = useState<Student[]>([
    { name: "Tomal", days: Array(30).fill("A") }, // A for Absent, P for Present
    { name: "Anik", days: Array(30).fill("P") },
    { name: "Mokbul", days: Array(30).fill("A") },
    { name: "Munna", days: Array(30).fill("P") },
  ]);

  // Update attendance status
  const updateAttendance = useCallback((rowIndex: number, dayIndex: number) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[rowIndex].days[dayIndex] =
        newData[rowIndex].days[dayIndex] === "P" ? "A" : "P";
      return newData;
    });
  }, []); // No dependencies needed because we use the functional update form

  // Define columns for the table
  const columns: Column<Student>[] = useMemo(
    () => [
      {
        Header: "Student Name",
        accessor: "name", // Accessor matches the key in the data
        width: 150, // Fixed width for the student name column
        Cell: ({ value }: CellProps<Student, string>) => (
          <Link
            href={`/list/attendance/student-attendance/1`} // Example link
            className=""
          >
            {value}
          </Link>
        ),
      },
      ...Array.from({ length: 30 }, (_, i) => ({
        Header: `${i + 1}`, // Shortened header for days
        accessor: `days[${i}]`, // Accessor for each day
        Cell: ({ row, value }: CellProps<Student, string>) => (
          <button
            onClick={() => updateAttendance(row.index, i)}
            className={`w-6 h-6 flex items-center justify-center text-sm ${
              value === "P"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {value}
          </button>
        ),
        width: 35, // Fixed width for each day column
      })),
    ],
    [updateAttendance] // Add `updateAttendance` as a dependency
  );

  // Use react-table to create the table instance
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<Student>({
      columns,
      data,
    });

  return (
    <div className="p-4 bg-white m-4 mt-0 rounded-md">
      <div className="flex-row md:flex-row lg:flex items-center justify-between pb-4">
        <h1 className="items-center md:block text-2xl font-semibold">
          Student Fees Summary
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

          <div className="flex flex-col gap-1 w-full ">
            <label className="text-xs text-gray-500 ">Month</label>
            <select
              className="ring-[1.5px] ring-gray-300 p-[10px] rounded-md text-sm w-full"
              //   {...register("class")}
            >
              <option value="" style={{ color: "#9CA3AF" }}>
                Select a Month
              </option>
              <option value="one">Jan</option>
              <option value="two">Feb</option>
              <option value="two">Mar</option>
            </select>
            {/* {errors.class?.message && (
      <p className="text-xs text-red-400">{errors.class.message}</p>
    )} */}
          </div>
          <div className="flex flex-col gap-1 w-full ">
            <label className="text-xs text-gray-500 ">Class</label>
            <select
              className="ring-[1.5px] ring-gray-300 p-[10px] rounded-md text-sm w-full"
              //   {...register("class")}
            >
              <option value="" style={{ color: "#9CA3AF" }}>
                Select a Exam
              </option>
              <option value="one">One</option>
              <option value="two">Tow</option>
              <option value="two">Three</option>
              <option value="two">Four</option>
              <option value="two">Five</option>
            </select>
            {/* {errors.class?.message && (
      <p className="text-xs text-red-400">{errors.class.message}</p>
    )} */}
          </div>
        </div>
      </div>
      <div className="overflow-x-auto mt-4">
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
                    className="p-1 border border-gray-300 bg-gray-100 text-left"
                    style={{ width: column.width }} // Set column width
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
                <tr {...row.getRowProps()} key={row.id}>
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="p-1 py-2 border border-gray-300"
                      style={{ width: cell.column.width }} // Set column width
                      key={cell.column.id}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceSheet;

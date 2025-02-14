"use client"; // Mark as a Client Component

import { studentsData } from "@/lib/data";
import { useState, useEffect, useMemo } from "react";
import { useTable } from "react-table";

interface AttendanceProps {
  onCancel: () => void; // Callback to close the component
}

const Attendance: React.FC<AttendanceProps> = ({ onCancel }) => {
  const [attendance, setAttendance] = useState<Record<number, string>>({});

  // Initialize attendance status for all students (runs only once)
  useEffect(() => {
    const initialAttendance: Record<number, string> = {};
    studentsData.forEach((student) => {
      initialAttendance[student.id] = "present"; // Default to present
    });
    setAttendance(initialAttendance);
  }, []); // Empty dependency array ensures it runs only once

  // Handle radio button change
  const handleAttendanceChange = (id: number, status: string) => {
    setAttendance((prev) => {
      if (prev[id] === status) return prev; // Avoid unnecessary updates
      return { ...prev, [id]: status };
    });
  };

  // Mark all students as absent
  const markAllAbsent = () => {
    const updatedAttendance: Record<number, string> = {};
    studentsData.forEach((student) => {
      updatedAttendance[student.id] = "absent";
    });
    setAttendance(updatedAttendance);
  };

  // Mark all students as present
  const markAllPresent = () => {
    const updatedAttendance: Record<number, string> = {};
    studentsData.forEach((student) => {
      updatedAttendance[student.id] = "present";
    });
    setAttendance(updatedAttendance);
  };

  // Submit attendance
  const handleSubmit = () => {
    console.log("Attendance Submitted:", attendance);
    alert("Attendance submitted successfully!");
  };

  // React Table columns and data
  const columns = useMemo(
    () => [
      { Header: "Roll", accessor: "id" },
      { Header: "Name", accessor: "name" },
      {
        Header: "Attendance",
        accessor: "attendance",
        Cell: ({ row }: any) => (
          <div className="flex gap-2">
            <label>
              <input
                type="radio"
                name={`attendance-${row.original.id}`}
                value="present"
                checked={attendance[row.original.id] === "present"}
                onChange={() => handleAttendanceChange(row.original.id, "present")}
              />
              Present
            </label>
            <label>
              <input
                type="radio"
                name={`attendance-${row.original.id}`}
                value="absent"
                checked={attendance[row.original.id] === "absent"}
                onChange={() => handleAttendanceChange(row.original.id, "absent")}
              />
              Absent
            </label>
          </div>
        ),
      },
    ],
    [attendance] // Re-render when attendance changes
  );

  const data = useMemo(() => studentsData, []);

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <div className="">
      {/* <h1 className="text-2xl font-bold mb-4">Student Attendance</h1> */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={markAllAbsent}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Mark All Absent
        </button>
        <button
          onClick={markAllPresent}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Mark All Present
        </button>
      </div>
      <table {...getTableProps()} className="w-full border-collapse">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="border p-2 bg-gray-200"
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
              <tr {...row.getRowProps()} className="border">
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="border p-2">
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-4 flex justify-end gap-4">
        {/* Cancel Button */}
        <button
          onClick={onCancel}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white mt-4 px-4 py-2 rounded"
        >
          Submit Attendance
        </button>
      </div>
    </div>
  );
};

export default Attendance;
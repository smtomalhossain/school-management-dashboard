"use client"; // Mark as a Client Component

import { useState, useEffect, useMemo } from "react";
import { useTable } from "react-table";
import { toast, ToastContainer } from "react-toastify";

interface AttendanceProps {
  onCancel: () => void; // Callback to close the component
  selectedClassId: string | undefined;
}

type AttendanceStatus = 'Present' | 'Absent';
type Attendance = {
  status: AttendanceStatus;
  inTime: Date;
  classId: number;
  studentId: number;
}

const TakeAttendance: React.FC<AttendanceProps> = ({ onCancel, selectedClassId }) => {
  const [students, setStudents] = useState<{ id: number; name: string }[]>([]);
  const [attendance, setAttendance] = useState<Record<number, Attendance>>({});

  // Fetch students
  useEffect(() => {
    const fetchStudents = async () => {
      if (!selectedClassId) {
        return;
      }
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/students/by-class/${selectedClassId}`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch students");
        }
        const j = await res.json();
        const studentsData = j.data;
        setStudents(studentsData);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [selectedClassId]);

  // Initialize attendance status for all students (runs only once)
  useEffect(() => {
    const initialAttendance: Record<number, Attendance> = {};
    students.forEach((student) => {
      initialAttendance[student.id] = {
        status: "Present",
        inTime: new Date(),
        classId: selectedClassId ? Number(selectedClassId) : -1,
        studentId: student.id,
      }; // Default to present
    });
    setAttendance(initialAttendance);
  }, [students, selectedClassId]); // Runs when students are fetched

  // Handle radio button change
  const handleAttendanceChange = (id: number, status: AttendanceStatus) => {
    setAttendance((prev) => {
      if (prev[id].status === status) return prev; // Avoid unnecessary updates
      return {
        ...prev, [id]: {
          ...prev[id],
          status
        }
      };
    });
  };

  // Mark all students as absent
  const markAllAbsent = () => {
    const updatedAttendance: Record<number, Attendance> = {};
    students.forEach((student) => {
      updatedAttendance[student.id] = {
        status: "Absent",
        inTime: new Date(),
        classId: selectedClassId ? Number(selectedClassId) : -1,
        studentId: student.id,
      };
    });
    setAttendance(updatedAttendance);
  };

  // Mark all students as present
  const markAllPresent = () => {
    const updatedAttendance: Record<number, Attendance> = {};
    students.forEach((student) => {
      updatedAttendance[student.id] = {
        status: "Present",
        inTime: new Date(),
        classId: selectedClassId ? Number(selectedClassId) : -1,
        studentId: student.id,
      };
    });
    setAttendance(updatedAttendance);
  };

  // Submit attendance
  const handleSubmit = async () => {
    console.log("Attendance Submitted:", attendance);
    // alert("Attendance submitted successfully!");
    const payload = [];

    for (const key in attendance) {
      payload.push(attendance[key]);
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/attendances/bulk`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      toast.success("Attendance submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
      })
    } else {
      toast.error("Failed to submit attendance", {
        position: "top-right",
        autoClose: 3000,
      })
    }

    console.log(response);
  };

  // React Table columns and data
  const columns: any = useMemo(
    () => [
      { Header: "Student ID", accessor: "id" },
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
                value="Present"
                checked={attendance[row.original.id]?.status === "Present"}
                onChange={() => handleAttendanceChange(row.original.id, "Present")}
              />
              Present
            </label>
            <label>
              <input
                type="radio"
                name={`attendance-${row.original.id}`}
                value="Absent"
                checked={attendance[row.original.id]?.status === "Absent"}
                onChange={() => handleAttendanceChange(row.original.id, "Absent")}
              />
              Absent
            </label>
          </div>
        ),
      },
    ],
    [attendance] // Re-render when attendance changes
  );

  const data = useMemo(() => students, [students]);

  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <div>
      <ToastContainer/>
      <div className="flex gap-2 mb-4">
        <button onClick={markAllAbsent} className="bg-red-500 text-white px-4 py-2 rounded">
          Mark All Absent
        </button>
        <button onClick={markAllPresent} className="bg-green-500 text-white px-4 py-2 rounded">
          Mark All Present
        </button>
      </div>
      <table {...getTableProps()} className="w-full border-collapse">
        <thead>
          {headerGroups.map((headerGroup) => {
            const { key, ...rest } = headerGroup.getHeaderGroupProps();
            return(
            <tr key={key} {...rest}>
              {headerGroup.headers.map((column) => 
              {
                const {key, ...rest} = column.getHeaderProps(); 
                return (<th key={key} {...rest} className="border p-2 bg-gray-200">
                    {column.render("Header")}
                  </th>
                )})}
            </tr>
          )})}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            const { key, ...rest } = row.getRowProps();
            return (
              <tr key={key} {...rest} className="border">
                {row.cells.map((cell) => {
                  const { key, ...rest } = cell.getCellProps();
                  return (
                  <td key={key} {...rest} className="border p-2">
                    {cell.render("Cell")}
                  </td>
                )})}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-4 flex justify-end gap-4">
        <button onClick={onCancel} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
          Cancel
        </button>
        <button onClick={handleSubmit} className="bg-blue-500 text-white mt-4 px-4 py-2 rounded">
          Submit Attendance
        </button>
      </div>
    </div>
  );
};

export default TakeAttendance;

"use client";

import { useState } from "react";

// Sample student data
const student = {
  id: 1,
  name: "Tomal Hossain",
};

// Generate February dates
const generateFebruaryDates = (year: number): string[] => {
  const dates: string[] = [];
  const daysInFebruary = new Date(year, 2, 0).getDate(); // Get the number of days in February
  for (let i = 1; i <= daysInFebruary; i++) {
    const date = new Date(year, 1, i); // February is month 1 (0-indexed)
    dates.push(date.toISOString().split("T")[0]); // Format as YYYY-MM-DD
  }
  return dates;
};

const dates = generateFebruaryDates(2023); // Generate dates for February 2023

// Attendance status options
const attendanceStatus = {
  PRESENT: "Present",
  ABSENT: "Absent",
  LATE: "Late",
} as const;

type AttendanceStatus = keyof typeof attendanceStatus;

// Define the shape of the attendance state
type AttendanceState = Record<string, string>;

// Get day names (e.g., Sun, Mon, Tue, etc.)
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Demo data
export const demoData = [
    { date: "2023-02-01", status: "Present" },
    { date: "2023-02-02", status: "Absent" },
    { date: "2023-02-03", status: "Late" },
    { date: "2023-02-04", status: "Present" },
    { date: "2023-02-05", status: "Off" },
    { date: "2023-02-06", status: "Present" },
    { date: "2023-02-07", status: "Present" },
    { date: "2023-02-08", status: "Late" },
    { date: "2023-02-09", status: "Present" },
    { date: "2023-02-10", status: "Absent" },
    { date: "2023-02-11", status: "Off" },
    { date: "2023-02-12", status: "Present" },
    { date: "2023-02-13", status: "Late" },
    { date: "2023-02-14", status: "Present" },
    { date: "2023-02-15", status: "Absent" },
    { date: "2023-02-16", status: "Present" },
    { date: "2023-02-17", status: "Off" },
    { date: "2023-02-18", status: "Present" },
    { date: "2023-02-19", status: "Late" },
    { date: "2023-02-20", status: "Present" },
    { date: "2023-02-21", status: "Absent" },
    { date: "2023-02-22", status: "Present" },
    { date: "2023-02-23", status: "Off" },
    { date: "2023-02-24", status: "Present" },
    { date: "2023-02-25", status: "Late" },
    { date: "2023-02-26", status: "Present" },
    { date: "2023-02-27", status: "Absent" },
    { date: "2023-02-28", status: "Present" },
  ];

export default function SingleStudentAttendanceCalendar() {
  // Initialize attendance state with demoData only
  const [attendance, setAttendance] = useState<AttendanceState>(() => {
    const initialAttendance: AttendanceState = {};

    // Only use demoData to populate the attendance state
    demoData.forEach((entry) => {
      initialAttendance[entry.date] = entry.status;
    });

    return initialAttendance;
  });

  // Update attendance status for a specific date
  const updateAttendance = (date: string, status: string) => {
    const dayOfWeek = new Date(date).getDay();
    if (dayOfWeek === 0) return; // Do not allow updates for Fridays
    setAttendance((prev) => ({
      ...prev,
      [date]: status,
    }));
  };

  // Calculate total Present, Absent, and Late days (excluding Fridays)
  const totalPresent = Object.entries(attendance).filter(
    ([date, status]) =>
      status === attendanceStatus.PRESENT && new Date(date).getDay() !== 7
  ).length;
  const totalAbsent = Object.entries(attendance).filter(
    ([date, status]) =>
      status === attendanceStatus.ABSENT && new Date(date).getDay() !== 7
  ).length;
  const totalLate = Object.entries(attendance).filter(
    ([date, status]) =>
      status === attendanceStatus.LATE && new Date(date).getDay() !== 7
  ).length;

  return (
    <div className="p-4 bg-white m-4 mt-0 rounded">
      <div className="flex-row md:flex-row lg:flex items-center justify-between pb-4">
        <h1 className="items-center md:block text-2xl font-semibold">
        Attendance for {student.name} (February 2023)
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


        </div>
      </div>

      {/* Total Counts */}
      <div className="flex gap-4 mb-6">
        <div className="bg-green-100 p-3 rounded-md">
          <span className="text-green-800 font-semibold">
            Present: {totalPresent}
          </span>
        </div>
        <div className="bg-red-100 p-3 rounded-md">
          <span className="text-red-800 font-semibold">
            Absent: {totalAbsent}
          </span>
        </div>
        <div className="bg-yellow-100 p-3 rounded-md">
          <span className="text-yellow-800 font-semibold">
            Late: {totalLate}
          </span>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Day Names Row */}
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center font-semibold text-gray-700 py-2 bg-gray-100 rounded-md"
          >
            {day}
          </div>
        ))}

        {/* Dates and Attendance Statuses */}
        {dates.map((date) => {
          const status = attendance[date] || ""; // Blank if no status exists
          const dayOfWeek = new Date(date).getDay();
          const isFriday = dayOfWeek === 0; // Check if the day is Friday

          return (
            <div
              key={date}
              className={`p-3 rounded-md text-center ${
                isFriday
                  ? "bg-blue-100 text-blue-800 cursor-not-allowed" // Style for Fridays
                  : status === attendanceStatus.PRESENT
                  ? "bg-green-600 text-white cursor-pointer"
                  : status === attendanceStatus.ABSENT
                  ? "bg-red-600 text-white cursor-pointer"
                  : status === attendanceStatus.LATE
                  ? "bg-gray-500 text-white cursor-pointer"
                  : "bg-gray-100 text-gray-800 cursor-pointer"
              }`}
              onClick={() => {
                if (isFriday) return; // Do nothing if it's Friday
                // Cycle through attendance statuses
                if (status === attendanceStatus.PRESENT) {
                  updateAttendance(date, attendanceStatus.ABSENT);
                } else if (status === attendanceStatus.ABSENT) {
                  updateAttendance(date, attendanceStatus.LATE);
                } else if (status === attendanceStatus.LATE) {
                  updateAttendance(date, "");
                } else {
                  updateAttendance(date, attendanceStatus.PRESENT);
                }
              }}
            >
              <div className="text-sm">
                {new Date(date).toLocaleDateString("en-US", {
                  day: "numeric",
                })}
              </div>
              <div className="text-xs mt-1">
                {isFriday ? "Off" : status || "-"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
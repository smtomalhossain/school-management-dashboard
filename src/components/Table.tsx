"use client";

import React from "react";

interface Column {
  header: string;
  accessor: string;
  className?: string;
}

interface TableProps<T> {
  columns: Column[];
  data: T[];
  renderRow: (item: T) => React.ReactNode;
}

const Table = <T extends { id?: string | number }>({
  columns,
  data,
  renderRow,
}: TableProps<T>) => {
  return (
    <table className="w-full mt-4 border border-gray-200 rounded-md overflow-hidden">
      <thead>
        <tr className="text-left text-gray-500 text-sm bg-gray-100">
          {columns.map((col) => (
            <th key={col.accessor} className={`p-2 ${col.className || ""}`}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => renderRow(item))}
      </tbody>
    </table>
  );
};

export default Table;

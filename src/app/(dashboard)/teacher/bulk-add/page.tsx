"use client";

import React, { useState } from 'react';
import { z } from 'zod';

const Spreadsheet = () => {
  // Define a header row and some initial data rows.
  const header = ["Name", "Email", "Photo", "Address", "Date of Birth"];
  const initialData = [
    ["John Doe", "john@example.com", "", "123 Main St", "1990-01-01"],
    ["Jane Smith", "jane@example.com", "", "456 Elm St", "1995-05-15"],
  ];

  // Zod schema for validation
  const rowSchema = z.object({
    name: z.string().min(1, "Name cannot be empty"),
    email: z.string().email("Invalid email format"),
    photo: z.any(),
    address: z.string().min(1, "Address cannot be empty"),
    dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  });

  // Store the data rows in a state hook.
  const [data, setData] = useState<(string | File | null)[][]>(initialData);
  const [errors, setErrors] = useState<Record<number, { name?: string; email?: string; address?: string; dateOfBirth?: string }>>({});

  // Update a cell's value based on its row and column indexes.
  const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
    const newData = data.map((row, rIndex) => {
      if (rIndex === rowIndex) {
        return row.map((cell, cIndex) => (cIndex === colIndex ? value : cell));
      }
      return row;
    });
    setData(newData);
  };

  // Handle file input for photos
  const handleFileChange = (rowIndex: number, file: File | null) => {
    const newData = data.map((row, rIndex) => {
      if (rIndex === rowIndex) {
        return [...row.slice(0, 2), file, ...row.slice(3)];
      }
      return row;
    });
    setData(newData);
  };

  // Validate data before submission
  const validateData = () => {
    let isValid = true;
    let newErrors: Record<number, { name?: string; email?: string; address?: string; dateOfBirth?: string }> = {};
    data.forEach((row, rowIndex) => {
      const validation = rowSchema.safeParse({
        name: row[0],
        email: row[1],
        photo: row[2],
        address: row[3],
        dateOfBirth: row[4],
      });
      if (!validation.success) {
        isValid = false;
        const errorDetails = validation.error.flatten().fieldErrors;
        newErrors[rowIndex] = {
          name: errorDetails.name?.[0],
          email: errorDetails.email?.[0],
          address: errorDetails.address?.[0],
          dateOfBirth: errorDetails.dateOfBirth?.[0],
        };
      }
    });
    setErrors(newErrors);
    return isValid;
  };

  // Add a new blank row
  const addRow = () => {
    const newRow = header.map(() => "");
    setData([...data, newRow]);
  };

  // Submit data and log it to the console
  const handleSubmit = () => {
    if (validateData()) {
      console.log("Submitted Data:", data);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Google Sheets-Like Page</h1>
      <table border={1} cellPadding="5" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            {header.map((colName, index) => (
              <th key={index} style={{ background: "#f0f0f0" }}>{colName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>
                  {colIndex === 2 ? (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(rowIndex, e.target.files?.[0] || null)}
                    />
                  ) : colIndex === 4 ? (
                    <input
                      type="date"
                      value={cell as string}
                      onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                    />
                  ) : (
                    <input
                      type="text"
                      value={cell as string}
                      onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                    />
                  )}
                  {
                    errors[rowIndex] &&
                    ((colIndex === 0 && errors[rowIndex].name) ||
                      (colIndex === 1 && errors[rowIndex].email) ||
                      (colIndex === 3 && errors[rowIndex].address) ||
                      (colIndex === 4 && errors[rowIndex].dateOfBirth)) && (
                      <div style={{ color: "red", fontSize: "12px" }}>
                        {colIndex === 0 ? errors[rowIndex].name :
                          colIndex === 1 ? errors[rowIndex].email :
                            colIndex === 3 ? errors[rowIndex].address :
                              colIndex === 4 ? errors[rowIndex].dateOfBirth : ""}
                      </div>
                    )
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <button onClick={addRow}>Add Row</button>
      <button onClick={handleSubmit} style={{ marginLeft: "10px" }}>Submit</button>
    </div>
  );
};

export default Spreadsheet;
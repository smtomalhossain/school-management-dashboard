import React from 'react';

const SingleStudentMarksheet = () => {
  // Sample data for a single student
  const student = {
    name: 'John Doe',
    rollNumber: '101',
    class: 'Five',
    marks: {
      english: 85,
      math: 90,
      science: 78,
      history: 88,
      geography: 92,
    },
  };

  // Function to calculate total marks
  const calculateTotal = (marks: { [key: string]: number }) => {
    return Object.values(marks).reduce((total, mark) => total + mark, 0);
  };

  // Function to calculate percentage
  const calculatePercentage = (total: number, numberOfSubjects: number) => {
    return ((total / (numberOfSubjects * 100)) * 100).toFixed(2);
  };

  const totalMarks = calculateTotal(student.marks);
  const percentage = calculatePercentage(totalMarks, Object.keys(student.marks).length);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6">
          <h1 className="text-3xl font-bold text-center">Student Mark Sheet</h1>
        </div>

        {/* Student Details */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Student Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="text-lg font-medium">{student.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Roll Number</p>
              <p className="text-lg font-medium">{student.rollNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Class</p>
              <p className="text-lg font-medium">{student.class}</p>
            </div>
          </div>
        </div>

        {/* Marks Table */}
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Subject-wise Marks</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Marks Obtained
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Maximum Marks
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.entries(student.marks).map(([subject, marks]) => (
                <tr key={subject}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                    {subject}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {marks}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    100
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total and Percentage */}
        <div className="p-6 bg-gray-50">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Total Marks</p>
              <p className="text-lg font-medium">{totalMarks}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Percentage</p>
              <p className="text-lg font-medium">{percentage}%</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 p-4 text-center">
          <p className="text-sm text-gray-500">© 2023 School Name. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default SingleStudentMarksheet;
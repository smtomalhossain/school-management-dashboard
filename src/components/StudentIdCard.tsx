import React from 'react';

const StudentIDCard = () => {
  // Sample data for a student
  const student = {
    name: 'John Doe',
    rollNumber: '101',
    class: 'Five',
    section: 'A',
    bloodGroup: 'O+',
    dateOfBirth: '01/01/2010',
    address: '123 Main St, City, Country',
    photoUrl: '/tom.jpeg', // Placeholder image URL
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-96 bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 text-center">
          <h1 className="text-2xl font-bold">School Name</h1>
          <p className="text-sm">Student ID Card</p>
        </div>

        {/* Student Photo */}
        <div className="p-4 flex justify-center">
          <img
            src={student.photoUrl}
            alt="Student Photo"
            className="w-32 h-32 rounded-full border-4 border-blue-600"
          />
        </div>

        {/* Student Details */}
        <div className="p-4">
          <div className="space-y-2">
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="text-lg font-medium">{student.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Roll Number</p>
              <p className="text-lg font-medium">{student.rollNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Class & Section</p>
              <p className="text-lg font-medium">
                {student.class} - {student.section}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Blood Group</p>
              <p className="text-lg font-medium">{student.bloodGroup}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Date of Birth</p>
              <p className="text-lg font-medium">{student.dateOfBirth}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Address</p>
              <p className="text-lg font-medium">{student.address}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 p-4 text-center">
          <p className="text-sm text-gray-500">
            This card is the property of School Name. If found, please return to the school office.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentIDCard;
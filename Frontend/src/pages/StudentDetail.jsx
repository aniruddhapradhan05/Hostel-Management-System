import React, { useState } from 'react';

const StudentDetailPage = () => {
  const [email, setEmail] = useState('');
  const [studentDetails, setStudentDetails] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Fetch student details based on email (replace this with your backend API call)
    fetchStudentDetails(email);
  };

  const fetchStudentDetails = (email) => {
    // Mocking API call to fetch student details
    // Replace this with your backend API call to fetch student details
    const mockStudentDetails = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      hostelNo: 'A',
      roomNo: '101',
    };

    // Simulate delay for API call
    setTimeout(() => {
      setStudentDetails(mockStudentDetails);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Student Detail</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Get Student Detail
            </button>
          </div>
        </form>

        {studentDetails && (
          <div className="mt-8">
            <h3 className="text-xl font-bold">Student Details</h3>
            <p><strong>Name:</strong> {studentDetails.firstName} {studentDetails.lastName}</p>
            <p><strong>Email:</strong> {studentDetails.email}</p>
            <p><strong>Phone:</strong> {studentDetails.phone}</p>
            <p><strong>Hostel No:</strong> {studentDetails.hostelNo}</p>
            <p><strong>Room No:</strong> {studentDetails.roomNo}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDetailPage;

// import React from 'react'
// import image from '../assets/hostel-bg.jpeg'
// function HomePage() {
//   return (
//     <div>
//       <img src="{image}" alt="home" />
//     </div>
//   )
// }

// export default HomePage
import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-8">Welcome to Admin Panel</h1>
      <div className="max-w-md bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <p className="text-lg text-gray-700">
            This is a simple admin panel built with React and Tailwind CSS. It allows you to manage admins and students.
          </p>
          <ul className="mt-4">
            <li className="flex items-center space-x-2">
              <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Create new admins and manage their access.</span>
            </li>
            <li className="flex items-center space-x-2 mt-2">
              <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Add new students to the system.</span>
            </li>
            <li className="flex items-center space-x-2 mt-2">
              <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Delete students from the system.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;


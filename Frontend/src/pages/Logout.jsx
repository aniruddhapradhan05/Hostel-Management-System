import React from 'react';

const LogoutPage = ({ onLogout }) => {
  const handleLogout = () => {
    // Perform logout actions here (e.g., clearing local storage, redirecting to login page)
    // For demonstration purposes, I'll simply call the onLogout function passed as props
    const response = fetch(`http://localhost:8000/logout-admin`,{
        method: "POST",
    });
    console.log('Logout Successfully');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Logout</h2>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;

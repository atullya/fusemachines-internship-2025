import React, { useState } from "react";

import { Login } from "./Login";
import { Signup } from "./Signup";

const AuthHome = () => {
  const [activeTab, setActiveTab] = useState<0 | 1>(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {/* Tabs */}
      <div className="flex border-b border-gray-300 mb-6">
        <button
          onClick={() => setActiveTab(0)}
          className={`px-6 py-2 font-semibold transition ${
            activeTab === 0
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setActiveTab(1)}
          className={`px-6 py-2 font-semibold transition ${
            activeTab === 1
              ? "text-green-600 border-b-2 border-green-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Sign-Up
        </button>
      </div>

      <div className="w-full max-w-md">
        {activeTab === 0 ? <Login /> : <Signup />}
      </div>
    </div>
  );
};

export default AuthHome;

import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const Home = () => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-96">
        {/* Tabs */}
        <div className="flex mb-6 border-b">
          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-2 text-center font-medium ${
              activeTab === "login"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`flex-1 py-2 text-center font-medium ${
              activeTab === "signup"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
          >
            Signup
          </button>
        </div>

        {/* Content */}
        <div>
          {activeTab === "login" && <Login />}
          {activeTab === "signup" && <Signup />}
        </div>
      </div>
    </div>
  );
};

export default Home;

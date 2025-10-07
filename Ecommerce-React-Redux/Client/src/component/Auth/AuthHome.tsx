import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const AuthHome = () => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  return (
    <div>
      <div>
        <button onClick={() => setActiveTab("login")}>Login</button>
        <button onClick={() => setActiveTab("register")}>Register</button>
      </div>
      {activeTab === "login" ? (
        <Login setActiveTab={setActiveTab} />
      ) : (
        <Register setActiveTab={setActiveTab} />
      )}
    </div>
  );
};

export default AuthHome;

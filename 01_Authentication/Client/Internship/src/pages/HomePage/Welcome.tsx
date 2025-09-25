import { useAuth } from "@/context/AuthContext";
import { apiService } from "@/services/apiServices";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Todo from "./Todo";
import Test from "./Test";
import ChangePassword from "./ChangePassword";
import Counter from "./Counter";

const Welcome = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  console.log(user);
  const handlePasswordChange = () => {
    navigate("/changePassword");
  };
  return (
    <>
      <div>
        <h1>Welcome {user?.username}</h1>
        <p>Email: {user?.email}</p>
        <p>Phone: {user?.phoneNumber}</p>
        <button onClick={logout}>Logout</button>
      </div>
      <button onClick={handlePasswordChange}>Change Password</button>
      <Counter />

      {/* <Todo/> */}
      {/* <Test /> */}
    </>
  );
};

export default Welcome;

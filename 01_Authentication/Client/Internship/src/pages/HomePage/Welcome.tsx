import { useAuth } from "@/context/AuthContext";
import { apiService } from "@/services/apiServices";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Todo from "./Todo";
import Test from "./Test";
import ChangePassword from "./ChangePassword";
import Counter from "./Counter";
import { useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { checkAuth, logout } from "@/store/authSlice";

const Welcome = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user, loading, authorize } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  const handlePasswordChange = () => {
    navigate("/changePassword");
  };
  return (
    <>
      {authorize ? (
        <>
          <h2>Welcome, {user?.username}</h2>
          <button onClick={() => dispatch(logout())}>Logout</button>
        </>
      ) : (
        <h2>Please log in</h2>
      )}
      <button onClick={handlePasswordChange}>Change Password</button>
      <Counter />

      {/* <Todo/> */}
      {/* <Test /> */}
    </>
  );
};

export default Welcome;

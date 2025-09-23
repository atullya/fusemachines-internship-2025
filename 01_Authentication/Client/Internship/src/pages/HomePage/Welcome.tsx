import { useAuth } from "@/context/AuthContext";
import { apiService } from "@/services/apiServices";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  console.log(user);

  return (
    <div>
      <h1>Welcome {user?.username}</h1>
      <p>Email: {user?.email}</p>
      <p>Phone: {user?.phoneNumber}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Welcome;

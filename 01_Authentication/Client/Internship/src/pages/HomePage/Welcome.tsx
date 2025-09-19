import { apiService } from "@/services/apiServices";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  _id: string;
  username: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}

interface WelcomeResponse {
  message: string;
  user: User;
}

const Welcome = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [message, setMessage] = useState<string>("");

  const fetchUserData = async () => {
    try {
      const response: WelcomeResponse = await apiService.welcome();
      console.log(response);

      setUserData(response.user);
      setMessage(response.message);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Something went wrong");
    }
  };
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
      <h1>{message}</h1>
      {userData && (
        <div>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
          <p>Phone: {userData.phoneNumber}</p>
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Welcome;

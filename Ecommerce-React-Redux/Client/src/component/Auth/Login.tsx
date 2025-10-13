import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../../services/apiServices";

interface LoginUserData {
  email: string;
  password: string;
  cpassword: string;
}
interface LoginProps {
  setActiveTab: React.Dispatch<React.SetStateAction<"login" | "register">>;
}

const Login: React.FC<LoginProps> = ({ setActiveTab }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginUserData>({
    email: "",
    password: "",
    cpassword: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
    if (formData.password !== formData.cpassword) {
      setErrorMessage("Password and CPassword doesn't match");
      return;
    }
    try {
      const userData = await apiService.login(
        formData.email,
        formData.password
      );
      console.log(userData);
      
      if (userData.success) {
        alert("Login Successfull");
        setErrorMessage("");
        navigate("/welcome");
      }
    } catch (error: any) {
      setErrorMessage(error.message || "Sign-in failed. Please try again.");
      console.log(error.message);
    }
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        Email:{" "}
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
        />{" "}
        <br />
        Password:{" "}
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
        />{" "}
        <br />
        Confirm Password:{" "}
        <input
          type="password"
          name="cpassword"
          onChange={handleChange}
          value={formData.cpassword}
        />{" "}
        <br />
        {errorMessage && <h1>{errorMessage}</h1>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;

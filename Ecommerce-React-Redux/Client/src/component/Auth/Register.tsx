import React, { useState } from "react";
import { apiService } from "../../services/apiServices";

interface RegisterUserData {
  name: string;
  email: string;
  password: string;
}

interface RegisterProps {
  setActiveTab: React.Dispatch<React.SetStateAction<"login" | "register">>;
}

const Register: React.FC<RegisterProps> = ({ setActiveTab }) => {
  const [formData, setFormData] = useState<RegisterUserData>({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = await apiService.register(formData);
      if (userData.success) {
        alert("Registration successful!");
        setErrorMessage("");
        setActiveTab("login");
      }
    } catch (error: any) {
      setErrorMessage(error.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>
          Name:{" "}
          <input name="name" value={formData.name} onChange={handleChange} />
        </p>
        <p>
          Email:{" "}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </p>
        <p>
          Password:{" "}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </p>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
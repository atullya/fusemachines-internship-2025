import { apiService } from "@/services/apiServices";
import React, { useState } from "react";
interface SignupData {
  name: string;
  email: string;
  password: string;
}

const Signup = () => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data", formData);
    try {
      const res = await apiService.register(formData);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };
  const [formData, setFormData] = useState<SignupData>({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div>
      <h1>Signup Page</h1>
      <form onSubmit={handleSubmit}>
        Username:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit" value="submit">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;

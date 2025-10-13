import { apiService } from "@/services/apiServices";
import React, { useState } from "react";

const ChangePassword = () => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // alert(e);
    try {
      const res = await apiService.editPassword(
        formData.password,
        formData.newPassword
      );
      if (res.success) {
        alert(res.message);
      } else {
        alert("no Success");
      }
    } catch (err) {
      alert(err);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const [formData, setFormData] = useState({ password: "", newPassword: "" });
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        Current Password :
        <input
          type="password"
          value={formData.password}
          name="password"
          onChange={handleChange}
        />
        New Password :
        <input
          type="password"
          value={formData.newPassword}
          name="newPassword"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ChangePassword;

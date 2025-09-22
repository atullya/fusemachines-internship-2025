import React from "react";

const Login = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        Username:
        <input type="text" name="name" />
        Email:
        <input type="email" name="email" />
        Password:
        <input type="password" name="password" />
        <button type="submit" value="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

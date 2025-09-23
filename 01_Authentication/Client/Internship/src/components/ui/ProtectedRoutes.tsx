import { useAuth } from "@/context/AuthContext";
import React from "react"; // ensures JSX namespace exists
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const { authorized, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!authorized) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;

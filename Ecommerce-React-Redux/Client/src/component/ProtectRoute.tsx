import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { checkAuth } from "../store/authSlice";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ children }: { children: React.ReactElement }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { authorize, loading } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (loading) {
      dispatch(checkAuth());
    }
  }, [loading]);
  if (loading) return <div>Loading...</div>;
  if (!authorize) return <Navigate to="/" replace />;
  return children;
};

export default ProtectRoute;

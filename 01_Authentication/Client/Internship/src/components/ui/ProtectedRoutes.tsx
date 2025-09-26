import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";
import { checkAuth } from "@/store/authSlice";

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { authorize, loading } = useSelector((state: RootState) => state.auth);


  useEffect(() => {
    if (loading) {
      dispatch(checkAuth());
    }
  }, [dispatch, loading]);

  if (loading) return <div>Loading...</div>;
  if (!authorize) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;

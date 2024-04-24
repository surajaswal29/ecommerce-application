import React from "react";
import { useSelector } from "react-redux";

import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      {!loading &&
        ((isAuthenticated === false) ? (
          <Navigate to={"/user/login/"} replace="true" />
          
        ) : (
          <Outlet />
        ))}
    </>
  );
};

export default ProtectedRoute;

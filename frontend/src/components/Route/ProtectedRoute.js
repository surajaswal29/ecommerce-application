import React from "react";
import { useSelector } from "react-redux";

import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      {!loading &&
        (isAuthenticated ? (
          <Outlet />
        ) : (
          <Navigate to={"/user/login/"} replace="true" />
        ))}
    </>
  );
};

export default ProtectedRoute;

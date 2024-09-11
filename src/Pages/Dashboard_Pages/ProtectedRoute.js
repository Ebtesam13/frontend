import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { getUser, isAuth } from "../../axiosConfig/Auth";

const ProtectedRoute = ({ component: Component, role, ...rest }) => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuth()) {
      const user = getUser();
      setUserRole(user.Role);
    }
    setLoading(false);
  }, []);

  if (loading) return;

  const isMultiRole =
    userRole &&
    (Array.isArray(role) ? role.includes(userRole) : role === userRole);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth() ? (
          isMultiRole ? (
            <Component {...props} />
          ) : (
            <Redirect to="/admin/dashboard" />
          )
        ) : (
          <Redirect to="/auth/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;

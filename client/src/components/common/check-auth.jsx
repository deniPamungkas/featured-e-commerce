import { Navigate, useLocation } from "react-router-dom";
import proptypes from "prop-types";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();

  if (!isAuthenticated && location.pathname.includes("admin")) {
    return <Navigate to={"/auth/login"} />;
  }

  if (isAuthenticated && location.pathname.includes("auth")) {
    if (user?.role === "admin") {
      return <Navigate to={"/admin/dashboard"} />;
    }
    return <Navigate to={"/shop"} />;
  }

  if (isAuthenticated) {
    if (user?.role === "admin" && location.pathname.includes("shop")) {
      return <Navigate to={"/unauth-page"} />;
    }
    if (user?.role === "user" && location.pathname.includes("admin")) {
      return <Navigate to={"/unauth-page"} />;
    }
  }

  return <>{children}</>;
};

CheckAuth.propTypes = {
  isAuthenticated: proptypes.bool,
  user: proptypes.object,
  children: proptypes.node,
};

export default CheckAuth;

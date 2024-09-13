import { Navigate, useLocation } from "react-router-dom";
import proptypes from "prop-types";

const NotFoundPage = ({ isAuthenticated, user }) => {
  const location = useLocation();

  if (location.pathname === "/" && !isAuthenticated) {
    return <Navigate to={"/shop"} />;
  }

  if (location.pathname === "/" && user.role !== "admin") {
    return <Navigate to={"/shop"} />;
  }

  if (location.pathname === "/" && user.role == "admin" && isAuthenticated) {
    return <Navigate to={"/admin/dashboard"} />;
  }

  return <div>NotFoundPage</div>;
};

NotFoundPage.propTypes = {
  isAuthenticated: proptypes.bool,
  user: proptypes.object,
};

export default NotFoundPage;

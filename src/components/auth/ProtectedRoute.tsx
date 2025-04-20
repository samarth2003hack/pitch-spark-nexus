import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userRole = localStorage.getItem("userRole");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userRole || "")) {
    // Redirect to role-specific dashboard if unauthorized
    if (userRole === "founder") return <Navigate to="/founder-dashboard" replace />;
    if (userRole === "mentor") return <Navigate to="/mentor-dashboard" replace />;
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

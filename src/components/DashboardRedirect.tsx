// src/pages/DashboardRedirect.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const DashboardRedirect = () => {
  const { authenticated, userRole } = useAuth();

  if (!authenticated) return <Navigate to="/login" replace />;

  if (userRole === "founder") return <Navigate to="/founder-dashboard" replace />;
  if (userRole === "mentor") return <Navigate to="/mentor-dashboard" replace />;

  return <Navigate to="/" replace />;
};

export default DashboardRedirect;

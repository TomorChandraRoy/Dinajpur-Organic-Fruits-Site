import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import UserDashboardHome from "./UserDashboardHome";
import AdminDashboardHeader from "./AdminDashboardHome";

const DashboardLayout = () => {
  const { user, userRole, loading } = useContext(AuthContext);
  const role = userRole?.role;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg font-medium">Loading dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return (
      <>
      {
        role === "user" &&(
          <>
          <UserDashboardHome/>
          </>
        )
      }
      {
        role === "admin"&&(
          <AdminDashboardHeader/>
        )
      }
      {
        role !== "user" && role !== "admin" && (
          <UserDashboardHome />
        )
      }
      </>
  )
}

export default DashboardLayout;

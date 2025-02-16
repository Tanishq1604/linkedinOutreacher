import { Outlet } from "react-router-dom";
import DashboardHeader from "@/components/DashboardHeader";
import Sidebar from "@/components/dashboard/Sidebar";
import { useAuth } from "@/contexts/AuthContext";

const DashboardLayout = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader
        userName={user?.name}
        userEmail={user?.email}
        userAvatarUrl={user?.avatarUrl}
      />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 mt-16">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

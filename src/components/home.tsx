import React from "react";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./dashboard/Sidebar";
import MetricsOverview from "./dashboard/MetricsOverview";
import CampaignList from "./dashboard/CampaignList";

interface HomeProps {
  userName?: string;
  userEmail?: string;
  userAvatarUrl?: string;
  metrics?: {
    totalCampaigns: number;
    activeCampaigns: number;
    responseRate: number;
    connectionRate: number;
  };
  campaigns?: Array<{
    id: string;
    name: string;
    status: "active" | "paused" | "completed";
    progress: number;
    sentMessages: number;
    responseRate: number;
    lastActive: string;
  }>;
}

const Home = ({
  userName = "John Doe",
  userEmail = "john@example.com",
  userAvatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  metrics = {
    totalCampaigns: 12,
    activeCampaigns: 5,
    responseRate: 45,
    connectionRate: 68,
  },
  campaigns = [
    {
      id: "1",
      name: "Tech Startup Outreach",
      status: "active",
      progress: 45,
      sentMessages: 127,
      responseRate: 28,
      lastActive: "2024-03-20",
    },
    {
      id: "2",
      name: "Sales Manager Connect",
      status: "paused",
      progress: 72,
      sentMessages: 243,
      responseRate: 35,
      lastActive: "2024-03-19",
    },
    {
      id: "3",
      name: "Marketing Directors",
      status: "completed",
      progress: 100,
      sentMessages: 500,
      responseRate: 42,
      lastActive: "2024-03-18",
    },
  ],
}: HomeProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader
        userName={userName}
        userEmail={userEmail}
        userAvatarUrl={userAvatarUrl}
      />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 mt-16">
          <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <MetricsOverview metrics={metrics} />
            <CampaignList campaigns={campaigns} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;

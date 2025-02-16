import React from "react";
import { Card, CardContent } from "../ui/card";
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Mail,
  CheckCircle,
  Clock,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
}

const MetricCard = ({
  title = "Metric",
  value = 0,
  change = 0,
  icon,
}: MetricCardProps) => {
  const isPositive = change >= 0;

  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-semibold">{value}</p>
            {change !== undefined && (
              <div className="flex items-center space-x-1">
                {isPositive ? (
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                )}
                <span
                  className={`text-sm ${isPositive ? "text-green-500" : "text-red-500"}`}
                >
                  {Math.abs(change)}%
                </span>
              </div>
            )}
          </div>
          <div className="p-2 bg-gray-100 rounded-lg">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
};

interface MetricsOverviewProps {
  metrics?: {
    totalCampaigns: number;
    activeCampaigns: number;
    responseRate: number;
    connectionRate: number;
  };
}

const MetricsOverview = ({
  metrics = {
    totalCampaigns: 12,
    activeCampaigns: 5,
    responseRate: 45,
    connectionRate: 68,
  },
}: MetricsOverviewProps) => {
  return (
    <div className="w-full bg-gray-50 p-6 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Campaigns"
          value={metrics.totalCampaigns}
          icon={<Mail className="w-5 h-5 text-blue-500" />}
        />
        <MetricCard
          title="Active Campaigns"
          value={metrics.activeCampaigns}
          icon={<Clock className="w-5 h-5 text-yellow-500" />}
        />
        <MetricCard
          title="Response Rate"
          value={`${metrics.responseRate}%`}
          change={2.5}
          icon={<CheckCircle className="w-5 h-5 text-green-500" />}
        />
        <MetricCard
          title="Connection Rate"
          value={`${metrics.connectionRate}%`}
          change={-1.2}
          icon={<Users className="w-5 h-5 text-purple-500" />}
        />
      </div>
    </div>
  );
};

export default MetricsOverview;

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Play, Pause, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Campaign {
  id: string;
  name: string;
  status: "active" | "paused" | "completed";
  progress: number;
  sentMessages: number;
  responseRate: number;
  lastActive: string;
}

interface CampaignListProps {
  campaigns?: Campaign[];
  onPauseCampaign?: (id: string) => void;
  onResumeCampaign?: (id: string) => void;
  onDeleteCampaign?: (id: string) => void;
}

const defaultCampaigns: Campaign[] = [
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
];

const CampaignList = ({
  campaigns = defaultCampaigns,
  onPauseCampaign = () => {},
  onResumeCampaign = () => {},
  onDeleteCampaign = () => {},
}: CampaignListProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="w-full bg-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Active Campaigns</h2>
        <Button variant="outline">New Campaign</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Campaign Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Sent Messages</TableHead>
              <TableHead>Response Rate</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((campaign) => (
              <TableRow key={campaign.id}>
                <TableCell className="font-medium">{campaign.name}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={getStatusColor(campaign.status)}
                  >
                    {campaign.status.charAt(0).toUpperCase() +
                      campaign.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${campaign.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500 mt-1">
                    {campaign.progress}%
                  </span>
                </TableCell>
                <TableCell>{campaign.sentMessages}</TableCell>
                <TableCell>{campaign.responseRate}%</TableCell>
                <TableCell>{campaign.lastActive}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {campaign.status === "active" ? (
                        <DropdownMenuItem
                          onClick={() => onPauseCampaign(campaign.id)}
                        >
                          <Pause className="mr-2 h-4 w-4" />
                          Pause
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          onClick={() => onResumeCampaign(campaign.id)}
                        >
                          <Play className="mr-2 h-4 w-4" />
                          Resume
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => onDeleteCampaign(campaign.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default CampaignList;

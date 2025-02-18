import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/supabase";
import { Play, Pause, BarChart } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CampaignResult {
  id: string;
  profileUrl: string;
  actionType: string;
  status: string;
  response?: string;
  createdAt: string;
}

interface CampaignResultsProps {
  campaignId: string;
}

const CampaignResults = ({ campaignId }: CampaignResultsProps) => {
  const [results, setResults] = useState<CampaignResult[]>([]);
  const [campaign, setCampaign] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch campaign details
        const { data: campaignData } = await db
          .from("automation_campaigns")
          .select("*")
          .eq("id", campaignId)
          .single();

        if (campaignData) {
          setCampaign(campaignData);
        }

        // Fetch campaign results
        const { data: resultsData } = await db
          .from("campaign_results")
          .select("*")
          .eq("campaign_id", campaignId)
          .order("created_at", { ascending: false });

        if (resultsData) {
          setResults(resultsData);
        }
      } catch (error) {
        console.error("Error fetching campaign data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Subscribe to real-time updates
    const resultsSubscription = db
      .channel("campaign-results")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "campaign_results",
          filter: `campaign_id=eq.${campaignId}`,
        },
        (payload) => {
          setResults((prev) => [payload.new as CampaignResult, ...prev]);
        },
      )
      .subscribe();

    return () => {
      resultsSubscription.unsubscribe();
    };
  }, [campaignId]);

  const toggleCampaignStatus = async () => {
    if (!campaign) return;

    const newStatus = campaign.status === "active" ? "paused" : "active";
    const { error } = await db
      .from("automation_campaigns")
      .update({ status: newStatus })
      .eq("id", campaignId);

    if (!error) {
      setCampaign((prev: any) => ({ ...prev, status: newStatus }));
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!campaign) {
    return <div>Campaign not found</div>;
  }

  const progress = (campaign.total_processed / campaign.target_profiles.length) * 100;
  const successRate = (campaign.total_successful / campaign.total_processed) * 100 || 0;

  return (
    <Card className="p-6 w-full">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
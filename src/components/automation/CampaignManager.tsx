import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLinkedIn } from "@/hooks/useLinkedIn";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Play, Pause, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const CampaignManager = () => {
  const { isConnected, createCampaign } = useLinkedIn();
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const [campaignData, setCampaignData] = useState({
    name: "",
    type: "connection" as const,
    messageTemplate: "",
    dailyLimit: 50,
    targetProfiles: [] as string[],
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const profiles = text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
      setCampaignData((prev) => ({
        ...prev,
        targetProfiles: profiles,
      }));
    };
    reader.readAsText(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      toast({
        variant: "destructive",
        title: "LinkedIn Not Connected",
        description: "Please connect your LinkedIn account first.",
      });
      return;
    }

    try {
      setIsCreating(true);
      const campaign = await createCampaign({
        ...campaignData,
        status: "active",
        totalProcessed: 0,
        totalSuccessful: 0,
      });

      toast({
        title: "Campaign Created",
        description: `Campaign "${campaign.name}" has been created and started.",
      });

      // Reset form
      setCampaignData({
        name: "",
        type: "connection",
        messageTemplate: "",
        dailyLimit: 50,
        targetProfiles: [],
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Campaign Creation Failed",
        description: "Failed to create campaign. Please try again.",
      });
    } finally {
      setIsCreating(false);
    }
  };

  if (!isConnected) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Please connect your LinkedIn account before creating campaigns.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="p-6 w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Create Automation Campaign</h2>
          <p className="text-muted-foreground mt-1">
            Set up a new campaign to automate your LinkedIn outreach
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Campaign Name</Label>
            <Input
              value={campaignData.name}
              onChange={(e) =>
                setCampaignData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="E.g., Tech Startup Outreach"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Campaign Type</Label>
            <Select
              value={campaignData.type}
              onValueChange={(value: "connection" | "message" | "scraping") =>
                setCampaignData((prev) => ({ ...prev, type: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select campaign type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="connection">Connection Requests</SelectItem>
                <SelectItem value="message">Direct Messages</SelectItem>
                <SelectItem value="scraping">Profile Scraping</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {campaignData.type !== "scraping" && (
            <div className="space-y-2">
              <Label>Message Template</Label>
              <Textarea
                value={campaignData.messageTemplate}
                onChange={(e) =>
                  setCampaignData((prev) => ({
                    ...prev,
                    messageTemplate: e.target.value,
                  }))
                }
                placeholder="Hi {firstName},\n\nI noticed you work at {company}..."
                className="min-h-[100px]"
              />
              <p className="text-sm text-muted-foreground">
                Use variables like {'{firstName}'}, {'{company}'}, {'{position}'}
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label>Daily Limit</Label>
            <Input
              type="number"
              value={campaignData.dailyLimit}
              onChange={(e) =>
                setCampaignData((prev) => ({
                  ...prev,
                  dailyLimit: parseInt(e.target.value) || 50,
                }))
              }
              min={1}
              max={100}
            />
            <p className="text-sm text-muted-foreground">
              Maximum actions per day (recommended: 50)
            </p>
          </div>

          <div className="space-y-2">
            <Label>Target Profiles</Label>
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Upload a CSV file with LinkedIn profile URLs
              </p>
              <Input
                type="file"
                accept=".csv,text/plain"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <Button asChild variant="outline">
                <label htmlFor="file-upload" className="cursor-pointer">
                  Select File
                </label>
              </Button>
            </div>
            {campaignData.targetProfiles.length > 0 && (
              <p className="text-sm text-muted-foreground">
                {campaignData.targetProfiles.length} profiles loaded
              </p>
            )}
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isCreating}>
          {isCreating ? "Creating Campaign..." : "Create Campaign"}
        </Button>
      </form>
    </Card>
  );
};

export default CampaignManager;

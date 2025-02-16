import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { UserPlus, Settings, Filter } from "lucide-react";

const ConnectionAutomation = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const startAutomation = () => {
    setIsRunning(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          return 100;
        }
        return prev + 1;
      });
    }, 300);
  };

  return (
    <Card className="p-6 w-full max-w-2xl mx-auto">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Connection Request Automation
          </h2>
          <p className="text-muted-foreground">
            Automatically send personalized connection requests
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Search Criteria</Label>
            <Input placeholder="Job titles, companies, or keywords" />
          </div>

          <div className="space-y-2">
            <Label>Connection Message Template</Label>
            <Textarea
              placeholder="Hi {firstName},\n\nI noticed you work at {company} as a {title}. I'd love to connect and share insights about...\n\nBest regards,\n{myName}"
              className="min-h-[120px]"
            />
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="font-medium flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Automation Settings
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Only 2nd degree connections</Label>
                  <p className="text-sm text-muted-foreground">
                    Target users who share mutual connections
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Skip if no mutual connections</Label>
                  <p className="text-sm text-muted-foreground">
                    Don't send requests to users without mutual connections
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Daily connection limit</Label>
                  <p className="text-sm text-muted-foreground">
                    Maximum connection requests per day
                  </p>
                </div>
                <Input type="number" className="w-20" defaultValue={25} />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Advanced Filters
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Minimum Connections</Label>
                <Input type="number" placeholder="e.g., 500" />
              </div>

              <div className="space-y-2">
                <Label>Experience Level</Label>
                <Input placeholder="e.g., Senior, Manager" />
              </div>
            </div>
          </div>

          {isRunning && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Sending connection requests...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
          )}

          <Button
            className="w-full"
            onClick={startAutomation}
            disabled={isRunning}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            {isRunning ? "Running Automation..." : "Start Automation"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ConnectionAutomation;

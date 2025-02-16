import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Search, Download, Filter, AlertCircle } from "lucide-react";
import { LinkedInScraper } from "@/lib/scraper/linkedinScraper";
import type { LinkedInProfile } from "@/lib/scraper/types";

const FollowerScraper = () => {
  const { user } = useAuth();
  const [profileUrl, setProfileUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState("");
  const [profiles, setProfiles] = useState<LinkedInProfile[]>([]);
  const [scraper, setScraper] = useState<LinkedInScraper | null>(null);

  useEffect(() => {
    if (user?.linkedInConnected) {
      // Get cookie from local storage in real app
      const mockCookie = "your_linkedin_cookie";
      setScraper(new LinkedInScraper(mockCookie));
    }
  }, [user?.linkedInConnected]);

  const handleScrape = async () => {
    if (!scraper) {
      setError("Please connect your LinkedIn account first");
      return;
    }

    if (!profileUrl.includes("linkedin.com/")) {
      setError("Please enter a valid LinkedIn URL");
      return;
    }

    setError("");
    setIsScanning(true);
    setProgress(0);
    setProfiles([]);

    try {
      const result = await scraper.scrapeFollowers(profileUrl, {
        maxProfiles: 100,
        delay: 1000,
      });

      setProfiles(result.profiles);
      setProgress(100);
    } catch (err) {
      setError("Failed to scrape followers. Please try again.");
    } finally {
      setIsScanning(false);
    }
  };

  const exportToCsv = () => {
    const headers = [
      "Name",
      "Profile URL",
      "Headline",
      "Company",
      "Location",
      "Connection Degree",
      "Mutual Connections",
    ];
    const csvContent = [
      headers.join(","),
      ...profiles.map((profile) =>
        [
          profile.name,
          profile.profileUrl,
          profile.headline || "",
          profile.currentCompany || "",
          profile.location || "",
          profile.connectionDegree || "",
          profile.mutualConnections || "",
        ].join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "linkedin_followers.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card className="p-6 w-full max-w-4xl mx-auto">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Follower Scraper</h2>
          <p className="text-muted-foreground">
            Extract followers from any LinkedIn profile
          </p>
        </div>

        {!user?.linkedInConnected ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please connect your LinkedIn account in settings first.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>LinkedIn Profile URL</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="https://linkedin.com/in/username"
                  value={profileUrl}
                  onChange={(e) => setProfileUrl(e.target.value)}
                />
                <Button onClick={handleScrape} disabled={isScanning}>
                  <Search className="w-4 h-4 mr-2" />
                  {isScanning ? "Scanning..." : "Scan"}
                </Button>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {isScanning && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Scanning followers...</span>
                  <span>{profiles.length} profiles found</span>
                </div>
                <Progress value={progress} />
              </div>
            )}

            {profiles.length > 0 && (
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-medium">Results</h3>
                      <p className="text-sm text-muted-foreground">
                        {profiles.length} profiles found
                      </p>
                    </div>
                    <Button variant="outline" size="sm" onClick={exportToCsv}>
                      <Download className="w-4 h-4 mr-2" />
                      Export CSV
                    </Button>
                  </div>

                  <div className="border rounded-md">
                    <div className="grid grid-cols-[1fr,2fr,1fr] gap-4 p-3 border-b bg-muted/50">
                      <div>Name</div>
                      <div>Headline</div>
                      <div>Location</div>
                    </div>
                    <div className="max-h-[400px] overflow-auto">
                      {profiles.map((profile, i) => (
                        <div
                          key={i}
                          className="grid grid-cols-[1fr,2fr,1fr] gap-4 p-3 border-b last:border-0 hover:bg-muted/50"
                        >
                          <div className="font-medium">{profile.name}</div>
                          <div className="text-muted-foreground">
                            {profile.headline || "--"}
                          </div>
                          <div className="text-muted-foreground">
                            {profile.location || "--"}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default FollowerScraper;

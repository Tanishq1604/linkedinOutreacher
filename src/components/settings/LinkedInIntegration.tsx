import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Linkedin, CheckCircle2, AlertCircle } from "lucide-react";

const LinkedInIntegration = () => {
  const { user, connectLinkedIn } = useAuth();
  const [cookie, setCookie] = useState("");
  const [error, setError] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    if (!cookie.trim()) {
      setError("Please enter your LinkedIn cookie");
      return;
    }

    setError("");
    setIsConnecting(true);
    try {
      await connectLinkedIn(cookie);
    } catch (err) {
      setError("Failed to connect LinkedIn account");
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Card className="p-6 w-full max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">LinkedIn Integration</h2>
            <p className="text-muted-foreground mt-1">
              Connect your LinkedIn account to enable automation features
            </p>
          </div>
          {user?.linkedInConnected && (
            <div className="flex items-center text-green-600">
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Connected
            </div>
          )}
        </div>

        {!user?.linkedInConnected ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>LinkedIn Cookie</Label>
              <Input
                placeholder="Paste your LinkedIn cookie here"
                value={cookie}
                onChange={(e) => setCookie(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                To get your LinkedIn cookie, follow these steps:
              </p>
              <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1">
                <li>Log in to LinkedIn in your browser</li>
                <li>Open Developer Tools (F12)</li>
                <li>Go to Application → Cookies → www.linkedin.com</li>
                <li>Find and copy the 'li_at' cookie value</li>
              </ol>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              onClick={handleConnect}
              disabled={isConnecting}
              className="w-full"
            >
              <Linkedin className="w-4 h-4 mr-2" />
              {isConnecting ? "Connecting..." : "Connect LinkedIn"}
            </Button>
          </div>
        ) : (
          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>
              Your LinkedIn account is connected and ready for automation.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </Card>
  );
};

export default LinkedInIntegration;

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Linkedin, CheckCircle2, AlertCircle, Lock } from "lucide-react";
import { useLinkedIn } from "@/hooks/useLinkedIn";
import { useToast } from "@/components/ui/use-toast";

const LinkedInCookieManager = () => {
  const { isConnected, isLoading, error, connectLinkedIn } = useLinkedIn();
  const { toast } = useToast();
  const [cookie, setCookie] = useState("");
  const [showCookie, setShowCookie] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cookie.trim()) return;

    try {
      const success = await connectLinkedIn(cookie);
      if (success) {
        toast({
          title: "LinkedIn Connected",
          description: "Your LinkedIn account has been successfully connected.",
        });
        setCookie("");
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Connection Failed",
        description:
          "Failed to connect your LinkedIn account. Please try again.",
      });
    }
  };

  return (
    <Card className="p-6 w-full max-w-2xl mx-auto bg-white">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">LinkedIn Cookie Integration</h2>
            <p className="text-muted-foreground mt-1">
              Connect your LinkedIn account to enable automation features
            </p>
          </div>
          {isConnected && (
            <div className="flex items-center text-green-600">
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Connected
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>LinkedIn Cookie</Label>
            <div className="relative">
              <Input
                type={showCookie ? "text" : "password"}
                placeholder="Paste your LinkedIn cookie here"
                value={cookie}
                onChange={(e) => setCookie(e.target.value)}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setShowCookie(!showCookie)}
              >
                <Lock className="h-4 w-4" />
              </Button>
            </div>
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

          <Button type="submit" className="w-full" disabled={isLoading}>
            <Linkedin className="w-4 h-4 mr-2" />
            {isLoading ? "Connecting..." : "Connect LinkedIn"}
          </Button>
        </form>

        <Alert className="bg-blue-50 border-blue-200 text-blue-800">
          <Lock className="h-4 w-4" />
          <AlertDescription>
            Your cookie is securely encrypted before being stored. We never
            share your credentials with third parties.
          </AlertDescription>
        </Alert>
      </div>
    </Card>
  );
};

export default LinkedInCookieManager;

import { useState, useEffect } from "react";
import {
  LinkedInService,
  AutomationCampaign,
  LinkedInProfile,
} from "@/lib/linkedin/linkedinService";
import { LinkedInCookieManager } from "@/lib/linkedin/cookieManager";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/supabase";

export function useLinkedIn() {
  const { user } = useAuth();
  const [service, setService] = useState<LinkedInService | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initService = async () => {
      try {
        const cookieData = await LinkedInCookieManager.getCookie();
        if (cookieData) {
          const service = new LinkedInService(cookieData.li_at);
          const isValid = await service.validateCookie();
          if (isValid) {
            setService(service);
            setError(null);
          } else {
            setError("LinkedIn cookie is invalid");
          }
        }
      } catch (err) {
        setError("Failed to initialize LinkedIn service");
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      initService();
    }
  }, [user]);

  const connectLinkedIn = async (cookie: string) => {
    try {
      setIsLoading(true);
      const service = new LinkedInService(cookie);
      const isValid = await service.validateCookie();

      if (isValid) {
        await LinkedInCookieManager.storeCookie(cookie);
        setService(service);
        setError(null);
        return true;
      } else {
        setError("Invalid LinkedIn cookie");
        return false;
      }
    } catch (err) {
      setError("Failed to connect LinkedIn account");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const createCampaign = async (campaign: Omit<AutomationCampaign, "id">) => {
    if (!service) throw new Error("LinkedIn service not initialized");
    return service.createCampaign(campaign);
  };

  const sendConnectionRequest = async (
    profileUrl: string,
    message?: string,
  ) => {
    if (!service) throw new Error("LinkedIn service not initialized");
    return service.sendConnectionRequest(profileUrl, message);
  };

  const sendMessage = async (profileUrl: string, message: string) => {
    if (!service) throw new Error("LinkedIn service not initialized");
    return service.sendMessage(profileUrl, message);
  };

  const scrapeProfile = async (profileUrl: string) => {
    if (!service) throw new Error("LinkedIn service not initialized");
    return service.scrapeProfile(profileUrl);
  };

  return {
    isConnected: !!service,
    isLoading,
    error,
    connectLinkedIn,
    createCampaign,
    sendConnectionRequest,
    sendMessage,
    scrapeProfile,
  };
}

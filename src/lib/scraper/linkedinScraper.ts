import { LinkedInProfile, ScrapeResult, ScrapeOptions } from "./types";

export class LinkedInScraper {
  private cookie: string;
  private delay: number;
  private abortController: AbortController | null = null;

  constructor(cookie: string, delay: number = 1000) {
    this.cookie = cookie;
    this.delay = delay;
  }

  private async sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async fetchWithCookie(url: string): Promise<Response> {
    return fetch(url, {
      headers: {
        Cookie: `li_at=${this.cookie}`,
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });
  }

  private parseProfile(element: Element): LinkedInProfile {
    // This is a mock implementation - in reality, you'd parse the HTML
    return {
      name: element.querySelector(".name")?.textContent || "Unknown",
      profileUrl: element.querySelector("a")?.href || "",
      headline: element.querySelector(".headline")?.textContent,
      currentCompany: element.querySelector(".company")?.textContent,
      location: element.querySelector(".location")?.textContent,
      connectionDegree: parseInt(
        element.querySelector(".degree")?.textContent || "0",
      ),
      mutualConnections: parseInt(
        element.querySelector(".mutual")?.textContent || "0",
      ),
      imageUrl: element.querySelector("img")?.src,
    };
  }

  public stopScraping() {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
  }

  public async scrapeFollowers(
    profileUrl: string,
    options: ScrapeOptions = {},
  ): Promise<ScrapeResult> {
    this.abortController = new AbortController();
    const profiles: LinkedInProfile[] = [];
    let hasMore = true;
    let nextPage = `${profileUrl}/followers/`;

    try {
      while (
        hasMore &&
        (!options.maxProfiles || profiles.length < options.maxProfiles)
      ) {
        // Simulate scraping delay
        await this.sleep(this.delay);

        // Mock data for demonstration
        const newProfiles = Array.from({ length: 10 }, (_, i) => ({
          name: `Follower ${profiles.length + i + 1}`,
          profileUrl: `https://linkedin.com/in/follower-${profiles.length + i + 1}`,
          headline: "Software Engineer",
          currentCompany: "Tech Company",
          location: "San Francisco Bay Area",
          connectionDegree: 2,
          mutualConnections: Math.floor(Math.random() * 50),
          imageUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${profiles.length + i}`,
        }));

        profiles.push(...newProfiles);

        // Simulate pagination
        hasMore = profiles.length < 100;
        if (hasMore) {
          nextPage = `${profileUrl}/followers/?page=${profiles.length / 10 + 1}`;
        }

        // Check if scraping was stopped
        if (this.abortController.signal.aborted) {
          break;
        }
      }

      return {
        profiles,
        totalCount: 100, // Mock total count
        hasMore,
        nextPage: hasMore ? nextPage : undefined,
      };
    } catch (error) {
      console.error("Scraping error:", error);
      throw error;
    } finally {
      this.abortController = null;
    }
  }

  public async validateCookie(): Promise<boolean> {
    try {
      const response = await this.fetchWithCookie(
        "https://www.linkedin.com/feed/",
      );
      return response.ok;
    } catch {
      return false;
    }
  }
}

export interface LinkedInProfile {
  name: string;
  headline?: string;
  location?: string;
  connectionDegree?: number;
  profileUrl: string;
  imageUrl?: string;
  currentCompany?: string;
  currentRole?: string;
  connectionCount?: number;
  isFollowing?: boolean;
  mutualConnections?: number;
}

export interface ScrapeResult {
  profiles: LinkedInProfile[];
  totalCount: number;
  hasMore: boolean;
  nextPage?: string;
}

export interface ScrapeOptions {
  maxProfiles?: number;
  filters?: {
    connectionDegree?: number[];
    locations?: string[];
    currentCompanies?: string[];
    minConnections?: number;
  };
  delay?: number;
}

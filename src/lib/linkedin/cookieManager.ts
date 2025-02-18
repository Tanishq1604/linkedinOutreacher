import { encrypt, decrypt } from "@/lib/encryption";

export interface LinkedInCookie {
  li_at: string;
  timestamp: number;
}

export class LinkedInCookieManager {
  private static readonly COOKIE_KEY = "linkedin_cookie";

  static async storeCookie(cookie: string): Promise<void> {
    const cookieData: LinkedInCookie = {
      li_at: cookie,
      timestamp: Date.now(),
    };

    // In a real app, this would be stored in a secure backend
    // For now, we'll store it encrypted in localStorage
    const encrypted = await encrypt(JSON.stringify(cookieData));
    localStorage.setItem(this.COOKIE_KEY, encrypted);
  }

  static async getCookie(): Promise<LinkedInCookie | null> {
    const encrypted = localStorage.getItem(this.COOKIE_KEY);
    if (!encrypted) return null;

    try {
      const decrypted = await decrypt(encrypted);
      return JSON.parse(decrypted);
    } catch (error) {
      console.error("Error decrypting cookie:", error);
      return null;
    }
  }

  static async validateCookie(cookie: string): Promise<boolean> {
    // In a real app, this would make a request to LinkedIn to validate the cookie
    // For now, we'll just check if it's a non-empty string
    return Boolean(cookie && cookie.length > 20);
  }

  static async clearCookie(): Promise<void> {
    localStorage.removeItem(this.COOKIE_KEY);
  }
}

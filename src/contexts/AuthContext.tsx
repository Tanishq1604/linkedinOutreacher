import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  linkedInConnected: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  connectLinkedIn: (cookie: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      const mockUser: User = {
        id: "1",
        name: "John Doe",
        email,
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        linkedInConnected: false,
      };

      localStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const connectLinkedIn = async (cookie: string) => {
    if (!user) return;
    // In a real app, validate the cookie and update the user
    setUser((prev) => (prev ? { ...prev, linkedInConnected: true } : null));
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, logout, connectLinkedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

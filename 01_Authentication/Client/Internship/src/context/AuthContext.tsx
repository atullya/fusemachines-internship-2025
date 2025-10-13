import { useContext, useEffect, useState, createContext } from "react";
import { apiService } from "@/services/apiServices";
import type { ReactNode } from "react";
interface User {
  _id: string;
  username: string;
  email: string;
  phoneNumber: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  authorized: boolean;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const checkAuth = async () => {
    try {
      const userData = await apiService.checkAuth(); // backend must return user
      setUser(userData || null);
      setAuthorized(true);
    } catch {
      setUser(null);
      setAuthorized(false);
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    await apiService.logout();
    setUser(null);
    setAuthorized(false);
  };
  useEffect(() => {
 
    checkAuth();
  }, []);
  return (
    <AuthContext.Provider
      value={{ user, loading, authorized, checkAuth, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

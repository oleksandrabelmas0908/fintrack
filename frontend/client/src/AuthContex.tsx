import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setAuthenticated: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setAuthenticated] = useState(
    !!localStorage.getItem("access_token")
  );

  // Keep it in sync when token changes
  useEffect(() => {
    const handleStorageChange = () => {
      setAuthenticated(!!localStorage.getItem("access_token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

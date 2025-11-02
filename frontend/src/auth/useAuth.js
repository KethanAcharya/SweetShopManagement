import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

// ✅ Custom hook for cleaner AuthContext usage
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

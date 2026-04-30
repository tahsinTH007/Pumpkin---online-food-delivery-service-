import axios from "axios";
import { useEffect, useState, type ReactNode } from "react";
import { authServices } from "../main";
import type { User } from "../types";
import { AppContext } from "./AppContext";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setLoading(false);
          return;
        }

        const { data } = await axios.get(`${authServices}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(data.user);
        setIsAuth(true);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return (
    <AppContext.Provider
      value={{ user, isAuth, loading, setUser, setIsAuth, setLoading }}
    >
      {children}
    </AppContext.Provider>
  );
};

import axios from "axios";
import { useEffect, useState, type ReactNode } from "react";
import { authServices } from "../main";
import type { LocationData, User } from "../types";
import { AppContext } from "./AppContext";
import { Toaster } from "react-hot-toast";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const [location, setLocation] = useState<LocationData | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [city, setCity] = useState("Fetching Location...");

  // const [cart, setCart] = useState<ICart[]>([]);
  // const [subTotal, setSubTotal] = useState(0);
  // const [quantity, setQuantity] = useState(0);

  // async function fetchCart() {
  //   if (!user || user.role !== "customer") return;
  //   try {
  //     const { data } = await axios.get(`${restaurantService}/api/cart/all`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });

  //     setCart(data.cart || []);
  //     setSubTotal(data.subtotal || 0);
  //     setQuantity(data.cartLength);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem("token");

        const { data } = await axios.get(`${authServices}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(data);
        setIsAuth(true);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  // useEffect(() => {
  //   if (user && user.role === "customer") {
  //     fetchCart();
  //   }
  // }, [user]);

  useEffect(() => {
    if (!navigator.geolocation)
      return alert("Please Allow Location to continue");

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
        );

        const data = await res.json();

        setLocation({
          latitude,
          longitude,
          formattedAddress: data.display_name || "current location",
        });

        setCity(
          data.address.city ||
            data.address.town ||
            data.address.village ||
            "Your Location",
        );
        setLoadingLocation(false);
      } catch (error) {
        console.log(error);
        setLocation({
          latitude,
          longitude,
          formattedAddress: "Current Location",
        });
        setCity("Failed to load");
        setLoadingLocation(false);
      }
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        isAuth,
        loading,
        setUser,
        setIsAuth,
        setLoading,
        city,
        location,
        loadingLocation,
        // cart,
        // fetchCart,
        // quantity,
        // subTotal,
      }}
    >
      {children}
      <Toaster />
    </AppContext.Provider>
  );
};

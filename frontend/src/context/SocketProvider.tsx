import { useEffect, useMemo, useRef, type ReactNode } from "react";
import { io, type Socket } from "socket.io-client";

import { SocketContext } from "./SocketContext";
import { realtimeService } from "../main";
import { useAppData } from "./useAppData";

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const { isAuth } = useAppData();

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!isAuth) {
      socketRef.current?.disconnect();
      socketRef.current = null;
      return;
    }

    const socket = io(realtimeService, {
      auth: {
        token: localStorage.getItem("token"),
      },
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket Connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket Disconnected");
    });

    socket.on("connect_error", (err) => {
      console.log("Socket Error:", err.message);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [isAuth]);

  const value = useMemo(
    () => ({
      get socket() {
        return socketRef.current;
      },
    }),
    [],
  );

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

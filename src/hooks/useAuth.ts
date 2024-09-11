import { getUser } from "@/api/AuthAPI";
import { gameSocket } from "@/sockets/gameSocket";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useGame } from "./useGame";

export const usePlayer = () => {
  const { dispatch } = useGame();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["player"],
    queryFn: getUser,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      // create a socket connection
      // por alguna razón esto se ejecuta dos veces
      const socket = io(import.meta.env.VITE_API_BASE_URL); // probar ahora subirlo antes del if data
      gameSocket(socket, data, dispatch);

      // save socket connection to context
      dispatch({ type: "SET_SOCKET", payload: { socket } });

      // save user data to context
      dispatch({ type: "SAVE_PLAYER", payload: { newPlayer: data } });

      return () => {
        socket.disconnect();
        dispatch({ type: "SET_SOCKET", payload: { socket: null } });
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return { data, isError, isLoading };
};

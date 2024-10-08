import { getUser } from "@/api/AuthAPI";
import { gameSocket } from "@/sockets/gameSocket";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useGame } from "./useGame";

export const usePlayer = () => {
  const {
    state: { socket },
    dispatch,
  } = useGame();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["player"],
    queryFn: getUser,
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 0,
    gcTime: 0,
  });

  useEffect(() => {
    if (data) {
      if (socket === null) {
        // create a socket connection
        const socket = io(import.meta.env.VITE_API_BASE_URL);
        gameSocket(socket, data, dispatch);

        // save socket connection to context
        dispatch({ type: "SET_SOCKET", payload: { socket } });
      }
      // save user data to context
      dispatch({ type: "SAVE_PLAYER", payload: { newPlayer: data } });

      // save game data to context
      if (data.game) {
        dispatch({ type: "SET_GAME", payload: { game: data.game } });
      }

      return () => {
        socket?.disconnect();
        dispatch({ type: "SET_SOCKET", payload: { socket: null } });
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return { data, isError, isLoading };
};

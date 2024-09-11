import { getUser } from "@/api/AuthAPI";
import { gameSocket } from "@/sockets/gameSocket";
import { disconnectSocket, initSocket } from "@/sockets/socket";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
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
      console.log("me ejecute", data);
      if (socket === null) {
        // create a socket connection
        const socket = initSocket();
        gameSocket(socket, data, dispatch);

        // save socket connection to context
        dispatch({ type: "SET_SOCKET", payload: { socket } });
      }
      // save user data to context
      dispatch({ type: "SAVE_PLAYER", payload: { newPlayer: data } });

      return () => {
        disconnectSocket();
        dispatch({ type: "SET_SOCKET", payload: { socket: null } });
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return { data, isError, isLoading };
};

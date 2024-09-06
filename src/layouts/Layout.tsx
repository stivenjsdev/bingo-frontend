import { useAuth } from "@/hooks/useAuth";
import { gameSocket } from "@/sockets/gameSocket";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { io } from "socket.io-client";
import Header from "../components/Header";
import { useGame } from "../hooks/useGame";

const Layout = () => {
  const { dispatch } = useGame();
  const { data, isError, isLoading } = useAuth();

  useEffect(() => {
    if (data) {
      // save user data to context
      dispatch({ type: "SAVE_PLAYER", payload: { newPlayer: data } });

      // create a socket connection
      const socket = io(import.meta.env.VITE_API_BASE_URL);

      // save socket connection to context
      dispatch({ type: "SET_SOCKET", payload: { socket } });

      gameSocket(socket, data, dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (isLoading) return "Cargando...";
  if (isError) {
    return <Navigate to="/auth/login" />;
  }

  if (data)
    return (
      <div className="flex flex-col h-screen">
        <Header logoutButton />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    );
};

export default Layout;

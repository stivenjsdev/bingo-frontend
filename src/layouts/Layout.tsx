import { useAuth } from "@/hooks/useAuth";
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

      // connect to socket
      // join game room
      socket.on("connect", () => {
        console.log("connected");
        socket.emit("join game", data.game);
      });

      // listen for joined game event
      socket.on("joined game", (drawnNumbers) => {
        // save drawn numbers to context
        dispatch({
          type: "SET_DRAWN_BALLS",
          payload: { drawnBalls: drawnNumbers },
        });
      });

      // listen for ball drawn event
      socket.on("ball drawn", (ball, drawnNumbers) => {
        dispatch({ type: "DRAW_BALL", payload: { ball } });
        dispatch({
          type: "SET_DRAWN_BALLS",
          payload: { drawnBalls: drawnNumbers },
        });
      });

      // listen for game restarted event
      socket.on("game restarted", () => {
        dispatch({ type: "GAME_RESTARTED" });
      });

      // listen for game over event
      socket.on("game over", (playerName) => {
        console.log("game over", playerName);
      });
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

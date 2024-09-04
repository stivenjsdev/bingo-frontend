import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import Header from "../components/Header";
import { useGame } from "../hooks/useGame";
import { Player } from "../types";

const Layout = () => {
  const navigate = useNavigate();
  const { dispatch } = useGame();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error("Unauthorized");
      })
      .then((data) => {
        const player: Player = {
          id: data._id,
          name: data.name,
          game: data.game,
          bingoCard: data.bingoCard,
          active: data.active,
        };
        dispatch({ type: "SAVE_PLAYER", payload: { newPlayer: player } });
        const socket = io(import.meta.env.VITE_API_BASE_URL);
        dispatch({ type: "SET_SOCKET", payload: { socket } });

        socket.on("connect", () => {
          console.log("connected");
          socket.emit("join game", player.game);
        });

        socket.on("joined game", (drawnNumbers) => {
          dispatch({
            type: "SET_DRAWN_BALLS",
            payload: { drawnBalls: drawnNumbers },
          });
        });

        socket.on("ball drawn", (ball, drawnNumbers) => {
          dispatch({ type: "DRAW_BALL", payload: { ball } });
          dispatch({
            type: "SET_DRAWN_BALLS",
            payload: { drawnBalls: drawnNumbers },
          });
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        navigate("/auth/login");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

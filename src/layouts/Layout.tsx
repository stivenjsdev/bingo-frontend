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
    fetch("http://localhost:4000/api/auth/user", {
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
        console.log(data);
        const player: Player = {
          id: data._id,
          name: data.name,
          bingoCard: data.bingoCard,
          active: data.active,
        };
        dispatch({ type: "SAVE_PLAYER", payload: { newPlayer: player } });
        const socket = io("http://localhost:4000");

        socket.on("connect", () => {
          console.log("connected");
        });

        socket.on("ball drawn", (ball) => {
          console.log(ball);
          dispatch({ type: "DRAW_BALL", payload: { ball } });
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        navigate("/auth/login");
      });
  }, []);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;

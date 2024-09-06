import { Dispatch } from "react";
import { GameActions } from "reducers/gameReducer";
import { Socket } from "socket.io-client";
import { Player } from "../types";

export const gameSocket = (
  socket: Socket,
  player: Player,
  dispatch: Dispatch<GameActions>
) => {
  // connect to socket
  // join game room
  socket.on("connect", () => {
    console.log("connected");
    socket.emit("join game", player.game);
  });

  // listen for joined game event
  socket.on("joined game", (chosenBalls) => {
    // save drawn numbers to context
    dispatch({
      type: "SET_CHOSEN_BALLS",
      payload: { chosenBalls: chosenBalls },
    });
  });

  // listen for ball drawn event
  socket.on("ball taken out", (ball, chosenBalls) => {
    dispatch({ type: "TAKE_OUT_BALL", payload: { ball } });
    dispatch({
      type: "SET_CHOSEN_BALLS",
      payload: { chosenBalls: chosenBalls },
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
};

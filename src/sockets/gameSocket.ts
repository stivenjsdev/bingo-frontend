import { dateFormatter } from "@/utils/game";
import { Dispatch } from "react";
import { GameActions } from "reducers/gameReducer";
import { Socket } from "socket.io-client";
import Swal, { SweetAlertIcon } from "sweetalert2";
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
  socket.on("joined game", (chosenBalls, date) => {
    // save drawn numbers to context
    dispatch({
      type: "SET_CHOSEN_BALLS",
      payload: { chosenBalls: chosenBalls },
    });

    const hasGameStarted = chosenBalls.length > 0;
    if (!hasGameStarted) {
      Swal.fire({
        title: "¡Bienvenido al Juego!",
        text: `El juego comenzará el ${dateFormatter(new Date(date))}`,
        icon: "info",
        confirmButtonText: "vale",
      });
    }
  });

  // listen for ball drawn event
  socket.on("ball taken out", (ball, chosenBalls) => {
    dispatch({ type: "TAKE_OUT_BALL", payload: { ball } });
    dispatch({
      type: "SET_CHOSEN_BALLS",
      payload: { chosenBalls: chosenBalls },
    });
    const hasGameStarted = chosenBalls.length === 1;
    if (hasGameStarted) {
      Swal.fire({
        title: "¡Comenzamos!",
        text: "El juego ha comenzado, Una balota ha sido sacada",
        icon: "info",
        showConfirmButton: false,
        timer: 1800,
      });
    } else {
      Swal.fire({
        title: "Balota!",
        text: "Una balota ha sido sacada",
        icon: "info",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });

  // listen for game restarted event
  socket.on("game restarted", () => {
    dispatch({ type: "GAME_RESTARTED" });
    Swal.fire({
      title: "Juego Reiniciado!",
      text: "El juego comenzará de nuevo",
      icon: "warning",
      confirmButtonText: "Ok",
    });
  });

  // listen for game over event
  socket.on("game over", (playerName: string) => {
    console.log("game over", playerName);
    function capitalizeWords(str: string) {
      return str
        .split(" ")
        .reduce((acc, word) => {
          return acc + " " + word.charAt(0).toUpperCase() + word.slice(1);
        }, "")
        .trim();
    }
    Swal.fire({
      title: "¡BINGO!",
      text: `${capitalizeWords(playerName)} ha ganado el juego! 🥳`,
      icon: "success",
      confirmButtonText: "Wow!",
    });
  });

  // listen for a message from the host
  socket.on("message", (message: string, icon: SweetAlertIcon) => {
    Swal.fire({
      title: "Mensaje del anfitrión",
      text: message,
      icon: icon,
      showConfirmButton: false,
      timer: 3300,
    });
  });
};

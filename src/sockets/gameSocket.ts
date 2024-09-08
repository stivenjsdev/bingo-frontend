import { GameActions } from "@/reducers/gameReducer";
import { Game, Player } from "@/types";
import { capitalizeWords, dateFormatter } from "@/utils/game";
import { Dispatch } from "react";
import { Socket } from "socket.io-client";
import Swal, { SweetAlertIcon } from "sweetalert2";

export const gameSocket = (
  socket: Socket,
  player: Player,
  dispatch: Dispatch<GameActions>
) => {
  // connect to socket
  // join game room
  socket.on("connect", () => {
    console.log("connected");
    socket.emit("join-game", player.game);
  });

  // listen for joined game event
  socket.on("joined-game", (game: Game) => {
    // save drawn numbers to context
    dispatch({
      type: "SET_GAME",
      payload: { game: game },
    });

    const hasGameStarted = game.chosenNumbers.length > 0;
    if (!hasGameStarted) {
      Swal.fire({
        title: "¡Bienvenido al Juego!",
        text: `El juego comenzará el ${dateFormatter(new Date(game.date))}`,
        icon: "info",
        confirmButtonText: "vale",
      });
    }
  });

  // listen for ball drawn event
  socket.on("ball-takenOut", (ball: number, game: Game, message: string) => {
    if (!game || !ball) {
      console.log(message);
      return;
    }
    dispatch({ type: "TAKE_OUT_BALL", payload: { ball } });
    dispatch({
      type: "SET_GAME",
      payload: { game: game },
    });
    const hasGameStarted = game.chosenNumbers.length === 1;
    if (hasGameStarted) {
      Swal.fire({
        title: "¡Comenzamos!",
        text: "El juego ha comenzado, Una balota ha sido sacada",
        icon: "info",
        showConfirmButton: false,
        timer: 1800,
      });
    } else {
      /*Swal.fire({
        title: "Balota!",
        text: "Una balota ha sido sacada",
        icon: "info",
        showConfirmButton: false,
        timer: 1000,
      });*/
    }
  });

  // listen for game restarted event
  socket.on("game-restarted", (game: Game) => {
    dispatch({ type: "GAME_RESTARTED", payload: { game } });
    Swal.fire({
      title: "Juego Reiniciado!",
      text: "El juego comenzará de nuevo",
      icon: "warning",
      confirmButtonText: "Ok",
    });
  });

  // listen for game over event
  socket.on("game-over", (game: Game) => {
    console.log("game-over", game?.winner?.name);
    dispatch({ type: "SET_GAME", payload: { game } });
    Swal.fire({
      title: "¡BINGO!",
      text: `${game?.winner?.name ? capitalizeWords(game?.winner?.name): "Anónimo"} ha ganado el juego! 🥳`,
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

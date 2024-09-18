import bingoAudio from "@/assets/audio/bingo.mp3";
import resetAudio from "@/assets/audio/reset.mp3";
import { GameActions } from "@/reducers/gameReducer";
import { Game, Player } from "@/types";
import { audioNumbers, dateFormatter } from "@/utils/game";
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
    // socket.emit("join-game", gameId, playerId);
    socket.emit("joinGame", player.game?._id, player._id);
  });

  // listen for joined game event
  socket.on("joinedGame", () => {
    if (!player.game) return;
    Swal.fire({
      title: "¡Bienvenido al Juego!",
      text: `El juego comenzará el ${dateFormatter(
        new Date(player.game.date)
      )}`,
      icon: "info",
      confirmButtonText: "vale",
    });
  });

  // listen for ball taken out event
  socket.on("ballTakenOut", (ball: number, errorMessage: string) => {
    if (!ball) {
      console.log(errorMessage);
      return;
    }
    dispatch({ type: "TAKE_OUT_BALL", payload: { ball } });
    // play audio for the ball drawn
    if (audioNumbers[ball]) audioNumbers[ball]();
    // notice: los navegadores bloquean los audios automáticos si el usuario no ha interactuado con la página al menos una vez, mientras que el usuario haya tenido una interacción previa con la página, los audios se reproducirán automáticamente.
  });

  // listen for game restarted event
  socket.on("gameRestarted", () => {
    new Audio(resetAudio).play();
    dispatch({ type: "GAME_RESTARTED" });
  });

  // listen for game over event
  socket.on("gameOver", (game: Game) => {
    new Audio(bingoAudio).play();
    console.log("gameOver winner:", game?.winner?.name);
  });

  // listen for card changed event
  socket.on("cardChanged", (newPlayer: Player) => {
    if (!newPlayer) return;
    if (newPlayer._id === player._id) {
      dispatch({ type: "SAVE_PLAYER", payload: { newPlayer } });
    }
  });

  // listen for game updated event
  socket.on("gameUpdate", (game: Game) => {
    if (!game) return;
    dispatch({ type: "SET_GAME", payload: { game } });
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

import b1 from "@/assets/audio/B1.mp3";
import b10 from "@/assets/audio/B10.mp3";
import b11 from "@/assets/audio/B11.mp3";
import b12 from "@/assets/audio/B12.mp3";
import b13 from "@/assets/audio/B13.mp3";
import b14 from "@/assets/audio/B14.mp3";
import b15 from "@/assets/audio/B15.mp3";
import b2 from "@/assets/audio/B2.mp3";
import b3 from "@/assets/audio/B3.mp3";
import b4 from "@/assets/audio/B4.mp3";
import b5 from "@/assets/audio/B5.mp3";
import b6 from "@/assets/audio/B6.mp3";
import b7 from "@/assets/audio/B7.mp3";
import b8 from "@/assets/audio/B8.mp3";
import b9 from "@/assets/audio/B9.mp3";
import i16 from "@/assets/audio/I16.mp3";
import i17 from "@/assets/audio/I17.mp3";
import i18 from "@/assets/audio/I18.mp3";
import bingoAudio from "@/assets/audio/bingo.mp3";
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
    // play audio for the ball drawn
    const audios: { [key: number]: () => Promise<void> } = {
      1: () => new Audio(b1).play(),
      2: () => new Audio(b2).play(),
      3: () => new Audio(b3).play(),
      4: () => new Audio(b4).play(),
      5: () => new Audio(b5).play(),
      6: () => new Audio(b6).play(),
      7: () => new Audio(b7).play(),
      8: () => new Audio(b8).play(),
      9: () => new Audio(b9).play(),
      10: () => new Audio(b10).play(),
      11: () => new Audio(b11).play(),
      12: () => new Audio(b12).play(),
      13: () => new Audio(b13).play(),
      14: () => new Audio(b14).play(),
      15: () => new Audio(b15).play(),
      16: () => new Audio(i16).play(),
      17: () => new Audio(i17).play(),
      18: () => new Audio(i18).play(),
    };
    if (audios[ball]) {
      audios[ball]();
    }
    // notice: los navegadores bloquean los audios automáticos si el usuario no ha interactuado con la página al menos una vez, mientras que el usuario haya tenido una interacción previa con la página, los audios se reproducirán automáticamente.
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
    new Audio(bingoAudio).play();
    console.log("game-over", game?.winner?.name);
    dispatch({ type: "SET_GAME", payload: { game } });
    Swal.fire({
      title: "¡BINGO!",
      text: `${
        game?.winner?.name ? capitalizeWords(game?.winner?.name) : "Anónimo"
      } ha ganado el juego! 🥳`,
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

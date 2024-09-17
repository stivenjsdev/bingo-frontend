import type { Game, Player } from "@/types";
import { Socket } from "socket.io-client";

export type GameActions =
  | {
      type: "SAVE_PLAYER";
      payload: { newPlayer: Player };
    }
  | {
      type: "TAKE_OUT_BALL";
      payload: { ball: number };
    }
  | {
      type: "SET_GAME";
      payload: { game: Game };
    }
  | {
      type: "SET_SOCKET";
      payload: { socket: Socket | null };
    }
  | {
      type: "LOGOUT";
    }
  | {
      type: "GAME_RESTARTED";
    };

export type GameState = {
  player: Player;
  lastChosenBall: number;
  game: Game;
  socket: Socket | null;
};

export const initialState: GameState = {
  player: {
    _id: "",
    name: "",
    bingoCard: [],
    game: null, // sacamos la info del game en su propio estado
    active: false,
    online: false,
    socketId: null,
  },
  lastChosenBall: 0,
  game: {
    _id: "",
    gameName: "",
    date: new Date(),
    players: [],
    unsortedNumbers: [],
    chosenNumbers: [],
    userAdmin: "",
    active: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    winner: null,
  },
  socket: null,
};

export const gameReducer = (
  state: GameState = initialState,
  action: GameActions
) => {
  if (action.type === "SAVE_PLAYER") {
    return {
      ...state,
      player: action.payload.newPlayer,
    };
  }
  if (action.type === "TAKE_OUT_BALL") {
    return {
      ...state,
      lastChosenBall: action.payload.ball,
    };
  }
  if (action.type === "SET_GAME") {
    return {
      ...state,
      game: action.payload.game,
    };
  }
  if (action.type === "SET_SOCKET") {
    return {
      ...state,
      socket: action.payload.socket,
    };
  }
  if (action.type === "LOGOUT") {
    return initialState;
  }
  if (action.type === "GAME_RESTARTED") {
    return {
      ...state,
      lastChosenBall: 0,
    };
  }

  return state;
};

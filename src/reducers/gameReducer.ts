import { Socket } from "socket.io-client";
import { Player } from "../types/index";

export type GameActions =
  | {
      type: "SAVE_PLAYER";
      payload: { newPlayer: Player };
    }
  | {
      type: "DRAW_BALL";
      payload: { ball: number };
    }
  | {
      type: "SET_DRAWN_BALLS";
      payload: { drawnBalls: number[] };
    }
  | {
      type: "SET_SOCKET";
      payload: { socket: Socket };
    };

export type GameState = {
  player: Player;
  lastDrawnBall: number;
  drawnBalls: number[];
  socket: Socket;
};

export const initialState: GameState = {
  player: {
    id: "",
    name: "",
    bingoCard: [],
    game: "",
    active: false,
  },
  lastDrawnBall: 0,
  drawnBalls: [],
  socket: null!,
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
  if (action.type === "DRAW_BALL") {
    return {
      ...state,
      lastDrawnBall: action.payload.ball,
    };
  }
  if (action.type === "SET_DRAWN_BALLS") {
    return {
      ...state,
      drawnBalls: action.payload.drawnBalls,
    };
  }
  if (action.type === "SET_SOCKET") {
    return {
      ...state,
      socket: action.payload.socket,
    };
  }

  return state;
};

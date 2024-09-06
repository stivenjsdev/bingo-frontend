import { Socket } from "socket.io-client";
import { Player } from "../types/index";

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
      type: "SET_CHOSEN_BALLS";
      payload: { chosenBalls: number[] };
    }
  | {
      type: "SET_SOCKET";
      payload: { socket: Socket };
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
  chosenBalls: number[];
  socket: Socket;
};

export const initialState: GameState = {
  player: {
    _id: "",
    name: "",
    bingoCard: [],
    game: "",
    active: false,
  },
  lastChosenBall: 0,
  chosenBalls: [],
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
  if (action.type === "TAKE_OUT_BALL") {
    return {
      ...state,
      lastChosenBall: action.payload.ball,
    };
  }
  if (action.type === "SET_CHOSEN_BALLS") {
    return {
      ...state,
      chosenBalls: action.payload.chosenBalls,
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
      chosenBalls: [],
      lastChosenBall: 0,
    };
  }

  return state;
};

import { Player } from "../types/index";

export type GameActions =
  | {
      type: "SAVE_PLAYER";
      payload: { newPlayer: Player };
    }
  | {
      type: "DRAW_BALL";
      payload: { ball: number };
    };

export type GameState = {
  player: Player;
  drawnBall: number;
};

export const initialState: GameState = {
  player: {
    id: "",
    name: "",
    bingoCard: [],
    active: false,
  },
  drawnBall: 0,
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
      drawnBall: action.payload.ball,
    };
  }

  return state;
};

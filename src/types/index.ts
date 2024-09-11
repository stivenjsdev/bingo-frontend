export type Player = {
  _id: string;
  name: string;
  bingoCard: number[][];
  game: Game | null;
  active: boolean;
  online: boolean;
  socketId: string | null;
};

export type Game = {
  _id: string;
  gameName: string;
  date: Date;
  players: Player[];
  unsortedNumbers: number[];
  chosenNumbers: number[];
  userAdmin: string; // todo: change to User type
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  winner: Player | null;
};

export type PlayerLoginForm = {
  code: string;
};

export type BingoNumber = {
  value: number;
  marked: boolean;
};

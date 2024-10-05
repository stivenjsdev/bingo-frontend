export type BingoCard = {
  B: number[];
  I: number[];
  N: number[];
  G: number[];
  O: number[];
}

export type Player = {
  _id: string;
  name: string;
  // code: string;
  bingoCard: BingoCard;
  game: Game | null;
  active: boolean;
  online: boolean;
  socketId: string | null;
};

export type Game = {
  _id: string;
  gameName: string;
  gameType: number;
  date: Date;
  players: Player[];
  balls: number[];
  drawnBalls: number[];
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

export type Player = {
  id: string;
  name: string;
  bingoCard: number[][];
  game: string;
  active: boolean;
};

export type PlayerLoginForm = {
  code: string;
};

export type BingoNumber = {
  value: number;
  marked: boolean;
};

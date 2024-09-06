import { useEffect, useMemo, useState } from "react";

import { getBingoLetter, organizeNumbers } from "@/utils/game";
import { useGame } from "../hooks/useGame";
import type { BingoNumber } from "../types";

const IndexPage = () => {
  const { state } = useGame();

  const [bingoCard, setBingoCard] = useState<BingoNumber[][]>([]);

  const letter = useMemo(
    () => getBingoLetter(state.lastDrawnBall),
    [state.lastDrawnBall]
  );

  const organizedNumbers = useMemo(() => organizeNumbers(), []);

  const handleNumberClick = (colIndex: number, rowIndex: number) => {
    const newCard = [...bingoCard];
    newCard[colIndex][rowIndex].marked = !newCard[colIndex][rowIndex].marked;
    setBingoCard(newCard);
  };

  const handleBINGO = () => {
    state.socket.emit("bingo!", state.player.game, state.player._id);
  };

  useEffect(() => {
    setBingoCard(
      state.player.bingoCard.map((column) =>
        column.map((number) => ({ value: number, marked: false }))
      )
    );
  }, [state.player.bingoCard]);

  return (
    <div className="min-h-full flex flex-col gap-4 items-center justify-center bg-gray-100 p-4 sm:p-6 lg:p-8">
      {/* Balota actual */}
      <div className="flex items-center justify-center drop-shadow-lg">
        <div className="w-24 aspect-square flex items-center justify-center bg-white border border-gray-300 rounded-full">
          <div className="w-16 aspect-square flex flex-col items-center justify-center bg-white border-gray-950 border-4 rounded-full text-lg font-bold">
            <p className="text-sm uppercase">{letter}</p>
            <p className="text-lg mb-1">{state.lastDrawnBall}</p>
          </div>
        </div>
      </div>

      {/* Cartón de Bingo */}
      <div className="w-full max-w-md mx-auto border border-gray-50 shadow-lg p-4 space-y-3">
        <div>
          <h1 className="text-center">
            Cartón de Bingo de{" "}
            <span className="font-bold capitalize">{state.player.name}</span>
          </h1>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {["B", "I", "N", "G", "O"].map((letter, colIndex) => (
            <div key={letter} className="space-y-2">
              <div className="flex items-center justify-center bg-indigo-600 text-white font-bold p-4 rounded-t-md text-xl">
                {letter}
              </div>
              {bingoCard[colIndex]?.map((number, rowIndex) => (
                <div
                  key={`${colIndex}-${rowIndex}`}
                  className={`aspect-square flex items-center justify-center border border-gray-300 text-lg font-bold cursor-pointer
                    ${
                      colIndex === 2 && rowIndex === 2
                        ? "bg-gray-300 text-white"
                        : number.marked
                        ? "bg-indigo-300 text-white"
                        : "bg-white text-black"
                    }
                    ${rowIndex === 4 ? "rounded-b-md" : ""}`}
                  onClick={() =>
                    colIndex !== 2 || rowIndex !== 2
                      ? handleNumberClick(colIndex, rowIndex)
                      : null
                  }
                >
                  {colIndex === 2 && rowIndex === 2 ? "FREE" : number.value}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Botón de BINGO */}
      <div className="w-full max-w-96 p-10">
        <button
          className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-indigo-700 to-purple-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleBINGO}
        >
          Gritar BINGO!
        </button>
      </div>

      {/* Lista de Balotas Jugadas */}
      <div className=" w-full max-w-sm mx-auto py-4 px-5 bg-indigo-600 rounded-lg shadow-2xl">
        <div className="grid grid-cols-5 gap-2 md:gap-4">
          {["B", "I", "N", "G", "O"].map((letter) => (
            <div key={letter} className="flex flex-col items-center">
              <div className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4">
                {letter}
              </div>
              <div className="grid grid-rows-5 gap-1 md:gap-2">
                {organizedNumbers[letter].map((num) => (
                  <div
                    key={num}
                    className={`w-10 h-10 md:w-10 md:h-10 flex items-center justify-center rounded-full text-sm md:text-lg font-semibold
                    ${
                      state.drawnBalls.includes(num)
                        ? "bg-white text-indigo-900"
                        : "bg-indigo-800 text-indigo-200"
                    }`}
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndexPage;

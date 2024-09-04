import { useEffect, useState } from "react";

import { useGame } from "../hooks/useGame";

type BingoNumber = {
  value: number;
  marked: boolean;
};

const IndexPage = () => {
  const { state } = useGame();

  const [bingoCard, setBingoCard] = useState<BingoNumber[][]>([]);

  const handleNumberClick = (colIndex: number, rowIndex: number) => {
    const newCard = [...bingoCard];
    newCard[colIndex][rowIndex].marked = !newCard[colIndex][rowIndex].marked;
    setBingoCard(newCard);
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
      <div className="flex items-center justify-center">
        <div className="w-16 aspect-square flex items-center justify-center bg-white border border-gray-300 rounded-full text-lg font-bold">
          {state.lastDrawnBall}
        </div>
      </div>

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

      <div className="w-full bg-gray-100 py-8 flex flex-col justify-center sm:py-12 overflow-hidden">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-500 shadow-lg transform -skew-y-6 sm:skew-y-0 -rotate-6 rounded-3xl"></div>
          <div className="relative px-4 py-8 bg-white shadow-lg rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="font-bold text-center text-gray-900 mb-6 capitalize">
                  Balotas Extraídas
                </h1>
                {state.drawnBalls.length === 0 && (
                  <p>
                    Aún no se han extraído balotas.
                  </p>
                )}
              </div>
              <div className="grid grid-cols-5 gap-3 mb-2">
                {state.drawnBalls.map((ball, index) => (
                  <div
                    key={index}
                    className="w-12 h-12 flex items-center justify-center bg-indigo-600 text-white text-base font-bold rounded-full shadow-lg transition-transform duration-1000 ease-in-out transform hover:scale-110"
                  >
                    {ball}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;

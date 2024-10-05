import reloadIcon from "@/assets/reload.svg";
import Ball from "@/components/Ball";
import BingoTube from "@/components/BingoTube";
import GameStatus from "@/components/GameStatus";
import GameType from "@/components/GameType";
import { useGame } from "@/hooks/useGame";
import type { BingoNumber } from "@/types";
import { organizeNumbers } from "@/utils/game";
import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";

const IndexPage = () => {
  const { state } = useGame();

  const [bingoCard, setBingoCard] = useState<Record<string, BingoNumber[]>>({
    B: [],
    I: [],
    N: [],
    G: [],
    O: [],
  });
  // const [notificationPermission, setNotificationPermission] = useState(false);

  const organizedNumbers = useMemo(() => organizeNumbers(), []);

  const hasGameStarted = useMemo(
    () => state.game.drawnBalls.length > 0,
    [state.game.drawnBalls]
  );

  const handleNumberClick = (letter: string, rowIndex: number) => {
    const newCard = { ...bingoCard };
    newCard[letter][rowIndex].marked = !newCard[letter][rowIndex].marked;
    setBingoCard(newCard);
  };

  const handleChangeCard = () => {
    console.log("changeCard");
    if (!state.socket) return;
    state.socket.emit("changeCard", state.player._id, state.game._id);
  };

  const handleBINGO = () => {
    Swal.fire({
      title: "¡Has gritado BINGO!",
      text: "Espera a que el anfitrión verifique tu cartón",
      icon: "info",
      confirmButtonText: "vale",
    });
    state.socket?.emit("bingo!", state.game._id, state.player._id);
  };

  useEffect(() => {
    const updatedBingoCard = Object.fromEntries(
      Object.entries(state.player.bingoCard).map(([letter, numbers]) => [
        letter,
        numbers.map((number) => ({ value: number, marked: false })),
      ])
    );
    setBingoCard(updatedBingoCard);
  }, [state.player.bingoCard]);

  useEffect(() => {
    if (state.game.drawnBalls.length === 0) {
      const resetBingoCard = Object.fromEntries(
        Object.entries(state.player.bingoCard).map(([letter, numbers]) => [
          letter,
          numbers.map((number) => ({ value: number, marked: false })),
        ])
      );
      setBingoCard(resetBingoCard);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.game.drawnBalls]);

  return (
    <div className="min-h-full flex flex-col items-center justify-center gap-1 bg-gray-100 px-4 pt-1 sm:pt-2 pb-4">
      {/* Game Type */}
      <GameType />

      {/* Game State */}
      {state.game.winner && <GameStatus />}

      {/* Balota actual */}
      <Ball
        number={
          state.lastChosenBall
            ? state.lastChosenBall
            : state.game.drawnBalls[state.game.drawnBalls.length - 1]
        }
      />

      {/* Ultimas Balotas jugadas */}
      <BingoTube />

      {/* Cartón de Bingo */}
      <div className="relative w-full max-w-md mx-auto border border-gray-50 shadow-lg p-4 pt-1 space-y-2">
        {/* Botón de cambiar cartón */}
        {!hasGameStarted && (
          <button
            className="absolute -top-6 right-1 transform active:scale-75 transition duration-150"
            onClick={handleChangeCard}
          >
            <img src={reloadIcon} alt="change icon" className="w-12" />
          </button>
        )}

        <div>
          <h1 className="text-center">
            Cartón de Bingo de{" "}
            <span className="font-bold capitalize font-oswald">
              {state.player.name}
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {["B", "I", "N", "G", "O"].map((letter, colIndex) => (
            <div key={letter} className="space-y-2">
              <div className="flex items-center justify-center bg-indigo-600 text-white font-bold font-oswald p-4 rounded-t-md text-xl">
                {letter}
              </div>
              {bingoCard[letter]?.map((number, rowIndex) => (
                <div
                  key={`${letter}-${rowIndex}`}
                  className={`aspect-square flex items-center justify-center p-1 border border-gray-300 text-lg font-bold cursor-pointer
                    ${
                      colIndex === 2 && rowIndex === 2
                        ? "bg-gray-300 text-white"
                        : "bg-white text-black"
                    }
                    ${rowIndex === 4 ? "rounded-b-md" : ""}`}
                  onClick={() =>
                    letter !== "N" || rowIndex !== 2
                      ? handleNumberClick(letter, rowIndex)
                      : null
                  }
                >
                  <div className={`w-full h-full flex items-center justify-center ${number.marked ? "rounded-full bg-red-300 bg-opacity-45" : ""}`}>
                    {letter === "N" && rowIndex === 2 ? "FREE" : number.value}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Botón de BINGO */}
      <div className="w-full max-w-md py-3">
        <button
          disabled={!state.game.active}
          className={`w-full flex justify-center py-4 px-4 border border-transparent text-base font-medium font-oswald rounded-md text-white bg-gradient-to-r from-indigo-700 to-purple-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            !state.game.active && "opacity-50 cursor-not-allowed"
          }`}
          onClick={handleBINGO}
        >
          ¡Gritar BINGO!
        </button>
      </div>

      {/* Lista de Balotas Elegidas chosen balls */}
      <div className=" w-full max-w-sm mx-auto py-4 px-5 bg-indigo-600 rounded-lg shadow-2xl">
        <div className="grid grid-cols-5 gap-2 md:gap-4">
          {["B", "I", "N", "G", "O"].map((letter) => (
            <div key={letter} className="flex flex-col items-center">
              <div className="text-2xl md:text-4xl font-bold font-oswald text-white mb-2 md:mb-4">
                {letter}
              </div>
              <div className="grid grid-rows-5 gap-1 md:gap-2">
                {organizedNumbers[letter].map((num) => (
                  <div
                    key={num}
                    className={`w-10 h-10 md:w-10 md:h-10 flex items-center justify-center rounded-full text-sm md:text-lg font-semibold
                    ${
                      state.game.drawnBalls.includes(num)
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

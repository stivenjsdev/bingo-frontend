import trophy from "@/assets/trophy.svg";
import { useGame } from "@/hooks/useGame";
import { capitalizeWords } from '../utils/game';

const GameStatus = () => {
  const {
    state: {
      game: { winner },
    },
  } = useGame();
  return (
    <div className="fixed top-20 right-1 p-2 z-10 bg-purple-500 text-white border-4 border-purple-600">
      <h2 className="text-sm font-extrabold text-center">Juego Terminado</h2>
      <span className="flex gap-1 items-center text-sm">
        <img src={trophy} alt="key icon" className="w-4 h-4" />
        Ganador:
        <span>{winner ? capitalizeWords(winner.name) : "N/A"}</span>
      </span>
    </div>
  );
};

export default GameStatus;

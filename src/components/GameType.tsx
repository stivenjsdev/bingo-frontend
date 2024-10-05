import { useGame } from "@/hooks/useGame";

const gameTypeName = ["Cartón Completo", "Diagonal", "4 Esquinas", "Marco"];

const GameType = () => {
  const {
    state: {
      game: { gameType },
    },
  } = useGame();
  return (
    <div className="absolute top-16 left-2 p-2 z-10 rounded-md">
      <h2 className="text-sm font-bold">Tipo de Juego</h2>
      <span className="text-sm font-light text-center">
        {gameTypeName[gameType]}
      </span>
    </div>
  );
};

export default GameType;

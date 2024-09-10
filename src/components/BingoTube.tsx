import { useGame } from "@/hooks/useGame";
import Ball from "./Ball";

export default function BingoTube() {
  const {
    state: {
      game: { chosenNumbers },
    },
  } = useGame();
  return (
    <div className="max-w-md w-52 flex flex-col gap-1">
      {/* <h2 className="text-base text-center text-gray-800">
        Ultimas <span className="font-bold">Balotas</span> Jugadas
      </h2> */}
      <div className="relative bg-gray-300 rounded-3xl p-1 overflow-hidden shadow-lg">
        {/* Tubo exterior */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 rounded-3xl"></div>

        {/* Efecto de brillo */}
        <div className="absolute top-0 left-1/4 right-1/4 h-1/2 bg-gradient-to-b from-white via-transparent to-transparent opacity-30 rounded-t-full"></div>

        {/* Contenedor interior del tubo */}
        <div className="relative bg-gradient-to-b from-gray-200 to-gray-300 rounded-3xl overflow-hidden">
          {/* Efecto de profundidad */}
          <div className="absolute inset-2 bg-gradient-to-b from-transparent via-gray-400 to-gray-500 rounded-3xl opacity-20 h-9"></div>

          {/* Contenedor de balotas */}
          <div className="relative flex flex-row items-center justify-center gap-2 py-1">
            {chosenNumbers
              .slice(-4, -1)
              .reverse()
              .map((number) => (
                <Ball key={number} number={number} size="small" />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

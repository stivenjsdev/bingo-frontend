import { getBingoLetter } from "@/utils/game";
import { useMemo } from "react";

type BallProps = {
  number: number;
  size?: 'small' | 'normal';
};

const Ball = ({ number, size = "normal" }: BallProps) => {
  const outside = size === "small" ? "w-16" : "w-24";
  const inside = size === "small" ? "w-11 border-2" : "w-16 border-4";
  const letterSize = size === "small" ? "text-xs" : "text-sm";
  const numberSize = size === "small" ? "text-sm" : "text-lg"; 
  const letter = useMemo(() => getBingoLetter(number), [number]);
  return (
    <div
      key={number}
      className={`flex items-center justify-center drop-shadow-lg ${size !==  "small" && "animate-ball"}`}
      aria-label="polite"
    >
      <div className={`${outside} aspect-square flex items-center justify-center bg-white border border-gray-300 rounded-full`}>
        <div className={`${inside} aspect-square flex flex-col items-center justify-center bg-white border-gray-950 rounded-full font-bold`}>
          <p className={`${letterSize} uppercase`}>{letter}</p>
          <p className={`${numberSize} mb-1`} aria-label={`Bingo number ${number}`}>
            {number}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Ball;

import { getBingoLetter } from "@/utils/game";
import { useMemo } from "react";

type BallProps = {
  number: number;
  size?: 'small' | 'normal';
  className?: string;
};

const Ball = ({ number, size = "normal", className, ...properties }: BallProps) => {
  const outside = size === "small" ? "w-16" : "w-24";
  const inside = size === "small" ? "w-11 border-2" : "w-16 border-4";
  const letterSize = size === "small" ? "text-2xs" : "text-sm";
  const numberSize = size === "small" ? "text-base" : "text-xl"; 
  const letter = useMemo(() => getBingoLetter(number), [number]);
  return (
    <div
      key={number}
      className={`${className} flex items-center justify-center drop-shadow-lg ${size !==  "small" && "animate-ball"}`}
      aria-label="polite"
      {...properties}
    >
      <div className={`${outside} aspect-square flex items-center justify-center bg-white border border-gray-300 rounded-full`}>
        <div className={`relative ${inside} aspect-square flex flex-col items-center justify-center bg-white border-gray-950 rounded-full font-bold`}>
          <p className={`${letterSize} uppercase`}>{letter}</p>
          <p className={`relative -top-1 ${numberSize}`} aria-label={`Bingo number ${number}`}>
            {number}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Ball;

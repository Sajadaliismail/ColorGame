import React from "react";

interface GridProps {
  size: number;
  mainColor: string;
  oddColor: string;
  oddPosition: number;
  onSquareClick: (index: number) => void;
  showHint: boolean;
  gameEnded: boolean;
}

export const Grid: React.FC<GridProps> = ({
  size,
  mainColor,
  oddColor,
  oddPosition,
  onSquareClick,
  showHint,
  gameEnded,
}) => {
  return (
    <div className="grid grid-cols-6 gap-2 w-full aspect-square">
      {Array.from({ length: size * size }).map((_, index) => (
        <button
          key={index}
          className={`w-full h-full rounded-md transition-all duration-200  ${
            (showHint && index === oddPosition) ||
            (gameEnded && index === oddPosition)
              ? "animate-pulse ring-2 ring-yellow-400"
              : ""
          }`}
          style={{
            backgroundColor: index === oddPosition ? oddColor : mainColor,
          }}
          onClick={() => onSquareClick(index)}
        />
      ))}
    </div>
  );
};

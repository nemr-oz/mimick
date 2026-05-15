import type { CSSProperties } from "react";
import "../styles/consoleSpill.css";

const lines = Array.from(
  { length: 42 },
  (_, i) => ({
    id: i,
    text:
      i % 7 === 0
        ? "forgive forgive forgive forgive forgive"
        : i % 5 === 0
          ? "forgive forgive forgive"
          : "forgive forgive forgive forgive",
  })
);

export default function ConsoleSpill() {
  return (
    <div className="consoleSpill">
      {lines.map((line, i) => {
        const angle = -38 + i * 4.7;
        const distance = 12 + i * 2.8;

        return (
          <div
            key={line.id}
            className="spillLine"
            style={
              {
                "--i": i,
                "--r": `${angle}deg`,
                "--x": `${Math.cos(i * 0.55) * distance}px`,
                "--y": `${Math.sin(i * 0.55) * distance}px`,
                "--s": `${0.72 + (i % 9) * 0.045}`,
              } as CSSProperties
            }
          >
            {line.text}
          </div>
        );
      })}
    </div>
  );
}

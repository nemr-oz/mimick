import { useEffect, useState } from "react";

import "../styles/loopEnd.css";

type LoopEndProps = {
  onRestart: () => void;
};

const lines = [
  "observation suspended",
  "returning to previous state...",
  "",
  "記述は停止されました。",
  "観測は中断されました。",
  "",
  "……",
  "new observer detected",
  "",
  "LOOP",
];

function LoopEnd({ onRestart }: LoopEndProps) {
  const [index, setIndex] = useState(0);
  const [visibleText, setVisibleText] = useState("");
  const [finished, setFinished] = useState(false);

  const currentLine = lines[index];

  useEffect(() => {
    setVisibleText("");

    let i = 0;

    const speed = currentLine === "LOOP" ? 130 : 45;

    const interval = window.setInterval(() => {
      i++;

      setVisibleText(currentLine.slice(0, i));

      if (i >= currentLine.length) {
        window.clearInterval(interval);
      }
    }, speed);

    return () => {
      window.clearInterval(interval);
    };
  }, [index, currentLine]);

  useEffect(() => {
    if (index >= lines.length - 1) {
      setFinished(true);
      return;
    }

    const timeout = window.setTimeout(
      () => {
        setIndex((prev) => prev + 1);
      },
      currentLine === "" ? 450 : 1600
    );

    return () => {
      window.clearTimeout(timeout);
    };
  }, [index, currentLine]);

  return (
    <main className="loopEndScene">
      <section className="loopEndBox">
        <p
          className={
            currentLine === "LOOP"
              ? "loopFinal"
              : "loopLine"
          }
        >
          {visibleText}

          {!finished && <span className="cursor">█</span>}
        </p>

        {finished && (
          <button
            className="loopRestart"
            type="button"
            onClick={onRestart}
          >
            restart
          </button>
        )}
      </section>
    </main>
  );
}

export default LoopEnd;
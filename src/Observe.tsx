import { useEffect, useState } from "react";

type ObserveProps = {
  onFinish: () => void;
};

const lines = [
  "畫面には、短い一文だけが表示される。",
  "",
  "『わたしは、ここにいる。』",
  "",
  "カーソルが點滅している。",
  "",
  "入力を待っている。",
  "",
  "あなたは、いつものやうにキーを押す。",
  "",
  "w",
];

function Observe({ onFinish }: ObserveProps) {
  const [index, setIndex] = useState(0);
  const [visibleText, setVisibleText] = useState("");

  const currentLine = lines[index];

  const next = () => {
    if (index < lines.length - 1) {
      setIndex((prev) => prev + 1);
    } else {
      onFinish();
    }
  };

  useEffect(() => {
    setVisibleText("");

    let i = 0;

    const interval = setInterval(() => {
      i++;

      setVisibleText(currentLine.slice(0, i));

      if (i >= currentLine.length) {
        clearInterval(interval);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [index, currentLine]);

  useEffect(() => {
    const handleKeyDown = (
      e: KeyboardEvent
    ) => {
      if (e.key !== "Enter") return;

      next();
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [index]);

  return (
    <main className="app end" onClick={next}>
      <section className="stage">
        <section className="introBox">
          <p className="introLine">
            {visibleText}
            <span className="cursor">
              █
            </span>
          </p>
        </section>
      </section>
    </main>
  );
}

export default Observe;
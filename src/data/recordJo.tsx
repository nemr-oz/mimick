import { useEffect, useState } from "react";

import Girl from "../components/Girl";

import "../styles/game.css";

type RecordJoProps = {
  sequence: number;
  onFinish: () => void;
};

const joRecords: Record<number, string[]> = {
  6: [
    "……。",
    "古い文章ですね。",
    "今の人は、",
    "こんなふうには書かない。",
  ],

  7: [
    "……",
    "あなたは、急いでいますね。",
    "文字を追う速度だけが、",
    "だんだん速くなっていく。",
    "けれど、",
    "急げば急ぐほど、",
    "取り殘されるものもあります。",
    "例えば、",
    "思い出とか。",
    "……",
    "續きを。",
  ],

  8: [
    "……。",
    "最近。",
    "あなたは、あまり立ち止まらない。",
    "昔はもっと。",
    "一文字ずつ確かめていたのに。",
    "……",
  ],
};

function RecordJo({
  sequence,
  onFinish,
}: RecordJoProps) {
  const [index, setIndex] =
    useState(0);

  const [visibleText, setVisibleText] =
    useState("");

  const lines =
    joRecords[sequence] || [];

  const currentLine =
    lines[index] || "";

  const next = () => {
    if (index < lines.length - 1) {
      setIndex((prev) => prev + 1);
    } else {
      onFinish();
    }
  };

  useEffect(() => {
    setIndex(0);
    setVisibleText("");
  }, [sequence]);

  useEffect(() => {
    setVisibleText("");

    let i = 0;

    const interval = window.setInterval(() => {
      i++;

      setVisibleText(
        currentLine.slice(0, i)
      );

      if (i >= currentLine.length) {
        window.clearInterval(interval);
      }
    }, 45);

    return () => {
      window.clearInterval(interval);
    };
  }, [currentLine]);

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
  }, [index, sequence]);

  return (
    <main
      className="app"
      onClick={next}
    >
      <section className="stage">
        <Girl className="girl" />

        <div className="sentence">
          <p className="jp">
            {visibleText}

            <span className="cursor">
              █
            </span>
          </p>
        </div>
      </section>
    </main>
  );
}

export default RecordJo;
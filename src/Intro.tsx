import { useEffect, useState } from "react";
import Girl from "./components/Girl";
<Girl className="introGirl" />

type IntroProps = {
  onFinish: () => void;
};

const lines = [
  "……",
  "……",
  "……おや。",

  "目が、覺めましたか？",
  "長く、眠っておられたので。",

  "さあ、續きをしましょう。",

  "……何のことかって？",

  "……",
  "弱りましたね。",

  "あなたは、ずっと書いていたでしょう。",
  "毎日。",
  "毎晩。",
  "指が動かなくなるまで。",

  "……",

  "では。",
  "書き直さなければなりませんね。",

  "さあ、",
  "ペンを持って。",

  "《Enterキーを押してください。》",
];

function Intro({ onFinish }: IntroProps) {
  const [index, setIndex] = useState(0);

  const [visibleText, setVisibleText] =
    useState("");

  const currentLine = lines[index];

  /* 1文字ずつ表示 */

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

  /* Enter */

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
  });

  const next = () => {
    if (index < lines.length - 1) {
      setIndex((prev) => prev + 1);
    } else {
      onFinish();
    }
  };

  return (
    <main
      className="app intro"
      onClick={next}
    >
      <img
        src="/mimick/girl.png"
        className="introGirl"
      />

      <section className="introBox">
        <p
          className={
            index === lines.length - 1
              ? "introEnter"
              : "introLine"
          }
        >
          {visibleText}

          <span className="cursor">
            █
          </span>
        </p>

        <p className="introHint">
          click / enter
        </p>
      </section>
    </main>
  );
}

export default Intro;
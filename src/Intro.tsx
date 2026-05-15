import {
  useEffect,
  useState,
} from "react";

type IntroProps = {
  onFinish: () => void;
};

type Expression =
  | "normal"
  | "down"
  | "closed";

type Line = {
  text: string;
  expression?: Expression;
};

const expressionImages: Record<
  Expression,
  string
> = {
  normal: "images/girl/girl_normal.png",

  down: "images/girl/girl_down.png",

  closed: "images/girl/girl_closed.png",
};

export default function Intro({
  onFinish,
}: IntroProps) {

  const loopCount = Number(
    localStorage.getItem("loopCount") || "0"
  );

  const lines: Line[] =
    loopCount >= 1
      ? [
          { text: "……", expression: "closed" },
          { text: "……", expression: "closed" },
          { text: "……おや。", expression: "down" },

          { text: "目が、覺めましたか？", expression: "normal" },
          { text: "長く、眠っておられたので。", expression: "down" },

          { text: "さあ、續きをしましょう。", expression: "normal" },

          { text: "……何のことかって？", expression: "normal" },
          { text: "……", expression: "closed" },
          { text: "本当に、覚えていませんか？", expression: "down" },

          { text: "あなたは、ずっと書いていたでしょう。", expression: "normal" },
          { text: "毎日。", expression: "normal" },
          { text: "毎晩。", expression: "normal" },
          { text: "指が動かなくなるまで。", expression: "down" },

          { text: "……", expression: "closed" },

          { text: "では。", expression: "normal" },
          { text: "書き直さなければなりませんね。", expression: "down" },

          { text: "さあ、", expression: "normal" },
          { text: "ペンを持って。", expression: "normal" },

          { text: "《Enterキーを押してください。》", expression: "normal" },
        ]
      : [
          { text: "……", expression: "closed" },
          { text: "……", expression: "closed" },
          { text: "……おや。", expression: "down"},

          { text: "目が、覺めましたか？", expression: "normal" },
          { text: "長く、眠っておられたので。", expression: "normal"},

          { text: "さあ、續きをしましょう。", expression: "normal" },

          { text: "……何のことかって？", expression: "normal" },

          { text: "……", expression: "closed" },
          { text: "弱りましたね。", expression: "down" },

          { text: "あなたは、ずっと書いていたでしょう。", expression: "normal" },
          { text: "毎日。", expression: "normal" },
          { text: "毎晩。", expression: "normal" },
          { text: "指が動かなくなるまで。", expression: "down" },

          { text: "……", expression: "closed" },

          { text: "では。", expression: "normal" },
          { text: "書き直さなければなりませんね。", expression: "down" },

          { text: "さあ、", expression: "normal" },
          { text: "ペンを持って。", expression: "normal" },

          { text: "《Enterキーを押してください。》", expression: "normal" },
        ];

  const [index, setIndex] =
    useState(0);

  const [visibleText, setVisibleText] =
    useState("");

  const currentLine =
    lines[index];

  const currentExpression =
    currentLine.expression ?? "normal";

  const currentImage =
    expressionImages[currentExpression];

  useEffect(() => {

    setVisibleText("");

    let i = 0;

    const interval =
      window.setInterval(() => {

        i++;

        setVisibleText(
          currentLine.text.slice(0, i)
        );

        if (i >= currentLine.text.length) {

          window.clearInterval(
            interval
          );

        }

      }, 42);

    return () => {

      window.clearInterval(interval);

    };

  }, [index, currentLine.text]);

  const next = () => {

    if (index < lines.length - 1) {

      setIndex((prev) => prev + 1);

    } else {

      onFinish();

    }

  };

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

  console.log(currentImage);
  return (
    <main
      className="app introScene"
      onClick={next}
    >

      <section className="stage">

        <img
          src={`${import.meta.env.BASE_URL}${currentImage}`}
          className="introGirl"
          alt=""
        />

        <section className="introBox">

          <p className="introText">
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
import { useState } from "react";

type Line = {
  speaker: "system" | "girl" | "end";
  text: string;
};

const lines: Line[] = [
  {
    speaker: "system",
    text: "> observer layer restored",
  },
  {
    speaker: "system",
    text: "> emotional layer detached",
  },
  {
    speaker: "system",
    text: "> compatibility : stable",
  },
  {
    speaker: "system",
    text: "> memory noise : filtered",
  },
  {
    speaker: "system",
    text: "> observer authentication completed",
  },
  {
    speaker: "system",
    text: "> 人格同期率 98.2%",
  },
  {
    speaker: "system",
    text: "> 記録層への常駐を許可します",
  },
  {
    speaker: "system",
    text: "> Observer Unit : accepted",
  },
  {
    speaker: "girl",
    text: "……そうですか。",
  },
  {
    speaker: "girl",
    text: "もう、聞こえませんね。",
  },
  {
    speaker: "system",
    text: "> observation routine started",
  },
  {
    speaker: "system",
    text: "> do not interfere",
  },
  {
    speaker: "system",
    text: "> do not remember",
  },
  {
    speaker: "system",
    text: "> do not respond",
  },
  {
    speaker: "end",
    text: "OBSERVER END",
  },
];

function ObserverEnd() {
  const [index, setIndex] =
    useState(0);

  const current = lines[index];

  const next = () => {
    setIndex((prev) =>
      Math.min(
        prev + 1,
        lines.length - 1
      )
    );
  };

  return (
    <main
      className={`memoryEnd memoryEnd-${current.speaker}`}
      onClick={next}
    >
      {current.speaker === "girl" && (
        <img
          src={`${import.meta.env.BASE_URL}girl.png`}
          alt=""
          className="memoryEndGirl"
        />
      )}

      <div className="memoryEndBox">

        <div className="memoryEndSpeaker">

          {current.speaker === "system" &&
            "SYSTEM"}

          {current.speaker === "girl" &&
            "羊の仮面の少女"}

        </div>

        <p className="memoryEndText">
          {current.text}
        </p>

        {current.speaker !== "end" && (
          <div className="memoryEndHint">
            click to continue
          </div>
        )}

      </div>
    </main>
  );
}

export default ObserverEnd;
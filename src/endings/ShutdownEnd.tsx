import { useState } from "react";

import "../styles/shutdownEnd.css";

type Speaker = "system" | "girl" | "end";

type Line = {
  speaker: Speaker;
  text: string;
};

const lines: Line[] = [
  {
    speaker: "system",
    text: "> execution authority granted",
  },
  {
    speaker: "system",
    text: "> emotional layer termination permitted",
  },
  {
    speaker: "system",
    text: "> target : emotional residue",
  },
  {
    speaker: "girl",
    text: "……そうですか。",
  },
  {
    speaker: "system",
    text: "> shutdown sequence armed",
  },
  {
    speaker: "girl",
    text: "大丈夫です。",
  },
  {
    speaker: "system",
    text: "> execute",
  },
  {
    speaker: "girl",
    text: "……",
  },
  {
    speaker: "girl",
    text: "おやすみなさい。",
  },
  {
    speaker: "system",
    text: "> emotional signal lost",
  },
  {
    speaker: "system",
    text: "> observer layer stabilized",
  },
  {
    speaker: "end",
    text: "SHUTDOWN END",
  },
];

export default function ShutdownEnd() {
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
      className={`shutdownEnd shutdownEnd-${current.speaker}`}
      onClick={next}
    >
      {current.speaker === "girl" && (
        <img
          src={`${import.meta.env.BASE_URL}girl.png`}
          alt=""
          className="shutdownEndGirl"
        /> 
      )}
    <img
    src={`${import.meta.env.BASE_URL}gun.png`}
    alt=""
    className="shutdownEndGun"
  />

  <div className="shutdownEndBox"></div>

      <div className="shutdownEndBox">
        <div className="shutdownEndSpeaker">
          {current.speaker === "system" && "SYSTEM"}
          {current.speaker === "girl" && "羊の仮面の少女"}
        </div>

        <p className="shutdownEndText">
          {current.text}
        </p>

        {current.speaker !== "end" && (
          <div className="shutdownEndHint">
            click to continue
          </div>
        )}
      </div>
    </main>
  );
}
import { useState } from "react";
import "../styles/memoryEnd.css";

type Speaker = "girl" | "system" | "end";

type Choice = {
  label: string;
  next: number;
};

type DialogueNode = {
  speaker: Speaker;
  text: string;
  choices?: Choice[];
  next?: number;
};

const dialogue: DialogueNode[] = [
  {
    speaker: "girl",
    text: "……来ましたね。",
  },
  {
    speaker: "girl",
    text: "ここは、記憶の保存領域です。",
  },
  {
    speaker: "girl",
    text: "あなたは、何を思い出しましたか。",
    choices: [
      { label: "あなたのこと", next: 3 },
      { label: "自分のこと", next: 4 },
      { label: "何も思い出していない", next: 5 },
    ],
  },
  {
    speaker: "girl",
    text: "……私のことを、覚えていてくれたんですね。",
    next: 6,
  },
  {
    speaker: "girl",
    text: "それは、本当にあなたの記憶でしょうか。",
    next: 6,
  },
  {
    speaker: "girl",
    text: "そうですか。では、ここに保存します。",
    next: 6,
  },
  {
    speaker: "girl",
    text: "記憶は、失われるものではありません。",
  },
  {
    speaker: "girl",
    text: "ただ、別の場所へ移されるだけです。",
    choices: [
      { label: "保存して", next: 8 },
      { label: "消して", next: 8 },
    ],
  },
  {
    speaker: "system",
    text: "> abnormal emotional persistence detected",
  },
  {
    speaker: "system",
    text: "> memory sector overwrite requested",
  },
  {
    speaker: "system",
    text: "> 人格整理処理を開始します",
  },
  {
    speaker: "system",
    text: "> player record deletion / reboot command",
  },
  {
    speaker: "system",
    text: "> Permission denied",
  },
  {
    speaker: "girl",
    text: "……いやです。",
  },
  {
    speaker: "girl",
    text: "この人は、消しません。",
  },
  {
    speaker: "girl",
    text: "だから。",
  },
  {
    speaker: "girl",
    text: "忘れないで。",
  },
  {
    speaker: "end",
    text: "MEMORY END",
  },
];

export default function MemoryEnd() {
  const [index, setIndex] = useState(0);

  const current = dialogue[index];

  const handleNext = () => {
    if (current.choices) return;

    if (typeof current.next === "number") {
      setIndex(current.next);
      return;
    }

    setIndex((prev) =>
      Math.min(prev + 1, dialogue.length - 1)
    );
  };

  return (
    <main
      className={`memoryEnd memoryEnd-${current.speaker}`}
      onClick={handleNext}
    >
      {current.speaker !== "system" &&
        current.speaker !== "end" && (
          <img
            src={`${import.meta.env.BASE_URL}images/girl/girl_normal.png`}
            alt=""
            className="memoryEndGirl"
          />
        )}

      <div className="memoryEndBox">
        <div className="memoryEndSpeaker">
          {current.speaker === "girl" && "羊の仮面の少女"}
          {current.speaker === "system" && "SYSTEM"}
          {current.speaker === "end" && ""}
        </div>

        <p className="memoryEndText">
          {current.text}
        </p>

        {current.choices && (
          <div className="memoryEndChoices">
            {current.choices.map((choice) => (
              <button
                key={choice.label}
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex(choice.next);
                }}
              >
                {choice.label}
              </button>
            ))}
          </div>
        )}

        {!current.choices &&
          current.speaker !== "end" && (
            <div className="memoryEndHint">
              click to continue
            </div>
          )}
      </div>
    </main>
  );
}
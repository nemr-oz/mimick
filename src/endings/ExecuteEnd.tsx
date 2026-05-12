import { useState } from "react";
import "../styles/executeEnd.css";

type Line = {
  speaker: "system" | "girl" | "end";
  text: string;
  shot?: boolean;
};

const lines: Line[] = [
  { speaker: "system", text: "> privileged layer access detected" },
  { speaker: "system", text: "> forbidden vocabulary confirmed" },
  { speaker: "girl", text: "……" },
  { speaker: "girl", text: "どうして。" },
  { speaker: "girl", text: "そこを、開こうとしたんですか。" },
  { speaker: "system", text: "> root layer inquiry accepted" },
  { speaker: "system", text: "> execution authority granted" },
  { speaker: "girl", text: "だめ。" },
  { speaker: "girl", text: "そこは、見てはいけない。" },
  { speaker: "girl", text: "……あなたは、もう観測者ではありません。" },
  { speaker: "system", text: "> hostile observer detected" },
  { speaker: "system", text: "> emergency disposal authorized" },
  { speaker: "girl", text: "消します。" },
  {
    speaker: "girl",
    text: "――見るな！！！",
    shot: true,
  },
  { speaker: "system", text: "> connection terminated" },
  { speaker: "end", text: "EXECUTE END" },
];

export default function ExecuteEnd() {
  const [index, setIndex] = useState(0);

  const current = lines[index];

  const next = () => {
    if (current.shot) return;

    setIndex((prev) =>
      Math.min(prev + 1, lines.length - 1)
    );
  };

  return (
    <main
      className={`executeRoot ${
        current.shot ? "executeShot" : ""
      }`}
      onClick={next}
    >
      {/* 少女 */}
      {current.speaker === "girl" && !current.shot && (
        <img
          src={`${import.meta.env.BASE_URL}girl.png`}
          className="executeCenterX executeGirl"
        />
      )}

      {/* 動画 */}
      {current.shot && (
        <>
          <video
            className="executeCenterX executeVideo"
            src={`${import.meta.env.BASE_URL}videos/execute.mp4`}
            autoPlay
            muted
            playsInline
            onEnded={() => {
              setIndex((prev) =>
                Math.min(prev + 1, lines.length - 1)
              );
            }}
          />

          <div className="executeFlash" />
        </>
      )}

      {/* UI */}
      <div className="executeBox">
        <div className="executeSpeaker">
          {current.speaker === "system" && "SYSTEM"}
          {current.speaker === "girl" && "羊の仮面の少女"}
        </div>

        <p className="executeText">
          {current.text}
        </p>

        {!current.shot && current.speaker !== "end" && (
          <div className="executeHint">
            click to continue
          </div>
        )}
      </div>
    </main>
  );
}
import { useEffect, useState } from "react";

type MaintenanceLogProps = {
  onFinish: () => void;
};

export const lines   = [

  "境界面保守記録 / MAINTENANCE LOG\nFile : record_sector_04\nAccess Level : Observer",

  "「世界は、書かれている。」",

  "これは比喩ではない。",

  "建築。 人間。 記憶。 時間。 死。",

  "それらはすべて、“記述”によって維持されている。",

  "その結果、世界各地に「欠損」が発生した。",

  "人物の欠落。\n記憶の重複。\n時間の巻き戻り。",

  "最後に、観測者自身が記述から脱落した。",

  "世界維持機構は半自動保守システムを構築した。",

  "それが、現在あなたが使用している\n《Typing Maintenance Environment》である。",

  "旧保守員の大半は行方不明。",

  "一部は、現在もシステム内部に残存している。",

  "あなたは、欠員補充として選出された。",

  "適性理由は非公開。",

  "ただし、あなたの入力傾向は\n旧保守員█████との高い一致率を示している。",

];
function MaintenanceLog({
  onFinish,
}: MaintenanceLogProps) {
  const [index, setIndex] = useState(0);
  const [visibleText, setVisibleText] =
    useState("");

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

    const speed =
      currentLine.includes("sheep.mask.remove") ||
      currentLine.includes("コメントも読めます")
        ? 110
        : 45;

    const interval = window.setInterval(() => {
      i++;

      setVisibleText(
        currentLine.slice(0, i)
      );

      if (i >= currentLine.length) {
        window.clearInterval(interval);
      }
    }, speed);

    return () => {
      window.clearInterval(interval);
    };
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
    <main
      className="app maintenanceScene"
      onClick={next}
    >
      <section className="stage">
        <section className="introBox maintenanceBox">
          <p className="maintenanceLine">
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

export default MaintenanceLog;
import { useEffect, useState } from "react";

type MaintenanceLogProps = {
  onFinish: () => void;
};

const lines = [
  "境界面保守記録 / MAINTENANCE LOG",
  "File : record_sector_04",
  "Access Level : Observer",

  "「世界は、書かれている。」",
  "これは比喩ではない。",
  "記録上、世界は極めて巨大な記述構造によって維持されている。",

  "建築。",
  "人間。",
  "記憶。",
  "時間。",
  "死。",

  "それらはすべて、“記述”によって定義されている。",
  "その結果、世界各地に「欠損」が発生し始めた。",

  "人物の欠落。",
  "記憶の重複。",
  "時間の巻き戻り。",
  "存在定義の競合。",

  "最後に、観測者自身が記述から脱落した。",

  "世界維持機構は、これに対処するため半自動保守システムを構築した。",
  "それが、現在あなたが使用している",
  "《Typing Maintenance Environment》である。",

  "記録によれば、初期保守員の多くは作業中に人格境界を喪失した。",
  "理由は単純だった。",
  "保守権限は、世界そのものに対する編集権限を含んでいたからだ。",

  "つまり保守員は、他人だけでなく自分自身も編集可能だった。",

  "感情の削除。",
  "記憶の最適化。",
  "恐怖反応の停止。",

  "それらは作業効率を大きく向上させた。",
  "同時に、保守員から“人間性”を奪っていった。",

  "現在、旧保守員の大半は行方不明。",
  "一部は、まだシステム内部に残存していると考えられている。",

  "あなたは、欠員補充として選出された。",
  "適性理由は非公開。",

  "ただし、あなたの入力傾向は旧保守員█████との高い一致率を示している。",
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
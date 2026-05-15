import {
  useEffect,
  useRef,
  useState,
} from "react";

type Chapter2IntroProps = {
  onFinish: () => void;
};

const lines = [

  "感情層の欠損は、現在もっとも深刻な問題の一つである。",

  "初期保守システムは、\n論理記述による感情再現を試みた。",

  "結果は失敗だった。",

  "恐怖は定義できた。\n悲しみも分類できた。\n愛情も構造化できた。",

  "だが。",

  "それらは一度も“人間の感情”にならなかった。",

  "涙。郷愁。孤独。憧憬。",

  "それら高次情動の再現率は、\n長期運用において著しく低下した。",

  "……",

  "感情補修プロトコルを再開します。",

];

function Chapter2Intro({
  onFinish,
}: Chapter2IntroProps) {
  const [index, setIndex] = useState(0);
  const [visibleText, setVisibleText] =
    useState("");

  const [rapidCount, setRapidCount] =
    useState(0);

  const [specialLine, setSpecialLine] =
    useState(false);

  const lockedRef = useRef(false);
  const finishedRef = useRef(false);
  const onFinishRef = useRef(onFinish);

  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  const loopCount = Number(
    localStorage.getItem("loopCount") || "0"
  );

  const currentLine = specialLine
    ? "あなたは、読む速度を上げています。"
    : lines[index];

  const finishOnce = () => {
    if (finishedRef.current) return;

    finishedRef.current = true;
    onFinishRef.current();
  };

  const next = () => {
    if (lockedRef.current) return;
    if (finishedRef.current) return;

    lockedRef.current = true;

    window.setTimeout(() => {
      lockedRef.current = false;
    }, 90);

    setRapidCount((prev) => prev + 1);

    if (
      loopCount >= 1 &&
      rapidCount > 12 &&
      !specialLine
    ) {
      setSpecialLine(true);
      return;
    }

    if (specialLine) {
      setSpecialLine(false);

      if (index < lines.length - 1) {
        setIndex((prev) => prev + 1);
      } else {
        finishOnce();
      }

      return;
    }

    if (index < lines.length - 1) {
      setIndex((prev) => prev + 1);
    } else {
      finishOnce();
    }
  };

  useEffect(() => {
    setVisibleText("");

    let i = 0;

    const interval = window.setInterval(() => {
      i++;

      setVisibleText(currentLine.slice(0, i));

      if (i >= currentLine.length) {
        window.clearInterval(interval);
      }
    }, 45);

    return () => {
      window.clearInterval(interval);
    };
  }, [index, currentLine]);

  useEffect(() => {
    if (specialLine) return;
    if (finishedRef.current) return;
    if (index !== lines.length - 1) return;
    if (visibleText !== currentLine) return;

    const timeout = window.setTimeout(() => {
      finishOnce();
    }, 1200);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [
    index,
    visibleText,
    currentLine,
    specialLine,
  ]);

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
  }, [
    index,
    rapidCount,
    specialLine,
    currentLine,
  ]);

  return (
    <main
      className="app maintenanceScene"
      onClick={next}
    >
      <section className="stage">
        <section className="introBox maintenanceBox">
          <p className="maintenanceLine">
            {visibleText}
            <span className="cursor">█</span>
          </p>
        </section>
      </section>
    </main>
  );
}

export default Chapter2Intro;
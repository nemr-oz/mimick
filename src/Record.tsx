import { useEffect, useState } from "react";
import Girl from "./components/Girl";
import recordLines from "./data/recordLines";

type RecordProps = {
  sequence: number;
  onFinish: () => void;
};

function Record({
  sequence,
  onFinish,
}: RecordProps) {
  const record = recordLines[sequence];

  if (!record) {
    return null;
  }

  const lines = record.lines;
  const auto = record.auto;

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
    setIndex(0);
    setVisibleText("");
  }, [sequence]);

  useEffect(() => {
    setVisibleText("");

    let i = 0;

    const speed =
      currentLine === "『一致しました』"
        ? 120
        : 45;

    const interval = setInterval(() => {
      i++;

      setVisibleText(
        currentLine.slice(0, i)
      );

      if (i >= currentLine.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [index, currentLine]);

  useEffect(() => {
    if (!auto) return;

    if (index >= lines.length - 1) {
      const timeout = setTimeout(() => {
        onFinish();
      }, 1200);

      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, 1600);

    return () => clearTimeout(timeout);
  }, [
    auto,
    index,
    lines.length,
    onFinish,
  ]);

  useEffect(() => {
    const handleKeyDown = (
      e: KeyboardEvent
    ) => {
      if (auto) return;
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
  }, [index, lines.length, auto]);

  return (
    <main
      className="app end"
      onClick={() => {
        if (!auto) {
          next();
        }
      }}
    >
      <section className="stage">
        <Girl className="girl endGirl" />

        <section className="introBox">
          <p className="introLine">
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

export default Record;
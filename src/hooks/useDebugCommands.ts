import { useEffect } from "react";
import type { Scene } from "../App";

type UseDebugCommandsProps = {
  showDebug: boolean;

  setShowDebug: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  setScene: React.Dispatch<
    React.SetStateAction<Scene>
  >;

  setSequence: React.Dispatch<
    React.SetStateAction<number>
  >;
};

function setDebugTypingStats(
  rank: "unstable" | "medium" | "high"
) {
  const stat =
    rank === "high"
      ? {
          jp: "debug-high",
          missCount: 0,
          elapsedMs: 1500,
          typedLength: 30,
          completedAt: new Date().toISOString(),
        }
      : rank === "medium"
      ? {
          jp: "debug-medium",
          missCount: 2,
          elapsedMs: 5000,
          typedLength: 20,
          completedAt: new Date().toISOString(),
        }
      : {
          jp: "debug-unstable",
          missCount: 20,
          elapsedMs: 20000,
          typedLength: 10,
          completedAt: new Date().toISOString(),
        };

  localStorage.setItem(
    "typingStats",
    JSON.stringify([stat])
  );
}

export function useDebugCommands({
  showDebug,
  setShowDebug,
  setScene,
  setSequence,
}: UseDebugCommandsProps) {
  useEffect(() => {
    const handleDebug = (
      e: KeyboardEvent
    ) => {
      if (
        e.shiftKey &&
        e.key.toLowerCase() === "d"
      ) {
        setShowDebug((prev) => !prev);
        return;
      }

      if (!showDebug) return;

      const key = e.key.toLowerCase();

      if (key === "1") {
        setSequence(0);
        setScene("intro");
        setShowDebug(false);
      } else if (key === "2") {
        setScene("consoleChapter1End");
        setShowDebug(false);
      } else if (key === "3") {
        setScene("maintenance");
        setShowDebug(false);
      } else if (key === "4") {
        setScene("consoleChapter2Start");
        setShowDebug(false);
      } else if (key === "5") {
        setSequence(6);
        setScene("chapter2Intro");
        setShowDebug(false);
      } else if (key === "6") {
        setSequence(6);
        setScene("game");
        setShowDebug(false);
      } else if (key === "7") {
        setScene("consoleEndingChoice");
        setShowDebug(false);
      } else if (key === "8") {
        setScene("executeEnd");
        setShowDebug(false);
      } else if (key === "9") {
        setScene("loopEnd");
        setShowDebug(false);
      } else if (key === "u") {
        setDebugTypingStats("unstable");
        setScene("consoleEndingChoice");
        setShowDebug(false);
      } else if (key === "m") {
        setDebugTypingStats("medium");
        setScene("consoleEndingChoice");
        setShowDebug(false);
      } else if (key === "h") {
        setDebugTypingStats("high");
        setScene("consoleEndingChoice");
        setShowDebug(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleDebug
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleDebug
      );
    };
  }, [
    showDebug,
    setShowDebug,
    setScene,
    setSequence,
  ]);
}
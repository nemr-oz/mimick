import {
  useEffect,
  useRef,
} from "react";

import type { Scene } from "../scenes/sceneTypes";

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
          completedAt:
            new Date().toISOString(),
        }

      : rank === "medium"
      ? {
          jp: "debug-medium",
          missCount: 2,
          elapsedMs: 5000,
          typedLength: 20,
          completedAt:
            new Date().toISOString(),
        }

      : {
          jp: "debug-unstable",
          missCount: 20,
          elapsedMs: 20000,
          typedLength: 10,
          completedAt:
            new Date().toISOString(),
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

  const groupRef =
    useRef<string | null>(null);

  useEffect(() => {

    const closeDebug = () => {
      groupRef.current = null;
      setShowDebug(false);
    };

    const goScene = (
      scene: Scene,
      sequence?: number
    ) => {

      if (typeof sequence === "number") {
        setSequence(sequence);
      }

      setScene(scene);

      closeDebug();

    };

    const handleDebug = (
      e: KeyboardEvent
    ) => {

      if (
        e.shiftKey &&
        e.key.toLowerCase() === "d"
      ) {

        groupRef.current = null;

        setShowDebug(
          (prev) => !prev
        );

        return;

      }

      if (!showDebug) return;

      const key =
        e.key.toLowerCase();

      if (key === "escape") {

        closeDebug();

        return;

      }

      if (
        ["1", "2", "3", "4"].includes(key) &&
        groupRef.current === null
      ) {

        groupRef.current = key;

        return;

      }

      const group =
        groupRef.current;

      if (!group) return;

      /* ---------- 1 : MAIN FLOW ---------- */

      if (group === "1") {

        if (key === "1") {
          goScene("intro", 0);
        }

        else if (key === "2") {
          goScene("game", 0);
        }

        else if (key === "3") {
          goScene("record", 0);
        }

        else if (key === "4") {
          goScene("consoleChapter1End");
        }

      }

      /* ---------- 2 : CHAPTER 2 ---------- */

      else if (group === "2") {

        if (key === "1") {
          goScene("chapter2Intro");
        }

        else if (key === "2") {
          goScene("emotionTuner");
        }

        else if (key === "3") {
          goScene("game", 6);
        }

        else if (key === "4") {
          goScene("record", 6);
        }

        else if (key === "5") {
          goScene("consoleEndingChoice");
        }

      }

      /* ---------- 3 : ENDINGS ---------- */

      else if (group === "3") {

        if (key === "1") {
          goScene("memoryEnd");
        }

        else if (key === "2") {
          goScene("observerEnd");
        }

        else if (key === "3") {
          goScene("shutdownEnd");
        }

        else if (key === "4") {
          goScene("loopEnd");
        }

        else if (key === "5") {
          goScene("executeEnd");
        }

      }

      /* ---------- 4 : ENDING DEBUG STATS ---------- */

      else if (group === "4") {

        if (key === "1") {

          setDebugTypingStats(
            "unstable"
          );

          goScene("consoleEndingChoice");

        }

        else if (key === "2") {

          setDebugTypingStats(
            "medium"
          );

          goScene("consoleEndingChoice");

        }

        else if (key === "3") {

          setDebugTypingStats(
            "high"
          );

          goScene("consoleEndingChoice");

        }

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
import type { Scene } from "../scenes/sceneTypes";
import "../styles/debugMenu.css";

type DebugMenuProps = {
  visible: boolean;
  setScene: React.Dispatch<React.SetStateAction<Scene>>;
  setSequence: React.Dispatch<React.SetStateAction<number>>;
};

export default function DebugMenu({
  visible,
  setScene,
  setSequence,
}: DebugMenuProps) {
  if (!visible) return null;

  return (
    <div className="debugMenu">
      <p>DEBUG MENU</p>

      <br />

      <p>[1] MAIN FLOW</p>

      <button
        onClick={() => {
          setSequence(0);
          setScene("intro");
        }}
      >
        1-1 : intro
      </button>

      <button
        onClick={() => {
          setSequence(0);
          setScene("game");
        }}
      >
        1-2 : chapter1 game
      </button>

      <button
        onClick={() => {
          setSequence(0);
          setScene("record");
        }}
      >
        1-3 : chapter1 record
      </button>

      <button onClick={() => setScene("consoleChapter1End")}>
        1-4 : chapter1 end console
      </button>

      <br />

      <p>[2] CHAPTER 2</p>

      <button onClick={() => setScene("chapter2Intro")}>
        2-1 : chapter2 intro
      </button>

      <button onClick={() => setScene("emotionTuner")}>
        2-2 : emotion tuner
      </button>

      <button
        onClick={() => {
          setSequence(6);
          setScene("game");
        }}
      >
        2-3 : chapter2 game
      </button>

      <button
        onClick={() => {
          setSequence(6);
          setScene("record");
        }}
      >
        2-4 : chapter2 record
      </button>

      <button onClick={() => setScene("consoleEndingChoice")}>
        2-5 : ending choice
      </button>

      <br />

      <p>[3] ENDINGS</p>

      <button onClick={() => setScene("memoryEnd")}>
        3-1 : memory end
      </button>

      <button onClick={() => setScene("observerEnd")}>
        3-2 : observer end
      </button>

      <button onClick={() => setScene("shutdownEnd")}>
        3-3 : shutdown end
      </button>

      <button onClick={() => setScene("loopEnd")}>
        3-4 : loop end
      </button>

      <button onClick={() => setScene("executeEnd")}>
        3-5 : execute end
      </button>

      <br />

      <p>[4] ENDING DEBUG</p>

      <button
        onClick={() => {
          localStorage.setItem(
            "typingAnalysis",
            JSON.stringify({
              total: 3,
              totalMiss: 30,
              averageMiss: 10,
              averageSpeed: 0.8,
              rank: "unstable",
            })
          );
        }}
      >
        4-1 : unstable
      </button>

      <button
        onClick={() => {
          localStorage.setItem(
            "typingAnalysis",
            JSON.stringify({
              total: 3,
              totalMiss: 12,
              averageMiss: 4,
              averageSpeed: 1.4,
              rank: "medium",
            })
          );
        }}
      >
        4-2 : medium
      </button>

      <button
        onClick={() => {
          localStorage.setItem(
            "typingAnalysis",
            JSON.stringify({
              total: 3,
              totalMiss: 1,
              averageMiss: 0.3,
              averageSpeed: 2.4,
              rank: "high",
            })
          );
        }}
      >
        4-3 : high
      </button>

      <br />

      <p>[5] TOOLS</p>

      <button onClick={() => setScene("eyePicker")}>
        5-1 : eye coordinate picker
      </button>

      <br />

      <p>ESC : close debug</p>
    </div>
  );
}
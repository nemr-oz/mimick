import { useState } from "react";
import type { ReactNode } from "react";

import Intro from "./Intro";

import Chapter1 from "./chapters/Chapter1";
import Chapter2Intro from "./chapters/Chapter2Intro";
import Chapter2 from "./chapters/Chapter2";

import Record from "./Record";
import RecordJo from "./data/recordJo";
import MaintenanceLog from "./MaintenanceLog";
import FakeConsole from "./FakeConsole";

import LoopEnd from "./endings/LoopEnd";
import ExecuteEnd from "./endings/ExecuteEnd";
import MemoryEnd from "./endings/MemoryEnd";
import ObserverEnd from "./endings/ObserverEnd";

import { useDebugCommands } from "./hooks/useDebugCommands";

import "./styles/base.css";
import "./styles/intro.css";
import "./styles/game.css";
import "./styles/end.css";
import "./styles/console.css";
import "./styles/maintenanceLog.css";
import "./styles/memoryEnd.css";

export type Scene =
  | "intro"
  | "game"
  | "record"
  | "consoleChapter1End"
  | "maintenance"
  | "consoleChapter2Start"
  | "chapter2Intro"
  | "consoleEndingChoice"
  | "memoryEnd"
  | "observerEnd"
  | "loopEnd"
  | "executeEnd";

function App() {
  const [scene, setScene] =
    useState<Scene>("intro");

  const [sequence, setSequence] =
    useState(0);

  const [showDebug, setShowDebug] =
    useState(false);

  useDebugCommands({
    showDebug,
    setShowDebug,
    setScene,
    setSequence,
  });

  let content: ReactNode;

  if (scene === "intro") {
    content = (
      <Intro
        onFinish={() => {
          setScene("game");
        }}
      />
    );
  } else if (scene === "game") {
    if (sequence < 6) {
      content = (
        <Chapter1
          sequence={sequence}
          onFinish={() => {
            setScene("record");
          }}
        />
      );
    } else {
      content = (
        <Chapter2
          sequence={sequence}
          onFinish={() => {
            setScene("record");
          }}
        />
      );
    }
  } else if (scene === "record") {
    if (sequence >= 6) {
      content = (
        <RecordJo
          sequence={sequence}
          onFinish={() => {
            if (sequence < 8) {
              setSequence((prev) => prev + 1);
              setScene("game");
            } else {
              setScene("consoleEndingChoice");
            }
          }}
        />
      );
    } else {
      content = (
        <Record
          sequence={sequence}
          onFinish={() => {
            if (sequence < 5) {
              setSequence((prev) => prev + 1);
              setScene("game");
            } else {
              setScene("consoleChapter1End");
            }
          }}
        />
      );
    }
  } else if (scene === "consoleChapter1End") {
    content = (
      <FakeConsole
        phase="chapter1End"
        onContinue={() => {
          setScene("maintenance");
        }}
      />
    );
  } else if (scene === "maintenance") {
    content = (
      <MaintenanceLog
        onFinish={() => {
          setScene("consoleChapter2Start");
        }}
      />
    );
  } else if (scene === "consoleChapter2Start") {
    content = (
      <FakeConsole
        phase="chapter2Start"
        onContinue={() => {
          setScene("chapter2Intro");
        }}
      />
    );
  } else if (scene === "chapter2Intro") {
    content = (
      <Chapter2Intro
        onFinish={() => {
          setSequence(6);
          setScene("game");
        }}
      />
    );
  } else if (scene === "consoleEndingChoice") {
    content = (
      <FakeConsole
        phase="endingChoice"
        onMemory={() => {
          setScene("memoryEnd");
        }}
        onObserver={() => {
          setScene("observerEnd");
        }}
        onUnstable={() => {
          setScene("loopEnd");
        }}
        onForbidden={() => {
          setScene("executeEnd");
        }}
      />
    );
  } else if (scene === "memoryEnd") {
    content = <MemoryEnd />;
  } else if (scene === "observerEnd") {
    content = <ObserverEnd />;
  } else if (scene === "loopEnd") {
    content = (
      <LoopEnd
        onRestart={() => {
          setSequence(0);
          setScene("intro");
        }}
      />
    );
  } else {
    content = (
      <ExecuteEnd
        onRestart={() => {
          setSequence(0);
          setScene("intro");
        }}
      />
    );
  }

  return (
    <div className="app">
      {content}

      {showDebug && (
        <div className="debugMenu">
          <p>DEBUG MENU</p>
          <p>1 : intro</p>
          <p>2 : consoleChapter1End</p>
          <p>3 : maintenance</p>
          <p>4 : consoleChapter2Start</p>
          <p>5 : chapter2Intro</p>
          <p>6 : game / Chapter2</p>
          <p>7 : consoleEndingChoice</p>
          <p>8 : memoryEnd</p>
          <p>9 : observerEnd</p>
          <p>0 : loopEnd</p>
        </div>
      )}
    </div>
  );
}

export default App;
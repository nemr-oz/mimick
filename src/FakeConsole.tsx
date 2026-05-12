import { useEffect, useState } from "react";

import {
  getTypingAnalysis,
} from "./utils/typingStats";

import {
  getInitialLogs,
} from "./console/consoleLogs";

import {
  runConsoleCommand,
} from "./console/consoleCommands";

export type ConsolePhase =
  | "chapter1End"
  | "chapter2Start"
  | "endingChoice";

type FakeConsoleProps = {
  phase: ConsolePhase;

  onContinue?: () => void;

  onMemory?: () => void;
  onObserver?: () => void;
  onUnstable?: () => void;
  onForbidden?: () => void;
};

function FakeConsole({
  onContinue,
  onMemory,
  onObserver,
  onUnstable,
  onForbidden,
  phase,
}: FakeConsoleProps) {
  const [input, setInput] =
    useState("");

  const analysis =
    getTypingAnalysis();

  const [logs, setLogs] =
    useState<string[]>(
      getInitialLogs(
        phase,
        analysis
      )
    );

  useEffect(() => {
    const timeouts: number[] = [];

    if (phase === "chapter1End") {
      timeouts.push(
        window.setTimeout(() => {
          setLogs((prev) => [
            ...prev,
            "> observer opened console",
          ]);
        }, 2500)
      );

      timeouts.push(
        window.setTimeout(() => {
          setLogs((prev) => [
            ...prev,
            "> observer is reading this",
          ]);
        }, 5200)
      );

      timeouts.push(
        window.setTimeout(() => {
          setLogs((prev) => [
            ...prev,
            "> previous maintenance log available",
          ]);
        }, 8500)
      );

      timeouts.push(
        window.setTimeout(() => {
          setLogs((prev) => [
            ...prev,
            "> type 'continue'",
          ]);
        }, 11000)
      );
    } else if (
      phase === "chapter2Start"
    ) {
      timeouts.push(
        window.setTimeout(() => {
          setLogs((prev) => [
            ...prev,
            "> compatibility not guaranteed",
          ]);
        }, 2400)
      );

      timeouts.push(
        window.setTimeout(() => {
          setLogs((prev) => [
            ...prev,
            "> type 'continue'",
          ]);
        }, 5000)
      );
    } else {
      timeouts.push(
        window.setTimeout(() => {
          setLogs((prev) => [
            ...prev,
            "",
            "> hidden command available",
            "> type 'hint'",
          ]);
        }, 2400)
      );
    }

    return () => {
      timeouts.forEach((timeout) =>
        clearTimeout(timeout)
      );
    };
  }, [phase]);

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    runConsoleCommand({
      command: input,
      phase,
      analysis,
      setLogs,
      setInput,
      onContinue,
      onMemory,
      onObserver,
      onUnstable,
      onForbidden,
    });
  };

  const handleClose = () => {
    setLogs((prev) => [
      ...prev,
      "> console close denied",
    ]);
  };

  return (
    <div className="fakeConsole">
      <div className="consoleHeader">
        RECORD CONSOLE

        <button
          type="button"
          onClick={handleClose}
        >
          ×
        </button>
      </div>

      <div className="consoleBody">
        {logs.map((log, i) => (
          <p key={i}>{log}</p>
        ))}

        <form onSubmit={handleSubmit}>
          <span>&gt; </span>

          <input
            className="consoleInput"
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}

export default FakeConsole;
import type {
  TypingAnalysis,
} from "../utils/typingStats";

import {
  getHintLogs,
} from "./consoleHints";

type RunCommandParams = {
  command: string;

  phase:
    | "chapter1End"
    | "chapter2Start"
    | "endingChoice";

  analysis: TypingAnalysis;

  setLogs: React.Dispatch<
    React.SetStateAction<string[]>
  >;

  setInput: React.Dispatch<
    React.SetStateAction<string>
  >;

  onContinue?: () => void;

  onMemory?: () => void;
  onObserver?: () => void;
  onUnstable?: () => void;
  onForbidden?: () => void;
};

export function runConsoleCommand({
  command,
  phase,
  analysis,
  setLogs,
  setInput,
  onContinue,
  onMemory,
  onObserver,
  onUnstable,
  onForbidden,
}: RunCommandParams) {
  const cmd = command
    .trim()
    .toLowerCase();

  if (!cmd) return;

  if (cmd === "help") {
    setLogs((prev) => [
      ...prev,
      `> ${command}`,
      "> available commands:",
      phase === "endingChoice"
        ? "> memory / observer / unstable / hint"
        : "> continue",
      "> exit",
    ]);

    setInput("");

    return;
  }

  if (
    phase === "endingChoice" &&
    cmd === "hint"
  ) {
    const hintLogs =
      getHintLogs(analysis.rank);

    setLogs((prev) => [
      ...prev,
      `> ${command}`,
      ...hintLogs,
    ]);

    if (analysis.rank === "unstable") {
      setTimeout(() => {
        onUnstable?.();
      }, 1800);
    }

    setInput("");

    return;
  }

  if (
    phase === "endingChoice" &&
    cmd === "memory"
  ) {
    setLogs((prev) => [
      ...prev,
      `> ${command}`,
      "> memory sector opened",
      "> residual emotion detected",
    ]);

    setTimeout(() => {
      onMemory?.();
    }, 1800);

    setInput("");

    return;
  }

  if (
    phase === "endingChoice" &&
    cmd === "observer"
  ) {
    setLogs((prev) => [
      ...prev,
      `> ${command}`,
      "> observer layer restored",
      "> returning to record layer",
    ]);

    setTimeout(() => {
      onObserver?.();
    }, 1800);

    setInput("");

    return;
  }

  if (
    phase === "endingChoice" &&
    cmd === "unstable"
  ) {
    setLogs((prev) => [
      ...prev,
      `> ${command}`,
      "> unstable route selected",
      "> loop integrity failed",
    ]);

    setTimeout(() => {
      onUnstable?.();
    }, 1800);

    setInput("");

    return;
  }

  const forbiddenWords = [
    "admin",
    "root",
    "kernel",
    "archive",
  ];

  if (
    phase === "endingChoice" &&
    forbiddenWords.includes(cmd)
  ) {
    setLogs((prev) => [
      ...prev,
      `> ${command}`,
      "> unknown command",
    ]);

    setInput("");

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        "",
        "> unauthorized vocabulary detected",
        "> observer language contamination confirmed",
      ]);
    }, 1200);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        "",
        "「……それを、どこで見たんですか。」",
      ]);
    }, 2600);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        "",
        "「そこは、開いてはいけない。」",
      ]);
    }, 4200);

    setTimeout(() => {
      onForbidden?.();
    }, 6500);

    return;
  }

  if (
    (phase === "chapter1End" ||
      phase === "chapter2Start") &&
    cmd === "continue"
  ) {
    setLogs((prev) => [
      ...prev,
      `> ${command}`,
      "> access level: observer",
      "> permission granted",
    ]);

    setTimeout(() => {
      onContinue?.();
    }, 1800);

    setInput("");

    return;
  }

  if (cmd === "exit") {
    setLogs((prev) => [
      ...prev,
      `> ${command}`,
      "> console close denied",
    ]);

    setInput("");

    return;
  }

  setLogs((prev) => [
    ...prev,
    `> ${command}`,
    "> unknown command",
  ]);

  setInput("");
}
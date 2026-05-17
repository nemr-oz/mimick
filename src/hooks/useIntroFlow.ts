import { useState } from "react";

import {
  diagnosisLines,
  mainLines,
  confirmedNameLines,
  temporaryNameLines,
  getMemoryResultLines,
  getEmotionResultLines,
  SPECIAL_NAMES,
  type Line,
  type MemoryAnswer,
  type EmotionAnswer,
} from "../data/introLines";

export type IntroMode =
  | "diagnosis"
  | "nameInput"
  | "nameResult"
  | "memoryQuestion"
  | "memoryResult"
  | "emotionQuestion"
  | "emotionResult"
  | "main";

const createObserverName = () => {
  const number = Math.floor(
    Math.random() * 10000
  )
    .toString()
    .padStart(4, "0");

  return `observer_${number}`;
};

export function useIntroFlow(onFinish: () => void) {
  const [mode, setMode] =
    useState<IntroMode>("diagnosis");

  const [lineIndex, setLineIndex] =
    useState(0);

  const [nameInput, setNameInput] =
    useState("");

  const [nameResultLines, setNameResultLines] =
    useState<Line[]>([]);

  const [memoryResultLines, setMemoryResultLines] =
    useState<Line[]>([]);

  const [emotionResultLines, setEmotionResultLines] =
    useState<Line[]>([]);

  const currentLines: Line[] =
    mode === "diagnosis"
      ? diagnosisLines
      : mode === "nameResult"
        ? nameResultLines
        : mode === "memoryResult"
          ? memoryResultLines
          : mode === "emotionResult"
            ? emotionResultLines
            : mode === "main"
              ? mainLines
              : [];

  const currentLine =
    currentLines[lineIndex];

  const goToMode = (nextMode: IntroMode) => {
    setMode(nextMode);
    setLineIndex(0);
  };

  const goNext = () => {
    if (
      mode === "nameInput" ||
      mode === "memoryQuestion" ||
      mode === "emotionQuestion"
    ) {
      return;
    }

    if (lineIndex < currentLines.length - 1) {
      setLineIndex((prev) => prev + 1);
      return;
    }

    if (mode === "diagnosis") {
      goToMode("nameInput");
      return;
    }

    if (mode === "nameResult") {
      goToMode("memoryQuestion");
      return;
    }

    if (mode === "memoryResult") {
      goToMode("emotionQuestion");
      return;
    }

    if (mode === "emotionResult") {
      goToMode("main");
      return;
    }

    if (mode === "main") {
      onFinish();
    }
  };

  const submitName = () => {
    const trimmed = nameInput.trim();

    const hasName = trimmed.length > 0;

    const finalName = hasName
      ? trimmed
      : createObserverName();

    localStorage.setItem(
      "observerName",
      finalName
    );

    if (SPECIAL_NAMES.includes(finalName)) {
      localStorage.setItem(
        "specialNameDetected",
        "true"
      );
    }

    setNameResultLines(
      hasName
        ? confirmedNameLines(finalName)
        : temporaryNameLines(finalName)
    );

    goToMode("nameResult");
  };

  const forgetName = () => {
    const temporaryName = createObserverName();

    localStorage.setItem(
      "observerName",
      temporaryName
    );

    setNameInput("");

    setNameResultLines(
      temporaryNameLines(temporaryName)
    );

    goToMode("nameResult");
  };

  const chooseMemory = (
    answer: MemoryAnswer
  ) => {
    localStorage.setItem(
      "memoryAnswer",
      answer
    );

    setMemoryResultLines(
      getMemoryResultLines(answer)
    );

    goToMode("memoryResult");
  };

  const chooseEmotion = (
    answer: EmotionAnswer
  ) => {
    localStorage.setItem(
      "emotionAnswer",
      answer
    );

    setEmotionResultLines(
      getEmotionResultLines(answer)
    );

    goToMode("emotionResult");
  };

  const isFinalMainLine =
    mode === "main" &&
    lineIndex === mainLines.length - 1;

  return {
    mode,
    nameInput,
    setNameInput,
    currentLine,
    goNext,
    submitName,
    forgetName,
    chooseMemory,
    chooseEmotion,
    isFinalMainLine,
  };
}
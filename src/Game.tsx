import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import "./App.css";

import Girl from "./components/Girl";

import {
  buildRomaCandidates,
  normalizeInput,
} from "./utils/typingUtils";

import {
  saveTypingStat,
} from "./utils/typingStats";

export type TypingItem = {
  jp: string;
  kana: string;
  roma: string;
  auto?: boolean;
};

type GameProps = {
  data: TypingItem[];
  onFinish: () => void;
};

function Game({
  data,
  onFinish,
}: GameProps) {
  const [index, setIndex] =
    useState(0);

  const [input, setInput] =
    useState("");

  const hiddenInputRef =
    useRef<HTMLInputElement>(null);

  const typeSoundRef =
    useRef<HTMLAudioElement | null>(
      null
    );

  const missCountRef =
    useRef(0);

  const startTimeRef =
    useRef<number | null>(null);

  const hasFinishedRef =
    useRef(false);

  const current = data?.[index];

  const targetCandidates = useMemo(() => {
    if (!current) return [];

    const generated =
      buildRomaCandidates(
        normalizeInput(current.kana),
        300
      );

    if (current.roma) {
      return Array.from(
        new Set([
          normalizeInput(current.roma),
          ...generated,
        ])
      );
    }

    return generated;
  }, [current]);

  const displayRoma = useMemo(() => {
    const matched =
      targetCandidates.find((target) =>
        target.startsWith(input)
      );

    const raw =
      matched ??
      targetCandidates[0] ??
      "";

    return raw.replace(
      /[.,。、，．・「」『』…—ー\-!?！？：:；;]/g,
      ""
    );
  }, [targetCandidates, input]);

  useEffect(() => {
    hiddenInputRef.current?.focus();

    typeSoundRef.current = new Audio(
      `${
        import.meta.env.BASE_URL
      }type.mp3`
    );

    typeSoundRef.current.volume =
      0.35;
  }, []);

  useEffect(() => {
    setIndex(0);
    setInput("");

    missCountRef.current = 0;

    startTimeRef.current = null;

    hasFinishedRef.current = false;
  }, [data]);

  useEffect(() => {
    if (!current && !hasFinishedRef.current) {
      hasFinishedRef.current = true;
      onFinish();
    }
  }, [current, onFinish]);

  useEffect(() => {
    const handleDebug = (
      e: KeyboardEvent
    ) => {
      if (e.key === "F2") {
        onFinish();
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
  }, [onFinish]);

  useEffect(() => {
    if (!current?.auto) return;

    if (!displayRoma) return;

    setInput("");

    let i = 0;

    const interval = setInterval(() => {
      i++;

      if (typeSoundRef.current) {
        typeSoundRef.current.currentTime = 0;

        typeSoundRef.current.play();
      }

      setInput(
        displayRoma.slice(0, i)
      );

      if (i >= displayRoma.length) {
        clearInterval(interval);

        setTimeout(() => {
          setIndex(
            (prev) => prev + 1
          );

          setInput("");
        }, 900);
      }
    }, 80);

    return () =>
      clearInterval(interval);
  }, [current, displayRoma]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (current?.auto) return;

    const value = normalizeInput(
      e.target.value
    );

    if (!current) return;

    if (startTimeRef.current === null) {
      startTimeRef.current = Date.now();
    }

    const isCorrect =
      targetCandidates.some((target) =>
        target.startsWith(value)
      );

    if (!isCorrect) {
      missCountRef.current += 1;
      return;
    }

    if (typeSoundRef.current) {
      typeSoundRef.current.currentTime = 0;

      typeSoundRef.current.play();
    }

    setInput(value);

    const isComplete =
      targetCandidates.some(
        (target) => target === value
      );

    if (isComplete) {
      const endTime = Date.now();

      const startTime =
        startTimeRef.current ?? endTime;

      const elapsedMs =
        endTime - startTime;

      saveTypingStat({
        jp: current.jp,
        missCount:
          missCountRef.current,
        elapsedMs,
        typedLength: value.length,
        completedAt:
          new Date().toISOString(),
      });

      missCountRef.current = 0;

      startTimeRef.current = null;

      setTimeout(() => {
        setIndex(
          (prev) => prev + 1
        );

        setInput("");
      }, 250);
    }
  };

  if (!current) {
    return null;
  }

  return (
    <main
      className="app"
      onClick={() =>
        hiddenInputRef.current?.focus()
      }
    >
      <section className="stage">
        <Girl className="girl" />

        <div className="sentence">
          <p className="jp storyText">
            {current.jp}
          </p>

          <p className="romaji storyText">
            {Array.from(displayRoma).map(
              (char, i) => {
                let className = "";

                if (i < input.length) {
                  className = "typed";
                } else if (
                  i === input.length
                ) {
                  className = "current";
                }

                return (
                  <span
                    key={i}
                    className={className}
                  >
                    {char}
                  </span>
                );
              }
            )}
          </p>
        </div>

        <input
          ref={hiddenInputRef}
          className="typing"
          value={input}
          onChange={handleChange}
          autoFocus
          disabled={current.auto}
        />
      </section>
    </main>
  );
}

export default Game;
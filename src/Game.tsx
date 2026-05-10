import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

import aoNeko1 from "./data/aoNeko1";
import aoNeko2 from "./data/aoNeko2";
import aoNeko3 from "./data/aoNeko3";
import aoNeko4 from "./data/aoNeko4";
import aoNeko5 from "./data/aoNeko5";
import aoNekoSpecial from "./data/aoNekoSpecial";

import romanDictionary from "./data/romanTypingParseDictionary.json";
import Girl from "./components/Girl";

type DictionaryItem = {
  Pattern: string;
  TypePattern: string[];
};

type TypingItem = {
  jp: string;
  kana: string;
  roma: string;
  auto?: boolean;
};

type GameProps = {
  chapter: number;
  onFinish: () => void;
};

const chapters: TypingItem[][] = [
  aoNeko1,
  aoNeko2,
  aoNeko3,
  aoNeko4,
  aoNeko5,
  aoNekoSpecial,
];

const dictionary = romanDictionary as DictionaryItem[];

function normalizeInput(text: string) {
  return text.toLowerCase().replace(/\s/g, "");
}

function buildRomaCandidates(kana: string) {
  const results: string[] = [];

  function search(rest: string, typed: string) {
    if (rest.length === 0) {
      results.push(typed);
      return;
    }

    const matched = dictionary
      .filter((item) => rest.startsWith(item.Pattern))
      .sort((a, b) => b.Pattern.length - a.Pattern.length);

    if (matched.length === 0) {
      search(rest.slice(1), typed);
      return;
    }

    const longestLength = matched[0].Pattern.length;

    const candidates = matched.filter(
      (item) => item.Pattern.length === longestLength
    );

    for (const item of candidates) {
      for (const pattern of item.TypePattern) {
        search(
          rest.slice(item.Pattern.length),
          typed + pattern
        );
      }
    }
  }

  search(kana.replace(/\s/g, ""), "");

  return Array.from(new Set(results));
}

function Game({ chapter, onFinish }: GameProps) {
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");

  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const typeSoundRef = useRef<HTMLAudioElement | null>(null);

  const currentData = chapters[chapter];
  const current = currentData?.[index];

  const targetCandidates = useMemo(() => {
    if (!current) return [];
    return buildRomaCandidates(current.kana);
  }, [current]);

  const displayRoma = useMemo(() => {
    const matched = targetCandidates.find((target) =>
      target.startsWith(input)
    );

    return matched ?? targetCandidates[0] ?? "";
  }, [targetCandidates, input]);

  useEffect(() => {
    hiddenInputRef.current?.focus();

    typeSoundRef.current = new Audio(
      `${import.meta.env.BASE_URL}type.mp3`
    );
    typeSoundRef.current.volume = 0.35;
  }, []);

  useEffect(() => {
    setIndex(0);
    setInput("");
  }, [chapter]);

  useEffect(() => {
    if (!current) {
      onFinish();
    }
  }, [current, onFinish]);

  useEffect(() => {
    const handleDebug = (e: KeyboardEvent) => {
      if (e.key === "F2") {
        onFinish();
      }
    };

    window.addEventListener("keydown", handleDebug);

    return () => {
      window.removeEventListener("keydown", handleDebug);
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

      setInput(displayRoma.slice(0, i));

      if (i >= displayRoma.length) {
        clearInterval(interval);

        setTimeout(() => {
          setIndex((prev) => prev + 1);
          setInput("");
        }, 900);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [current, displayRoma]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (current?.auto) return;

    const value = normalizeInput(e.target.value);

    if (!current) return;

    const isCorrect = targetCandidates.some((target) =>
      target.startsWith(value)
    );

    if (!isCorrect) return;

    if (typeSoundRef.current) {
      typeSoundRef.current.currentTime = 0;
      typeSoundRef.current.play();
    }

    setInput(value);

    const isComplete = targetCandidates.some(
      (target) => target === value
    );

    if (isComplete) {
      setTimeout(() => {
        setIndex((prev) => prev + 1);
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
      onClick={() => hiddenInputRef.current?.focus()}
    >
      <section className="stage">
        <Girl className="girl" />

        <div className="sentence">
          <p className="jp">{current.jp}</p>

          <p className="romaji">
            {Array.from(displayRoma).map((char, i) => {
              let className = "";

              if (i < input.length) {
                className = "typed";
              } else if (i === input.length) {
                className = "current";
              }

              return (
                <span key={i} className={className}>
                  {char}
                </span>
              );
            })}
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
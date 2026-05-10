import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import aoNeko from "./data/aoNeko";
import romanDictionary from "./data/romanTypingParseDictionary.json";

type DictionaryItem = {
  Pattern: string;
  TypePattern: string[];
};

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
        search(rest.slice(item.Pattern.length), typed + pattern);
      }
    }
  }

  search(kana.replace(/\s/g, ""), "");

  return Array.from(new Set(results));
}

function App() {
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");

  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const typeSoundRef = useRef<HTMLAudioElement | null>(null);

  const current = aoNeko[index];

  const targetCandidates = useMemo(() => {
    if (!current) return [];
    return buildRomaCandidates(current.kana);
  }, [current]);

  useEffect(() => {
    hiddenInputRef.current?.focus();

    typeSoundRef.current = new Audio("/type.mp3");
    typeSoundRef.current.volume = 0.35;
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = normalizeInput(e.target.value);

    if (!current) return;

    const isCorrect = targetCandidates.some((target) =>
      target.startsWith(value)
    );

    if (!isCorrect) {
      return;
    }

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
    return (
      <main className="app">
        <div className="noise" />

        <section className="stage">
          <img src="/girl.png" className="girl" />

          <div className="sentence">
            <p className="jp">青い猫はもう居ない。</p>
            <p className="romaji">the blue cat is gone</p>
          </div>
        </section>
      </main>
    );
  }

  const displayRoma = current.roma;
  let visibleIndex = 0;

  return (
    <main
      className="app"
      onClick={() => hiddenInputRef.current?.focus()}
    >
      <div className="noise" />

      <section className="stage">
        <img src="/girl.png" className="girl" />

        <div className="sentence">
          <p className="jp">{current.jp}</p>

          <p className="romaji">
            {displayRoma.split("").map((char, i) => {
              if (char === " ") {
                return (
                  <span key={i} className="space">
                    {" "}
                  </span>
                );
              }

              let className = "";

              if (visibleIndex < input.length) {
                className = "typed";
              } else if (visibleIndex === input.length) {
                className = "current";
              }

              const element = (
                <span key={i} className={className}>
                  {char}
                </span>
              );

              visibleIndex++;

              return element;
            })}
          </p>
        </div>

        <input
          ref={hiddenInputRef}
          className="typing"
          value={input}
          onChange={handleChange}
          autoFocus
        />
      </section>
    </main>
  );
}

export default App;
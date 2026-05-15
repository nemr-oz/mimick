import {
  useEffect,
  useRef,
  useState,
} from "react";

import "./styles/emotionTuner.css";

import { signalLines } from "./data/emotionSignalLines";

import { corruptText } from "./utils/corruptText";

import {
  getRelativePoint,
  type Point,
} from "./utils/tunerMath";

import { getTunerState } from "./utils/tunerLogic";

type EmotionTunerProps = {
  onFinish: () => void;
};

export default function EmotionTuner({
  onFinish,
}: EmotionTunerProps) {

  const bgmRef =
    useRef<HTMLAudioElement | null>(null);

  const noiseRef =
    useRef<HTMLAudioElement | null>(null);

  const targetRef = useRef<Point>({
    x: 0.28 + Math.random() * 0.44,
    y: 0.28 + Math.random() * 0.44,
  });

  const [started, setStarted] =
    useState(false);

  const [cursor, setCursor] =
    useState<Point>({
      x: 0.5,
      y: 0.5,
    });

  const [closeness, setCloseness] =
    useState(0);

  const [message, setMessage] =
    useState(
      "> emotional signal detected"
    );

  const [signalText, setSignalText] =
    useState<string[]>(
      signalLines.map((line) =>
        corruptText(line, 0)
      )
    );

  const startAudio = async () => {

    if (started) return;

    setStarted(true);

    setMessage(
      "> emotional residue responding"
    );

    const noise = new Audio(
      `${import.meta.env.BASE_URL}audio/noise.wav`
    );

    noise.loop = true;

    noise.volume = 0.72;

    noise.preload = "auto";

    noiseRef.current = noise;

    const bgm = new Audio(
      `${import.meta.env.BASE_URL}audio/BGM.mp3`
    );

    bgm.loop = true;

    bgm.volume = 0.4;

    bgm.preload = "auto";

    bgmRef.current = bgm;

    try {

      await noise.play();

    } catch (e) {

      console.log(
        "noise play failed",
        e
      );

    }

    try {

      await bgm.play();

    } catch (e) {

      console.log(
        "BGM play failed",
        e
      );

    }

  };

  const handleMove = (
    e: React.MouseEvent<HTMLElement>
  ) => {

    if (!started) return;

    const rect =
      e.currentTarget.getBoundingClientRect();

    setCursor(
      getRelativePoint(
        e.clientX,
        e.clientY,
        rect
      )
    );

  };

  useEffect(() => {

    if (!started) return;

    const state =
      getTunerState(
        cursor,
        targetRef.current
      );

    setCloseness(
      state.closeness
    );

    if (noiseRef.current) {

      noiseRef.current.volume =
        0.72 *
          state.normalized +
        0.03;

    }

  }, [cursor, started]);

  useEffect(() => {

    if (!started) return;

    const interval =
      window.setInterval(() => {

        setSignalText(
          signalLines.map(
            (line) =>
              corruptText(
                line,
                closeness
              )
          )
        );

      }, 120);

    return () => {

      window.clearInterval(
        interval
      );

    };

  }, [closeness, started]);

  useEffect(() => {

    return () => {

      noiseRef.current?.pause();

      // BGMは止めない

    };

  }, []);

  return (

    <main
      className={
        started
          ? "emotionTunerRoot isStarted"
          : "emotionTunerRoot"
      }

      onMouseMove={handleMove}

      onClick={() => {

        if (!started) return;

        noiseRef.current?.pause();

        onFinish();

      }}
    >

      <section className="emotionTunerBox">

        <div className="emotionTunerSpeaker">
          EMOTIONAL REPAIR PROTOCOL
        </div>

        <p className="emotionTunerMessage">

          {started
            ? message
            : "> click to begin emotional scan"}

        </p>

        {!started && (

          <button
            type="button"
            className="emotionTunerStartButton"
            onClick={startAudio}
          >
            begin emotional scan
          </button>

        )}

        {started && (

          <>

            <div
              className="emotionTunerField"
              style={{
                "--stability":
                  closeness,
              } as React.CSSProperties}
            >

              <div className="emotionTunerGrid" />

              <div className="emotionTunerWave emotionTunerWaveA" />

              <div className="emotionTunerWave emotionTunerWaveB" />

              <div className="emotionTunerWave emotionTunerWaveC" />

              <div
                className="emotionTunerCursorX"
                style={{
                  left: `${cursor.x * 100}%`,
                }}
              />

              <div
                className="emotionTunerCursorY"
                style={{
                  top: `${cursor.y * 100}%`,
                }}
              />

              <div
                className="emotionTunerCursorDot"
                style={{
                  left: `${cursor.x * 100}%`,
                  top: `${cursor.y * 100}%`,
                }}
              />

            </div>

            <div className="emotionTunerSignalText">

              {signalText.map(
                (line, i) => (

                  <p key={i}>
                    {line}
                  </p>

                )
              )}

            </div>

          </>

        )}

        <p className="emotionTunerHint">

          {started
            ? "click anywhere to continue"
            : "sound will start after click"}

        </p>

      </section>

    </main>

  );

}
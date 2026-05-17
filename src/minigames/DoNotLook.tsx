// src/minigames/DoNotLook.tsx

import { useEffect, useRef, useState } from "react";

import "../styles/doNotLook.css";

type DoNotLookProps = {
  onFinish: () => void;
};

type Point = {
  x: number;
  y: number;
};

const forbiddenEyePoints: Point[] = [
  { x: 0.46, y: 0.125 },
  { x: 0.545, y: 0.125 },
];

const LIMIT_TIME = 18;
const MAX_DAMAGE = 100;

export default function DoNotLook({ onFinish }: DoNotLookProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const targetWrapRef = useRef<HTMLDivElement | null>(null);

  const [started, setStarted] = useState(false);

  const [cursor, setCursor] = useState<Point>({
    x: 0.5,
    y: 0.75,
  });

  const [imageCursor, setImageCursor] = useState<Point>({
    x: 0.5,
    y: 0.75,
  });

  const [damage, setDamage] = useState(0);
  const [timeLeft, setTimeLeft] = useState(LIMIT_TIME);

  const [message, setMessage] = useState(
    "> do not look directly at it"
  );

  const [isLooking, setIsLooking] = useState(false);
  const [finished, setFinished] = useState(false);

  const checkLookingAtEye = (point: Point, radius = 0.055) => {
    return forbiddenEyePoints.some((eye) => {
      const dx = point.x - eye.x;
      const dy = point.y - eye.y;

      return Math.sqrt(dx * dx + dy * dy) < radius;
    });
  };

  const handleStart = () => {
    setStarted(true);
    setMessage("> keep your eyes away from the marked area");
  };

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (finished) return;

    const stageRect = e.currentTarget.getBoundingClientRect();

    const screenX = (e.clientX - stageRect.left) / stageRect.width;
    const screenY = (e.clientY - stageRect.top) / stageRect.height;

    setCursor({
      x: Math.max(0, Math.min(1, screenX)),
      y: Math.max(0, Math.min(1, screenY)),
    });

    const target = targetWrapRef.current;
    if (!target) return;

    const targetRect = target.getBoundingClientRect();

    const imageX = (e.clientX - targetRect.left) / targetRect.width;
    const imageY = (e.clientY - targetRect.top) / targetRect.height;

    setImageCursor({
      x: Math.max(0, Math.min(1, imageX)),
      y: Math.max(0, Math.min(1, imageY)),
    });
  };

  useEffect(() => {
    if (!started || finished) return;

    const looking = checkLookingAtEye(imageCursor);

    setIsLooking(looking);

    if (looking) {
      setMessage("> visual contact detected");

      setDamage((prev) => Math.min(MAX_DAMAGE, prev + 2.4));
    } else {
      setMessage("> gaze diverted");

      setDamage((prev) => Math.max(0, prev - 0.35));
    }
  }, [imageCursor, started, finished]);

  useEffect(() => {
    if (!started || finished) return;

    const timer = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [started, finished]);

  useEffect(() => {
    if (!started || finished) return;

    if (damage >= MAX_DAMAGE) {
      setFinished(true);
      setMessage("> observation limit exceeded");

      window.setTimeout(() => {
        onFinish();
      }, 1400);
    }
  }, [damage, started, finished, onFinish]);

  useEffect(() => {
    if (!started || finished) return;

    if (timeLeft <= 0) {
      setFinished(true);
      setMessage("> direct observation avoided");

      window.setTimeout(() => {
        onFinish();
      }, 1200);
    }
  }, [timeLeft, started, finished, onFinish]);

  return (
    <div
      ref={stageRef}
      className={[
        "doNotLook",
        isLooking ? "doNotLookLooking" : "",
        finished ? "doNotLookFinished" : "",
      ].join(" ")}
      onMouseMove={handleMove}
    >
      <div className="doNotLookNoise" />

      <div className="doNotLookHeader">
        <div className="doNotLookTitle">DO NOT LOOK</div>

        <div className="doNotLookMeta">
          <span>TIME : {String(timeLeft).padStart(2, "0")}</span>
          <span>
            DAMAGE : {Math.floor(damage).toString().padStart(3, "0")}
          </span>
        </div>
      </div>

      <div className="doNotLookBody">
        <div ref={targetWrapRef} className="doNotLookTargetWrap">
          <img
            className="doNotLookTarget"
            src={`${import.meta.env.BASE_URL}images/girl/girl_normal.png`}
            alt=""
            draggable={false}
          />

          {forbiddenEyePoints.map((eye, index) => (
            <div
              key={index}
              className="doNotLookEyePoint"
              style={{
                left: `${eye.x * 100}%`,
                top: `${eye.y * 100}%`,
              }}
            />
          ))}
        </div>

        <div
          className="doNotLookCursor"
          style={{
            left: `${cursor.x * 100}%`,
            top: `${cursor.y * 100}%`,
          }}
        />

        {!started && (
          <button className="doNotLookStart" onClick={handleStart}>
            begin observation
          </button>
        )}
      </div>

      <div className="doNotLookFooter">
        <div className="doNotLookMessage">{message}</div>

        <div className="doNotLookBar">
          <div
            className="doNotLookBarFill"
            style={{
              width: `${damage}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
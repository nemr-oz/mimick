import { useEffect, useRef } from "react";

export default function AmbientNoise() {
  const audioRef =
    useRef<HTMLAudioElement | null>(
      null
    );

  useEffect(() => {

    const startAmbient = async () => {

      if (audioRef.current) return;

      const audio = new Audio(
        `${import.meta.env.BASE_URL}audio/noise.wav`
      );

      audio.loop = true;

      audio.volume = 0.1;

      try {

        await audio.play();

        audioRef.current = audio;

      }

      catch (e) {

        console.log(
          "ambient autoplay blocked",
          e
        );

      }

      window.removeEventListener(
        "click",
        startAmbient
      );

      window.removeEventListener(
        "keydown",
        startAmbient
      );

    };

    window.addEventListener(
      "click",
      startAmbient
    );

    window.addEventListener(
      "keydown",
      startAmbient
    );

    return () => {

      audioRef.current?.pause();

    };

  }, []);

  return null;
}
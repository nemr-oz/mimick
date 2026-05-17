import { useEffect, useState } from "react";

export function useTypewriterText(
  text: string,
  speed = 45
) {
  const [displayText, setDisplayText] =
    useState("");

  const [isTyping, setIsTyping] =
    useState(false);

  useEffect(() => {
    setDisplayText("");
    setIsTyping(true);

    let index = 0;

    const timer = window.setInterval(() => {
      index += 1;

      setDisplayText(text.slice(0, index));

      if (index >= text.length) {
        window.clearInterval(timer);
        setIsTyping(false);
      }
    }, speed);

    return () => {
      window.clearInterval(timer);
    };
  }, [text, speed]);

  const completeText = () => {
    setDisplayText(text);
    setIsTyping(false);
  };

  return {
    displayText,
    isTyping,
    completeText,
  };
}
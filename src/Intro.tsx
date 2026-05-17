import "./styles/intro.css";

import { useTypewriterText } from "./hooks/useTypewriterText";
import { useIntroFlow } from "./hooks/useIntroFlow";

import type { Expression } from "./data/introLines";

type IntroProps = {
  onFinish: () => void;
};

const expressionImages: Record<
  Expression,
  string
> = {
  normal: "images/girl/girl_normal.png",
  down: "images/girl/girl_down.png",
  closed: "images/girl/girl_closed.png",
};

export default function Intro({
  onFinish,
}: IntroProps) {
  const {
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
  } = useIntroFlow(onFinish);

  const {
    displayText,
    isTyping,
    completeText,
  } = useTypewriterText(
    currentLine?.text ?? ""
  );

  const currentExpression =
    currentLine?.expression ?? "normal";

  const currentImage =
    expressionImages[currentExpression];

  const handleAdvance = () => {
    if (
      mode === "nameInput" ||
      mode === "memoryQuestion" ||
      mode === "emotionQuestion"
    ) {
      return;
    }

    if (isFinalMainLine) {
      return;
    }

    if (isTyping) {
      completeText();
      return;
    }

    goNext();
  };

  return (
    <main
      className="app introScene intro"
      onClick={handleAdvance}
    >
      <section className="stage">
        <img
          src={`${
            import.meta.env.BASE_URL
          }${currentImage}`}
          className="introGirl"
          alt=""
          draggable={false}
        />

        <section className="introBox">
          {mode !== "nameInput" &&
            mode !== "memoryQuestion" &&
            mode !== "emotionQuestion" &&
            currentLine && (
              <p className="introLine">
                {displayText}
                {isTyping && (
                  <span className="cursor">
                    |
                  </span>
                )}
              </p>
            )}

          {mode === "nameInput" && (
            <div
              className="introInputBlock"
              onClick={(e) =>
                e.stopPropagation()
              }
            >
              <p className="introLine">
                自分の名前を憶えていますか？
              </p>

              <input
                className="introNameInput"
                value={nameInput}
                onChange={(e) =>
                  setNameInput(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    submitName();
                  }
                }}
                autoFocus
              />

              <div className="introChoices">
                <button
                  className="introChoiceButton"
                  onClick={submitName}
                >
                  確定
                </button>

                <button
                  className="introChoiceButton"
                  onClick={forgetName}
                >
                  憶えていない
                </button>
              </div>
            </div>
          )}

          {mode === "memoryQuestion" && (
            <div
              onClick={(e) =>
                e.stopPropagation()
              }
            >
              <p className="introLine">
                ここに来る前のことを憶えていますか？
              </p>

              <div className="introChoices">
                <button
                  className="introChoiceButton"
                  onClick={() =>
                    chooseMemory("remember")
                  }
                >
                  憶えている
                </button>

                <button
                  className="introChoiceButton"
                  onClick={() =>
                    chooseMemory("forgot")
                  }
                >
                  憶えていない
                </button>

                <button
                  className="introChoiceButton"
                  onClick={() =>
                    chooseMemory("unknown")
                  }
                >
                  分からない
                </button>
              </div>
            </div>
          )}

          {mode === "emotionQuestion" && (
            <div
              onClick={(e) =>
                e.stopPropagation()
              }
            >
              <p className="introLine">
                今、何かを感じていますか？
              </p>

              <div className="introChoices">
                <button
                  className="introChoiceButton"
                  onClick={() =>
                    chooseEmotion("feel")
                  }
                >
                  感じている
                </button>

                <button
                  className="introChoiceButton"
                  onClick={() =>
                    chooseEmotion("none")
                  }
                >
                  何も感じない
                </button>

                <button
                  className="introChoiceButton"
                  onClick={() =>
                    chooseEmotion("unknown")
                  }
                >
                  分からない
                </button>
              </div>
            </div>
          )}

          {isFinalMainLine && (
            <button
              className="introEnterButton"
              onClick={(e) => {
                e.stopPropagation();
                onFinish();
              }}
            >
              《Enterキーを押してください。》
            </button>
          )}
        </section>
      </section>
    </main>
  );
}
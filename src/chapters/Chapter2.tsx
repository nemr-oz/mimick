import {
  useState,
} from "react";

import "../styles/base.css";
import "../styles/chapter2Dialogue.css";

import Game from "../Game";

import jo1 from "../data/jo1";
import jo2 from "../data/jo2";
import jo3 from "../data/jo3";

import {
  chapter2Dialogue,
  type Choice,
} from "../data/dialogues";

type Chapter2Props = {
  sequence: number;
  onFinish: () => void;
};

const chapter2Data = [
  jo1,
  jo2,
  jo3,
];

function Chapter2({
  sequence,
  onFinish,
}: Chapter2Props) {

  const [showDialogue, setShowDialogue] =
    useState(false);

  const [currentId, setCurrentId] =
    useState("start");

  const [, setEmotionLayer] =
    useState(50);

  const index = sequence - 6;

  const data =
    chapter2Data[index] || jo1;

  const currentNode =
    chapter2Dialogue.find(
      (node) => node.id === currentId
    );

  const handleGameFinish = () => {

    if (data === jo3) {

      setShowDialogue(true);

      return;

    }

    onFinish();

  };

  const choose = (choice: Choice) => {

    setEmotionLayer((prev) => {
      const next =
        Math.max(
          0,
          Math.min(
            100,
            prev + choice.emotionDelta
          )
        );

      localStorage.setItem(
        "emotionLayer",
        String(next)
      );

      return next;
    });

    setCurrentId(choice.nextId);

  };

  if (showDialogue) {

    if (!currentNode) {
      return (
        <main className="chapter2Dialogue">
          <p className="chapter2Text">
            dialogue error
          </p>
        </main>
      );
    }

    return (

      <main className="chapter2Dialogue">

        <img
          src={`${import.meta.env.BASE_URL}girl.png`}
          className="chapter2Girl"
          alt=""
        />

        <section className="chapter2Panel">

          <p className="chapter2Speaker">
            羊の仮面の少女
          </p>

          <p className="chapter2Text">
            {currentNode.text}
          </p>

          <section className="chapter2Choices">

            {currentNode.choices?.map((choice) => (

              <button
                key={choice.text}
                className="chapter2ChoiceButton"
                onClick={() => choose(choice)}
              >
                {choice.text}
              </button>

            ))}

          </section>

        </section>

      </main>

    );

  }

  return (

    <Game
      data={data}
      onFinish={handleGameFinish}
    />

  );

}

export default Chapter2;
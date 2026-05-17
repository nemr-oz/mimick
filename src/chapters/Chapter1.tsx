import Game from "../Game";

import aoNeko1 from "../data/aoNeko1";
import aoNeko2 from "../data/aoNeko2";
import aoNeko3 from "../data/aoNeko3";
import aoNeko4 from "../data/aoNeko4";
import aoNeko5 from "../data/aoNeko5";

type Chapter1Props = {
  sequence: number;
  onFinish: () => void;
};

const chapter1Data = [
  aoNeko1,
  aoNeko2,
  aoNeko3,
  aoNeko4,
  aoNeko5,
];

function Chapter1({
  sequence,
  onFinish,
}: Chapter1Props) {
  const data =
    chapter1Data[sequence];

  if (!data) {
    onFinish();
    return null;
  }

  return (
    <Game
      data={data}
      onFinish={onFinish}
    />
  );
}

export default Chapter1;
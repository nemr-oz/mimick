import Game from "../Game";

import jo1 from "../data/jo1";
import jo2 from "../data/jo2";
import jo3 from "../data/jo3";

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
  const index = sequence - 6;

  const data =
    chapter2Data[index] || jo1;

  return (
    <Game
      data={data}
      onFinish={onFinish}
    />
  );
}

export default Chapter2;
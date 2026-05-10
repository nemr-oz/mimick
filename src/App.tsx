import { useState } from "react";

import Intro from "./Intro";
import Game from "./Game";
import Record from "./Record";

function App() {
  const [scene, setScene] = useState<
    "intro" | "game" | "record"
  >("intro");

  const [chapter, setChapter] = useState(0);

  if (scene === "intro") {
    return (
      <Intro
        onFinish={() => setScene("game")}
      />
    );
  }

  if (scene === "game") {
    return (
      <Game
        chapter={chapter}
        onFinish={() => setScene("record")}
      />
    );
  }

  return (
    <Record
      chapter={chapter}
      onFinish={() => {
        setChapter((prev) => prev + 1);
        setScene("game");
      }}
    />
  );
}

export default App;
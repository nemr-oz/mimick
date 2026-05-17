import type { ReactNode } from "react";

import EyeCoordinatePicker from "../components/EyeCoordinatePicker";

import Intro from "../Intro";

import Chapter1 from "../chapters/Chapter1";
import Chapter2Intro from "../chapters/Chapter2Intro";
import Chapter2 from "../chapters/Chapter2";

import EmotionTuner from "../EmotionTuner";

import Record from "../Record";
import RecordJo from "../data/recordJo";

import FakeConsole from "../FakeConsole";

import LoopEnd from "../endings/LoopEnd";
import ExecuteEnd from "../endings/ExecuteEnd";
import MemoryEnd from "../endings/MemoryEnd";
import ObserverEnd from "../endings/ObserverEnd";
import ShutdownEnd from "../endings/ShutdownEnd";

import type { Scene } from "./sceneTypes";

import DoNotLook from "../minigames/DoNotLook";
import ArchiveUnlock from "../archive/ArchiveUnlock";

type SceneRendererProps = {
  scene: Scene;
  setScene: React.Dispatch<
    React.SetStateAction<Scene>
  >;
  sequence: number;
  setSequence: React.Dispatch<
    React.SetStateAction<number>
  >;
};

export default function SceneRenderer({
  scene,
  setScene,
  sequence,
  setSequence,
}: SceneRendererProps) {
  let content: ReactNode;

  if (scene === "doNotLook") {
    content = (
      <DoNotLook
        onFinish={() => {
          setScene("game");
        }}
      />
    );
  } else if (scene === "intro") {
    content = (
      <Intro
        onFinish={() => {
          setScene("game");
        }}
      />
    );
  } else if (scene === "game") {
    if (sequence < 5) {
      content = (
        <Chapter1
          sequence={sequence}
          onFinish={() => {
            setScene("record");
          }}
        />
      );
    } else {
      content = (
        <Chapter2
          sequence={sequence}
          onFinish={() => {
            setScene("record");
          }}
        />
      );
    }
  } else if (scene === "record") {
    if (sequence >= 6) {
      content = (
        <RecordJo
          sequence={sequence}
          onFinish={() => {
            if (sequence < 8) {
              setSequence((prev) => prev + 1);
              setScene("game");
            } else {
              setScene("consoleEndingChoice");
            }
          }}
        />
      );
    } else {
      content = (
        <Record
          sequence={sequence}
          onFinish={() => {
            if (sequence < 4) {
              setSequence((prev) => prev + 1);
              setScene("game");
            } else {
              setSequence(0);
              setScene("archiveUnlock");
            }
          }}
        />
      );
    }
  } else if (scene === "archiveUnlock") {
    content = (
      <ArchiveUnlock
        recordName="record_sector_02"
        onFinish={() => {
          setScene("consoleChapter1End");
        }}
      />
    );
  } else if (scene === "consoleChapter1End") {
    content = (
      <FakeConsole
        phase="chapter1End"
        onContinue={() => {
          setScene("chapter2Intro");
        }}
      />
    );
  } else if (scene === "chapter2Intro") {
    content = (
      <Chapter2Intro
        onFinish={() => {
          setScene("emotionTuner");
        }}
      />
    );
  } else if (scene === "emotionTuner") {
    content = (
      <EmotionTuner
        onFinish={() => {
          setSequence(6);
          setScene("game");
        }}
      />
    );
  } else if (scene === "consoleEndingChoice") {
    content = (
      <FakeConsole
        phase="endingChoice"
        onMemory={() => {
          setScene("memoryEnd");
        }}
        onObserver={() => {
          setScene("observerEnd");
        }}
        onUnstable={() => {
          setScene("loopEnd");
        }}
        onForbidden={() => {
          setScene("shutdownEnd");
        }}
      />
    );
  } else if (scene === "memoryEnd") {
    content = <MemoryEnd />;
  } else if (scene === "observerEnd") {
    content = <ObserverEnd />;
  } else if (scene === "shutdownEnd") {
    content = <ShutdownEnd />;
  } else if (scene === "loopEnd") {
    content = (
      <LoopEnd
        onRestart={() => {
          setSequence(0);
          setScene("intro");
        }}
      />
    );
  } else if (scene === "eyePicker") {
    content = (
      <EyeCoordinatePicker
        imageSrc={`${
          import.meta.env.BASE_URL
        }images/girl/girl_normal.png`}
      />
    );
  } else {
    content = (
      <ExecuteEnd
        onFinish={() => {
          setSequence(0);
          setScene("intro");
        }}
      />
    );
  }

  return content;
}

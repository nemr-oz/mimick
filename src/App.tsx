import { useEffect, useState } from "react";

import "./styles/base.css";
import "./styles/debugMenu.css";

import SystemMenu from "./components/SystemMenu";
import DebugMenu from "./components/DebugMenu";
import SceneRenderer from "./scenes/SceneRenderer";

import type { Scene } from "./scenes/sceneTypes";

export default function App() {
  const [scene, setScene] = useState<Scene>("intro");
  const [sequence, setSequence] = useState(0);

  const [showDebug, setShowDebug] = useState(false);
  const [showSystemMenu, setShowSystemMenu] = useState(false);

  const [bgmVolume, setBgmVolume] = useState(0.4);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key.toLowerCase() === "d") {
        setShowDebug((prev) => !prev);
        return;
      }

      if (e.key === "Escape") {
        setShowSystemMenu((prev) => !prev);
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <SystemMenu
        isOpen={showSystemMenu}
        onClose={() => {
          setShowSystemMenu(false);
        }}
        bgmVolume={bgmVolume}
        setBgmVolume={setBgmVolume}
      />

      <SceneRenderer
        scene={scene}
        setScene={setScene}
        sequence={sequence}
        setSequence={setSequence}
      />

      <DebugMenu
        visible={showDebug}
        setScene={setScene}
        setSequence={setSequence}
      />
    </>
  );
}
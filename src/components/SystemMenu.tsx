import type {
  Dispatch,
  SetStateAction,
} from "react";

import "../styles/systemMenu.css";
import ConsoleSpill from "../console/ConsoleSpill";

type Fragment = {
  id: string;
  title: string;
  text: string;
  unlocked: boolean;
};

type SystemMenuProps = {
  isOpen: boolean;

  onClose: () => void;

  bgmVolume: number;

  setBgmVolume: Dispatch<
    SetStateAction<number>
  >;

  fragments: Fragment[];
};

export default function SystemMenu({
  isOpen,
  onClose,
  bgmVolume,
  setBgmVolume,
  fragments,
}: SystemMenuProps) {

  if (!isOpen) return null;

  return (

    <div className="systemMenuOverlay">

      <div className="systemMenuPanel">

        <ConsoleSpill />

        <div className="systemMenuBackground">

          {fragments.map(
            (fragment, i) => (

              <span
                key={fragment.id}
                className="systemMenuWord"
                style={
                  {
                    "--x":
                      `${Math.sin(i * 1.7) * 180}px`,

                    "--y":
                      `${Math.cos(i * 1.3) * 140}px`,

                    "--r":
                      `${i * 21 - 90}deg`,

                    "--s":
                      `${0.8 + (i % 4) * 0.15}`,
                  } as React.CSSProperties
                }
              >
                {fragment.unlocked
                  ? fragment.text
                  : "missing"}
              </span>

            )
          )}

        </div>

        <div className="systemMenuTitle">
          SETTINGS
        </div>

        <div className="systemMenuSection">

          <div className="systemMenuLabel">
            BGM VOLUME
          </div>

          <input
            className="systemMenuSlider"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={bgmVolume}
            onChange={(e) =>
              setBgmVolume(
                Number(e.target.value)
              )
            }
          />

        </div>

        <div className="systemMenuSection">

          <div className="systemMenuLabel">
            MEMORY FRAGMENTS
          </div>

          <div className="systemMenuFragments">

            {fragments.map(
              (fragment) => (

                <div
                  key={fragment.id}
                  className={
                    fragment.unlocked
                      ? "fragmentUnlocked"
                      : "fragmentLocked"
                  }
                >

                  <div className="fragmentTitle">
                    {fragment.title}
                  </div>

                  <div className="fragmentText">

                    {fragment.unlocked
                      ? fragment.text
                      : "████████"}

                  </div>

                </div>

              )
            )}

          </div>

        </div>

        <button
          className="systemMenuClose"
          onClick={onClose}
        >
          return
        </button>

      </div>

    </div>

  );

}
import {
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

import "../styles/systemMenu.css";

import ConsoleSpill from "../console/ConsoleSpill";

import RS01 from "../archive/RS01";
import RS02 from "../archive/RS02";

type SystemMenuProps = {
  isOpen: boolean;

  onClose: () => void;

  bgmVolume: number;

  setBgmVolume: Dispatch<
    SetStateAction<number>
  >;
};

export default function SystemMenu({
  isOpen,
  onClose,
  bgmVolume,
  setBgmVolume,
}: SystemMenuProps) {
  const [mode, setMode] = useState<
    "settings" | "archive"
  >("settings");

  const [selectedRecord, setSelectedRecord] =
    useState<"RS01" | "RS02">("RS01");

  if (!isOpen) return null;

  const unlockedRecords = JSON.parse(
    localStorage.getItem("unlockedRecords") ||
      '["record_sector_01"]'
  ) as string[];

  const rs02Unlocked =
    unlockedRecords.includes(
      "record_sector_02"
    );

  const currentRecord =
    selectedRecord === "RS02" && rs02Unlocked
      ? RS02
      : RS01;

  const currentRecordTitle =
    selectedRecord === "RS02" && rs02Unlocked
      ? "record_sector_02"
      : "record_sector_01";

  return (
    <div className="systemMenuOverlay">
      <div className="systemMenuPanel">
        <ConsoleSpill />

        <div className="systemMenuTitle">
          SYSTEM
        </div>

        {mode === "settings" && (
          <>
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
              <button
                className="systemMenuButton"
                onClick={() =>
                  setMode("archive")
                }
              >
                archive
              </button>
            </div>
          </>
        )}

        {mode === "archive" && (
          <div className="systemMenuSection">
            <div className="systemMenuLabel">
              ARCHIVE
            </div>

            <div className="systemMenuFragments">
              <button
                className="systemMenuButton"
                onClick={() =>
                  setSelectedRecord("RS01")
                }
              >
                record_sector_01
              </button>

              <button
                className="systemMenuButton"
                disabled={!rs02Unlocked}
                onClick={() => {
                  if (!rs02Unlocked) return;
                  setSelectedRecord("RS02");
                }}
              >
                {rs02Unlocked
                  ? "record_sector_02"
                  : "record_sector_02 / LOCKED"}
              </button>
            </div>

            <div className="fragmentUnlocked">
              <div className="archiveView">
                <div className="archiveRecord">
                  <div className="archiveTitle">
                    {currentRecordTitle}
                  </div>

                  <div className="archiveLine">
                    {currentRecord.map(
                      (line, i) => (
                        <div key={i}>
                          {line}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            <button
              className="systemMenuButton"
              onClick={() =>
                setMode("settings")
              }
            >
              back
            </button>
          </div>
        )}

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